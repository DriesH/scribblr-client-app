import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavBarProfileComponent } from './components/nav-bar/nav-bar-profile/nav-bar-profile.component';
import { UrlSanitizerPipe } from './pipes/url-sanitizer.pipe';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { RegistrationFormComponent } from './components/registration-page/registration-form/registration-form.component';
import { BodyMovinBackgroundComponent } from './components/body-movin-background/body-movin-background.component';

import { RegisterService } from './services/register.service';
import { HttpHelperService } from './services/http-helper.service';
import { JWTTokenService } from './services/jwttoken.service';

// import { StoreModule } from '@ngrx/store';

import { APP_ROUTES } from './_routes/app.routes';



@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        NavBarComponent,
        NavBarProfileComponent,
        UrlSanitizerPipe,
        RegistrationPageComponent,
        RegistrationFormComponent,
        BodyMovinBackgroundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        APP_ROUTES
        // StoreModule disabled for now.
    ],
    providers: [
        RegisterService,
        HttpHelperService,
        JWTTokenService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
