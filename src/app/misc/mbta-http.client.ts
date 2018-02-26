import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class MbtaHttpClient {
    mbta: {
        baseUrl: string;
        apiKey: string;
    };
    constructor(private http: HttpClient) {}

    private configure() {
        return this.http.get('assets/apiConfig.json').do((config: any) => {
            // do stuff with the config
            this.mbta = config;
        });
    }

    get(path: string) {
        if (!this.mbta) {
            return this.configure().switchMap(() => {
                return this._get(path);
            });
        }

        return this._get(path);
    }

    private _get(path: string) {
        const url = this.mbta.baseUrl + path;

        console.log(url);

        return this.http.get(url, {
            headers: {
                'x-api-key': this.mbta.apiKey
            }
        });
    }
}
