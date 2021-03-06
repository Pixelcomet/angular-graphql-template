import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    constructor() {}

    /**
     * @param {any} obj
     *
     * removes the quotes from properties and gets rid of some properties, that
     * are never needed in a modification */
    toGraphql = obj =>
        JSON.stringify(obj)
            // remove the "" from every first in line element
            .replace(/\"([^(\")"]+)\":/g, '$1:')
            // remove the __typename property that is generated by apollo
            .replace(/__typename:"[\w]*"/g, '');
}
