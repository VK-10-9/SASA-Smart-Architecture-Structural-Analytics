"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader2, Shuffle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MATERIALS_INFO, type MaterialInfo } from "@/data/materials";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import { Loader } from '@/components/ui/loader';

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

const MATERIALS = [
  { value: 'Reinforced Concrete', label: 'Reinforced Concrete' },
  { value: 'Pre-stressed Concrete', label: 'Pre-stressed Concrete' },
  { value: 'Structural Steel', label: 'Structural Steel' },
  { value: 'Composite Steel-Concrete', label: 'Composite Steel-Concrete' },
  { value: 'Timber', label: 'Timber' },
  { value: 'Masonry', label: 'Masonry' },
  { value: 'Aluminum', label: 'Aluminum' },
  { value: 'Glass-Steel', label: 'Glass-Steel' },
  { value: 'Fiber Reinforced Polymer (FRP)', label: 'Fiber Reinforced Polymer (FRP)' },
  { value: 'Bamboo', label: 'Bamboo' },
];

const SAMPLE_SCENARIOS = [
  "Design a 5-story residential building in a high-rise zone. Each floor has 4 apartments, with a floor height of 3.2m. The building is located in a moderate seismic zone.",
  "Design a highway bridge spanning 50 meters across a river. The bridge needs to support heavy vehicle loads and withstand flood conditions. The site has moderate wind exposure.",
  "Design a single-story industrial warehouse with a clear span of 30 meters. The structure needs to support heavy machinery loads and have good seismic resistance. The roof needs to support solar panels.",
  "Analyze the structural retrofit requirements for a 40-year-old commercial building. The building is 8 stories high with a reinforced concrete frame structure. It needs to be upgraded for current seismic codes.",
  "Design a sports stadium roof structure with a span of 100 meters. The roof needs to be lightweight, weather-resistant, and support lighting and sound systems. The structure should be visually appealing.",
  "Design a multi-story parking structure with 6 levels. Each level needs to support heavy vehicle loads and provide good ventilation. The structure should be efficient for quick vehicle movement.",
  "Design a cultural center with a large auditorium and exhibition spaces. The building needs to have good acoustics and flexible spaces. The structure should be architecturally significant.",
  "Design a hospital building with 10 floors. The structure needs to support heavy medical equipment and provide good vibration isolation. The building should be resilient to natural disasters.",
  "Design a shopping mall with 3 levels and a large central atrium. The structure needs to support heavy retail loads and provide good natural lighting. The building should be energy efficient.",
  "Design a research laboratory with specialized testing facilities. The structure needs to support sensitive equipment and provide good vibration control. The building should be adaptable for future changes."
];

export default function DesignScenario() {
  const [scenario, setScenario] = useState('');
  const [material, setMaterial] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenUsage, setTokenUsage] = useState<{
    prompt: number;
    completion: number;
    total: number;
  } | null>(null);
  const [selectedMaterialInfo, setSelectedMaterialInfo] = useState<MaterialInfo | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const generateRandomScenario = () => {
    // Get random scenario
    const randomScenario = SAMPLE_SCENARIOS[Math.floor(Math.random() * SAMPLE_SCENARIOS.length)];
    setScenario(randomScenario);

    // Get random material
    const randomMaterial = MATERIALS[Math.floor(Math.random() * MATERIALS.length)];
    setMaterial(randomMaterial.value);

    // Clear previous results
    setAnalysis('');
    setTokenUsage(null);
    setError(null);
    setSearchResults([]);
  };

  const handleAnalyze = async () => {
    if (!scenario || !material) {
      setError('Please provide both scenario and material');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis('');
    setTokenUsage(null);

    try {
      const response = await fetch('/api/design-scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scenario, material }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze scenario');
      }

      setAnalysis(data.analysis);
      setTokenUsage(data.tokenUsage);
      setSearchResults(data.searchResults || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaterialSelect = (value: string) => {
    setMaterial(value);
    setSelectedMaterialInfo(MATERIALS_INFO[value] || null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-20 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Design Scenario Analyzer
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get AI-powered analysis and recommendations for your structural design scenarios
            </p>
          </div>

          <Card className="bg-card border-border/50">
            <CardHeader>
              <h2 className="text-2xl font-semibold">Analyze Design Scenario</h2>
              <p className="text-muted-foreground">
                Enter your design scenario and select the material to get detailed analysis
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button
                    onClick={generateRandomScenario}
                    className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Shuffle className="mr-2 h-4 w-4" />
                    Generate Random Scenario
                  </button>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="scenario" className="text-sm font-medium">
                    Design Scenario
                  </label>
                  <textarea
                    id="scenario"
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Example: Design a 5-story residential building in a high-rise zone"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="material" className="text-sm font-medium">
                    Material
                  </label>
                  <div className="flex gap-2">
                    <Select value={material} onValueChange={handleMaterialSelect}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        {MATERIALS.map((mat) => (
                          <SelectItem key={mat.value} value={mat.value}>
                            {mat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                          Learn More
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Material Information</DialogTitle>
                        </DialogHeader>
                        {selectedMaterialInfo && (
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">Description</h3>
                              <p className="text-sm text-muted-foreground">{selectedMaterialInfo.description}</p>
                            </div>
                            <div>
                              <h3 className="font-medium mb-2">Advantages</h3>
                              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                {selectedMaterialInfo.advantages.map((adv, i) => (
                                  <li key={i}>{adv}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-medium mb-2">Disadvantages</h3>
                              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                {selectedMaterialInfo.disadvantages.map((dis, i) => (
                                  <li key={i}>{dis}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-medium mb-2">Common Uses</h3>
                              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                {selectedMaterialInfo.commonUses.map((use, i) => (
                                  <li key={i}>{use}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-medium mb-2">Key Properties</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Strength</p>
                                  <div className="h-2 bg-secondary rounded-full mt-1">
                                    <div 
                                      className="h-full bg-primary rounded-full" 
                                      style={{ width: `${selectedMaterialInfo.keyProperties.strength}%` }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Durability</p>
                                  <div className="h-2 bg-secondary rounded-full mt-1">
                                    <div 
                                      className="h-full bg-primary rounded-full" 
                                      style={{ width: `${selectedMaterialInfo.keyProperties.durability}%` }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Cost</p>
                                  <div className="h-2 bg-secondary rounded-full mt-1">
                                    <div 
                                      className="h-full bg-primary rounded-full" 
                                      style={{ width: `${selectedMaterialInfo.keyProperties.cost}%` }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Sustainability</p>
                                  <div className="h-2 bg-secondary rounded-full mt-1">
                                    <div 
                                      className="h-full bg-primary rounded-full" 
                                      style={{ width: `${selectedMaterialInfo.keyProperties.sustainability}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="flex justify-center">
                  <MagnetizeButton
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="w-full max-w-xs"
                    particleCount={14}
                    attractRadius={50}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Scenario"
                    )}
                  </MagnetizeButton>
                </div>
                {error && (
                  <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}
                <div className="mt-4 p-4 rounded-lg bg-muted/50">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-8">
                      <Loader variant="loading-dots" text="Analyzing Scenario" size="lg" />
                      <p className="text-muted-foreground text-sm text-center">
                        Our AI is analyzing your design scenario and generating detailed recommendations...
                      </p>
                    </div>
                  ) : analysis ? (
                    <div className="prose prose-sm max-w-none">
                      <h3 className="font-medium mb-2">Analysis Results</h3>
                      <div className="whitespace-pre-wrap">{analysis}</div>
                      
                      {searchResults.length > 0 && (
                        <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                          <h4 className="font-medium mb-3 text-blue-900 dark:text-blue-100">
                            📚 Related Resources
                          </h4>
                          <div className="space-y-3">
                            {searchResults.map((result, index) => (
                              <div key={index} className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-900">
                                <h5 className="font-medium text-sm text-blue-800 dark:text-blue-200 mb-1">
                                  {result.title}
                                </h5>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                  {result.snippet}
                                </p>
                                <a
                                  href={result.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                                >
                                  Visit Resource →
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
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
                      <h3 className="font-medium mb-2">Analysis will appear here</h3>
                      <p className="text-muted-foreground text-sm">
                        Enter your scenario and select a material above to get a detailed analysis
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
            <p>Need help with complex design scenarios? <a href="mailto:info@sasa.engineer" className="text-primary underline">Contact our engineering team at info@sasa.engineer</a></p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
