import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Retro}           from '../entities/retro';
/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/signalr/signalr.d.ts" />

@Injectable()
export class ClientHubService {
    jQuery: JQueryStatic;

    centralHub;

    constructor(private _http: Http) { }

    addRetro(): Observable<Retro> {
        this.startConnection();

        return this._http.get('/home/addretro')
            .map(this.extractData)
            .catch(this.handleError);
    }

    startConnection() {
        let connection = jQuery.hubConnection();

        connection.error(function (error) {
            console.log('signalR error: ' + error);
        });

        connection.logging = true;

        let centralHub = connection.createHubProxy('CentralHub');

        centralHub.on('onCommentStateChanged', function (userComment, commentState, commentId) {

            var blah = '';
        });

        connection.start().done(function () {
            centralHub.invoke('send', '35e45f1e-aca6-42f8-92ba-124290d13b3c', 'comment', 'commentState', 'commentId')
                .fail(function (error) {
                    console.log(error);
                });
            
            //centralHub.server.joinGroup(retroId);
            centralHub.invoke("JoinGroup", "New Group")
                .fail(function (error) {
                    console.log(error);
                });

        });
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