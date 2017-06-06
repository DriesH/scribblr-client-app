import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    CURRENT_USER;

    constructor(private _as: AuthService, private router: Router) { }

    private isAuth() {

        if (this._as.getUser()) { return true; }

        this.router.navigate(['home']);
        return false;
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isAuth();
    }
}
