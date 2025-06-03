'use client';

import { Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BaseLoadCalculator } from './BaseLoadCalculator';

const defaultValues = {
  area: 10,
  loadPerArea: 2000, // N/m²
};

export function LiveLoadCalculator() {
  return (
    <BaseLoadCalculator
      title="Live Load Calculator"
      description="Calculate imposed loads from people, furniture, and movable equipment"
      icon={<Users className="h-5 w-5" />}
      defaultValues={defaultValues}
      calculate={async (values) => {
        const { area, loadPerArea } = values;
        const totalLoad = area * loadPerArea;

        return {
          steps: [
            {
              description: 'Calculate total live load',
              formula: 'Total Load = Area × Load per Unit Area',
              calculation: `= ${area}m² × ${loadPerArea}N/m²`,
              result: `${totalLoad.toFixed(2)} N`,
            },
          ],
          finalAnswer: `LIVE LOAD\nTotal live load: ${totalLoad.toFixed(2)} N`,
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
            <Label htmlFor="loadPerArea">Load per Unit Area (N/m²)</Label>
            <Input
              id="loadPerArea"
              type="number"
              value={values.loadPerArea}
              onChange={(e) =>
                setValues({ ...values, loadPerArea: parseFloat(e.target.value) || 0 })
              }
              step="10"
              min="0"
            />
            <p className="text-xs text-white/50 mt-1">
              Typical values: Residential = 2000 N/m², Office = 2500 N/m², Public Assembly = 5000 N/m²
            </p>
          </div>
        </div>
      )}
    </BaseLoadCalculator>
  );
}
