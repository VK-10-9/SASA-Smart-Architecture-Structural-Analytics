'use client';

import { useState } from 'react';
import { LoadCard } from './LoadCard';

interface BaseLoadCalculatorProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultValues: Record<string, any>;
  children: (values: any, setValues: any) => React.ReactNode;
  calculate: (values: any) => Promise<{ steps: any[]; finalAnswer: string }>;
}

export function BaseLoadCalculator({
  title,
  description,
  icon,
  defaultValues,
  children,
  calculate,
}: BaseLoadCalculatorProps) {
  const [values, setValues] = useState(defaultValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    setIsLoading(true);
    try {
      return await calculate(values);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setValues(defaultValues);
  };

  return (
    <LoadCard
      title={title}
      description={description}
      icon={icon}
      onCalculate={handleCalculate}
      onReset={handleReset}
    >
      {children(values, setValues)}
    </LoadCard>
  );
}
