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
import { HomeDashboardRootComponent } from '../components/application/application-root/home-dashboard-root/home-dashboard-root.component';

// Quotes
import { NewStoryComponent } from '../components/application/application-root/quote-overview-root/new-story/new-story.component';
import { NewQuoteComponent } from '../components/application/application-root/quote-overview-root/new-quote/new-quote.component';
import { EditQuoteComponent } from '../components/application/application-root/quote-overview-root/edit-quote/edit-quote.component';
import { EditStoryComponent } from '../components/application/application-root/quote-overview-root/edit-story/edit-story.component';

// Child
import { EditChildComponent } from '../components/application/application-root/children-overview-root/edit-child/edit-child.component';

// Book
import { NewBookComponent } from '../components/application/application-root/book-overview-root/new-book/new-book.component';
import { BookInspectorComponent } from '../components/application/application-root/book-overview-root/book-inspector/book-inspector.component';
import { FlipBookInspectorComponent } from '../components/application/application-root/book-overview-root/flip-book-inspector/flip-book-inspector.component';

// News
import { NewsOverviewRootComponent } from '../components/application/application-root/news-overview-root/news-overview-root.component';
import { NewsDetailComponent } from '../components/application/application-root/news-overview-root/news-detail/news-detail.component';

// Checkout
import { CheckOutRootComponent } from '../components/application//application-root/check-out-root/check-out-root.component';

// Guards
import { AuthGuard } from '../guards/auth.guard';
import { IsLoggedInGuard } from '../guards/is-logged-in.guard';



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
        component: RegistrationPageComponent,
        canActivate: [IsLoggedInGuard]
    },

    // login route.
    {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [IsLoggedInGuard]
    },

    {
        path: 'checkout',
        component: CheckOutRootComponent
    },

    {
        path: 'application', redirectTo: 'application/home', pathMatch: 'full'
    },

    {
        path: 'application',
        component: ApplicationRootComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: 'home',
                component: HomeDashboardRootComponent
            },
            {
                path: 'user',
                component: UserRootComponent
            },
            {
                path: 'achievements',
                component: AchievementOverviewRootComponent,
            },
            {
                path: 'overview',
                component: QuoteOverviewRootComponent
            },
            {
                path: 'overview/:short_id_child',
                component: QuoteOverviewRootComponent,
                children: [
                    {
                        path: 'new-quote',
                        component: NewQuoteComponent
                    },
                    {
                        path: 'quote/:short_id_quote',
                        component: EditQuoteComponent
                    },
                    {
                        path: 'story/:short_id_story',
                        component: EditStoryComponent
                    },
                    {
                        path: 'new-story',
                        component: NewStoryComponent
                    },
                    {
                        path: 'edit-child',
                        component: EditChildComponent
                    }
                ]
            },
            {
                path: 'news',
                component: NewsOverviewRootComponent,
                children: [
                    {
                        path: 'article/:news_title',
                        component: NewsDetailComponent
                    }
                ]
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
                    },
                    {
                        path: 'flip-book/:short_id_book',
                        component: FlipBookInspectorComponent
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
