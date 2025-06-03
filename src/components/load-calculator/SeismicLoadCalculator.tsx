'use client';

import { AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BaseLoadCalculator } from './BaseLoadCalculator';

const defaultValues = {
  mass: 10000, // kg
  spectralAcceleration: 0.3, // g
  importanceFactor: 1.0,
  responseModificationFactor: 5.0,
};

export function SeismicLoadCalculator() {
  return (
    <BaseLoadCalculator
      title="Seismic Load Calculator"
      description="Calculate earthquake-induced base shear for structures"
      icon={<AlertCircle className="h-5 w-5" />}
      defaultValues={defaultValues}
      calculate={async (values) => {
        const { 
          mass, 
          spectralAcceleration, 
          importanceFactor, 
          responseModificationFactor 
        } = values;
        
        // Convert mass to weight in Newtons
        const weight = mass * 9.81; // N
        
        // Calculate base shear (simplified formula)
        const baseShear = (weight * spectralAcceleration * importanceFactor) / responseModificationFactor;

        return {
          steps: [
            {
              description: 'Calculate weight of the structure',
              formula: 'W = m × g',
              calculation: `= ${mass}kg × 9.81m/s²`,
              result: `${weight.toFixed(2)} N`,
            },
            {
              description: 'Calculate seismic coefficient',
              formula: 'Cₛ = (SDS × I) / R',
              calculation: `= (${spectralAcceleration}g × ${importanceFactor}) / ${responseModificationFactor}`,
              result: `${(spectralAcceleration * importanceFactor / responseModificationFactor).toFixed(4)}`,
            },
            {
              description: 'Calculate base shear',
              formula: 'V = Cₛ × W',
              calculation: `= ${(spectralAcceleration * importanceFactor / responseModificationFactor).toFixed(4)} × ${weight.toFixed(2)}N`,
              result: `${baseShear.toFixed(2)} N`,
            },
          ],
          finalAnswer: `SEISMIC BASE SHEAR\nTotal base shear: ${baseShear.toFixed(2)} N`,
        };
      }}
    >
      {(values, setValues) => (
        <div className="space-y-4">
          <div>
            <Label htmlFor="mass">Mass of Structure (kg)</Label>
            <Input
              id="mass"
              type="number"
              value={values.mass}
              onChange={(e) =>
                setValues({ ...values, mass: parseFloat(e.target.value) || 0 })
              }
              step="100"
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="spectralAcceleration">Spectral Acceleration (g)</Label>
            <Input
              id="spectralAcceleration"
              type="number"
              value={values.spectralAcceleration}
              onChange={(e) =>
                setValues({ ...values, spectralAcceleration: parseFloat(e.target.value) || 0 })
              }
              step="0.05"
              min="0"
              max="1"
            />
            <p className="text-xs text-white/50 mt-1">
              Typically 0.1g (low seismic) to 1.0g (high seismic)
            </p>
          </div>
          <div>
            <Label htmlFor="importanceFactor">Importance Factor (I)</Label>
            <Input
              id="importanceFactor"
              type="number"
              value={values.importanceFactor}
              onChange={(e) =>
                setValues({ ...values, importanceFactor: parseFloat(e.target.value) || 0 })
              }
              step="0.1"
              min="1"
              max="1.5"
            />
            <p className="text-xs text-white/50 mt-1">
              Standard = 1.0, Essential = 1.25, Hazardous = 1.5
            </p>
          </div>
          <div>
            <Label htmlFor="responseModificationFactor">Response Modification Factor (R)</Label>
            <Input
              id="responseModificationFactor"
              type="number"
              value={values.responseModificationFactor}
              onChange={(e) =>
                setValues({ ...values, responseModificationFactor: parseFloat(e.target.value) || 0 })
              }
              step="0.5"
              min="1"
              max="8"
            />
            <p className="text-xs text-white/50 mt-1">
              Typically 1.5 (poor) to 8 (excellent) based on structural system
            </p>
          </div>
        </div>
      )}
    </BaseLoadCalculator>
  );
}
