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
import { UrlSanitizerPipe } from './pipes/url-sanitizer.pipe';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { RegistrationFormComponent } from './components/registration-page/registration-form/registration-form.component';
import { BodyMovinBackgroundComponent } from './components/body-movin-background/body-movin-background.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginFormComponent } from './components/login-page/login-form/login-form.component';

/* Services */
import { RegisterService } from './services/register.service';
import { HttpHelperService } from './services/http-helper.service';
import { JWTTokenService } from './services/jwttoken.service';
import { AuthService } from './services/auth.service';

/* Guards */
import { AuthGuard } from './guards/auth.guard';

/* Reducers and effects */
import { CurrentUserReducer } from './ngrx-state/reducers/current-user.reducer';
import { CurrentUserEffect } from './ngrx-state/effects/current-user.effects';

/* Bodymovin' & Lottie module */
import { LottieAnimationViewModule } from 'lottie-angular2';
import { CapitalizePipe } from './pipes/capitalize.pipe';

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
        CapitalizePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        APP_ROUTES,
        StoreModule.provideStore({CURRENT_USER: CurrentUserReducer}),
        EffectsModule.runAfterBootstrap(CurrentUserEffect),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        LottieAnimationViewModule.forRoot()
    ],
    providers: [
        RegisterService,
        HttpHelperService,
        JWTTokenService,
        AuthService,
        AuthGuard
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
