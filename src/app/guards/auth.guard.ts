import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {

    CURRENT_USER;

    constructor(private store: Store<any> ) {  }

    private isAuth() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            this.CURRENT_USER = CURRENT_USER;
        });

        if (this.CURRENT_USER.isAuth) {
            return false;
        }

        return true;
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isAuth();
    }
}