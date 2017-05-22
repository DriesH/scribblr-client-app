/* Angular 2 stuffs */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/* Other modules */
import { FileUploadModule } from 'ng2-file-upload';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ImageCropperModule } from 'ng2-img-cropper';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CustomFormsModule } from 'ng2-validation'

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

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
import { DropUploadComponent } from './components/application/application-root/quote-overview-root/drop-upload/drop-upload.component';
import { SideBarComponent } from './components/application/application-root/side-bar/side-bar.component';
import { ChildrenOverviewRootComponent } from './components/application/application-root/children-overview-root/children-overview-root.component';
import { NewChildComponent } from './components/application/application-root/children-overview-root/new-child/new-child.component';
import { NewsOverviewRootComponent } from './components/application/application-root/news-overview-root/news-overview-root.component';
import { NewQuoteComponent } from './components/application/application-root/quote-overview-root/new-quote/new-quote.component';
import { QuoteModalComponent } from './components/application/application-root/quote-overview-root/quote-modal/quote-modal.component';

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
import { AchievementService } from './services/application-services/achievement.service';
import { AchievementUnlockableService } from './services/achievement-unlockable.service';

/* Guards */
import { AuthGuard } from './guards/auth.guard';

/* Pipes */
import { UrlSanitizerPipe } from './pipes/url-sanitizer.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ChildAgePipe } from './pipes/child-age.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';

/* Reducers and effects */
import { CurrentUserReducer } from './ngrx-state/reducers/current-user.reducer';
import { CurrentUserEffect } from './ngrx-state/effects/current-user.effects';

import { ChildReducer } from './ngrx-state/reducers/child.reducer';
import { ChildEffect } from './ngrx-state/effects/child.effects';

import { ApplicationUIReducer } from './ngrx-state/reducers/application-ui.reducer';

import { QuoteReducer } from './ngrx-state/reducers/quote.reducer';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    minScrollbarLength: 150,    // Minimum size for the scrollbar (Default: null).
    maxScrollbarLength: 150,
    wheelPropagation: false,
    swipePropagation: true
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
        LoginPageComponent,
        LoginFormComponent,
        CapitalizePipe,
        ApplicationRootComponent,
        QuoteOverviewRootComponent,
        AchievementOverviewRootComponent,
        BookOverviewRootComponent,
        QuoteComponent,
        AchievementComponent,
        ChildAgePipe,
        DropUploadComponent,
        SideBarComponent,
        ChildrenOverviewRootComponent,
        NewChildComponent,
        NewsOverviewRootComponent,
        FormErrorComponent,
        NewQuoteComponent,
        QuoteModalComponent,
        EllipsisPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CustomFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        FileUploadModule,
        ImageCropperModule,
        LazyLoadImageModule,
        APP_ROUTES,
        StoreModule.provideStore({
            CURRENT_USER: CurrentUserReducer,
            CURRENT_CHILDREN: ChildReducer,
            APPLICATION_UI: ApplicationUIReducer,
            QUOTES: QuoteReducer
        }),
        EffectsModule.runAfterBootstrap(CurrentUserEffect),
        EffectsModule.runAfterBootstrap(ChildEffect),
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        SimpleNotificationsModule.forRoot()
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
        ErrorHandlerService,
        AchievementService,
        AchievementUnlockableService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
