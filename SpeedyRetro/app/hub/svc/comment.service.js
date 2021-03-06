System.register(['angular2/core', './centralHub.service'], function(exports_1, context_1) {
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
            //@Component({
            //    providers: [CentralHubService]
            //})
            CommentService = (function () {
                function CommentService(_centralHubService) {
                    this._centralHubService = _centralHubService;
                }
                CommentService.prototype.startConnection = function (retroId) {
                    this._centralHubService.startConnection(retroId);
                };
                CommentService.prototype.update = function (comment) {
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
                };
                CommentService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [centralHub_service_1.CentralHubService])
                ], CommentService);
                return CommentService;
            }());
            exports_1("CommentService", CommentService);
        }
    }
});
//# sourceMappingURL=comment.service.js.map