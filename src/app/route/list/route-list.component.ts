import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiClient, Route } from '../../api';
import { RouteType } from '../route-type.model';

@Component({
    selector: 'app-route-list',
    templateUrl: './route-list.component.html',
    styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {
    routes: Route[];

    private routeParams: string;

    constructor(private http: ApiClient, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.route.params.subscribe((routeParams: any) => {
            const routeType = routeParams.routeType;

            this.routeParams = routeType;

            this.http.getRoutes(routeType).subscribe({
                next: (response: any) => {
                    this.routes = response;
                },
                error: error => {
                    console.error(error);
                }
            });
        });
    }

    loadStops(route: Route) {
        this.router.navigateByUrl(`/route/${this.routeParams}/${route.id}`);
    }
}
