import {Component, Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import {Comment} from '../entities/comment';
import {CentralHubService} from './centralHub.service';


@Injectable()
export class CommentService {
    constructor(private _http: Http,
        private _centralHubService: CentralHubService) {
    }

    startConnection(retroId: string) {
        this._centralHubService.startConnection(retroId);
    }

    getCommentId(retroId: string): Observable<Comment> {
        //comment is added at creation time hence no need for a model
        return this._http.get('/commentid/' + retroId)
            .map(this.extractData)
            .catch(this.handleError);
    }

    update(comment: Comment) {
        console.log('connection state: ' + this._centralHubService.centralHubConnection.state);
        //{ 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' }
        if (this._centralHubService.centralHubConnection.state === 1) {
            console.log(comment);
            this._centralHubService.centralHub.invoke('send', comment.retroId, comment.message, comment.state, comment.id)
                .fail(function (error) {
                    console.log(error);
                });
        }
        else {
            throw Error('Connection is not estabished!');
        }
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}