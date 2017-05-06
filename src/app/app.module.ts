/* Angular 2 stuffs */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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

/* Application components */
import { ApplicationRootComponent } from './components/application/application-root/application-root.component';
import { AppNavigationComponent } from './components/application/application-root/app-navigation/app-navigation.component';
import { ChildOverviewRootComponent } from './components/application/application-root/child-overview-root/child-overview-root.component';
import { QuoteOverviewRootComponent } from './components/application/application-root/quote-overview-root/quote-overview-root.component';
import { AchievementOverviewRootComponent } from './components/application/application-root/achievement-overview-root/achievement-overview-root.component';
import { BookOverviewRootComponent } from './components/application/application-root/book-overview-root/book-overview-root.component';
import { ChildComponent } from './components/application/application-root/child-overview-root/child/child.component';
import { QuoteComponent } from './components/application/application-root/quote-overview-root/quote/quote.component';
import { AchievementComponent } from './components/application/application-root/achievement-overview-root/achievement/achievement.component';
import { ChildNavigationComponent } from './components/application/application-root/quote-overview-root/child-navigation/child-navigation.component';
import { QuoteContainerComponent } from './components/application/application-root/quote-overview-root/quote-container/quote-container.component';

/* Services */
import { RegisterService } from './services/register.service';
import { HttpHelperService } from './services/http-helper.service';
import { JWTTokenService } from './services/jwttoken.service';
import { AuthService } from './services/auth.service';
import { HttpHeaderService } from './services/http-header.service';

/* Application services */
import { ChildService } from './services/application-services/child.service';
import { QuoteService } from './services/application-services/quote.service';

/* Guards */
import { AuthGuard } from './guards/auth.guard';

/* Pipes */
import { UrlSanitizerPipe } from './pipes/url-sanitizer.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';

/* Reducers and effects */
import { CurrentUserReducer } from './ngrx-state/reducers/current-user.reducer';
import { CurrentUserEffect } from './ngrx-state/effects/current-user.effects';

import { ChildReducer } from './ngrx-state/reducers/child.reducer';
import { ChildEffect } from './ngrx-state/effects/child.effects';

/* Bodymovin' & Lottie module */
import { LottieAnimationViewModule } from 'lottie-angular2';
import { ChildAddModalComponent } from './components/application/application-root/child-overview-root/child-add-modal/child-add-modal.component';

/* DROPZONE */
import { DropzoneModule } from 'angular2-dropzone-wrapper';
import { DropzoneConfigInterface } from 'angular2-dropzone-wrapper';
const DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  server: 'https://www.google.com',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  createImageThumbnails: false,
  uploadMultiple: false,
  clickable : true,
  maxFiles: 1,
  autoProcessQueue: false,
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
        AppNavigationComponent,
        ChildOverviewRootComponent,
        QuoteOverviewRootComponent,
        AchievementOverviewRootComponent,
        BookOverviewRootComponent,
        ChildComponent,
        QuoteComponent,
        AchievementComponent,
        ChildNavigationComponent,
        QuoteContainerComponent,
        ChildAddModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        APP_ROUTES,
        StoreModule.provideStore({ CURRENT_USER: CurrentUserReducer, CURRENT_CHILDREN: ChildReducer }),
        EffectsModule.runAfterBootstrap(CurrentUserEffect),
        EffectsModule.runAfterBootstrap(ChildEffect),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        LottieAnimationViewModule.forRoot(),
        DropzoneModule.forRoot(DROPZONE_CONFIG),
    ],
    providers: [
        RegisterService,
        HttpHelperService,
        JWTTokenService,
        AuthService,
        AuthGuard,
        ChildService,
        QuoteService,
        HttpHeaderService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
