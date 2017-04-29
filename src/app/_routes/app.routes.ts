// router module and routes.
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from '../components/home-page/home-page.component';
import { RegistrationPageComponent } from '../components/registration-page/registration-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { ApplicationRootComponent } from '../components/application/application-root/application-root.component';

import { AuthGuard } from '../guards/auth.guard';

const ROUTES: Routes = [
    // redirection route.
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: 'home',
        component: HomePageComponent
    },

    // registration route.
    {
        path: 'register',
        component: RegistrationPageComponent
        // TODO: add a route guard.
    },

    {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [ AuthGuard ]

    },

    {
        path: 'application',
        component: ApplicationRootComponent,
        canActivate: [ AuthGuard ]
    },

    {
        path: '**',
        redirectTo: 'home'
    }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
