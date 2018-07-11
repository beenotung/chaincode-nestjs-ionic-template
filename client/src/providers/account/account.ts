import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config';

/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider {
  constructor (public http: HttpClient) {
    console.log('Hello AccountProvider Provider');
  }

  public create (data) {
    console.log('request post to server');
    return this.http.post(config.base_url + 'account/create', data);
    /*
    return fetch(config.base_url + "meta/create", {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      */
  }

  public signin (data) {}
}
