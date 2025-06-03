import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { type, parameters } = await request.json();

    if (!parameters.problem) {
      return NextResponse.json(
        { error: 'Problem description is required' },
        { status: 400 }
      );
    }

    const prompt = `You are a physics tutor explaining force problems to students. Explain concepts clearly and concisely.

Problem: ${parameters.problem}

Please provide a detailed solution that includes:
1. What forces are involved
2. How these forces interact
3. Step-by-step solution process
4. Final answer with units
5. Brief explanation of the physics principles involved

Keep the explanation clear and concise, suitable for a student learning physics.`;

    console.log('Making request to Together AI...');

    const response = await fetch('https://api.together.xyz/inference', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.7,
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

    const explanation = data.choices[0].text.trim();
    return NextResponse.json({ explanation });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to solve the problem' },
      { status: 500 }
    );
  }
} 