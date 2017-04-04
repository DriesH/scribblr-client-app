import { Injectable } from '@angular/core';

@Injectable()
export class JWTTokenService {

    constructor() { }

    public storeToken(token): Promise<any> {
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
}
