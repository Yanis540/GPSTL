// Core component that receives mouse positions and renders pointer and content

import React, { useEffect, useState } from "react";

import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const FollowerPointerCard = ({
  children,
  className,
  title,
  hasDrag,
  color="rgb(236,72,153)"
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  hasDrag?:boolean;
  color?:string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState<boolean>(false); // Add this line
    const [isGrabbing,setIsGrabbing] = useState(false);
  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rect) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      x.set(e.clientX - rect.left + scrollX);
      y.set(e.clientY - rect.top + scrollY);
    }
  };
  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = () => {
    setIsInside(true);
  };
  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onPointerDown={()=>setIsGrabbing(true)}
      onPointerUp={()=>setIsGrabbing(false)}
      style={{
        cursor: "none",
        touchAction:"none"
      }}
      ref={ref}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {isInside && <FollowPointer color={color} isGrabbing={hasDrag ? isGrabbing : false} x={x} y={y} title={title} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  title,
  isGrabbing,
  color
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  x: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y: any;
  title?: string | React.ReactNode;
  isGrabbing:boolean;
  color?:string;
}) => {
 
  return (
    <motion.div
      className="h-4 w-4 md:block hidden  rounded-full absolute z-[50]"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
        color:color,
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      {!isGrabbing ? <svg
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
      :
      <svg style={{fill:color}} className="h-6 w-6  -translate-x-[12px] -translate-y-[5px] " viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.67579 5.26258C10.26 5.09497 11.0828 5.17939 11.4173 5.39096C11.824 5.64777 12.2985 6.11196 12.8008 6.73341C13.0694 7.0657 14.7244 9.66165 15.3108 9.71611C16.4231 9.28245 16.4231 9.28245 16.4883 8.70039C16.4805 8.46503 16.4805 8.46503 16.4591 8.38188C16.4153 8.20987 16.3532 8.02599 16.2592 7.78071L16.1757 7.5676L16.1644 7.54294L16.1306 7.45786C16.0063 7.15226 15.6635 6.30319 15.5623 6.03451C15.2439 5.18919 15.0838 4.57327 15.101 4.28446C15.1246 3.88672 15.5389 3.13887 15.7978 2.93865C16.4466 2.43912 17.2266 2.01381 17.8916 1.81629C18.1963 1.72641 19.1347 1.89312 19.4195 2.05729C20.0184 2.40238 21.1923 3.88497 22.2333 5.44347C22.2687 5.57492 22.2687 5.57492 23.0369 5.96397C24.4373 5.01635 24.4373 5.01635 24.2578 4.75936C24.2472 4.63986 24.2201 4.51009 24.1738 4.31288C24.0678 3.84643 24.0163 3.5777 23.9839 3.25907C23.9613 3.03649 23.9569 2.83888 23.9714 2.67284C24.0263 2.02693 24.6514 1.28198 25.4064 1.02511C26.2171 0.749305 26.9887 1.06354 27.649 2.21774C28.1849 3.15202 28.3952 3.52731 28.5917 3.89856L29.0956 4.86646C29.7453 6.11099 30.1251 6.90373 30.5583 7.91039C31.2867 9.60453 32 11.5099 32.1961 12.462C32.3956 13.4321 32.5012 15.3865 32.3596 16.5052C32.3393 16.567 32.2741 16.8642 32.1952 17.253C32.0641 17.9 31.9436 18.5678 31.8459 19.2228C31.7937 19.5723 31.7494 19.9095 31.7139 20.2318C31.5763 21.4841 31.5725 22.4494 31.7671 23.137C32.0212 24.0333 32.1846 24.492 32.4091 24.967C32.47 25.0944 32.47 25.0944 32.5304 25.2172C32.6822 25.5254 32.7415 25.6491 32.8444 25.879C32.9525 26.1187 33.0839 26.3615 33.237 26.6104C33.4585 26.9706 33.9696 27.3561 33.9696 27.3561C33.9696 27.3561 33.362 27.6344 33.0041 27.8314C32.5712 28.0695 32.1987 28.2442 31.925 28.3352C31.5276 28.4686 29.9011 27.7516 28.8963 27.0552C27.3591 25.9883 25.5262 27.0359 25.4368 28.7334C25.3633 30.2609 24.9771 31.9481 24.7036 32.1379C23.8128 32.7552 22.3608 33.5298 19.4675 34.9777C19.2237 35.0997 18.2779 35.5569 17.8001 35.797C17.3223 36.0371 17.6896 35.2741 17.3399 34.7423C16.7535 33.8506 16.0623 33.2347 15.1908 33.0409C14.74 32.9377 14.1901 32.7872 13.0567 32.4634C11.7865 32.1006 11.3724 31.9853 10.8871 31.8665L7.6598 30.6625C7.49014 30.5833 5.82014 29.9846 5.27331 29.7391C4.0843 29.2053 3.11647 28.5313 2.29692 27.5691C0.708391 25.7016 0.228063 24.7201 0.291241 23.7801C0.341228 23.022 0.849693 22.1278 1.23369 21.8209C1.62508 21.5042 2.6174 21.0451 2.84807 21.0504C3.1723 21.0563 3.28563 21.0588 3.38655 21.0644C3.50588 21.071 3.58915 21.0818 3.67106 21.101C3.79765 21.1306 3.95085 21.1875 4.17446 21.2937C4.33065 21.3685 4.51365 21.4585 4.79417 21.5963C5.05713 21.7239 5.1888 21.7817 5.34645 21.8237C6.40249 22.1047 7.13258 20.9963 6.57057 20.1271C6.47514 19.9796 6.34551 19.8329 6.11602 19.5955C5.93466 19.406 5.94472 19.3898 5.71522 19.2192L5.44979 19.0275C5.27768 18.9051 5.03897 18.7372 4.69971 18.4979C4.25204 18.1821 3.96038 17.9486 3.7172 17.6985L3.49426 17.4835C3.24928 17.2527 2.89337 16.9262 2.7045 16.7542L2.58053 16.6416L2.59627 16.6593L2.20783 16.2864C1.58926 15.675 1.18267 15.1559 0.918542 14.6023C0.562541 13.8556 0.602096 12.9997 1.48027 12.0258C2.3053 11.1124 4.22889 10.5948 4.92406 11.1315C5.15881 11.3129 5.43363 11.553 5.75008 11.8503L6.00566 12.0957C6.36983 12.4491 6.90104 12.974 6.92857 13.0025C7.10903 13.1789 7.23324 13.293 7.3509 13.3801C7.4403 13.5378 7.4403 13.5378 8.56224 13.4995C9.23712 12.2016 9.23712 12.2016 9.03194 12.0372C8.92977 11.806 8.82035 11.5848 8.56005 11.0733C8.25487 10.4736 8.12974 10.2227 7.97383 9.88857C7.61417 9.1178 7.40502 8.52688 7.36095 8.13728C7.27775 7.4088 7.45982 6.75618 7.86972 6.35818C8.39489 5.84467 9.05877 5.43859 9.67579 5.26258ZM18.4587 14.5478C17.9321 14.8258 17.7306 15.478 18.0086 16.0045L22.67 24.8346C22.948 25.3612 23.6002 25.5627 24.1268 25.2847C24.6533 25.0068 24.8549 24.3546 24.5769 23.828L19.9154 14.9979C19.6375 14.4713 18.9853 14.2698 18.4587 14.5478ZM23.6439 11.8484C23.1161 12.1239 22.9116 12.7752 23.1871 13.303L27.7892 22.1188C28.0647 22.6466 28.716 22.8511 29.2438 22.5756C29.7717 22.3 29.9762 21.6488 29.7006 21.1209L25.0986 12.3052C24.8231 11.7774 24.1718 11.5728 23.6439 11.8484ZM13.4527 17.2635C12.9266 17.5423 12.7261 18.1948 13.0048 18.7209L17.6165 27.4246C17.8953 27.9508 18.5478 28.1513 19.0739 27.8725C19.6001 27.5937 19.8006 26.9412 19.5218 26.4151L14.9102 17.7114C14.6314 17.1853 13.9789 16.9847 13.4527 17.2635Z" />
</svg>

      }
      <motion.div
        
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className={
          "px-2 py-2 bg-pink-500 select-none font-bold relative left-2 bottom-1 text-white whitespace-nowrap min-w-max text-xs rounded-bl-full rounded-r-full"
        }
      >
        {title}
      </motion.div>
    </motion.div>
  );
};
