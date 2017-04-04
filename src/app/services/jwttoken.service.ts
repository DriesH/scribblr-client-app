import { Injectable } from '@angular/core';

@Injectable()
export class JWTTokenService {

    constructor() { }

    public setToken(token): Promise<any> {
        localStorage.removeItem('_token');

        return new Promise((resolve, reject) => {
            localStorage.setItem('_token', token);

            if (localStorage.getItem('_token')) {
                console.log('Success in storing token.');
                resolve('success');
            } else {
                console.log('Error in storing token.');
                reject(Error);
            }
        });
    }

    public getToken(token): Promise<any> {
        return new Promise((resolve, reject) => {
            localStorage.getItem('_token');
        });
    }
}
