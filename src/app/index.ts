import { HomeComponent } from './home';
import { PageNotFoundComponent, MbtaHttpClient } from './misc';
import { RouteListComponent } from './route';

export const COMPONENTS = [HomeComponent, PageNotFoundComponent, RouteListComponent];

export const PROVIDERS = [MbtaHttpClient];

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
        path: '**',
        component: PageNotFoundComponent
    }
];
