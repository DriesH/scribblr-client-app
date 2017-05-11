// router module and routes.
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from '../components/home-page/home-page.component';
import { RegistrationPageComponent } from '../components/registration-page/registration-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { ApplicationRootComponent } from '../components/application/application-root/application-root.component';

// Application root components
import { QuoteOverviewRootComponent } from '../components/application/application-root/quote-overview-root/quote-overview-root.component';
// tslint:disable-next-line:max-line-length
import { AchievementOverviewRootComponent } from '../components/application/application-root/achievement-overview-root/achievement-overview-root.component';
import { BookOverviewRootComponent } from '../components/application/application-root/book-overview-root/book-overview-root.component';

// Quote root component children
// tslint:disable-next-line:max-line-length
import { QuoteContainerComponent } from '../components/application/application-root/quote-overview-root/quote-container/quote-container.component';

// Quote root component children
import { ChildrenOverviewRootComponent } from '../components/application/application-root/children-overview-root/children-overview-root.component';
import { NewChildComponent } from '../components/application/application-root/children-overview-root/new-child/new-child.component';


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
                path: 'achievement',
                component: AchievementOverviewRootComponent,
            },
            {
                path: 'scribbles',
                component: QuoteOverviewRootComponent,
                children: [
                    {
                        path: ':shortId',
                        component: QuoteContainerComponent
                    }
                ]
            },
            {
                path: 'books',
                component: BookOverviewRootComponent,
            }
        ]
    }
    // {
    //     path: '**',
    //     redirectTo: 'home'
    // }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
