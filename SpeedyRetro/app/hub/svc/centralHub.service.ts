import {Component, Injectable}     from 'angular2/core';

/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/signalr/signalr.d.ts" />

@Injectable()
export class CentralHubService {
    protected jQuery: JQueryStatic;

    public centralHub: SignalR.Hub.Proxy;

    public centralHubConnection: SignalR.Hub.Connection;

    //constructor() {
    //    //this.startConnection();
    //}

    public startConnection(retroId) {
        this.centralHubConnection = jQuery.hubConnection();
        
        this.centralHubConnection.error(function (error) {
            console.log('signalR error: ' + error);
        });

        this.centralHubConnection.logging = true;

        let centralHub = this.centralHub = this.centralHubConnection.createHubProxy('CentralHub');

        this.centralHub.on('onCommentStateChanged', function (userComment, commentState, commentId) {
            var comment = document.getElementById(commentId);
            console.log('Comment: ' + userComment);

            if (!comment) {
                comment = document.createElement('textarea');
            }

            comment.id = commentId;

            comment.innerText = userComment;

            comment.setAttribute('readonly', 'true');

            var $td = jQuery('td[data-commentState="' + commentState + '"]');

            $td.children('div').append(comment);
        });

        this.centralHubConnection.start().done(function () {
            //let retroId = this._routeParams.get('retroId');

            centralHub.invoke('JoinGroup', retroId);
        })
        .fail(function (error) {
            console.log(error);
        });
    }
}