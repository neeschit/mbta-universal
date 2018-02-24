import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ROUTES, COMPONENTS } from './index';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';

@NgModule({
    declarations: [AppComponent, COMPONENTS],
    imports: [
        BrowserModule.withServerTransition({ appId: 'mbta-universal' }),
        ServiceWorkerModule.register('/ngsw-worker.js', {
            enabled: environment.production
        }),
        RouterModule.forRoot(ROUTES)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
