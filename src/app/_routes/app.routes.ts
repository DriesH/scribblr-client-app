// router module and routes.
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from '../components/home-page/home-page.component';
import { RegistrationPageComponent } from '../components/registration-page/registration-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { ApplicationRootComponent } from '../components/application/application-root/application-root.component';

import { ChildOverviewRootComponent } from '../components/application/child-overview-root/child-overview-root.component';
import { QuoteOverviewRootComponent } from '../components/application/quote-overview-root/quote-overview-root.component';
import { AchievementOverviewRootComponent } from '../components/application/achievement-overview-root/achievement-overview-root.component';
import { BookOverviewRootComponent } from '../components/application/book-overview-root/book-overview-root.component';

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
        // canActivate: [ AuthGuard ]

    },

    {
        path: 'application',
        component: ApplicationRootComponent,
        // canActivate: [ AuthGuard ],
        children: [
            {
                path: 'children',
                component: ChildOverviewRootComponent,
            },
            {
                path: 'achievement',
                component: AchievementOverviewRootComponent,
            },
            {
                path: 'scribbles',
                component: QuoteOverviewRootComponent,
            },
            {
                path: 'books',
                component: BookOverviewRootComponent,
            }
        ]
    },

    // {
    //     path: '**',
    //     redirectTo: 'home'
    // }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
