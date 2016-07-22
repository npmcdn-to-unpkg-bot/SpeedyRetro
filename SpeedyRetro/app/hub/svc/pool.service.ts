import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Pool}  from '../entities/pool';

@Injectable()
export class PoolService {
    constructor(private _http: Http) { }

    get(id: Number): Observable<Pool> {

        var headers = new Headers();

        headers.append('Accept', 'application/json');

        var requestOptions = new RequestOptions({ 'headers': headers });

        return this._http.get('/pool/' + id, requestOptions)
            .map(this.checkResponse)
            .catch(this.handleError);
    }

    private checkResponse(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg); 
        return Observable.throw(errMsg);
    }
}