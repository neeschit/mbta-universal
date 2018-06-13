import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ROUTE_DISPLAY_MAP } from '../route';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    title = 'Realtime MBTA tracker for the greater Boston area bus, subway and commuter rail';

    constructor(private meta: Meta, private router: Router) {
        this.meta.addTag({
            name: 'description',
            content: 'Realtime MBTA tracker for the greater Boston area bus, subway and commuter rail'
        });
        this.meta.addTag({ name: 'author', content: 'nischit.burnz@gmail.com' });
        this.meta.addTag({
            name: 'keywords',
            content: 'MBTA, Tracker, Boston, Bus, Subway, Commuter, Rail, Train, Tram'
        });
    }

    loadRouteType(routeType: string) {
        this.router.navigate(['/route/' + routeType]);
    }
}
