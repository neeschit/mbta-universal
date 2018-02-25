import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    template: `
        <section class="hero is-info">
            <div class="hero-body">
                <div class="container">
                    <p class="title">Realtime tracking for the MBTA Bus, Subway and Commuter Rail public transports</p>
                </div>
            </div>
        </section>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    title = 'Realtime MBTA tracker for the greater Boston area bus, subway and commuter rail';

    constructor(private meta: Meta) {
        this.meta.addTag({
            name: 'description',
            content: 'Realtime MBTA tracker for the greater Boston area bus, subway and commuter rail'
        });
        this.meta.addTag({ name: 'author', content: 'nischit.burnz@gmail.com' });
        this.meta.addTag({
            name: 'keywords',
            content: 'MBTA, Tracker, Boston, Bus, Subway, Commuter, Rail'
        });
    }
}
