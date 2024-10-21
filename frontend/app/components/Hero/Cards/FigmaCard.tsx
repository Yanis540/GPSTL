"use client";
import { Reorder } from "framer-motion";
import { useRef, useState } from "react";
import DropdownMenuDemo from "../components/figma-dropdown";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

const FigmaCard = () => {
  const container = useRef(null);
  const [activeColor, setActiveColor] = useState(0);
  const colors = [
    "black",
    "rgba(255, 107, 107,0.8)",
    "rgba(119, 115, 250, 0.8)",
    "rgba(39, 226, 158,0.8)",
  ];
  const [fontSize, setFontSize] = useState("16px");
  const [textAlignment, setTextAlignment] = useState("Left");
  const [font, setFont] = useState("Revert");

  const Cards = [
    <div
      key={"Graphik"}
      style={{ backgroundColor: colors[activeColor] }}
      className=" justify-between items-start rounded-2xl px-6 py-6 flex gap-x-6 text-white"
    >
      <svg
        className="w-4 cursor-grab active:cursor-grabbing"
        viewBox="0 0 12 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 2.53857C1.5 2.80379 1.60536 3.05814 1.79289 3.24568C1.98043 3.43322 2.23478 3.53857 2.5 3.53857C2.76522 3.53857 3.01957 3.43322 3.20711 3.24568C3.39464 3.05814 3.5 2.80379 3.5 2.53857C3.5 2.27336 3.39464 2.019 3.20711 1.83147C3.01957 1.64393 2.76522 1.53857 2.5 1.53857C2.23478 1.53857 1.98043 1.64393 1.79289 1.83147C1.60536 2.019 1.5 2.27336 1.5 2.53857ZM8.5 2.53857C8.5 2.80379 8.60536 3.05814 8.79289 3.24568C8.98043 3.43322 9.23478 3.53857 9.5 3.53857C9.76522 3.53857 10.0196 3.43322 10.2071 3.24568C10.3946 3.05814 10.5 2.80379 10.5 2.53857C10.5 2.27336 10.3946 2.019 10.2071 1.83147C10.0196 1.64393 9.76522 1.53857 9.5 1.53857C9.23478 1.53857 8.98043 1.64393 8.79289 1.83147C8.60536 2.019 8.5 2.27336 8.5 2.53857ZM1.5 9.53857C1.5 9.80379 1.60536 10.0581 1.79289 10.2457C1.98043 10.4332 2.23478 10.5386 2.5 10.5386C2.76522 10.5386 3.01957 10.4332 3.20711 10.2457C3.39464 10.0581 3.5 9.80379 3.5 9.53857C3.5 9.27336 3.39464 9.019 3.20711 8.83147C3.01957 8.64393 2.76522 8.53857 2.5 8.53857C2.23478 8.53857 1.98043 8.64393 1.79289 8.83147C1.60536 9.019 1.5 9.27336 1.5 9.53857ZM8.5 9.53857C8.5 9.80379 8.60536 10.0581 8.79289 10.2457C8.98043 10.4332 9.23478 10.5386 9.5 10.5386C9.76522 10.5386 10.0196 10.4332 10.2071 10.2457C10.3946 10.0581 10.5 9.80379 10.5 9.53857C10.5 9.27336 10.3946 9.019 10.2071 8.83147C10.0196 8.64393 9.76522 8.53857 9.5 8.53857C9.23478 8.53857 8.98043 8.64393 8.79289 8.83147C8.60536 9.019 8.5 9.27336 8.5 9.53857ZM1.5 16.5386C1.5 16.8038 1.60536 17.0581 1.79289 17.2457C1.98043 17.4332 2.23478 17.5386 2.5 17.5386C2.76522 17.5386 3.01957 17.4332 3.20711 17.2457C3.39464 17.0581 3.5 16.8038 3.5 16.5386C3.5 16.2734 3.39464 16.019 3.20711 15.8315C3.01957 15.6439 2.76522 15.5386 2.5 15.5386C2.23478 15.5386 1.98043 15.6439 1.79289 15.8315C1.60536 16.019 1.5 16.2734 1.5 16.5386ZM8.5 16.5386C8.5 16.8038 8.60536 17.0581 8.79289 17.2457C8.98043 17.4332 9.23478 17.5386 9.5 17.5386C9.76522 17.5386 10.0196 17.4332 10.2071 17.2457C10.3946 17.0581 10.5 16.8038 10.5 16.5386C10.5 16.2734 10.3946 16.019 10.2071 15.8315C10.0196 15.6439 9.76522 15.5386 9.5 15.5386C9.23478 15.5386 8.98043 15.6439 8.79289 15.8315C8.60536 16.019 8.5 16.2734 8.5 16.5386Z"
          stroke="white"
          stroke-opacity="0.8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div className="flex items-center gap-x-3">
        <svg
          className="w-6"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="20" height="19.0769" rx="4" fill="white" />
          <path
            d="M9.72837 7.10817L8.5024 10.3534C8.66106 10.3534 8.98918 10.3582 9.48678 10.3678C9.98438 10.3774 10.3702 10.3822 10.6442 10.3822C10.7356 10.3822 10.8726 10.3774 11.0553 10.3678C10.637 9.15144 10.1947 8.0649 9.72837 7.10817ZM4.5 15.0769L4.51442 14.5072C4.625 14.4736 4.75962 14.4435 4.91827 14.4171C5.07692 14.3906 5.21394 14.3654 5.32933 14.3413C5.44471 14.3173 5.5637 14.2825 5.6863 14.2368C5.80889 14.1911 5.91587 14.1214 6.00721 14.0276C6.09856 13.9339 6.17308 13.8125 6.23077 13.6635L7.9399 9.22115L9.95913 4H10.8822C10.9207 4.06731 10.9471 4.11779 10.9615 4.15144L12.4399 7.61298C12.5986 7.98798 12.8534 8.60697 13.2043 9.46995C13.5553 10.3329 13.8293 10.9928 14.0264 11.4495C14.0986 11.613 14.238 11.9603 14.4447 12.4916C14.6514 13.0228 14.8245 13.4279 14.9639 13.7067C15.0601 13.9231 15.1442 14.0601 15.2163 14.1178C15.3077 14.1899 15.5192 14.2608 15.851 14.3305C16.1827 14.4002 16.3846 14.4495 16.4567 14.4784C16.4856 14.6611 16.5 14.7981 16.5 14.8894C16.5 14.9135 16.4988 14.9459 16.4964 14.9868C16.494 15.0276 16.4928 15.0577 16.4928 15.0769C16.1899 15.0769 15.7332 15.0577 15.1226 15.0192C14.512 14.9808 14.0529 14.9615 13.7452 14.9615C13.3798 14.9615 12.863 14.9784 12.1947 15.012C11.5264 15.0457 11.0986 15.0649 10.9111 15.0697C10.9111 14.863 10.9207 14.6755 10.9399 14.5072L11.8846 14.3053C11.8894 14.3053 11.9195 14.2993 11.9748 14.2873C12.03 14.2752 12.0673 14.2668 12.0865 14.262C12.1058 14.2572 12.1406 14.2464 12.1911 14.2296C12.2416 14.2127 12.2776 14.1971 12.2993 14.1827C12.3209 14.1683 12.3474 14.149 12.3786 14.125C12.4099 14.101 12.4315 14.0745 12.4435 14.0457C12.4555 14.0168 12.4615 13.9832 12.4615 13.9447C12.4615 13.8678 12.387 13.6358 12.238 13.2488C12.0889 12.8618 11.9159 12.4351 11.7188 11.9688C11.5216 11.5024 11.4207 11.262 11.4159 11.2476L8.17067 11.2332C8.04567 11.512 7.86178 11.982 7.61899 12.643C7.3762 13.3041 7.25481 13.6947 7.25481 13.8149C7.25481 13.9207 7.28846 14.0108 7.35577 14.0853C7.42308 14.1599 7.52764 14.2188 7.66947 14.262C7.8113 14.3053 7.92788 14.3377 8.01923 14.3594C8.11058 14.381 8.2476 14.4014 8.43029 14.4207C8.61298 14.4399 8.71154 14.4495 8.72596 14.4495C8.73077 14.5409 8.73317 14.6803 8.73317 14.8678C8.73317 14.9111 8.72837 14.976 8.71875 15.0625C8.4399 15.0625 8.02043 15.0385 7.46034 14.9904C6.90024 14.9423 6.48077 14.9183 6.20192 14.9183C6.16346 14.9183 6.09976 14.9279 6.01082 14.9471C5.92188 14.9663 5.87019 14.976 5.85577 14.976C5.47115 15.0433 5.01923 15.0769 4.5 15.0769Z"
            fill="black"
          />
        </svg>
        <p>{font}</p>
        <DropdownMenuDemo
          title="Font Family"
          content={["Revert", "Cursive", "Fantasy", "Monospace", "Serif"]}
          activeElement={font}
          setActiveElement={setFont}
        />
      </div>
      <div className="flex items-center gap-x-3">
        <svg
          className="w-6"
          viewBox="0 0 17 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 3.09418V1.31641H12.0556V3.09418M6.72222 1.31641V13.7609M8.5 13.7609H4.94444M11.1667 8.42752V7.53863H16.5V8.42752M13.8333 7.53863V13.7609M12.9444 13.7609H14.7222"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p>{fontSize}</p>
        <DropdownMenuDemo
          title="Font Size"
          content={["8px", "12px", "16px", "20px", "24px"]}
          activeElement={fontSize}
          setActiveElement={setFontSize}
        />
      </div>
      <div className="flex items-center gap-x-3">
        {textAlignment === "Left" ? (
          <AlignLeft />
        ) : textAlignment === "Center" ? (
          <AlignCenter />
        ) : (
          <AlignRight />
        )}

        <p>{textAlignment}</p>
        <DropdownMenuDemo
          title="Text Alignement"
          content={["Left", "Center", "Right"]}
          activeElement={textAlignment}
          setActiveElement={setTextAlignment}
        />
      </div>
    </div>,
    <div key={"styles"} className="flex gap-x-4 text-white">
      <div
        style={{
          backgroundColor: colors[activeColor],
        }}
        className="w-fit items-center rounded-2xl px-6 py-6 flex"
      >
        <div
          className="flex flex-col gap-y-2"
          style={{
            alignItems:
              textAlignment === "Center"
                ? "center"
                : textAlignment === "Right"
                ? "flex-end"
                : "flex-start",
          }}
        >
          <p className="font-bold">Styles</p>
          <button
            onClick={() => setActiveColor(1)}
            onDoubleClick={() => setActiveColor(1)}
            className="flex gap-x-2 items-center"
            style={{
              flexDirection: textAlignment === "Right" ? "row-reverse" : "row",
            }}
          >
            <div className="size-4 rounded-full bg-[#DF5452]"></div>
            <p className="text-sm">Primary</p>
          </button>
          <button
            onClick={() => setActiveColor(2)}
            onDoubleClick={() => setActiveColor(1)}
            className="flex gap-x-2 items-center"
            style={{
              flexDirection: textAlignment === "Right" ? "row-reverse" : "row",
            }}
          >
            <div className="size-4 rounded-full bg-[#7773FA]"></div>
            <p className="text-sm">Secondary</p>
          </button>
          <button
            onClick={() => setActiveColor(3)}
            onDoubleClick={() => setActiveColor(1)}
            className="flex gap-x-2 items-center"
            style={{
              flexDirection: textAlignment === "Right" ? "row-reverse" : "row",
            }}
          >
            <div className="size-4 rounded-full bg-[#27E29E]"></div>
            <p className="text-sm">Tertiary</p>
          </button>
        </div>
      </div>
      <div
        style={{ backgroundColor: colors[activeColor] }}
        className={` w-full gap-y-2 flex-col rounded-2xl px-6 py-6 flex`}
      >
        <div
          className="flex items-center w-full justify-between space-x-2"
          style={{
            flexDirection: textAlignment === "Right" ? "row-reverse" : "row",
            justifyContent:
              textAlignment === "Center" ? "center" : "flex-start",
          }}
        >
          <div className="flex gap-x-2 items-center">
            <div
              className="size-5 rounded-full bg-pink-500"
              style={{
                marginLeft: textAlignment === "Right" ? "8px" : "0",
              }}
            ></div>
            <p className="font-bold">Mehdi</p>
          </div>
          <svg
            className="w-4"
            viewBox="0 0 12 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 2.07715C3.5 2.37382 3.41203 2.66383 3.2472 2.9105C3.08238 3.15718 2.84811 3.34944 2.57403 3.46297C2.29994 3.5765 1.99834 3.6062 1.70736 3.54833C1.41639 3.49045 1.14912 3.34759 0.939341 3.13781C0.729562 2.92803 0.586701 2.66075 0.528823 2.36978C0.470945 2.07881 0.50065 1.77721 0.614181 1.50312C0.727713 1.22903 0.919971 0.994766 1.16665 0.829944C1.41332 0.665122 1.70333 0.577148 2 0.577148C2.39783 0.577148 2.77936 0.735184 3.06066 1.01649C3.34197 1.29779 3.5 1.67932 3.5 2.07715Z"
              fill="white"
              fill-opacity="0.6"
            />
            <path
              d="M7.5 2.07715C7.5 2.37382 7.41203 2.66383 7.2472 2.9105C7.08238 3.15718 6.84811 3.34944 6.57403 3.46297C6.29994 3.5765 5.99834 3.6062 5.70736 3.54833C5.41639 3.49045 5.14912 3.34759 4.93934 3.13781C4.72956 2.92803 4.5867 2.66075 4.52882 2.36978C4.47094 2.07881 4.50065 1.77721 4.61418 1.50312C4.72771 1.22903 4.91997 0.994766 5.16665 0.829944C5.41332 0.665122 5.70333 0.577148 6 0.577148C6.39783 0.577148 6.77936 0.735184 7.06066 1.01649C7.34197 1.29779 7.5 1.67932 7.5 2.07715Z"
              fill="white"
              fill-opacity="0.6"
            />
            <path
              d="M11.5 2.07715C11.5 2.37382 11.412 2.66383 11.2472 2.9105C11.0824 3.15718 10.8481 3.34944 10.574 3.46297C10.2999 3.5765 9.99834 3.6062 9.70736 3.54833C9.41639 3.49045 9.14912 3.34759 8.93934 3.13781C8.72956 2.92803 8.5867 2.66075 8.52882 2.36978C8.47094 2.07881 8.50065 1.77721 8.61418 1.50312C8.72771 1.22903 8.91997 0.994766 9.16665 0.829944C9.41332 0.665122 9.70333 0.577148 10 0.577148C10.3978 0.577148 10.7794 0.735184 11.0607 1.01649C11.342 1.29779 11.5 1.67932 11.5 2.07715Z"
              fill="white"
              fill-opacity="0.6"
            />
          </svg>
        </div>
        <p
          style={{
            textAlign: textAlignment.toLowerCase() as
              | "left"
              | "center"
              | "right",
          }}
        >
          Developer? Nope, Designer is all you need here.{" "}
        </p>
      </div>
    </div>,
    <div key={"share"} className="flex w-full gap-x-4 text-white">
      <div
        style={{ backgroundColor: colors[activeColor] }}
        className="w-fit justify-center rounded-2xl gap-y-5 flex-col px-6 py-6 flex"
      >
        <p
          style={{
            textAlign: textAlignment.toLowerCase() as
              | "left"
              | "center"
              | "right",
          }}
          className="text-lg font-bold"
        >
          Share With Teams
        </p>
        <div
          className="flex w-full gap-x-4"
          style={{
            flexDirection: textAlignment === "Right" ? "row-reverse" : "row",
          }}
        >
          <div className="flex items-center flex-col gap-y-2">
            <div className="size-10 rounded-full bg-emerald-300 text-white font-xl flex items-center justify-center">
              Y
            </div>
            <p className="text-xs">Younes</p>
          </div>
          <div className="flex items-center flex-col gap-y-2">
            <div className="size-10 rounded-full bg-blue-300 text-white font-xl flex items-center justify-center">
              C
            </div>
            <p className="text-xs">Chanez</p>
          </div>
          <div className="flex items-center flex-col gap-y-2">
            <div className="size-10 rounded-full bg-red-300 text-white font-xl flex items-center justify-center">
              K
            </div>
            <p className="text-xs">Katia</p>
          </div>
          <div className="flex items-center flex-col gap-y-2">
            <div className="size-10 rounded-full bg-amber-300 text-white font-xl flex items-center justify-center">
              A
            </div>
            <p className="text-xs">Amani</p>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: colors[activeColor] }}
        className="w-full rounded-2xl gap-y-3 flex-col px-6 py-6 flex"
      >
        <div
          className="flex items-center gap-x-3"
          style={{
            justifyContent:
              textAlignment === "Left"
                ? "flex-start"
                : textAlignment === "Center"
                ? "center"
                : "flex-end",
          }}
        >
          <svg
            className="size-4"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.05263 8.23507C6.25538 8.23517 6.45031 8.31327 6.59705 8.45318C6.74378 8.59309 6.83106 8.78409 6.8408 8.9866C6.85055 9.18912 6.782 9.38761 6.64938 9.54096C6.51676 9.69432 6.33022 9.79077 6.12842 9.81033L6.05263 9.81402H0.789474C0.586728 9.81392 0.391792 9.73582 0.24506 9.59591C0.0983271 9.45599 0.0110463 9.26499 0.00130302 9.06248C-0.00844026 8.85997 0.060101 8.66147 0.192724 8.50812C0.325347 8.35477 0.511885 8.25832 0.713684 8.23875L0.789474 8.23507H6.05263ZM9.21053 5.60349C9.41991 5.60349 9.62071 5.68667 9.76877 5.83472C9.91682 5.98278 10 6.18358 10 6.39296C10 6.60235 9.91682 6.80315 9.76877 6.95121C9.62071 7.09926 9.41991 7.18244 9.21053 7.18244H0.789474C0.580092 7.18244 0.379287 7.09926 0.231232 6.95121C0.0831765 6.80315 0 6.60235 0 6.39296C0 6.18358 0.0831765 5.98278 0.231232 5.83472C0.379287 5.68667 0.580092 5.60349 0.789474 5.60349H9.21053ZM6.05263 2.97191C6.25538 2.97201 6.45031 3.05011 6.59705 3.19002C6.74378 3.32993 6.83106 3.52093 6.8408 3.72345C6.85055 3.92596 6.782 4.12445 6.64938 4.27781C6.51676 4.43116 6.33022 4.52761 6.12842 4.54717L6.05263 4.55086H0.789474C0.586728 4.55076 0.391792 4.47266 0.24506 4.33275C0.0983271 4.19284 0.0110463 4.00184 0.00130302 3.79932C-0.00844026 3.59681 0.060101 3.39832 0.192724 3.24496C0.325347 3.09161 0.511885 2.99516 0.713684 2.9756L0.789474 2.97191H6.05263ZM9.21053 0.340332C9.41327 0.340432 9.60821 0.41853 9.75494 0.558442C9.90167 0.698354 9.98895 0.889355 9.9987 1.09187C10.0084 1.29438 9.9399 1.49288 9.80728 1.64623C9.67465 1.79958 9.48812 1.89603 9.28632 1.9156L9.21053 1.91928H0.789474C0.586728 1.91918 0.391792 1.84108 0.24506 1.70117C0.0983271 1.56126 0.0110463 1.37026 0.00130302 1.16775C-0.00844026 0.965234 0.060101 0.766736 0.192724 0.613384C0.325347 0.460031 0.511885 0.36358 0.713684 0.344016L0.789474 0.340332H9.21053Z"
              fill="white"
              fill-opacity="0.8"
            />
          </svg>
          <p className="text-stone-300">Heading</p>
        </div>
        <div
          className="flex  items-center gap-x-3"
          style={{
            justifyContent:
              textAlignment === "Left"
                ? "flex-start"
                : textAlignment === "Center"
                ? "center"
                : "flex-end",
          }}
        >
          <svg
            className="size-4"
            viewBox="0 0 8 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1.07729C0 0.925736 0.0602038 0.780391 0.167367 0.673227C0.274531 0.566063 0.419876 0.505859 0.571429 0.505859H7.42857C7.58012 0.505859 7.72547 0.566063 7.83263 0.673227C7.9398 0.780391 8 0.925736 8 1.07729V2.22015C8 2.3717 7.9398 2.51704 7.83263 2.62421C7.72547 2.73137 7.58012 2.79157 7.42857 2.79157C7.27702 2.79157 7.13167 2.73137 7.02451 2.62421C6.91735 2.51704 6.85714 2.3717 6.85714 2.22015V1.64872H4.57143V8.50586H5.52381C5.67536 8.50586 5.82071 8.56606 5.92787 8.67323C6.03503 8.78039 6.09524 8.92574 6.09524 9.07729C6.09524 9.22884 6.03503 9.37419 5.92787 9.48135C5.82071 9.58851 5.67536 9.64872 5.52381 9.64872H2.47619C2.32464 9.64872 2.17929 9.58851 2.07213 9.48135C1.96497 9.37419 1.90476 9.22884 1.90476 9.07729C1.90476 8.92574 1.96497 8.78039 2.07213 8.67323C2.17929 8.56606 2.32464 8.50586 2.47619 8.50586H3.42857V1.64872H1.14286V2.22015C1.14286 2.3717 1.08265 2.51704 0.97549 2.62421C0.868326 2.73137 0.722981 2.79157 0.571429 2.79157C0.419876 2.79157 0.274531 2.73137 0.167367 2.62421C0.0602038 2.51704 0 2.3717 0 2.22015V1.07729Z"
              fill="white"
              fill-opacity="0.8"
            />
          </svg>

          <p className="text-stone-300">Text</p>
        </div>
        <div
          className="flex items-center gap-x-3"
          style={{
            justifyContent:
              textAlignment === "Left"
                ? "flex-start"
                : textAlignment === "Center"
                ? "center"
                : "flex-end",
          }}
        >
          <svg
            className="size-4"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.11111 10.0771C0.805556 10.0771 0.544074 9.96844 0.326667 9.75104C0.109259 9.53363 0.00037037 9.27196 0 8.96604V1.18826C0 0.882704 0.108889 0.621222 0.326667 0.403815C0.544444 0.186408 0.805926 0.0775188 1.11111 0.0771484H8.88889C9.19444 0.0771484 9.45611 0.186037 9.67389 0.403815C9.89167 0.621593 10.0004 0.883074 10 1.18826V8.96604C10 9.27159 9.8913 9.53326 9.67389 9.75104C9.45648 9.96881 9.19481 10.0775 8.88889 10.0771H1.11111ZM1.66667 7.85493H8.33333L6.25 5.07715L4.58333 7.29937L3.33333 5.6327L1.66667 7.85493Z"
              fill="white"
              fill-opacity="0.8"
            />
          </svg>

          <p className="text-stone-300">Image</p>
        </div>
        <div
          className="flex items-center gap-x-3"
          style={{
            justifyContent:
              textAlignment === "Left"
                ? "flex-start"
                : textAlignment === "Center"
                ? "center"
                : "flex-end",
          }}
        >
          <svg
            className="size-4"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 2.74382H11M9.33333 1.07715V11.0771M1 9.41048H11M2.66667 1.07715V11.0771"
              stroke="white"
              stroke-opacity="0.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p className="text-stone-300">Image</p>
        </div>
      </div>
    </div>,
  ];
  const [items, setitems] = useState([0, 1, 2]);

  return (
    <div
      className="h-full w-full"
      ref={container}
      style={{
        fontFamily: font.toLowerCase(),
        fontSize: fontSize,
      }}
    >
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setitems}
        className="flex justify-center  flex-col gap-y-4 w-full h-full"
      >
        {items.map((card) => (
          <Reorder.Item dragConstraints={container} key={card} value={card}>
            {Cards[card]}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};
export default FigmaCard;
