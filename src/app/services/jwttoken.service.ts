import { Injectable } from '@angular/core';

@Injectable()
export class JWTTokenService {

    constructor() { }

    public setToken(token): Promise<any> {
        localStorage.removeItem('_token');
        localStorage.setItem('_token', token);

        return new Promise((resolve, reject) => {
            if (localStorage.getItem('_token')) {
                // console.log('Success storing token.');
                resolve('success');
            } else {
                // console.log('Error storing token.');
                reject(Error);
            }
        });
    }

    public getToken(): Promise<any> {
        let _token = localStorage.getItem('_token');

        return new Promise((resolve, reject) => {
            if (_token) {
                // console.log('Success getting token.');
                resolve(_token);
            } else {
                // console.log('Error getting token.');
                reject(Error);
            }
        });
    }
}
