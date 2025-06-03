import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { scenario, material } = await request.json();

    if (!scenario || !material) {
      return NextResponse.json(
        { error: 'Scenario and material are required' },
        { status: 400 }
      );
    }

    const prompt = `You are an expert structural engineer providing analysis through SASSA (Smart Architecture & Structural Analytics). 

Scenario: ${scenario}
Material: ${material}

Provide a brief analysis with the following sections:
1. Design Approach
2. Material Properties
3. Load Considerations
4. Key Recommendations
5. Applicable IS Codes

Keep your response concise and focused on practical advice.`;

    console.log('Making request to Together AI for design scenario...');

    const response = await fetch('https://api.together.xyz/inference', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        prompt: prompt,
        max_tokens: 800,
        temperature: 0.7,
        top_p: 0.9,
        top_k: 50,
        repetition_penalty: 1,
        stop: ["</s>", "Human:", "Assistant:"],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Together AI API Error:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(`Together AI API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Together AI Response:', data);
    
    if (!data.choices?.[0]?.text) {
      throw new Error('Invalid response format from Together AI');
    }

    const analysis = data.choices[0].text.trim();
    const tokenUsage = {
      prompt_tokens: data.usage?.prompt_tokens || 0,
      completion_tokens: data.usage?.completion_tokens || 0,
      total_tokens: data.usage?.total_tokens || 0
    };

    return NextResponse.json({ 
      analysis,
      tokenUsage
    });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze design scenario' },
      { status: 500 }
    );
  }
} 