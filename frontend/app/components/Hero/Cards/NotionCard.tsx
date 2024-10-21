"use client";

import Image from "next/image";
import steveNoJobs from "../../../../public/steveNojobs.jpg";
import {
  BlockNoteView,
  darkDefaultTheme,
  Theme,
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { Icons } from "@/components/icons";

const NotionCard = () => {
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "bulletListItem",
        content: "Meet with team tonight",
      },
      {
        type: "bulletListItem",
        content: [
          {
            type: "text",
            text: "Check with Zeref about the hero section",
            styles: {
              strike: true,
            },
          },
        ],
      },
    ],
  });

  const lightRedTheme = {
    colors: {
      editor: {
        text: "#ffffff",
        background: "#000000",
      },
      menu: {
        text: "#ffffff",
        background: "#000000",
      },
      tooltip: {
        text: "#ffffff",
        background: "#161616",
      },
      hovered: {
        text: "#ffffff",
        background: "#161616",
      },
      selected: {
        text: "#ffffff",
        background: "#131313",
      },
      disabled: {
        text: "#9b0000",
        background: "#7d0000",
      },
      shadow: "#161616",
      border: "#131313",
      sideMenu: "#bababa",
      highlights: darkDefaultTheme.colors!.highlights,
    },
    borderRadius: 4,
    fontFamily: "SF-Pro-Display, sans-serif",
  } satisfies Theme;

  return (
    <div className="h-full justify-center w-full flex flex-col gap-y-4">
      <div className="flex flex-col h-full bg-black py-5 rounded-2xl">
        <div className={"item"}>
          <BlockNoteView
            className="bg-black"
            editor={editor}
            data-theming-css-variables-demo
            theme={lightRedTheme}

          />
        </div>
      </div>

      <div className="bg-black items-center rounded-2xl w-full flex flex-col gap-y-3 py-4 px-8">
        <div className="flex w-full gap-x-4 items-center">
          <Image
            alt="steve jobs"
            src={steveNoJobs}
            className=" rounded-xl size-20"
          />
          <div className="flex flex-col gap-y-1">
            <p className="text-lg font-medium text-white">Steve Jobs</p>
            <p className="text-stone-300 text-xs">American Business Magnette</p>
          </div>
        </div>
        <div className="h-[1px]  bg-stone-200 rounded-full w-[80%] my-3"></div>
        <blockquote className="text-lg px-2 relative">
          <Icons.quart className="-top-2 text-transparent  right-full absolute" />
          <p className="text-white">
            {" "}
            Design is not just what it looks like and feels like. Design is how
            it works.
          </p>
          {/* <Quote  */}
          <Icons.quart className=" -bottom-2  text-transparent rotate-180  left-[90%] absolute" />
        </blockquote>
      </div>
      <div className="bg-black justify-between items-center rounded-2xl w-full flex  py-5 px-8">
        <div className=" flex gap-x-4 items-center">
          <svg
            className="w-14"
            viewBox="0 0 40 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0.702637H4C1.8 0.702637 0.02 2.50264 0.02 4.70264L0 28.7026C0 30.9026 1.8 32.7026 4 32.7026H36C38.2 32.7026 40 30.9026 40 28.7026V8.70264C40 6.50264 38.2 4.70264 36 4.70264H20L16 0.702637Z"
              fill="white"
            />
          </svg>
          <div className=" flex flex-col gap-y-1">
            <p className="font-medium text-white ">The Full App</p>
            <p className="text-xs text-stone-300">202 files</p>
          </div>
        </div>
        <p className="stone-300 text-xl">8.7 GB</p>
      </div>
    </div>
  );
};

export default NotionCard;
