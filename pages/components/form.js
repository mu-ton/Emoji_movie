import axios from "axios";
import { useForm } from "react-hook-form";

export default function Form({ answer, setAnswer }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(`askへポストします。データ:${data.prompt}`);
    try {
      await axios({
        url: "/api/ask",
        method: "POST",
        data: data,
        onDownloadProgress: (ProgressEvent) => {
          const dataChunk = ProgressEvent.event.target.response;
          setAnswer(dataChunk);
        },
      });
    } catch (e) {
      console.log(e);
    }
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
          className="my-3 rounded-xl bg-neutral-900 px-4 font-medium text-white hover:bg-black/80"
        >
          Generate Response
        </button>
      </form>
    </div>
  );
}
