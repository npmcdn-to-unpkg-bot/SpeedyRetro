System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CentralHubService;
    return {
        setters:[],
        execute: function() {
            /// <reference path="../../../typings/jquery/jquery.d.ts" />
            /// <reference path="../../../typings/signalr/signalr.d.ts" />
            CentralHubService = (function () {
                function CentralHubService() {
                }
                //constructor() {
                //    //this.startConnection();
                //}
                CentralHubService.prototype.startConnection = function (retroId) {
                    this.centralHubConnection = jQuery.hubConnection();
                    this.centralHubConnection.error(function (error) {
                        console.log('signalR error: ' + error);
                    });
                    this.centralHubConnection.logging = true;
                    var centralHub = this.centralHub = this.centralHubConnection.createHubProxy('CentralHub');
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
                };
                return CentralHubService;
            }());
            exports_1("CentralHubService", CentralHubService);
        }
    }
});
//# sourceMappingURL=centralHub.service.js.map