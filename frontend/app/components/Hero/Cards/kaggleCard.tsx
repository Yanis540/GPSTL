import Image from "next/image";
import Kaggle from "@/assets/Hero/cards/Kaggle-card-icons/Vector.svg";
import { IoMdSearch } from "react-icons/io";
import {
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { ChangeEvent, useState } from "react";

function KaggleCard() {
  const [selectedModel, setSelectedModel] = useState(0);
  const [query, setQuery] = useState("");
  const filterQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    const model = modelsData.findIndex((model) => {
      return model.name.toLowerCase().includes(query.toLowerCase());
    });

    if (model !== -1) {
      setSelectedModel(model);
    }
  };

  const modelsData = [
    {
      name: "EfficientNet",
      description: "Powerful CNN with 66M parameters.",
      data: [
        { x: 1, value: 2.3 },
        { x: 2, value: 3.1 },
        { x: 3, value: 4.2 },
        { x: 4, value: 5.0 },
        { x: 5, value: 6.3 },
      ],
    },
    {
      name: "GPT",
      description: "Transformer-based text generation model.",
      data: [
        { x: 1, value: 2.6 },
        { x: 2, value: 3.6 },
        { x: 3, value: 4.7 },
        { x: 4, value: 5.4 },
        { x: 5, value: 6.7 },
      ],
    },
    {
      name: "Diffusion",
      description: "Image generation model from text.",
      data: [
        { x: 1, value: 1.8 },
        { x: 2, value: 3.5 },
        { x: 3, value: 4.0 },
        { x: 4, value: 4.8 },
        { x: 5, value: 5.5 },
      ],
    },
    {
      name: "BERT",
      description: "Bidirectional transformer for NLP tasks.",
      data: [
        { x: 1, value: 2.0 },
        { x: 2, value: 3.2 },
        { x: 3, value: 4.4 },
        { x: 4, value: 5.3 },
        { x: 5, value: 6.1 },
      ],
    },
  ];
  const model = modelsData[selectedModel];
  return (
    <div className="z-50 flex flex-col gap-[16px]">
      <div className="flex bg-black items-center rounded-[22px] px-8 py-5">
        <Image alt="" className="ml-5" src={Kaggle} />
      </div>
      <div className="flex items-center bg-black rounded-[22px] px-8 py-5 ">
        <IoMdSearch />
        <input
          value={query}
          onChange={filterQuery}
          placeholder="Search "
          className="ml-2 bg-transparent focus:outline-none outline-none font-[400] text-[18px] text-white placeholder-[#737373]"
        />
      </div>
      <div className="grid grid-cols-2 gap-2" role="group">
        {modelsData
          .map((model, i) => (
            <button
              onClick={() => setSelectedModel(i)}
              key={i}
              type="button"
              className={`${
                selectedModel === i ? "bg-[#323232]"  : "hover:bg-[#232323]"
              } flex-1 px-4 py-5 text-sm font-medium   rounded-lg border-[#232323] border-2  text-white  transition-all duration-300 delay-100 ease-linear  `}
            >
              {model.name}
            </button>
          ))}
      </div>
      <div className="flex mb-12">
        <div className="flex flex-col items-center justify-center flex-1 bg-black rounded-[22px] px-8 py-5 ">
          <h2 className="mb-4 font-bold text-[20px] text-[#E3F0E5] ">
            {model.name}
          </h2>
          <LineChart width={300} height={250} data={model.data} className="mr-[40px]">
            <CartesianGrid strokeDasharray="3 3  " stroke="#202020" />
            <Line type="monotone" width={10} dataKey="value" stroke="#82ca9d"   dot={false}  />
          </LineChart>
          <div className="flex flex-col items-center justify-center">
            <p className="text-white text-[20px]  mb-2 ">
              {(model.description.length * 95)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p className="text-[#ffffff80] text-[16px] font-[400]  ">
              {model.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KaggleCard;
