/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";
import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { FollowerPointerCard } from "./Cards/FollowingPointer";
import Link from "next/link";
// cards
const KaggleCard = dynamic(() => import("./Cards/kaggleCard"));
const FigmaCard = dynamic(() => import("./Cards/FigmaCard"));
const NotionCard = dynamic(() => import("./Cards/NotionCard"));
const VscCard = dynamic(() => import("./Cards/VscCard"));
const githubCard = dynamic(() => import("./Cards/githubCard"));

//  icons
import MobileMiniature from "@/assets/Hero/mobile-miniature.svg";
import MoreIcon from "@/assets/Hero/icons/more-icon.svg";
import YoutubeIcon from "@/assets/Hero/icons/youtube-icon.svg";
// more icons
import GithubIcon from "@/assets/Hero/icons/github-icon.svg";
import VscodeIcon from "@/assets/Hero/icons/vscode-icon.svg";
import NotionIcon from "@/assets/Hero/icons/notion-icon.svg";
import FigmaIcon from "@/assets/Hero/icons/figma-icon.svg";
import KaggleIcon from "@/assets/Hero/icons/kaggle-icon.svg";
import Cursor from "./components/cursor";

const useBreakpoint = () => {
  const queries = {
    sm: useMediaQuery({ query: "(min-width: 640px)" }),
    md: useMediaQuery({ query: "(min-width: 768px)" }),
    lg: useMediaQuery({ query: "(min-width: 1024px)" }),
    xl: useMediaQuery({ query: "(min-width: 1280px)" }),
    "2xl": useMediaQuery({ query: "(min-width: 1536px)" }),
  };

  return queries;
};
gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const breakpoint = useBreakpoint();
  const [selected, setSelected] = useState(3);
  const selectOptions = [
    { value: 0, label: "Github" },
    { value: 1, label: "VsCode" },
    { value: 2, label: "Notion" },
    { value: 3, label: "Figma" },
    { value: 4, label: "Kaggle" },
  ];

  const options: {
    name: string;
    icon: any;
    card: any;
    isDraggable?: boolean;
  }[] = [
    { name: "Github", icon: GithubIcon, card: githubCard },
    { name: "VsCode", icon: VscodeIcon, card: VscCard },
    { name: "Notion", icon: NotionIcon, card: NotionCard },
    { name: "Figma", icon: FigmaIcon, card: FigmaCard, isDraggable: true },
    { name: "Kaggle", icon: KaggleIcon, card: KaggleCard },
  ];
  const selectedCard = options[selected];
  const container = useRef(null);
  const cardRef = useRef(null);
  useGSAP(
    () => {
      gsap.to(container.current, {
        rotateX: -70,
        scrollTrigger: { trigger: container.current, start: "+=50", scrub: 1 },
      });
    },
    { scope: container }
  );
  useGSAP(
    () => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: "back.inOut",
      });
    },
    { scope: cardRef, dependencies: [selected, breakpoint] }
  );
  return (
    <>
      <div id="hero" className="w-full group">
        <div id="hero-mobile" className="lg:hidden flex flex-col gap-[40px] items-center text-white">
          <div className="bg-gradient-to-t from-black from-0% to-transparent to-15% inline-block">
            <Image src={MobileMiniature} alt="mobile miniature" className="z-[-1] block relative" />
          </div>
          <p className="text-[54px] leading-none font-bold mt-[-20px]">Every Journey Start With A Talent !</p>
          <p className="text-[1rem]">
            Your way into a journey where your smallest ideas blossom into extraordinary creations
          </p>
        
         
        </div>

        <FollowerPointerCard title="You" className="perspective-1600 perspective-origin-top">
          <div
            ref={container}
            id="hero-desktop"
            className="lg:block hidden rotate-x-0 origin-top bg-black py-[12px] px-[20px] border-[2px] border-[rgba(255,255,255,0.1)] rounded-[12px] perspective-1600 "
          >
            <div className="flex justify-between items-center mb-[20px]">
              <div
                className={`flex items-center gap-[10px] transition-all duration-300 ease-out opacity-0  group-hover:opacity-100  `}
                id="dots"
              >
                <div className="aspect-square size-4 rounded-full bg-[#ED6A5E]"></div>
                <div className="aspect-square size-4 rounded-full bg-[#F4BF4F]"></div>
                <div className="aspect-square size-4 rounded-full bg-[#61C554]"></div>
              </div>
              <p className="text-xl text-[#ffffff70] transition-all duration-300 ease-out group-hover:text-[#ffffff] ">
                Talent Space
              </p>
              <div className="flex" id="current-users">
                <div className="aspect-square w-[31px] rounded-full bg-[#FE4BAC] flex items-center justify-center mr-[-5px] border-[2px] border-black translate-x-[29px] z-[-1] transition-all duration-300 ease-out delay-75 group-hover:translate-x-[0] ">
                  J
                </div>
                <div className="aspect-square w-[31px] rounded-full bg-[#7155FF] flex items-center justify-center mr-[-5px] border-[2px] border-black  z-[-1]   ">
                  Y
                </div>
                <div className="aspect-square w-[31px] rounded-full bg-[#32BA6F] flex items-center justify-center mr-[-5px] border-[2px] border-black ">
                  Z
                </div>
                <Image
                  className="aspect-square w-[31px] rounded-full bg-[#232323] flex items-center justify-center mr-[-5px] border-[2px] border-black"
                  src={MoreIcon}
                  alt="more icon"
                />
              </div>
            </div>

            <div
              id="main-content"
              className="grid bg-dot-white/10 grid-cols-[auto_65%] gap-[40px] bg-[#111111] py-[40px] px-[24px] rounded-[12px]"
            >
              <div
                id="left"
                className="flex flex-col relative items-start  justify-center 2xl:gap-[40px] xl:gap-[30px] gap-[20px] "
              >
                <Link href="#">
                  <div className="ring-2 ring-[#333333]   flex items-center relative justify-start gap-4 bg-[#28282850] px-[26px] py-[16px] rounded-[8px] hover:bg-[#282828] hover:scale-[1.01] transition-all delay-100  duration-200 ease-in  ">
                    <Image src={YoutubeIcon} alt="youtube icon" />
                    <p className="text-white">Watch Trailer</p>
                    <p>{`>`}</p>
                    {/* cursor */}

                    <div
                      className="h-4 w-4 -right-2 scale-95 top-8 text-green-500  rounded-full absolute z-[50]"
                      style={{
                        pointerEvents: "none",
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="1"
                        viewBox="0 0 16 16"
                        className="h-6 w-6 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[5px] "
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
                      </svg>

                      <div
                        className={
                          "px-2 py-2 bg-green-500 select-none font-medium relative left-2 bottom-1 text-white whitespace-nowrap min-w-max text-xs rounded-bl-full rounded-r-full"
                        }
                      >
                        Yanis
                      </div>
                    </div>
                  </div>
                </Link>
                <Cursor name={"Darko"} />

                <h1 className="2xl:text-6xl xl:text-5xl text-4xl font-bold text-white">
                  Every Journey Start With A <span className="text-green-300">Talent</span> !
                </h1>
                <p className="2xl:text-[24px] xl:text-[18px] text-[16px] text text-gray-400">
                  Your way into a  journey where your smallest ideas blossom into extraordinary
                  creations
                </p>
              </div>

              <div className="flex flex-col gap-4" id="right">
                <Select
                  onChange={(e) => setSelected(e!.value)}
                  options={selectOptions}
                  placeholder="::Type “/” for shortcuts"
                  openMenuOnClick={false}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: "#0E0E0E",
                      border: state.isFocused ? "2px solid rgba(255,255,255,0.1)" : "2px solid rgba(255,255,255,0.3)",
                      ":focus": {
                        border: "2px solid rgba(255,255,255,0.3) !important",
                      },
                      boxShadow: state.isFocused ? "0" : "0",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      fontSize: breakpoint["2xl"] ? "24px" : breakpoint.lg ? "18px" : "16px",
                    }),

                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#0E0E0E",
                    }),
                    option: (base) => ({
                      ...base,
                      backgroundColor: "##1f1f1f",
                    }),
                  }}
                />

                <div className="grid grid-cols-[35%_65%] border-[2px] border-[rgba(255,255,255,0.1)] rounded-[12px] max-h-[540px] overflow-clip">
                  <div
                    id="options"
                    className="2xl:p-[40px] xl:p-[30px] p-[20px] bg-black/80 flex flex-col 2xl:gap-[30px] gap-[16px]"
                  >
                    {options.map((option, i) => {
                      return (
                        <div
                          data-id={i}
                          key={i}
                          className={`flex items-center justify-start gap-4 py-[8px] px-[10px] select-none focus:pointer-events-none        ${
                            selected === i
                              ? "bg-[#161616]"
                              : "hover:bg-[#111111] transition-all delay-100  duration-200 ease-in"
                          } rounded-[8px]`}
                          onClick={(e) => setSelected(parseInt(e.currentTarget.dataset.id!))}
                        >
                          <Image
                            src={option.icon}
                            alt={`${option.name} icon`}
                            className={`${i != selected ? "grayscale" : ""} ${
                              option.name === "Notion" ? "brightness-[0.8]" : ""
                            }`}
                          />
                          <p
                            className={`2xl:text-[24px] xl:text-[18px] text-[14px] ${
                              selected === i ? "text-white" : "text-[#808080]"
                            }`}
                          >
                            {option.name}
                          </p>
                          <p className="ml-auto">{`>`}</p>
                        </div>
                      );
                    })}
                    <div className={`flex items-center justify-start gap-4 py-[8px] px-[10px]  rounded-[8px] `}>
                      <Image src={MoreIcon} alt={`More icon`} />
                      <p className="2xl:text-[24px] xl:text-[18px] text-[14px] text-[#808080]">Other</p>
                      <p className="ml-auto">{`>`}</p>
                    </div>
                  </div>
                  <div id="card" className="h-full w-full   bg-[#131313]">
                    <div
                      ref={cardRef}
                      key={selectedCard.name}
                      className="flex items-start justify-start h-[65vh] w-full p-[21px] overflow-y-auto scrollbar"
                    >
                      <div className="relative top-0  w-full">{React.createElement(selectedCard.card)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FollowerPointerCard>
      </div>
    </>
  );
}

export default Hero;
