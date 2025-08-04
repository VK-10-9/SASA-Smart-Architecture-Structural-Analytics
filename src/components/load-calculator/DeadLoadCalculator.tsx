'use client';

import { Weight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BaseLoadCalculator } from './BaseLoadCalculator';

const defaultValues = {
  area: 10,
  thickness: 0.2,
  density: 2400,
};

export function DeadLoadCalculator() {
  return (
    <BaseLoadCalculator
      title="Dead Load Calculator"
      description="Calculate the self-weight of structural elements"
      icon={<Weight className="h-5 w-5" />}
      defaultValues={defaultValues}
      calculate={async (values) => {
        const { area, thickness, density } = values;
        const volume = area * thickness;
        const weight = volume * density * 9.81; // Convert to Newtons

        return {
          steps: [
            {
              description: 'Calculate volume of the structural element',
              formula: 'Volume = Area × Thickness',
              calculation: `= ${area}m² × ${thickness}m`,
              result: `${volume.toFixed(2)} m³`,
            },
            {
              description: 'Calculate weight of the element',
              formula: 'Weight = Volume × Density × Gravity',
              calculation: `= ${volume.toFixed(2)}m³ × ${density}kg/m³ × 9.81m/s²`,
              result: `${weight.toFixed(2)} N`,
            },
          ],
          finalAnswer: `DEAD LOAD\nTotal dead load: ${weight.toFixed(2)} N`,
        };
      }}
    >
      {(values, setValues) => (
        <div className="space-y-4">
          <div>
            <Label htmlFor="area">Area (m²)</Label>
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
            <Label htmlFor="thickness">Thickness (m)</Label>
            <Input
              id="thickness"
              type="number"
              value={values.thickness}
              onChange={(e) =>
                setValues({ ...values, thickness: parseFloat(e.target.value) || 0 })
              }
              step="0.01"
              min="0.01"
            />
          </div>
          <div>
            <Label htmlFor="density">Material Density (kg/m³)</Label>
            <Input
              id="density"
              type="number"
              value={values.density}
              onChange={(e) =>
                setValues({ ...values, density: parseFloat(e.target.value) || 0 })
              }
              step="10"
              min="0"
            />
            <p className="text-xs text-white/50 mt-1">
              Typical values: Concrete = 2400 kg/m³, Steel = 7850 kg/m³, Wood = 500-800 kg/m³
            </p>
          </div>
        </div>
      )}
    </BaseLoadCalculator>
  );
}
