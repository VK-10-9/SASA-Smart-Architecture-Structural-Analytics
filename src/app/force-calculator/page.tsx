'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeadLoadCalculator } from '@/components/load-calculator/DeadLoadCalculator';
import { LiveLoadCalculator } from '@/components/load-calculator/LiveLoadCalculator';
import { WindLoadCalculator } from '@/components/load-calculator/WindLoadCalculator';
import { SeismicLoadCalculator } from '@/components/load-calculator/SeismicLoadCalculator';
import { Loader2, Shuffle } from 'lucide-react';
import { MagnetizeButton } from '@/components/ui/magnetize-button';

type LoadType = 'dead' | 'live' | 'wind' | 'seismic';

interface ProblemData {
  type: string;
  parameters: Record<string, any>;
}

interface SolutionData {
  solution: Record<string, any>;
}

const SAMPLE_QUESTIONS = [
  "A 5kg object is pushed with a force of 20N. What is its acceleration?",
  "A car of mass 1200kg accelerates at 2.5 m/s². What is the net force acting on it?",
  "A 10kg box is pulled across a frictionless surface with a force of 30N at an angle of 30 degrees. What is the horizontal component of the force?",
  "A 2kg ball is dropped from a height of 10m. What is the force of gravity acting on it? (g = 9.8 m/s²)",
  "A 500kg elevator is moving upward with an acceleration of 2 m/s². What is the tension in the cable?",
  "A 3kg block slides down a frictionless inclined plane at 30 degrees. What is the component of gravity parallel to the plane?",
  "A 1500kg car is moving at 20 m/s and comes to a stop in 5 seconds. What is the average braking force?",
  "A 4kg object is suspended by two ropes. One rope pulls at 30 degrees with 20N, and the other at 60 degrees with 30N. What is the net force?",
  "A 2kg mass is attached to a spring with a force constant of 200 N/m. What is the force when the spring is stretched 0.1m?",
  "A 1000kg satellite orbits Earth at an altitude where g = 8.5 m/s². What is the gravitational force on the satellite?"
];

export default function ForceCalculator() {
  const [activeTab, setActiveTab] = useState<LoadType>('dead');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenUsage, setTokenUsage] = useState<{ prompt: number; completion: number; total: number } | null>(null);

  const generateRandomQuestion = () => {
    const randomQuestion = SAMPLE_QUESTIONS[Math.floor(Math.random() * SAMPLE_QUESTIONS.length)];
    setProblem(randomQuestion);
    setSolution('');
    setError(null);
    setTokenUsage(null);
  };

  const handleSolveProblem = async () => {
    if (!problem.trim()) {
      setError('Please enter a problem to solve');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Extract problem data from the input
      const problemData: ProblemData = {
        type: 'force',
        parameters: {
          problem: problem.trim()
        }
      };

      // Call the API endpoint that will use the LLM
      const response = await fetch('/api/solve-physics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(problemData),
      });

      if (!response.ok) {
        throw new Error('Failed to get solution');
      }

      const data = await response.json();
      setSolution(data.explanation);
      setTokenUsage(data.tokenUsage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Structural Load Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate different types of structural loads with detailed step-by-step solutions
            </p>
          </div>

          <Card className="bg-card border-border/50 overflow-hidden">
            <CardHeader className="border-b border-border p-0">
              <Tabs 
                value={activeTab} 
                onValueChange={(value: string) => setActiveTab(value as LoadType)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 bg-muted/50 border-b border-border rounded-none">
                  <TabsTrigger 
                    value="dead" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none transition-colors"
                  >
                    Dead Load
                  </TabsTrigger>
                  <TabsTrigger 
                    value="live" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none transition-colors"
                  >
                    Live Load
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wind" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none transition-colors"
                  >
                    Wind Load
                  </TabsTrigger>
                  <TabsTrigger 
                    value="seismic" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none transition-colors"
                  >
                    Seismic Load
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeTab} className="w-full">
                <TabsContent value="dead">
                  <DeadLoadCalculator />
                </TabsContent>
                <TabsContent value="live">
                  <LiveLoadCalculator />
                </TabsContent>
                <TabsContent value="wind">
                  <WindLoadCalculator />
                </TabsContent>
                <TabsContent value="seismic">
                  <SeismicLoadCalculator />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-8 bg-card border-border/50">
            <CardHeader>
              <h2 className="text-2xl font-semibold">AI Force Problem Solver</h2>
              <p className="text-muted-foreground">
                Get step-by-step solutions to your force-related physics problems
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button
                    onClick={generateRandomQuestion}
                    className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Shuffle className="mr-2 h-4 w-4" />
                    Generate Random Question
                  </button>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="problem" className="text-sm font-medium">
                    Enter your force-related problem
                  </label>
                  <textarea
                    id="problem"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Example: A 5kg object is pushed with a force of 20N. What is its acceleration?"
                  />
                </div>
                <div className="flex justify-center">
                  <MagnetizeButton
                    onClick={handleSolveProblem}
                    disabled={isLoading}
                    className="w-full max-w-xs"
                    particleCount={14}
                    attractRadius={50}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Solving...
                      </>
                    ) : (
                      "Solve Problem"
                    )}
                  </MagnetizeButton>
                </div>
                {error && (
                  <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}
                <div className="mt-4 p-4 rounded-lg bg-muted/50">
                  {solution ? (
                    <div className="prose prose-sm max-w-none">
                      <h3 className="font-medium mb-2">Solution</h3>
                      <div className="whitespace-pre-wrap">{solution}</div>
                      {tokenUsage && (
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>Token Usage:</p>
                          <ul className="list-disc pl-5">
                            <li>Prompt: {tokenUsage.prompt} tokens</li>
                            <li>Completion: {tokenUsage.completion} tokens</li>
                            <li>Total: {tokenUsage.total} tokens</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <h3 className="font-medium mb-2">Solution will appear here</h3>
                      <p className="text-muted-foreground text-sm">
                        Enter your problem above and click "Solve Problem" to get a detailed solution
                      </p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 text-center text-muted-foreground text-sm"
          >
            <p>Need help with complex load combinations? <a href="#" className="text-primary hover:underline">Contact our engineering team</a></p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
