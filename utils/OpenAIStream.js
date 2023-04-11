import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export async function OpenAIStream(payload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const URL = "https://api.openai.com/v1/chat/completions";

  const res = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);
      for await (const chunk of res.body) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}
