import axios from "axios";
import { useForm } from "react-hook-form";

export default function Form({ answer, setAnswer, load, setLoad }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (prompt) => {
    setAnswer("");
    console.log(prompt);
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setAnswer((prev) => prev + chunkValue);
    }
    setLoad(false);
  };
  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          placeholder="質問を入力してください"
          {...register("prompt")}
          rows={4}
          maxLength={200}
          className="border border-neutral-800 w-full"
        />
        <button
          type="submit"
          className="py-1 my-3 rounded-xl bg-neutral-900 px-4 font-medium text-white hover:bg-black/80"
        >
          Generate Response
        </button>
      </form>
    </div>
  );
}
