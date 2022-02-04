import { ClassNames } from "@44north/classnames";
import { FC, useEffect, useState } from "react";
import gql from "graphql-tag";

import { GithubUserApi } from "./../utl";
import { GetServerSideProps, GetStaticProps } from "next";

import {
    OfficeBuildingIcon,
    LocationMarkerIcon,
    LinkIcon,
    StarIcon,
    EyeIcon
} from "@heroicons/react/solid";

const TwitterIcon: FC<{ className?: string | ClassNames }> = ({ className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 273.5 222.3"
        role="img"
        className={new ClassNames([""]).add(className).list()}
    >
        <title id="s0bbo8xehym5bksw54tfm7a7hp78ng7">Twitter</title>
        <path
            d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"
            fill="currentColor"
        ></path>
    </svg>
);

const GithubIcon: FC<{ className?: string | ClassNames }> = ({ className = "" }) => (
    <svg
        height="32"
        viewBox="0 0 16 16"
        role="img"
        className={new ClassNames([""]).add(className).list()}
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
        ></path>
    </svg>
);

const ForkIcon: FC<{ className?: string | ClassNames }> = ({ className = "" }) => (
    <svg
        height="32"
        viewBox="0 0 16 16"
        role="img"
        className={new ClassNames([""]).add(className).list()}
    >
        <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
        ></path>
    </svg>
);

interface IGithubUser {
    avatarUrl: string;
    bio: number;
    bioHTML: string;
    company?: string;
    login: string;
    url: string;
    name: string;
    location: string;
    websiteUrl: string;
    twitterUsername: string;
    pinnedItems: {
        nodes: {
            name: string;
            description: string;
            sshUrl: string;
            homepageUrl: string;
            url: string;
            forkCount: number;
            stargazerCount: number;
            watchers: {
                totalCount: number;
            };
            languages: {
                nodes: {
                    color: string;
                    name: string;
                }[];
            };
        }[];
    };
}

interface IHomepageProps {
    data: {
        user: IGithubUser;
    };
}

function Homepage({ data }: IHomepageProps) {
    return (
        <section
            className={new ClassNames([
                "flex justify-center items-center",
                "w-full min-h-screen",
                "dark:bg-gray-900 dark:text-white",
                "p-8",
                "overflow-y-auto"
            ]).list()}
        >
            <div
                className={new ClassNames([
                    "flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-6 [max-width:800px] relative"
                ]).list()}
            >
                <div className={new ClassNames([""]).list()}>
                    <section className={new ClassNames(["flex flex-col space-y-6"]).list()}>
                        <div
                            className={new ClassNames([
                                "flex sm:flex-col justify-between items-center sm:items-start sm:space-y-4"
                            ]).list()}
                        >
                            <div
                                className={new ClassNames([
                                    "w-1/5 sm:w-auto order-2 sm:order-1",
                                    "overflow-hidden rounded-full",
                                    "border-2 border-gray-500"
                                ]).list()}
                            >
                                <img
                                    alt={data.user.login}
                                    src={data.user.avatarUrl}
                                    className={new ClassNames(["block"]).list()}
                                />
                            </div>
                            <div className={new ClassNames(["order-1"]).list()}>
                                <h1 className={new ClassNames(["text-2xl font-bold"]).list()}>
                                    {data.user.name}
                                </h1>
                                <h2 className={new ClassNames(["text-gray-500 text-2xl"]).list()}>
                                    {data.user.login}
                                </h2>
                                <p className={new ClassNames([""]).list()}>{data.user.bio}</p>
                            </div>
                        </div>
                        <div
                            className={new ClassNames([
                                "text-gray-500 flex flex-col space-y-2"
                            ]).list()}
                        >
                            {data.user.company && (
                                <div className={new ClassNames(["flex space-x-2"]).list()}>
                                    <OfficeBuildingIcon
                                        className={new ClassNames(["w-6 h-6"]).list()}
                                    />
                                    <p>{data.user.company}</p>
                                </div>
                            )}
                            {data.user.location && (
                                <div className={new ClassNames(["flex space-x-2"]).list()}>
                                    <LocationMarkerIcon
                                        className={new ClassNames(["w-6 h-6"]).list()}
                                    />
                                    <p>{data.user.location}</p>
                                </div>
                            )}
                            {data.user.websiteUrl && (
                                <div className={new ClassNames(["flex space-x-2"]).list()}>
                                    <LinkIcon className={new ClassNames(["w-6 h-6"]).list()} />
                                    <a href={`https://${data.user.websiteUrl}`} target={"_blank"}>
                                        {data.user.websiteUrl}
                                    </a>
                                </div>
                            )}
                            {data.user.twitterUsername && (
                                <div className={new ClassNames(["flex space-x-2"]).list()}>
                                    <TwitterIcon className={new ClassNames(["w-6 h-6"]).list()} />
                                    <a
                                        href={`https://twitter.com/${data.user.twitterUsername}`}
                                        target={"_blank"}
                                    >
                                        @{data.user.twitterUsername}
                                    </a>
                                </div>
                            )}
                            <div className={new ClassNames(["flex space-x-2"]).list()}>
                                <GithubIcon className={new ClassNames(["w-6 h-6"]).list()} />
                                <a href={data.user.url} target={"_blank"}>
                                    {data.user.login}
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
                <ul className={new ClassNames(["flex flex-col space-y-4"]).list()}>
                    {data.user.pinnedItems.nodes.map((repo) => (
                        <li
                            key={repo.url}
                            className={new ClassNames([
                                "border-2 border-gray-500 rounded p-4",
                                "space-y-4"
                            ]).list()}
                        >
                            <div>
                                <p className={new ClassNames(["text-xl font-bold"]).list()}>
                                    <a href={repo.url} target={"_blank"}>
                                        {repo.name}
                                    </a>
                                </p>
                                <p>{repo.description}</p>
                            </div>
                            <ul
                                className={new ClassNames([
                                    "text-gray-500",
                                    "flex space-x-4"
                                ]).list()}
                            >
                                <li
                                    className={new ClassNames([
                                        "flex space-x-1 items-center"
                                    ]).list()}
                                >
                                    <ForkIcon className={new ClassNames(["w-4 h-4"]).list()} />
                                    <p>{repo.forkCount}</p>
                                </li>
                                <li
                                    className={new ClassNames([
                                        "flex space-x-1 items-center"
                                    ]).list()}
                                >
                                    <StarIcon className={new ClassNames(["w-4 h-4"]).list()} />
                                    <p>{repo.stargazerCount}</p>
                                </li>
                                <li
                                    className={new ClassNames([
                                        "flex space-x-1 items-center"
                                    ]).list()}
                                >
                                    <EyeIcon className={new ClassNames(["w-4 h-4"]).list()} />
                                    <p>{repo.watchers.totalCount}</p>
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

const getStaticProps: GetStaticProps = async (context) => {
    const { data } = await new GithubUserApi().graphql<{ data: IGithubUser }>(
        gql`
            query GetUserDetails($user: String!) {
                user(login: $user) {
                    name
                    login
                    company
                    avatarUrl
                    bio
                    bioHTML
                    url
                    location
                    websiteUrl
                    twitterUsername
                    pinnedItems(first: 6, types: REPOSITORY) {
                        nodes {
                            ... on Repository {
                                name
                                description
                                url
                                sshUrl
                                homepageUrl
                                forkCount
                                stargazerCount
                                watchers {
                                    totalCount
                                }
                                languages(first: 5) {
                                    nodes {
                                        ... on Language {
                                            color
                                            name
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `,
        { user: "CodeVachon" }
    );

    return {
        props: {
            data
        }
    };
};

export default Homepage;
export { getStaticProps };
