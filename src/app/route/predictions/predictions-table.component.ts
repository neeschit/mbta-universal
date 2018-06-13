import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiClient, Route, Stop, RouteDirection } from '../../api';
import { RouteType } from '../route-type.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-predictions-table',
    templateUrl: './predictions-table.component.html',
    styleUrls: ['./predictions-table.component.scss']
})
export class PredictionsListComponent implements OnInit {
    stopId: string;
    routeId: string;
    directions: RouteDirectionPrediction[];
    constructor(private http: ApiClient, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.route.params.subscribe((routeParams: any) => {
            const stopId = routeParams.stopId;
            this.stopId = stopId;
            this.routeId = routeParams.routeId;

            return Observable.forkJoin(
                this.http.getStopPredictions({
                    routeId: this.routeId,
                    stopId: this.stopId,
                    include: 'trip'
                }),
                this.http.getRoute(this.routeId)
            )
                .switchMap((result: any[]) => {
                    const response = result[0];
                    const routes = result[1];
                    this.directions = routes[0].attributes.direction_names.map((direction, index) => {
                        return {
                            direction_name: direction,
                            direction_id: index
                        };
                    });

                    const tripIds = [];

                    response.map(predictionResult => {
                        const prediction = predictionResult.attributes;
                        const eta: number = prediction.departure_time || prediction.arrival_time;
                        const direction = prediction.direction_id;
                        const tripId = predictionResult.relationships.trip.data.id;

                        if (!direction && direction !== 0) {
                            return null;
                        }

                        if (eta) {
                            const timeLeftSeconds = (new Date(eta).getTime() - Date.now()) / 1000;

                            const minutes = Math.floor(timeLeftSeconds / 60);

                            const etaDescription = minutes <= 0 ? 'Departing Soon' : `In ${minutes} minute${minutes > 1 ? 's' : ''}`;

                            this.directions[direction].predictions = this.directions[direction].predictions || [];
                            this.directions[direction].predictions.push({
                                eta: etaDescription,
                                rawMillisEta: timeLeftSeconds,
                                destination: '',
                                tripId: tripId
                            });

                            tripIds.push(tripId);
                        }
                    });

                    return this.http.getTrips(...tripIds);
                })
                .subscribe({
                    next: (trips: any[]) => {
                        this.directions.map(direction => {
                            direction.predictions.map(prediction => {
                                const thisTrip = trips.find((trip: any) => {
                                    return trip.id === prediction.tripId;
                                });

                                prediction.destination = thisTrip.attributes.headsign;
                            });
                        });
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
    eta: string;
    rawMillisEta: number;
    destination: string;
    tripId: string;
}
