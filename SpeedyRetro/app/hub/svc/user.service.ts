import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {User}  from '../entities/user';

@Injectable()
export class UserService {
    constructor(private _http: Http) { }

    add(user: User): Observable<Object> {

        var headers = new Headers();

        headers.append('Content-Type', 'application/json');

        var requestOptions = new RequestOptions({ 'headers': headers });

        return this._http.post('/adduser/', JSON.stringify(user), requestOptions)
            .map(this.checkResponse)
            .catch(this.handleError);
    }

    private checkResponse(res: Response) {
        if (res.status !== 200) {
            throw new Error('Bad response status: ' + res.status);
        }
        return {};
    }

    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg); 
        return Observable.throw(errMsg);
    }
}