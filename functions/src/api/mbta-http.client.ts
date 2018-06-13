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

    async getRoutes(routeId: string) {
        return this._get('routes', {
            id: routeId
        });
    }

    async getStops(routeId: string) {
        return this._get('stops', {
            route: routeId
        });
    }

    async getPredictions(queryFilters: { stopId: string; routeId: string; include?: string }) {
        return this._get(
            'predictions',
            {
                stop: queryFilters.stopId,
                route: queryFilters.routeId,
                include: queryFilters.include
            },
            'departure_time,arrival_time'
        );
    }

    async getTrips(...tripIds: string[]) {
        return this._get('trips', {
            id: tripIds && tripIds.length && tripIds.join(',')
        });
    }

    private async _get(path: string, filter?: any, sort?: any) {
        const url = this.mbta.baseUrl + path;

        filter = filter || {};

        let filters = Object.keys(filter).reduce((queryString: string, key: string, index: number) => {
            if (!filter[key]) {
                return queryString;
            }
            if (!index) {
                queryString += '?';
            } else {
                queryString += '&';
            }

            queryString += 'filter[' + key + ']=' + filter[key];

            return queryString;
        }, '');

        if (sort) {
            const sortString = 'sort=' + sort;
            filters += filters.length ? '&' + sortString : sortString;
        }

        console.log(filters);

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
                        const json = JSON.parse(body);
                        resolve(json.data);
                    } catch (err) {
                        reject(err);
                    }
                }
            );
        });
    }
}
