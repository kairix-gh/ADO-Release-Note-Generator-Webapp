import { Axios, isAxiosError } from "axios";
import type {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,    
} from "axios";



export class APIClient extends Axios {
    private token: string;

    public constructor (conf: AxiosRequestConfig) {
        super(conf);

        this.token = "";

        this.interceptors.request.use((config) => {
            config.headers["x-functions-key"] = `${this.getToken()}`
            // config.headers["Authorization"] = `Bearer ${this.getToken()}`            
            return config;
        });
    }

    public getToken() {
        return this.token;
    }

    public setToken(token: string) {
        this.token = token;
    }

    private getResponseData(response: AxiosResponse) {
        if (response.headers["Content-Type"] == "application/json") {
            if (response.data) {
                return JSON.parse(response.data);
            } else {
                return JSON.parse("{}");
            }
        } else {
            return response;
        }
    }

    public async getReleaseNotes(payload: APIPayload) {
        return this.post(`${import.meta.env.VITE_API_BASE_URL}/GetReleaseNotes`, JSON.stringify(payload), { responseType: "arraybuffer" })
            .then(
                this.getResponseData.bind(this)
            )
            .catch((error) => {
                this.handleError(error)
            })            
    }

    private handleError(error: unknown) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                if (error.response) {
                    console.log("Error Response:",error.response);
                    throw error;
                } else if (error.code) {
                    switch (error.code) {
                        case "ERR_NETWORK":
                            throw new Error("A network error occurred.");
                    }
                }
            } else {
                throw new Error(error.message);
            }
        }

        throw new Error(error as any);
    }
}

export const apiClient = new APIClient({});