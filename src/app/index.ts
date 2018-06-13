import { HomeComponent } from './home';
import { ApiClient } from './api/api.client';
import { PageNotFoundComponent } from './api/index';
import { RouteListComponent } from './route';
import { StopListComponent } from './route/stop/stop-list.component';
import { PredictionsListComponent } from './route/predictions/predictions-table.component';

export const COMPONENTS = [HomeComponent, PageNotFoundComponent, RouteListComponent, StopListComponent, PredictionsListComponent];

export const PROVIDERS = [ApiClient];

export const ROUTES = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'route/:routeType',
        component: RouteListComponent
    },
    {
        path: 'route/:routeType/:routeId',
        component: StopListComponent
    },
    {
        path: 'route/:routeId',
        component: StopListComponent
    },
    {
        path: 'route/:routeId/predictions/:stopId',
        component: PredictionsListComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
