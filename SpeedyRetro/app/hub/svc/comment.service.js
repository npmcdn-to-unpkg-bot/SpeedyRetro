System.register(['angular2/core', './centralHub.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, centralHub_service_1;
    var CommentService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (centralHub_service_1_1) {
                centralHub_service_1 = centralHub_service_1_1;
            }],
        execute: function() {
            /// <reference path="../../../typings/jquery/jquery.d.ts" />
            /// <reference path="../../../typings/signalr/signalr.d.ts" />
            CommentService = (function (_super) {
                __extends(CommentService, _super);
                function CommentService() {
                    _super.apply(this, arguments);
                }
                CommentService.prototype.ngOnInit = function () {
                    this.startConnection();
                };
                //member call when comment has been dropped - i.e. 'dragend'
                CommentService.prototype.update = function (comment) {
                    console.log('connection state: ' + this.centralHubConnection.state);
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
                };
                CommentService.prototype.onStateChange = function (callback) {
                    if (this.centralHubConnection.state === 1) {
                        this.centralHub.on('onCommentStateChanged', function (userComment, commentState, commentId) {
                            callback(userComment, commentState, commentId);
                        });
                    }
                    else {
                        throw Error('Connection is not estabished!');
                    }
                };
                CommentService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CommentService);
                return CommentService;
            }(centralHub_service_1.CentralHubService));
            exports_1("CommentService", CommentService);
        }
    }
});
//# sourceMappingURL=comment.service.js.map