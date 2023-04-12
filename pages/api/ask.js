import { OpenAIStream } from "../../utils/OpenAIStream";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { prompt } = await req.json();

  if (!prompt) {
    return new Response("No prompt", { status: 400 });
  }

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 500,
    stream: true,
    n: 1,
  };
  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
