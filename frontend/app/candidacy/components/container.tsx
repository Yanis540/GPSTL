import React from "react";
import {cn} from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ className, children, ...props }) => {
    return (
        <div
            className={cn("flex items-center justify-center", className)}
            {...props}
        >
            {children}
        </div>
    );
};