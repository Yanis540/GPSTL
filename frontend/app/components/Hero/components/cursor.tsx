import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function Cursor({ name }: { name: String }) {
  const cursor = useRef(null);

  useGSAP(
    () => {
      gsap.timeline().fromTo(cursor.current,{
        x : 280,
        y : 60,
      } ,{
        x : 290,
        y : 72,
        ease: "back.inOut",
        yoyo : true,
        repeat :-1,
        duration:0.7,
      },
     )
    },[]
  );

  return (
    <div
      ref={cursor}
      className="h-4 w-4  scale-95  text-[#7155fe]  rounded-full absolute z-[50]"
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
          "px-2 py-2 bg-[#7155fe] select-none font-medium relative left-2 bottom-1 text-white whitespace-nowrap min-w-max text-xs rounded-bl-full rounded-r-full"
        }
      >
        {name}
      </div>
    </div>
  );
}

export default Cursor;
