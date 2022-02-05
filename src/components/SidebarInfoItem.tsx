import { ClassNames } from "@44north/classnames";
import React, { FC } from "react";

interface ISidebarInfoItemProps {
    className?: string | ClassNames;
    icon?: React.ReactNode;
}

export const SidebarInfoItem: FC<ISidebarInfoItemProps> = ({ className = "", icon, children }) => {
    return (
        <div
            className={new ClassNames(["group", "flex items-center", "space-x-2"])
                .add(className)
                .list()}
        >
            <div
                className={new ClassNames([
                    "w-4 h-4",
                    "group-hover:text-pink-500 duration-200"
                ]).list()}
            >
                {icon}
            </div>
            <div>{children}</div>
        </div>
    );
};
