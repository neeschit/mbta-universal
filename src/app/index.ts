import { HomeComponent } from './home';
import { PageNotFoundComponent } from './misc';
import { RouteListComponent } from './route';

export const COMPONENTS = [HomeComponent, PageNotFoundComponent, RouteListComponent];

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
