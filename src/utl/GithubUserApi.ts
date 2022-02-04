import axios, { AxiosRequestConfig, Method } from "axios";
import { DocumentNode, print } from "graphql";

class GithubUserApi {
    private baseUrl: string = "https://api.github.com";
    private token: string = String(process.env.GITHUB_TOKEN || "");

    callApi<T = Record<string, unknown>>(
        method: Method,
        uri: string,
        data = {},
        qs = {}
    ): Promise<T> {
        const config: AxiosRequestConfig = {
            method: method,
            baseURL: this.baseUrl,
            url: uri,
            data,
            params: qs,
            headers: {
                Authorization: `bearer ${this.token}`
            }
        };

        return axios(config).then((response) => {
            return response.data;
        });
    }

    graphql<T>(query: string | DocumentNode, variables: Record<string, unknown> = {}): Promise<T> {
        if (typeof query !== "string") {
            query = print(query);
        }
        return this.callApi("POST", "/graphql", { query, variables });
    }
}

export { GithubUserApi };
