import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AadHttpClient } from '@microsoft/sp-http';

export class FuncService {
    constructor(private context: WebPartContext) {

    }
    public async callAzureFunc(): Promise<object> {
        const url = 'https://mngenv626552-spoclassicfunc01.azurewebsites.net/api/ServiceFunc';

        const aadHttpClient = await this.context
            .aadHttpClientFactory
            .getClient('api://b26a8ccd-7785-4aa6-a7bb-12de1180e138');
        const response = await aadHttpClient.get(url, AadHttpClient.configurations.v1);

        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }

        const result = await response.json();
        return result;
    }
}