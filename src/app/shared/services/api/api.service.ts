import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import StringUtils from 'src/app/shared/utils/string.utils';

@Injectable()
export class APIService {

  constructor(private _http: HttpClient) {}

  get(url: string, headers?: any, params?: any, responseType?: any): Observable<any> {
    const options = {};
    url = StringUtils.removeBarrasDuplas(url);

    if (headers != null) { Object.assign(options, {headers: new HttpHeaders(headers)}); }
    if (params != null) { Object.assign(options, {params: params}); }
    if (responseType != null) { Object.assign(options, responseType); }

    return options ? this._http.get(url, options) : this._http.get(url);
  }

  put(url: string, body: any, headers?: any, params?: any): Observable<any> {
    const options = {};
    url = StringUtils.removeBarrasDuplas(url);

    if (headers != null) { Object.assign(options, {headers: new HttpHeaders(headers)}); }
    if (params != null) { Object.assign(options, {params: params}); }

    return options ? this._http.put(url, body, options) : this._http.put(url, body);
  }

  post(url: string, body: any, headers?: any, params?: any): Observable<any> {
    const options = {};
    url = StringUtils.removeBarrasDuplas(url);

    if (headers != null) { Object.assign(options, {headers: new HttpHeaders(headers)}); }
    if (params != null) { Object.assign(options, {params: params}); }

    return options ? this._http.post(url, body, options) : this._http.put(url, body);
  }

  patch(url: string, body: any, headers?: any, params?: any): Observable<any> {
    const options = {};
    url = StringUtils.removeBarrasDuplas(url);

    if (headers != null) { Object.assign(options, {headers: new HttpHeaders(headers)}); }
    if (params != null) { Object.assign(options, {params: params}); }

    return options ? this._http.patch(url, body, options) : this._http.put(url, body);
  }

  delete(url: string, headers?: any, params?: any): Observable<any> {
    const options = {};
    url = StringUtils.removeBarrasDuplas(url);

    if (headers != null) { Object.assign(options, {headers: new HttpHeaders(headers)}); }
    if (params != null) { Object.assign(options, {params: params}); }

    return options ? this._http.delete(url, options) : this._http.get(url);
  }

  multipleRequests(observables: Observable<any>[]): Observable<any[]> {
    return forkJoin(observables);
  }
}