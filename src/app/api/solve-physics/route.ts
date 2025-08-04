import { NextResponse } from 'next/server';
import Together from 'together-ai';
import { ErrorHandler } from '@/lib/error-handler';
import { ValidationUtils } from '@/lib/validation';
import { APIError } from '@/types/common';

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
  tokenUsage?: {
    prompt: number;
    completion: number;
    total: number;
  };
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
    // Input validation
    if (!request.body) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }

    const body: PhysicsProblemRequest = await request.json();
    
    // Validate and sanitize input
    const validation = ValidationUtils.validatePhysicsInput(body.parameters);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: `Validation failed: ${validation.errors.join(', ')}` },
        { status: 400 }
      );
    }

    // API key validation
    const apiKey = process.env.TOGETHER_API_KEY;
    if (!apiKey) {
      ErrorHandler.logError(new Error('TOGETHER_API_KEY not configured'));
      return NextResponse.json(
        { error: 'AI service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Sanitize problem text
    const problemText = ValidationUtils.sanitizeInput(body.parameters.problem.trim());

    // Perform web search for relevant information with timeout
    const searchResults = await ErrorHandler.withTimeout(
      performWebSearch(problemText),
      5000 // 5 second timeout for search
    ).catch(error => {
      ErrorHandler.logError(error, { operation: 'web_search' });
      return []; // Continue without search results
    });
    
    // Build context from search results
    let searchContext = '';
    if (searchResults.length > 0) {
      searchContext = '\n\nRelevant information from recent sources:\n';
      searchResults.forEach((result, index) => {
        searchContext += `${index + 1}. ${result.title}: ${result.snippet}\n`;
      });
      searchContext += '\nUse this information to provide accurate and up-to-date explanations.';
    }

    // Create properly typed messages for Together AI
    const systemMessage = {
      role: 'system' as const,
      content: `You are a physics tutor explaining force problems to students. Provide clear, step-by-step solutions with proper formulas and calculations. Focus on educational value and accuracy.${searchContext}`
    };

    const userMessage = {
      role: 'user' as const,
      content: problemText
    };

    const messages = [systemMessage, userMessage];

    // Call Together AI with timeout and error handling
    const response = await ErrorHandler.withTimeout(
      together.chat.completions.create({
        messages,
        model: 'lgai/exaone-3-5-32b-instruct',
        stream: true,
        max_tokens: 2000,
        temperature: 0.3, // Lower temperature for more consistent responses
      }),
      25000 // 25 second timeout
    );

    let explanation = '';
    let tokenCount = 0;

    try {
      for await (const token of response) {
        const content = token.choices[0]?.delta?.content || '';
        explanation += content;
        tokenCount += content.length; // Approximate token count
        
        // Prevent excessively long responses
        if (tokenCount > 5000) {
          break;
        }
      }
    } catch (streamError) {
      ErrorHandler.logError(streamError, { operation: 'ai_streaming' });
      throw new APIError('AI service streaming error', 503, 'AI_STREAM_ERROR');
    }

    if (!explanation.trim()) {
      throw new APIError('AI service returned empty response', 503, 'AI_EMPTY_RESPONSE');
    }

    const tokenUsage = {
      prompt: Math.ceil(problemText.length / 4), // Rough estimate
      completion: Math.ceil(explanation.length / 4),
      total: Math.ceil((problemText.length + explanation.length) / 4)
    };

    return NextResponse.json({ 
      explanation: explanation.trim(),
      searchResults: searchResults.length > 0 ? searchResults : undefined,
      tokenUsage
    });

  } catch (error) {
    ErrorHandler.logError(error, { 
      operation: 'solve_physics',
      timestamp: new Date().toISOString()
    });

    const errorResponse = ErrorHandler.createErrorResponse(error, 'Failed to solve physics problem');
    
    return NextResponse.json(
      { error: errorResponse.error },
      { status: error instanceof APIError ? error.statusCode : 500 }
    );
  }
} 