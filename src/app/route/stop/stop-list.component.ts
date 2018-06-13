import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiClient, Route, Stop } from '../../api';
import { RouteType } from '../route-type.model';

@Component({
    selector: 'app-stop-list',
    templateUrl: './stop-list.component.html',
    styleUrls: ['./stop-list.component.scss']
})
export class StopListComponent implements OnInit {
    stops: Stop[];
    routeId: string;
    constructor(private http: ApiClient, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.route.params.subscribe((routeParams: any) => {
            const routeId = routeParams.routeId;
            this.routeId = routeId;

            return this.http.getStops(routeId).subscribe({
                next: (response: any) => {
                    this.stops = response;
                },
                error: error => {
                    console.error(error);
                }
            });
        });
    }

    loadStopPredictions(stopId: string) {
        this.router.navigateByUrl(`/route/${this.routeId}/predictions/${stopId}`);
    }
}
