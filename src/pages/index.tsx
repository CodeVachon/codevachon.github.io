import { ClassNames } from "@44north/classnames";
import gql from "graphql-tag";

import { GithubUserApi } from "./../utl";
import { GetStaticProps } from "next";
import Head from "next/head";

import { TwitterIcon, GithubIcon, RepoCard, SidebarInfoItem } from "./../components";
import { OfficeBuildingIcon, LocationMarkerIcon, LinkIcon } from "@heroicons/react/solid";

interface IHomepageProps {
    data: {
        user: IGithubUser;
    };
}

function Homepage({ data }: IHomepageProps) {
    const linkClassNames = new ClassNames([
        "hover:text-pink-500 dark:hover:text-white",
        "duration-200"
    ]);

    return (
        <>
            <Head>
                <title>CodeVachon - Christopher Vachon | Github Repositories</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Recursive&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <section
                className={new ClassNames([
                    "flex justify-center items-center font-serif",
                    "w-full min-h-screen",
                    "dark:bg-gray-900 dark:text-white",
                    "bg-gradient-to-br",
                    "from-white dark:from-gray-800",
                    "to-blue-100 dark:to-gray-900",
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
                                    <h1
                                        className={new ClassNames([
                                            "text-3xl font-bold font-sans"
                                        ]).list()}
                                    >
                                        {data.user.name}
                                    </h1>
                                    <h2
                                        className={new ClassNames([
                                            "text-gray-500 text-2xl"
                                        ]).list()}
                                    >
                                        {data.user.login}
                                    </h2>
                                    <p className={new ClassNames(["font-sans"]).list()}>
                                        {data.user.bio}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={new ClassNames([
                                    "text-gray-500 flex flex-col space-y-2"
                                ]).list()}
                            >
                                {data.user.company && (
                                    <SidebarInfoItem icon={<OfficeBuildingIcon />}>
                                        {data.user.company}
                                    </SidebarInfoItem>
                                )}
                                {data.user.location && (
                                    <SidebarInfoItem icon={<LocationMarkerIcon />}>
                                        {data.user.location}
                                    </SidebarInfoItem>
                                )}
                                {data.user.websiteUrl && (
                                    <SidebarInfoItem icon={<LinkIcon />}>
                                        <a
                                            href={`https://${data.user.websiteUrl}`}
                                            target={"_blank"}
                                            className={new ClassNames(linkClassNames).list()}
                                        >
                                            {data.user.websiteUrl}
                                        </a>
                                    </SidebarInfoItem>
                                )}
                                {data.user.twitterUsername && (
                                    <SidebarInfoItem icon={<TwitterIcon />}>
                                        <a
                                            href={`https://twitter.com/${data.user.twitterUsername}`}
                                            target={"_blank"}
                                            className={new ClassNames(linkClassNames).list()}
                                        >
                                            @{data.user.twitterUsername}
                                        </a>
                                    </SidebarInfoItem>
                                )}
                                <SidebarInfoItem icon={<GithubIcon />}>
                                    <a
                                        href={data.user.url}
                                        target={"_blank"}
                                        className={new ClassNames(linkClassNames).list()}
                                    >
                                        {data.user.login}
                                    </a>
                                </SidebarInfoItem>
                            </div>
                        </section>
                    </div>
                    <ul className={new ClassNames(["flex flex-col space-y-4"]).list()}>
                        {data.user.pinnedItems.nodes.map((repo) => (
                            <li key={repo.url}>
                                <RepoCard repo={repo} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
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
