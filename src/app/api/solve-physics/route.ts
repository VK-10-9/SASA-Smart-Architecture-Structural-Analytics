import { NextResponse } from 'next/server';
import Together from 'together-ai';

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

interface PhysicsProblemRequest {
  type: string;
  parameters: {
    problem: string;
  };
}

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

interface APIResponse {
  explanation?: string;
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

    const body: PhysicsProblemRequest = await request.json();
    if (!body.parameters?.problem?.trim()) {
      return NextResponse.json(
        { error: 'Problem description is required and cannot be empty' },
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
    const searchResults = await performWebSearch(body.parameters.problem.trim());
    
    // Build context from search results
    let searchContext = '';
    if (searchResults.length > 0) {
      searchContext = '\n\nRelevant information from recent sources:\n';
      searchResults.forEach((result, index) => {
        searchContext += `${index + 1}. ${result.title}: ${result.snippet}\n`;
      });
      searchContext += '\nUse this information to provide accurate and up-to-date explanations.';
    }

    const messages = [
      { 
        role: 'system', 
        content: `You are a physics tutor explaining force problems to students. Explain concepts clearly and concisely.${searchContext}` 
      },
      { role: 'user', content: body.parameters.problem.trim() }
    ];

    const response = await together.chat.completions.create({
      messages,
      model: 'lgai/exaone-3-5-32b-instruct',
      stream: true
    });

    let explanation = '';
    for await (const token of response) {
      explanation += token.choices[0]?.delta?.content || '';
    }

    if (!explanation) {
      return NextResponse.json(
        { error: 'AI service returned an empty response' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      explanation,
      searchResults: searchResults.length > 0 ? searchResults : undefined
    });
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred while processing your request';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 