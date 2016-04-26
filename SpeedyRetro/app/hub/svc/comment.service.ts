import {Injectable, OnInit} from 'angular2/core';
import {Comment} from '../entities/comment';
import {CentralHubService} from './centralHub.service';

/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/signalr/signalr.d.ts" />

//@Injectable()
export class CommentService extends CentralHubService implements OnInit {

    ngOnInit() {
        //this.startConnection();
    }

    //member call when comment has been dropped - i.e. 'dragend'
    update(comment: Comment) {
        console.log('connection state: ' + this.centralHubConnection.state);
        //{ 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' }
        if (this.centralHubConnection.state === 1) {
            //this._centralHub.invoke('send', '35e45f1e-aca6-42f8-92ba-124290d13b3c', 'comment', 'commentState', 'commentId')
            //    .fail(function (error) {
            //        console.log(error);
            //    });

            this.centralHub.invoke('send', comment.retroId, comment.message, comment.state, comment.id)
                .fail(function (error) {
                    console.log(error);
                });
        }
        else {
            throw Error('Connection is not estabished!');
        }
    }

    onStateChange(callback) {
        if (this.centralHubConnection.state === 2) {
            this.centralHub.on('onCommentStateChanged', function (userComment, commentState, commentId) {
                callback(userComment, commentState, commentId);
            });
        }
        else {
            throw Error('Connection is not estabished!');
        }

    }
}