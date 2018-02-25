import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-route-list',
    templateUrl: './route-list.component.html',
    styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent {
    routes: string[];

    constructor() {
        this.routes = ['test', 'test'];
    }
}
