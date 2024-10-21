import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  DotFilledIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";

type Props = {
  title: string;
  content: string[];
  activeElement: string;
  setActiveElement: (value: string) => void;
};
const DropdownMenuDemo = ({
  title,
  content,
  activeElement,
  setActiveElement,
}: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-4 h-4 inline-flex items-center justify-center text-violet11 bg-black outline-none hover:bg-violet3"
          aria-label="Customise options"
        >
          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="min-w-[220px] bg-black rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
      >
        <DropdownMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11">
          {title}
        </DropdownMenu.Label>
        <DropdownMenu.RadioGroup
          value={activeElement}
          onValueChange={setActiveElement}
        >
          {content.map((value, key) => (
            <DropdownMenu.RadioItem
              key={key}
              className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
              value={value}
            >
              <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              {value}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>

        <DropdownMenu.Arrow className="fill-white" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
