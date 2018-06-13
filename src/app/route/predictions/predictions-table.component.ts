import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiClient, Route, Stop, RouteDirection } from '../../api';
import { RouteType } from '../route-type.model';

@Component({
    selector: 'app-predictions-table',
    templateUrl: './predictions-table.component.html',
    styleUrls: ['./predictions-table.component.scss']
})
export class PredictionsListComponent implements OnInit {
    stopId: string;
    routeId: string;
    directions: RouteDirectionPrediction[];
    predictions: { eta: number };
    constructor(private http: ApiClient, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.route.params.subscribe((routeParams: any) => {
            const stopId = routeParams.stopId;
            this.stopId = stopId;
            this.routeId = routeParams.routeId;

            this.http.getRoute(this.routeId).subscribe(routes => {
                this.directions = routes[0].attributes.direction_names.map((direction, index) => {
                    return {
                        direction_name: direction,
                        direction_id: index
                    };
                });
            });

            return this.http
                .getStopPredictions({
                    routeId: this.routeId,
                    stopId: this.stopId
                })
                .subscribe({
                    next: (response: any) => {
                        console.log(response);
                    },
                    error: error => {
                        console.error(error);
                    }
                });
        });
    }

    loadStopPredictions(stopId: string) {
        this.router.navigateByUrl(`/route/${this.routeId}/${stopId}`);
    }
}

export interface RouteDirectionPrediction extends RouteDirection {
    predictions?: RoutePrediction[];
}

export interface RoutePrediction {
    eta: number;
}
