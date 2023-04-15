import { useForm } from "react-hook-form";

export default function Form({ answer, setAnswer, load, setLoad }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (prompt) => {
    setLoad(true);
    setAnswer("");

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
          className="textarea textarea-bordered textarea-primary my-1 border w-full p-2 text-primary-content bg-base-200"
        />
        {!load ? (
          <button
            type="submit"
            className="btn btn-primary w-full rounded-full font-bold my-3"
          >
            Generate Response
          </button>
        ) : (
          // <div className="animate-pulse font-bold tracking-widest">
          //   読み込み中…
          // </div>
          <progress className="progress progress-primary w-56"></progress>
        )}
      </form>
    </div>
  );
}
