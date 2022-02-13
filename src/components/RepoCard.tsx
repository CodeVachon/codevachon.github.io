import { ClassNames } from "@44north/classnames";
import React, { FC } from "react";
import { ForkIcon } from "./Icons";
import { StarIcon, EyeIcon } from "@heroicons/react/solid";
import { Card } from "./Card";
interface IRepoCardProps {
    repo: IGithubRepo;
    className?: string | ClassNames;
}

export const RepoCard: FC<IRepoCardProps> = ({ className = "", repo }) => {
    return (
        <Card className={new ClassNames(["flex space-x-6"]).add(className).list()}>
            <ul className={new ClassNames(["text-gray-500", "flex flex-col space-y-1"]).list()}>
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

            <div className={new ClassNames(["space-y-4"]).list()}>
                <div className={new ClassNames(["space-y-1"]).list()}>
                    <p
                        className={new ClassNames([
                            "text-2xl font-bold font-sans uppercase"
                        ]).list()}
                    >
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
            </div>
        </Card>
    );
};
