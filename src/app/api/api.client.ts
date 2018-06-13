import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { RouteType, ROUTE_DISPLAY_MAP } from '../route/route-type.model';
import { Route, Stop } from './api.interfaces';

const apiURL = ('http://localhost:5000/mbta-universal/us-central1' || 'https://us-central1-mbta-universal.cloudfunctions.net') + '/api';

@Injectable()
export class ApiClient {
    constructor(private http: HttpClient) {}

    getRoutes(routeType: string) {
        const mappedRoutes = ROUTE_DISPLAY_MAP[routeType];

        if (!mappedRoutes || !mappedRoutes.length) {
            console.log('Did not find a mapping for type ' + routeType);
        }

        return this.http.get(apiURL + '/routes').map((body: any) => {
            const routes = body as Route[];

            return routes.filter(route => {
                return mappedRoutes.indexOf(route.attributes.type) !== -1;
            });
        });
    }

    getRoute(routeId: string) {
        return this.http
            .get(apiURL + '/routes', {
                params: {
                    route: routeId
                }
            })
            .map((body: any) => {
                const routes = body as Route[];

                return routes;
            });
    }

    getStops(route: string) {
        return this.http
            .get(apiURL + '/stops', {
                params: {
                    route: route
                }
            })
            .map(body => {
                const stops = body as Stop[];

                return stops;
            });
    }

    getStopPredictions(request: { stopId: string; routeId: string }) {
        return this.http.get(apiURL + '/predictions', {
            params: request
        });
    }

    getTrips(...tripIds: string[]) {
        return this.http.get(apiURL + '/trips', {
            params: {
                trips: tripIds
            }
        });
    }
}
