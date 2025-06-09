import { NextResponse } from 'next/server';
import Together from 'together-ai';

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

interface DesignScenarioRequest {
  scenario: string;
  material: string;
}

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

interface APIResponse {
  analysis?: string;
  error?: string;
  searchResults?: SearchResult[];
}

async function performWebSearch(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/web-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, maxResults: 3 }),
    });

    if (!response.ok) {
      console.warn('Web search failed, continuing without search results');
      return [];
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.warn('Web search error:', error);
    return [];
  }
}

export async function POST(request: Request): Promise<NextResponse<APIResponse>> {
  try {
    if (!request.body) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }

    const body: DesignScenarioRequest = await request.json();
    
    if (!body.scenario?.trim()) {
      return NextResponse.json(
        { error: 'Design scenario is required' },
        { status: 400 }
      );
    }

    if (!body.material?.trim()) {
      return NextResponse.json(
        { error: 'Material selection is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.TOGETHER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Perform web search for relevant information
    const searchQuery = `${body.scenario} ${body.material} structural design engineering`;
    const searchResults = await performWebSearch(searchQuery);
    
    // Build context from search results
    let searchContext = '';
    if (searchResults.length > 0) {
      searchContext = '\n\nRelevant information from recent sources:\n';
      searchResults.forEach((result, index) => {
        searchContext += `${index + 1}. ${result.title}: ${result.snippet}\n`;
      });
      searchContext += '\nUse this information to provide accurate and up-to-date design recommendations.';
    }

    const messages = [
      {
        role: 'system',
        content: `You are a senior structural engineer and architectural consultant with expertise in design analysis. Provide comprehensive analysis and recommendations for structural design scenarios.${searchContext}`
      },
      {
        role: 'user',
        content: `Analyze this design scenario:\n\nScenario: ${body.scenario}\nMaterial: ${body.material}\n\nPlease provide:\n1. Structural analysis and considerations\n2. Material-specific recommendations\n3. Design challenges and solutions\n4. Code compliance considerations\n5. Cost and sustainability factors\n6. Alternative approaches if applicable`
      }
    ];

    const response = await together.chat.completions.create({
      messages,
      model: 'lgai/exaone-3-5-32b-instruct',
      stream: true
    });

    let analysis = '';
    for await (const token of response) {
      analysis += token.choices[0]?.delta?.content || '';
    }

    if (!analysis) {
      return NextResponse.json(
        { error: 'AI service returned an empty response' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      analysis,
      searchResults: searchResults.length > 0 ? searchResults : undefined
    });
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred while analyzing the scenario';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 