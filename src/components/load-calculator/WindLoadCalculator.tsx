'use client';

import { Wind } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BaseLoadCalculator } from './BaseLoadCalculator';

const defaultValues = {
  area: 10,
  velocity: 30, // m/s
  dragCoefficient: 1.0,
  airDensity: 1.225, // kg/m³ at sea level, 15°C
};

export function WindLoadCalculator() {
  return (
    <BaseLoadCalculator
      title="Wind Load Calculator"
      description="Calculate wind forces on structures"
      icon={<Wind className="h-5 w-5" />}
      defaultValues={defaultValues}
      calculate={async (values) => {
        const { area, velocity, dragCoefficient, airDensity } = values;
        const dynamicPressure = 0.5 * airDensity * Math.pow(velocity, 2);
        const windLoad = dynamicPressure * dragCoefficient * area;

        return {
          steps: [
            {
              description: 'Calculate dynamic pressure',
              formula: 'q = 0.5 × ρ × v²',
              calculation: `= 0.5 × ${airDensity}kg/m³ × (${velocity}m/s)²`,
              result: `${dynamicPressure.toFixed(2)} N/m²`,
            },
            {
              description: 'Calculate wind load',
              formula: 'F = q × Cd × A',
              calculation: `= ${dynamicPressure.toFixed(2)}N/m² × ${dragCoefficient} × ${area}m²`,
              result: `${windLoad.toFixed(2)} N`,
            },
          ],
          finalAnswer: `WIND LOAD\nTotal wind load: ${windLoad.toFixed(2)} N`,
        };
      }}
    >
      {(values, setValues) => (
        <div className="space-y-4">
          <div>
            <Label htmlFor="area">Projected Area (m²)</Label>
            <Input
              id="area"
              type="number"
              value={values.area}
              onChange={(e) =>
                setValues({ ...values, area: parseFloat(e.target.value) || 0 })
              }
              step="0.1"
              min="0.1"
            />
          </div>
          <div>
            <Label htmlFor="velocity">Wind Speed (m/s)</Label>
            <Input
              id="velocity"
              type="number"
              value={values.velocity}
              onChange={(e) =>
                setValues({ ...values, velocity: parseFloat(e.target.value) || 0 })
              }
              step="1"
              min="0"
            />
            <p className="text-xs text-white/50 mt-1">
              Typical values: 20-25 m/s (Strong breeze), 25-30 m/s (Storm), 30+ m/s (Hurricane)
            </p>
          </div>
          <div>
            <Label htmlFor="dragCoefficient">Drag Coefficient (Cd)</Label>
            <Input
              id="dragCoefficient"
              type="number"
              value={values.dragCoefficient}
              onChange={(e) =>
                setValues({ ...values, dragCoefficient: parseFloat(e.target.value) || 0 })
              }
              step="0.1"
              min="0.1"
            />
            <p className="text-xs text-white/50 mt-1">
              Typical values: Flat plate = 1.28, Sphere = 0.47, Cylinder = 0.82
            </p>
          </div>
          <div>
            <Label htmlFor="airDensity">Air Density (kg/m³)</Label>
            <Input
              id="airDensity"
              type="number"
              value={values.airDensity}
              onChange={(e) =>
                setValues({ ...values, airDensity: parseFloat(e.target.value) || 0 })
              }
              step="0.001"
              min="0.001"
            />
            <p className="text-xs text-white/50 mt-1">
              Standard sea level: 1.225 kg/m³ (decreases with altitude)
            </p>
          </div>
        </div>
      )}
    </BaseLoadCalculator>
  );
}
