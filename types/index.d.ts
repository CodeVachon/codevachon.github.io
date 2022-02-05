interface IGithubRepo {
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
}

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
        nodes: IGithubRepo[];
    };
}
