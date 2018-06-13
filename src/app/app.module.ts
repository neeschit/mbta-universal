import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ROUTES, COMPONENTS, PROVIDERS } from './index';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, ...COMPONENTS],
    imports: [
        HttpClientModule,
        BrowserModule.withServerTransition({ appId: 'mbta-universal' }),
        ServiceWorkerModule.register('/ngsw-worker.js', {
            enabled: environment.production
        }),
        RouterModule.forRoot(ROUTES)
    ],
    providers: [HttpClient, ...PROVIDERS],
    bootstrap: [AppComponent]
})
export class AppModule {}
