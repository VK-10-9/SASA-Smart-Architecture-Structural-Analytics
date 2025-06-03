type SolutionStep = {
  description: string;
  formula: string;
  calculation: string;
  result: string;
};

type LoadType = 'dead' | 'live' | 'wind' | 'seismic';

type LoadSolution = {
  type: LoadType;
  steps: SolutionStep[];
  totalLoad: number;
  unit: string;
};

type PhysicsSolution = {
  steps: SolutionStep[];
  loadSolutions: LoadSolution[];
  finalAnswer: string;
};

export class PhysicsSolver {
  private calculateDeadLoad(params: any): LoadSolution {
    const { area, thickness, density } = params;
    const selfWeight = area * thickness * density;
    
    const steps: SolutionStep[] = [
      {
        description: 'Calculate self weight of the structure',
        formula: 'Self Weight = Area × Thickness × Density',
        calculation: `Self Weight = ${area} m² × ${thickness} m × ${density} kg/m³`,
        result: `Self Weight = ${selfWeight.toFixed(2)} N`
      }
    ];

    return {
      type: 'dead',
      steps,
      totalLoad: selfWeight,
      unit: 'N'
    };
  }

  private calculateLiveLoad(params: any): LoadSolution {
    const { area, loadPerArea } = params;
    const totalLoad = area * loadPerArea;
    
    const steps: SolutionStep[] = [
      {
        description: 'Calculate total live load',
        formula: 'Live Load = Area × Load per Unit Area',
        calculation: `Live Load = ${area} m² × ${loadPerArea} N/m²`,
        result: `Total Live Load = ${totalLoad.toFixed(2)} N`
      }
    ];

    return {
      type: 'live',
      steps,
      totalLoad,
      unit: 'N'
    };
  }

  private calculateWindLoad(params: any): LoadSolution {
    const { velocity, airDensity, dragCoefficient, area } = params;
    const windPressure = 0.5 * airDensity * Math.pow(velocity, 2);
    const windForce = windPressure * dragCoefficient * area;
    
    const steps: SolutionStep[] = [
      {
        description: 'Calculate wind pressure',
        formula: 'q = 0.5 × ρ × v²',
        calculation: `q = 0.5 × ${airDensity} kg/m³ × (${velocity} m/s)²`,
        result: `Wind Pressure = ${windPressure.toFixed(2)} N/m²`
      },
      {
        description: 'Calculate wind force',
        formula: 'F = q × Cd × A',
        calculation: `F = ${windPressure.toFixed(2)} N/m² × ${dragCoefficient} × ${area} m²`,
        result: `Wind Force = ${windForce.toFixed(2)} N`
      }
    ];

    return {
      type: 'wind',
      steps,
      totalLoad: windForce,
      unit: 'N'
    };
  }

  private calculateSeismicLoad(params: any): LoadSolution {
    const { mass, spectralAcceleration, importanceFactor, responseModificationFactor } = params;
    const baseShear = (mass * spectralAcceleration * importanceFactor) / responseModificationFactor;
    
    const steps: SolutionStep[] = [
      {
        description: 'Calculate base shear',
        formula: 'V = (m × Sa × I) / R',
        calculation: `V = (${mass} kg × ${spectralAcceleration} m/s² × ${importanceFactor}) / ${responseModificationFactor}`,
        result: `Base Shear = ${baseShear.toFixed(2)} N`
      }
    ];

    return {
      type: 'seismic',
      steps,
      totalLoad: baseShear,
      unit: 'N'
    };
  }

  async solve(problem: string): Promise<PhysicsSolution> {
    const allSteps: SolutionStep[] = [];
    const loadSolutions: LoadSolution[] = [];

    try {
      // Example: Parse problem to detect load types
      const loadType = this.detectLoadType(problem);
      
      // Calculate loads based on problem type
      switch (loadType) {
        case 'dead':
          const deadLoadParams = this.parseDeadLoadParams(problem);
          const deadLoad = this.calculateDeadLoad(deadLoadParams);
          loadSolutions.push(deadLoad);
          allSteps.push(...deadLoad.steps);
          break;
          
        case 'live':
          const liveLoadParams = this.parseLiveLoadParams(problem);
          const liveLoad = this.calculateLiveLoad(liveLoadParams);
          loadSolutions.push(liveLoad);
          allSteps.push(...liveLoad.steps);
          break;
          
        case 'wind':
          const windLoadParams = this.parseWindLoadParams(problem);
          const windLoad = this.calculateWindLoad(windLoadParams);
          loadSolutions.push(windLoad);
          allSteps.push(...windLoad.steps);
          break;
          
        case 'seismic':
          const seismicParams = this.parseSeismicParams(problem);
          const seismicLoad = this.calculateSeismicLoad(seismicParams);
          loadSolutions.push(seismicLoad);
          allSteps.push(...seismicLoad.steps);
          break;
          
        default:
          // Fall back to basic force calculation
          return this.solveBasicForceProblem(problem);
      }

      // Generate final answer
      const finalAnswer = this.generateFinalAnswer(loadSolutions);
      
      return {
        steps: allSteps,
        loadSolutions,
        finalAnswer
      };
      
    } catch (error) {
      console.error('Error in solve:', error);
      // Fall back to basic force calculation if specific load calculation fails
      return this.solveBasicForceProblem(problem);
    }
  }

  private detectLoadType(problem: string): LoadType | null {
    const lowerProblem = problem.toLowerCase();
    if (lowerProblem.includes('dead load') || lowerProblem.includes('self weight')) return 'dead';
    if (lowerProblem.includes('live load') || lowerProblem.includes('imposed load')) return 'live';
    if (lowerProblem.includes('wind load') || lowerProblem.includes('wind pressure')) return 'wind';
    if (lowerProblem.includes('seismic') || lowerProblem.includes('earthquake')) return 'seismic';
    return null;
  }

  private parseDeadLoadParams(problem: string): any {
    // Extract parameters for dead load calculation
    // This is a simplified parser - in a real app, you'd want more robust parsing
    const areaMatch = problem.match(/(\d+(\.\d+)?)\s*m²/);
    const thicknessMatch = problem.match(/(\d+(\.\d+)?)\s*(m|mm|cm)/);
    const densityMatch = problem.match(/(\d+(\.\d+)?)\s*kg\/m³/);
    
    let thickness = thicknessMatch ? parseFloat(thicknessMatch[1]) : 0.2; // Default 200mm
    if (thicknessMatch && thicknessMatch[3] === 'mm') thickness /= 1000; // Convert mm to m
    if (thicknessMatch && thicknessMatch[3] === 'cm') thickness /= 100;  // Convert cm to m
    
    return {
      area: areaMatch ? parseFloat(areaMatch[1]) : 10, // Default 10 m²
      thickness,
      density: densityMatch ? parseFloat(densityMatch[1]) : 2400 // Default concrete density
    };
  }

  private parseLiveLoadParams(problem: string): any {
    // Extract parameters for live load calculation
    const areaMatch = problem.match(/(\d+(\.\d+)?)\s*m²/);
    const loadMatch = problem.match(/(\d+(\.\d+)?)\s*(kN\/m²|N\/m²|psf)/);
    
    let loadPerArea = 2000; // Default 2 kN/m²
    if (loadMatch) {
      loadPerArea = parseFloat(loadMatch[1]);
      if (loadMatch[3] === 'psf') loadPerArea *= 47.88; // Convert psf to N/m²
      if (loadMatch[3] === 'kN/m²') loadPerArea *= 1000; // Convert kN/m² to N/m²
    }
    
    return {
      area: areaMatch ? parseFloat(areaMatch[1]) : 10, // Default 10 m²
      loadPerArea
    };
  }

  private parseWindLoadParams(problem: string): any {
    // Extract parameters for wind load calculation
    const velocityMatch = problem.match(/(\d+(\.\d+)?)\s*(m\/s|km\/h|mph)/);
    const areaMatch = problem.match(/(\d+(\.\d+)?)\s*m²/);
    
    let velocity = velocityMatch ? parseFloat(velocityMatch[1]) : 30; // Default 30 m/s
    if (velocityMatch && velocityMatch[3] === 'km/h') velocity /= 3.6; // Convert km/h to m/s
    if (velocityMatch && velocityMatch[3] === 'mph') velocity *= 0.44704; // Convert mph to m/s
    
    return {
      velocity,
      airDensity: 1.225, // kg/m³ at sea level, 15°C
      dragCoefficient: 1.0, // Depends on shape, 1.0 is a common default
      area: areaMatch ? parseFloat(areaMatch[1]) : 10 // Default 10 m²
    };
  }

  private parseSeismicParams(problem: string): any {
    // Extract parameters for seismic load calculation
    const massMatch = problem.match(/(\d+(\.\d+)?)\s*(kg|tonne|ton)/);
    const saMatch = problem.match(/spectral acceleration[^\d]*(\d+(\.\d+)?)/i);
    
    let mass = massMatch ? parseFloat(massMatch[1]) : 10000; // Default 10,000 kg
    if (massMatch && (massMatch[3] === 'tonne' || massMatch[3] === 'ton')) mass *= 1000; // Convert to kg
    
    return {
      mass,
      spectralAcceleration: saMatch ? parseFloat(saMatch[1]) : 0.3, // Default 0.3g
      importanceFactor: 1.0, // Depends on building importance
      responseModificationFactor: 5.0 // Depends on structural system
    };
  }

  private generateFinalAnswer(loadSolutions: LoadSolution[]): string {
    return loadSolutions.map(load => (
      `${load.type.toUpperCase()} LOAD\n` +
      `Total ${load.type} load: ${load.totalLoad.toFixed(2)} ${load.unit}`
    )).join('\n\n');
  }

  private solveBasicForceProblem(problem: string): PhysicsSolution {
    // Original basic force problem solver
    const massMatch = problem.match(/(\d+(\.\d+)?)\s*kg/);
    const forceMatch = problem.match(/(\d+(\.\d+)?)\s*N/);
    const angleMatch = problem.match(/(\d+(\.\d+)?)°/);
    const coefficientMatch = problem.match(/0\.\d+/);

    if (!massMatch || !forceMatch || !angleMatch || !coefficientMatch) {
      throw new Error('Could not parse problem parameters');
    }

    // Extract values
    const m = parseFloat(massMatch[1]);
    const F = parseFloat(forceMatch[1]);
    const θ = parseFloat(angleMatch[1]) * (Math.PI / 180); // Convert to radians
    const μ = parseFloat(coefficientMatch[0]);
    const g = 9.8;

    // Calculate normal force (accounting for vertical component of applied force)
    const normalForce = (m * g) - (F * Math.sin(θ));
    
    // Calculate friction force
    const frictionForce = μ * normalForce;
    
    // Calculate horizontal component of applied force
    const Fx = F * Math.cos(θ);
    
    // Calculate net force in horizontal direction
    const netForce = Fx - frictionForce;
    
    // Calculate acceleration
    const a = netForce / m;

    const steps = [
      {
        description: "Calculate the normal force (N)",
        formula: "N = mg - Fsinθ",
        calculation: `N = (${m} kg × 9.8 m/s²) - (${F} N × sin${angleMatch[1]}°`,
        result: `N = ${normalForce.toFixed(2)} N`
      },
      {
        description: "Calculate the frictional force (f)",
        formula: "f = μN",
        calculation: `f = ${μ} × ${normalForce.toFixed(2)} N`,
        result: `f = ${frictionForce.toFixed(2)} N`
      },
      {
        description: "Calculate horizontal component of applied force (Fx)",
        formula: "Fx = Fcosθ",
        calculation: `Fx = ${F} N × cos${angleMatch[1]}°`,
        result: `Fx = ${Fx.toFixed(2)} N`
      },
      {
        description: "Calculate net force in horizontal direction",
        formula: "F_net = Fx - f",
        calculation: `F_net = ${Fx.toFixed(2)} N - ${frictionForce.toFixed(2)} N`,
        result: `F_net = ${netForce.toFixed(2)} N`
      },
      {
        description: "Calculate acceleration (a)",
        formula: "a = F_net / m",
        calculation: `a = ${netForce.toFixed(2)} N / ${m} kg`,
        result: `a = ${a.toFixed(2)} m/s²`
      }
    ];

    return {
      steps,
      loadSolutions: [],
      finalAnswer: `Normal Force: ${normalForce.toFixed(2)} N\n` +
                  `Frictional Force: ${frictionForce.toFixed(2)} N\n` +
                  `Net Horizontal Force: ${netForce.toFixed(2)} N\n` +
                  `Acceleration: ${a.toFixed(2)} m/s²`
    };
  }
}
