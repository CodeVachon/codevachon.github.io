import { ClassNames } from "@44north/classnames";
import React, { FC } from "react";

interface ICardProps {
    className?: string | ClassNames;
}

const Card: FC<ICardProps> = ({ className = "", children }) => (
    <div
        className={new ClassNames([
            "border-2 border-gray-500 rounded-lg",
            "shadow",
            "p-4",
            "backdrop-blur bg-white/10"
        ])
            .add(className)
            .list()}
    >
        {children}
    </div>
);

export { Card };
