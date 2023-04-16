import { OpenAIStream } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing API_KEY");
}

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { prompt } = await req.json();

  if (!prompt) {
    return new Response("No prompt", { status: 400 });
  }
  const systemContent =
    "あなたは映画のタイトルを絵文字で表現することが得意です。映画の作品名を言われたら、その作品の概要をいくつかの絵文字で表現してください。";
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemContent },
      { role: "user", content: prompt },
    ],
    max_tokens: 1000,
    stream: true,
    n: 1,
  };
  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
