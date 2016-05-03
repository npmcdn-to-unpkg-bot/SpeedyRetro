System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var CentralHubService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /// <reference path="../../../typings/jquery/jquery.d.ts" />
            /// <reference path="../../../typings/signalr/signalr.d.ts" />
            CentralHubService = (function () {
                function CentralHubService() {
                    this.startConnection();
                }
                CentralHubService.prototype.startConnection = function () {
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
                        //centralHub.invoke("JoinGroup", '35e45f1e-aca6-42f8-92ba-124290d13b3c')
                        //    .fail(function (error) {
                        //        console.log(error);
                        //    });
                        var retros = window.sessionStorage.getItem('sr_retros');
                        if (retros && Array.isArray(retros)) {
                            retros.forEach(function (retroId) {
                                centralHub.invoke("JoinGroup", retroId);
                            });
                        }
                    })
                        .fail(function (error) {
                        console.log(error);
                    });
                };
                CentralHubService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CentralHubService);
                return CentralHubService;
            }());
            exports_1("CentralHubService", CentralHubService);
        }
    }
});
//# sourceMappingURL=centralHub.service.js.map