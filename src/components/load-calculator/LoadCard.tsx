'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw } from 'lucide-react';

interface LoadCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onCalculate: () => Promise<{ steps: any[]; finalAnswer: string }>;
  onReset?: () => void;
}

export function LoadCard({
  title,
  description,
  icon,
  children,
  onCalculate,
  onReset,
}: LoadCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ steps: any[]; finalAnswer: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await onCalculate();
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    onReset?.();
  };

  return (
    <motion.div 
      className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCalculate}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Calculator className="h-4 w-4" />
            <span>{isLoading ? 'Calculating...' : 'Calculate'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          {children}
        </div>

        {error && (
          <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-6">
            <div className="p-4 rounded-md bg-success/10 border border-success/20">
              <h3 className="font-medium text-success-foreground mb-2">Result</h3>
              <pre className="text-sm text-foreground/90 whitespace-pre-wrap">{result.finalAnswer}</pre>
            </div>

            {result.steps.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium text-foreground/90">Calculation Steps</h3>
                <div className="space-y-4">
                  {result.steps.map((step, index) => (
                    <div key={index} className="p-4 rounded-md bg-muted/30 border border-border">
                      <p className="text-sm text-foreground/90 mb-2">{step.description}</p>
                      {step.formula && (
                        <p className="text-sm text-primary font-mono mb-1">{step.formula}</p>
                      )}
                      {step.calculation && (
                        <p className="text-sm text-muted-foreground font-mono mb-1">{step.calculation}</p>
                      )}
                      <p className="text-sm text-success font-medium mt-2">= {step.result}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
