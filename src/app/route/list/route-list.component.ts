import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MbtaHttpClient } from '../../misc/index';

@Component({
    selector: 'app-route-list',
    templateUrl: './route-list.component.html',
    styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {
    routes: string[];

    constructor(private http: MbtaHttpClient, private route: ActivatedRoute) {
        this.routes = ['test', 'test'];
    }

    ngOnInit(): void {
        this.http.get('routes').subscribe({
            next: response => {
                console.log(response);
            },
            error: error => {
                console.error(error);
            }
        });
    }
}
