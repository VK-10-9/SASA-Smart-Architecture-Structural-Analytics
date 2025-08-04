import { NextResponse } from 'next/server';
import { PhysicsSolver } from '@/lib/physics-solver';

type LoadType = 'dead' | 'live' | 'wind' | 'seismic' | 'basic';

interface LoadParams {
  type: LoadType;
  [key: string]: any;
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    if (!formData) {
      return NextResponse.json(
        { error: 'No data provided' },
        { status: 400 }
      );
    }

    // Extract load type or detect it
    let loadType: LoadType = formData.loadType || 'basic';
    let problemStatement = formData.problemText || '';
    
    // If no problem text but load type is specified, generate a problem statement
    if (!problemStatement) {
      problemStatement = generateProblemStatement(loadType, formData);
    }
    
    // Solve the physics problem
    const solver = new PhysicsSolver();
    const solution = await solver.solve(problemStatement);
    
    // Format the solution for the frontend
    const response = {
      solution: {
        type: loadType,
        steps: solution.steps,
        finalAnswer: solution.finalAnswer,
        loadSolutions: solution.loadSolutions || []
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in physics solver:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process the calculation',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper function to generate problem statement based on load type
function generateProblemStatement(loadType: LoadType, params: Record<string, any>): string {
  switch (loadType) {
    case 'dead':
      return `Calculate the dead load for a structural element with area ${params.area || 10}m², ` +
             `thickness ${params.thickness || 0.2}m, and density ${params.density || 2400}kg/m³.`;
             
    case 'live':
      return `Calculate the live load for an area of ${params.area || 10}m² with a load intensity ` +
             `of ${params.loadPerArea || 2000}N/m².`;
             
    case 'wind':
      return `Calculate the wind load on a structure with area ${params.area || 10}m², ` +
             `wind speed ${params.velocity || 30}m/s, and drag coefficient ${params.dragCoefficient || 1.0}.`;
             
    case 'seismic':
      return `Calculate the seismic base shear for a structure with mass ${params.mass || 10000}kg, ` +
             `spectral acceleration ${params.spectralAcceleration || 0.3}g, importance factor ` +
             `${params.importanceFactor || 1.0}, and response modification factor ${params.responseModificationFactor || 5.0}.`;
             
    case 'basic':
    default:
      return `A ${params.mass || 5} kg box is placed on a horizontal surface. ` +
             `A force of ${params.force || 20} N is applied at an angle of ${params.angle || 30}° ` +
             `above the horizontal. The coefficient of friction is ${params.coefficientFriction || 0.2}.\n\n` +
             `Calculate:\n` +
             `- The normal force acting on the box.\n` +
             `- The net force acting on the box in the horizontal direction.\n` +
             `- The acceleration of the box.\n\n` +
             `(Take g = 9.8 m/s²)`;
  }
}
