import {Component, Injectable} from 'angular2/core';

import {Comment} from '../entities/comment';
import {CentralHubService} from './centralHub.service';

//@Component({
//    providers: [CentralHubService]
//})
@Injectable()
export class CommentService  {
    constructor(private _centralHubService: CentralHubService) {
    }

    startConnection(retroId: string) {
        this._centralHubService.startConnection(retroId);
    }

    update(comment: Comment) {
        console.log('connection state: ' + this._centralHubService.centralHubConnection.state);
        //{ 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' }
        if (this._centralHubService.centralHubConnection.state === 1) {

            this._centralHubService.centralHub.invoke('send', comment.retroId, comment.message, comment.state, comment.id)
                .fail(function (error) {
                    console.log(error);
                });
        }
        else {
            throw Error('Connection is not estabished!');
        }
    }
}