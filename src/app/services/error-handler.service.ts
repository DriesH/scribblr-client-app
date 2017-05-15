import { Injectable } from '@angular/core';

interface Error {
    success: Boolean;
    error_type: String;
    error_message: String;
    errors: Array<String>;
    old_input: any;
}

@Injectable()
export class ErrorHandlerService {

    constructor() { }

    handler(error: Error) {

    }


}
