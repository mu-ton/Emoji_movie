import Head from "next/head";
import { Inter } from "next/font/google";
import { useState } from "react";
import Form from "./components/form";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [load, setLoad] = useState(false);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-3 px-8 text-center">
        <h1 className="text-7xl font-bold my-3 text-primary">GPT APP</h1>

        <Form
          answer={answer}
          setAnswer={setAnswer}
          load={load}
          setLoad={setLoad}
        />
        {/* {answer && (
          <div className="w-1/2 my-4 roundex-xl border  p-4 shadow-md transition duration-300 ease-out hover:bg-blue-900">
            {answer}
          </div>
        )} */}

        {answer && (
          <div className="card w-1/2 bg-base-200 shadow-xl text-primary-content">
            <div className="card-body font-bold">
              <p>{answer}</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
