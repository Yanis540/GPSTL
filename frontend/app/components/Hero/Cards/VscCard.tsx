/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import python from "@/assets/Hero/cards/Vscode-card-icons/py.svg";
import javascript from "@/assets/Hero/cards/Vscode-card-icons/js.svg";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

function setEditorTheme(monaco: any) {
  monaco.editor.defineTheme("onedark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        token: "comment",
        foreground: "#55C1B3",
        fontStyle: "italic",
      },
      { token: "constant", foreground: "#e06c75" },
    ],
    colors: {
      "editor.background": "#000000",
    },
  });
}

function timerFormeter(time: number) {
  if (time < 60) {
    return `${time} seconds elapsed`;
  }
  if (time < 3600) {
    return `${Math.floor(time / 60)} min ${time % 60} sec  elapsed`;
  }
  return `${Math.floor(time / 3600)} h ${Math.floor(
    (time % 3600) / 60
  )} min elapsed`;
}

function VscCard() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(
    '# The best hackthon\ndef bot():\n  print("Micro Hack!")'
  );
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (timer === 0) {
      setTimer(parseInt(localStorage.getItem(`code-${language}`) || "0"));
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, language]);

  useEffect(() => {
    if (timer === 0) {
      return;
    }
    let time;
    if (language === "python") {
      localStorage.setItem("code-javascript", timer.toString());
      time = localStorage.getItem("code-python");
    } else {
      localStorage.setItem("code-python", timer.toString());
      time = localStorage.getItem("code-javascript");
    }
    setTimer(parseInt(time || "0"));
  }, [language]);

  function changeLanguage(lang: string) {
    console.log("Changing language to", lang);
    setLanguage(lang);
    if (lang === "javascript") {
      setCode(`// The best hackthon
function HeroSection() { 
  return ( 
  <div> 
  <h1>Micro Hack!</h1> 
  </div> ); 
}`);
    } else {
      setCode(`# The best hackthon
      def hello():
        print("Micro Hack!")`);
    }
  }

  return (
    <div className="flex flex-col max-h-full gap-[16px]">
      <div
        className={`flex  rounded-[22px] px-8 py-5 transition-all duration-150 ease-out delay-75 ${
          language === "javascript" ? "bg-black" : "bg-[13131310]"
        }`}
        onClick={() => changeLanguage("javascript")}
      >
        <Image
          alt=""
          width={70}
          height={70}
          className="mr-5"
          src={javascript}
        />
        <div>
          <h2 className=" font-bold text-[20px] text-white ">Web app</h2>
          <p className="text-[#737373] text-[14px] font-[400]">
            Web development
          </p>
          <p className="text-[#737373] text-[14px] font-[400]">
            {language === "javascript"
              ? timerFormeter(timer)
              : timerFormeter(
                  parseInt(localStorage.getItem("code-javascript") || "0")
                )}
          </p>
        </div>
      </div>
      <div
        className={`flex  rounded-[22px] px-8 py-5 transition-all duration-150 ease-out delay-75 ${
          language === "python" ? "bg-black" : "bg-[13131310]"
        }`}
        onClick={() => changeLanguage("python")}
      >
        <Image alt="" width={70} height={70} className="mr-5" src={python} />
        <div>
          <h2 className=" font-bold text-[20px] text-white ">Chat Bot</h2>
          <p className="text-[#737373] text-[14px] font-[400]">
            Bot development
          </p>
          <p className="text-[#737373] text-[14px] font-[400]">
            {language === "python"
              ? timerFormeter(timer)
              : timerFormeter(
                  parseInt(localStorage.getItem("code-python") || "0")
                )}
          </p>
        </div>
      </div>
      <div className="flex bg-black rounded-[22px] h-[300px]  mb-30px py-5 px-5">
        <Editor
          height="100%"
          width="100%"
          options={{
            scrollBeyondLastLine: false,
            fontSize: 16,
            lineHeight: 30,
            minimap: { enabled: false },
            overviewRulerBorder: false,
          }}
          theme="onedark"
          beforeMount={setEditorTheme}
          language={language}
          value={code}
        />
      </div>
    </div>
  );
}

export default VscCard;
