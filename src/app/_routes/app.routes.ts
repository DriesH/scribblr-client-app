// router module and routes.
// tslint:disable:max-line-length
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from '../components/home-page/home-page.component';
import { RegistrationPageComponent } from '../components/registration-page/registration-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { ApplicationRootComponent } from '../components/application/application-root/application-root.component';

import { UserRootComponent } from '../components/application/application-root/user-root/user-root.component';

// Application root components
import { QuoteOverviewRootComponent } from '../components/application/application-root/quote-overview-root/quote-overview-root.component';
import { AchievementOverviewRootComponent } from '../components/application/application-root/achievement-overview-root/achievement-overview-root.component';
import { BookOverviewRootComponent } from '../components/application/application-root/book-overview-root/book-overview-root.component';

// Quotes
import { NewMemoryComponent } from '../components/application/application-root/quote-overview-root/new-memory/new-memory.component';
import { NewQuoteComponent } from '../components/application/application-root/quote-overview-root/new-quote/new-quote.component';
import { PostModalComponent } from '../components/application/application-root/quote-overview-root/post-modal/post-modal.component';

// Book
import { NewBookComponent } from '../components/application/application-root/book-overview-root/new-book/new-book.component';
import { BookInspectorComponent } from '../components/application/application-root/book-overview-root/book-inspector/book-inspector.component';

// News
import { NewsOverviewRootComponent } from '../components/application/application-root/news-overview-root/news-overview-root.component';

// Guards
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
    },

    {
        path: 'application',
        component: ApplicationRootComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: 'user',
                component: UserRootComponent
            },
            {
                path: 'achievements',
                component: AchievementOverviewRootComponent,
            },
            {
                path: 'scribbles',
                component: QuoteOverviewRootComponent
            },
            {
                path: 'scribbles/:short_id_child',
                component: QuoteOverviewRootComponent,
                children: [
                    {
                        path: 'new-quote',
                        component: NewQuoteComponent
                    },
                    {
                        path: 'quote/:short_id_quote',
                        component: PostModalComponent
                    },
                    {
                        path: 'new-memory',
                        component: NewMemoryComponent
                    }
                ]
            },
            {
                path: 'news',
                component: NewsOverviewRootComponent
            },
            {
                path: 'books',
                component: BookOverviewRootComponent,
                children: [
                    {
                        path: 'new',
                        component: NewBookComponent
                    },
                    {
                        path: 'book/:short_id_book',
                        component: BookInspectorComponent
                    }
                ]
            }
        ]
    }
    // {
    //     path: '**',
    //     redirectTo: 'home'
    // }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
