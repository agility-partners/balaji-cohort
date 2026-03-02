import { streamText, tool, convertToModelMessages, stepCountIs } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: google('gemini-2.5-flash-lite'),
    system: 'You are a crypto assistant. Use tools for facts. Never invent prices. Use getMarketSummary for aggregate stats and use getCurrentCoins for latest per-coin data.',
    messages: modelMessages,
    stopWhen: stepCountIs(5),
    tools: {
      getMarketSummary: tool({
        description: 'Get latest market summary from warehouse-backed API',
        inputSchema: z.object({}),
        execute: async () => {
          const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/market/summary');
          if (!res.ok) throw new Error("Failed to fetch market summary");
          return await res.json();
        }
      }),

      getCurrentCoins: tool({
        description: 'Get latest individual coin market data',
        inputSchema: z.object({}),
        execute: async () => {
          const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/coins`)
          if (!res.ok) throw new Error("Failed to fetch current coins");
          return await res.json();
        }
      })
    }
  });

  return result.toUIMessageStreamResponse();
}