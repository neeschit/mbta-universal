import * as request from 'request';

const baseURL = 'https://api-v3.mbta.com/';

export class MbtaHttpClient {
    mbta: {
        baseUrl: string;
        apiKey: string;
    };
    constructor() {
        this.mbta = {
            baseUrl: baseURL,
            apiKey: '1b78b7b3748c4487add7f79350e30723'
        };
    }

    async getRoutes() {
        return this._get('routes');
    }

    async getStops(routeId: string) {
        return this._get('stops', {
            route: routeId
        });
    }

    private async _get(path: string, filter?: any) {
        const url = this.mbta.baseUrl + path;

        filter = filter || {};

        const filters = Object.keys(filter).reduce((queryString: string, key: string, index: number) => {
            if (!index) {
                queryString += '?';
            } else {
                queryString += '&';
            }

            queryString += 'filter[' + key + ']=' + filter[key];

            return queryString;
        }, '');

        return new Promise((resolve, reject) => {
            request.get(
                url + filters,
                {
                    headers: {
                        'x-api-key': this.mbta.apiKey
                    }
                },
                (err: any, response: request.Response, body: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    try {
                        resolve(JSON.parse(body).data);
                    } catch (err) {
                        reject(err);
                    }
                }
            );
        });
    }
}
