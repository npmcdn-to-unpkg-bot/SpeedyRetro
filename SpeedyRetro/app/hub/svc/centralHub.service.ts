import {Injectable}     from 'angular2/core';

/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/signalr/signalr.d.ts" />

@Injectable()
export class CentralHubService {
    protected jQuery: JQueryStatic;

    protected centralHub: SignalR.Hub.Proxy;

    protected centralHubConnection: SignalR.Hub.Connection;

    constructor() {
        this.startConnection();
    }

    protected startConnection() {
        this.centralHubConnection = jQuery.hubConnection();
        
        this.centralHubConnection.error(function (error) {
            console.log('signalR error: ' + error);
        });

        this.centralHubConnection.logging = true;

        let centralHub = this.centralHub = this.centralHubConnection.createHubProxy('CentralHub');
        
        this.centralHubConnection.start().done(function () {
            centralHub.invoke("JoinGroup", "New Group")
                .fail(function (error) {
                    console.log(error);
                });
        })
        .fail(function (error) {
            console.log(error);
        });
    }
}