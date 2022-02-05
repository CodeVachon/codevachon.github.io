import { ClassNames } from "@44north/classnames";
import React, { FC } from "react";
import { ForkIcon } from "./Icons";
import { StarIcon, EyeIcon } from "@heroicons/react/solid";

interface IRepoCardProps {
    repo: IGithubRepo;
    className?: string | ClassNames;
}

export const RepoCard: FC<IRepoCardProps> = ({ className = "", repo }) => {
    return (
        <div
            className={new ClassNames([
                "border-2 border-gray-500 rounded-lg",
                "shadow",
                "p-4",
                "space-y-4",
                "backdrop-blur bg-white/10"
            ])
                .add(className)
                .list()}
        >
            <div className={new ClassNames(["space-y-1"]).list()}>
                <p className={new ClassNames(["text-2xl font-bold font-sans"]).list()}>
                    <a href={repo.url} target={"_blank"}>
                        {repo.name}
                    </a>
                </p>
                <p>{repo.description}</p>
            </div>

            {repo.homepageUrl ? (
                <div>
                    <a href={repo.homepageUrl} target={"_blank"}>
                        {repo.homepageUrl}
                    </a>
                </div>
            ) : null}

            <ul className={new ClassNames(["text-gray-500", "flex space-x-4"]).list()}>
                <li className={new ClassNames(["flex space-x-1 items-center"]).list()}>
                    <ForkIcon className={new ClassNames(["w-4 h-4"]).list()} />
                    <p>{repo.forkCount}</p>
                </li>
                <li className={new ClassNames(["flex space-x-1 items-center"]).list()}>
                    <StarIcon className={new ClassNames(["w-4 h-4"]).list()} />
                    <p>{repo.stargazerCount}</p>
                </li>
                <li className={new ClassNames(["flex space-x-1 items-center"]).list()}>
                    <EyeIcon className={new ClassNames(["w-4 h-4"]).list()} />
                    <p>{repo.watchers.totalCount}</p>
                </li>
            </ul>
        </div>
    );
};
