/* Angular 2 stuffs */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/* Other modules */
import { FileUploadModule } from 'ng2-file-upload';

/* ngrx stuffs */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

/* Routes */
import { APP_ROUTES } from './_routes/app.routes';

/* Components */
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavBarProfileComponent } from './components/nav-bar/nav-bar-profile/nav-bar-profile.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { RegistrationFormComponent } from './components/registration-page/registration-form/registration-form.component';
import { BodyMovinBackgroundComponent } from './components/body-movin-background/body-movin-background.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginFormComponent } from './components/login-page/login-form/login-form.component';
import { FormErrorComponent } from './components/form-error/form-error.component';

/* Application components */
import { ApplicationRootComponent } from './components/application/application-root/application-root.component';
import { QuoteOverviewRootComponent } from './components/application/application-root/quote-overview-root/quote-overview-root.component';
import { AchievementOverviewRootComponent } from './components/application/application-root/achievement-overview-root/achievement-overview-root.component';
import { BookOverviewRootComponent } from './components/application/application-root/book-overview-root/book-overview-root.component';
import { QuoteComponent } from './components/application/application-root/quote-overview-root/quote/quote.component';
import { AchievementComponent } from './components/application/application-root/achievement-overview-root/achievement/achievement.component';
import { ChildNavigationComponent } from './components/application/application-root/quote-overview-root/child-navigation/child-navigation.component';
import { QuoteContainerComponent } from './components/application/application-root/quote-overview-root/quote-container/quote-container.component';
import { DropUploadComponent } from './components/application/application-root/quote-overview-root/drop-upload/drop-upload.component';
import { SideBarComponent } from './components/application/application-root/side-bar/side-bar.component';
import { ChildrenOverviewRootComponent } from './components/application/application-root/children-overview-root/children-overview-root.component';
import { NewChildComponent } from './components/application/application-root/children-overview-root/new-child/new-child.component';
import { NewsOverviewRootComponent } from './components/application/application-root/news-overview-root/news-overview-root.component';

/* Services */
import { RegisterService } from './services/register.service';
import { HttpHelperService } from './services/http-helper.service';
import { JWTTokenService } from './services/jwttoken.service';
import { AuthService } from './services/auth.service';
import { HttpHeaderService } from './services/http-header.service';
import { ErrorHandlerService } from './services/error-handler.service';

/* Application services */
import { ChildService } from './services/application-services/child.service';
import { QuoteService } from './services/application-services/quote.service';

/* Guards */
import { AuthGuard } from './guards/auth.guard';

/* Pipes */
import { UrlSanitizerPipe } from './pipes/url-sanitizer.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ChildAgePipe } from './pipes/child-age.pipe';

/* Reducers and effects */
import { CurrentUserReducer } from './ngrx-state/reducers/current-user.reducer';
import { CurrentUserEffect } from './ngrx-state/effects/current-user.effects';

import { ChildReducer } from './ngrx-state/reducers/child.reducer';
import { ChildEffect } from './ngrx-state/effects/child.effects';

import { ApplicationUIReducer } from './ngrx-state/reducers/application-ui.reducer';

/* Bodymovin' & Lottie module */
import { LottieAnimationViewModule } from 'lottie-angular2';

import { ImageCropperComponent } from 'ng2-img-cropper';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    minScrollbarLength: 150,    // Minimum size for the scrollbar (Default: null).
    maxScrollbarLength: 150,
    wheelPropagation: false,
    swipePropagation: false
};

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        NavBarComponent,
        NavBarProfileComponent,
        UrlSanitizerPipe,
        RegistrationPageComponent,
        RegistrationFormComponent,
        BodyMovinBackgroundComponent,
        LoginPageComponent,
        LoginFormComponent,
        CapitalizePipe,
        ApplicationRootComponent,
        QuoteOverviewRootComponent,
        AchievementOverviewRootComponent,
        BookOverviewRootComponent,
        QuoteComponent,
        ChildNavigationComponent,
        AchievementComponent,
        QuoteContainerComponent,
        ChildAgePipe,
        DropUploadComponent,
        SideBarComponent,
        ChildrenOverviewRootComponent,
        NewChildComponent,
        ImageCropperComponent,
        NewsOverviewRootComponent,
        FormErrorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        FileUploadModule,
        APP_ROUTES,
        StoreModule.provideStore({
            CURRENT_USER: CurrentUserReducer,
            CURRENT_CHILDREN: ChildReducer,
            APPLICATION_UI: ApplicationUIReducer
        }),
        EffectsModule.runAfterBootstrap(CurrentUserEffect),
        EffectsModule.runAfterBootstrap(ChildEffect),
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        LottieAnimationViewModule.forRoot(),
    ],
    providers: [
        RegisterService,
        HttpHelperService,
        JWTTokenService,
        AuthService,
        AuthGuard,
        ChildService,
        QuoteService,
        HttpHeaderService,
        ErrorHandlerService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
