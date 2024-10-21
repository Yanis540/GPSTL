import Image from "next/image";
import Front from "@/assets/Hero/cards/Github-card-icon/Front.svg";
import Back from "@/assets/Hero/cards/Github-card-icon/Back.svg";
import Ml from "@/assets/Hero/cards/Github-card-icon/ML.svg";
import Dataset from "@/assets/Hero/cards/Github-card-icon/Data.svg";
import av1 from "@/assets/Hero/cards/Github-card-icon/github-avatar/ayoub.jpeg";
import av2 from "@/assets/Hero/cards/Github-card-icon/github-avatar/banouna.png";
import av3 from "@/assets/Hero/cards/Github-card-icon/github-avatar/hamza.jpeg";
import av4 from "@/assets/Hero/cards/Github-card-icon/github-avatar/maroua.png";
import av5 from "@/assets/Hero/cards/Github-card-icon/github-avatar/pharmacie.jpeg";
import av6 from "@/assets/Hero/cards/Github-card-icon/github-avatar/sofian.png";
import av7 from "@/assets/Hero/cards/Github-card-icon/github-avatar/soyed.png";
import av8 from "@/assets/Hero/cards/Github-card-icon/github-avatar/yanis.jpeg";
import av9 from "@/assets/Hero/cards/Github-card-icon/github-avatar/younes.jpeg";
import av10 from "@/assets/Hero/cards/Github-card-icon/github-avatar/zeref.png";
import av11 from "@/assets/Hero/cards/Github-card-icon/github-avatar/ramzy.png";

import GitHubCalendar from "react-github-calendar";
import Link from "next/link";

const avatars = [av10, av7, av5, av1, av3, av6, av8, av9, av11, av4, av2];
function githubCard() {
  return (
    <div className=" flex flex-col gap-[16px]">
      <Link href="https://github.com/Yanis540/GPSTL">
        <div className="flex bg-black items-center rounded-[22px] px-6 py-5  pointer-events-none ">
          <Image
            width={400}
            height={400}
            alt=""
            className="size-12 rounded-xl"
            src="/assets/logo.png"
          />
          <h2 className="ml-5 font-bold text-[22px] text-[#C9D1D9] ">
            Les Chats Verts
          </h2>
        </div>
      </Link>
      <div className="grid gap-x-10 gap-y-2 grid-cols-2">
        {/* <div className="flex gap-x-3 "> */}
        <Image alt="" width={370} src={Front} />
        <Image alt="" width={370} src={Ml} />
        {/* </div> */}
        {/* <div className="flex gap-x-3 "> */}
        <Image alt="" width={370} src={Dataset} />
        <Image alt="" width={370} src={Back} />
        {/* </div> */}
      </div>
      <div className="flex flex-col bg-black justify-center gap-y-3 rounded-[22px] px-8 py-5">
        <div className="flex items-center">
          <h2 className=" font-bold text-[20px]  text-[#C9D1D9] ">
            Contributors
          </h2>
          <span className="px-[8px] py-[2px] text-sm ml-3 bg-[#6E768166] rounded-full">
            {avatars.length}
          </span>
        </div>
        <div className="flex gap-x-2 overflow-x-auto hide-scroll-bar ">
          {avatars.map((avatar, index) => (
            <Image
              key={index}
              alt=""
              width={35}
              height={35}
              src={avatar}
              className="rounded-full"
            />
          ))}
        </div>
      </div>
      <div className="bg-black  rounded-[22px] px-4 py-4 h-40 ">
        {/* <Image alt='' className='w-full'  src={cont}/> */}
        <GitHubCalendar
          username="Yanis540"
          blockSize={8}
          blockMargin={3}
          showWeekdayLabels={false}
          hideMonthLabels={true}
          totalCount={1232}
          style={{
            overflowX: "hidden",
            scrollbarWidth: "none",
            scrollbarColor: "transparent transparent",
          }}
        />
      </div>
    </div>
  );
}

export default githubCard;
