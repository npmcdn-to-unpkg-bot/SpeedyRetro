import {Injectable} from 'angular2/core';
import {Comment} from '../entities/comment';
import {CentralHubService} from './centralHub.service';

export class CommentService extends CentralHubService {

    update(comment: Comment) {
        console.log('connection state: ' + this.centralHubConnection.state);
        //{ 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' }
        if (this.centralHubConnection.state === 1) {

            this.centralHub.invoke('send', comment.retroId, comment.message, comment.state, comment.id)
                .fail(function (error) {
                    console.log(error);
                });
        }
        else {
            throw Error('Connection is not estabished!');
        }
    }
}