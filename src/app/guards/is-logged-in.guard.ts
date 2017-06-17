import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {

    constructor(private _as: AuthService, private router: Router) {

    }

    private isAuth() {
        if (this._as.getUser()) {
            this.router.navigate(['home']);
            return false;
        }

        return true;
    }


    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isAuth();
    }
}
