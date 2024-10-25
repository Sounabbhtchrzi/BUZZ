import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Give short funny yet controversial meme topics to tweet about without the hashtags and include debatable topics like Messi vs Ronaldo, cricket vs football, and from Indian perspectives.... Generate only one tweet at a time."
      }
    ],
    model: "llama3-8b-8192",
    temperature: 1.17,
    max_tokens: 1024,
    top_p: 1,
    stream: true,
  });

  let responseText = '';

  for await (const chunk of chatCompletion) {
    responseText += chunk.choices[0]?.delta?.content || '';
  }

  return responseText; 
}
