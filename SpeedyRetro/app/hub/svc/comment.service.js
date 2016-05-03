System.register(['./centralHub.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var centralHub_service_1;
    var CommentService;
    return {
        setters:[
            function (centralHub_service_1_1) {
                centralHub_service_1 = centralHub_service_1_1;
            }],
        execute: function() {
            CommentService = (function (_super) {
                __extends(CommentService, _super);
                function CommentService() {
                    _super.apply(this, arguments);
                }
                CommentService.prototype.update = function (comment) {
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
                };
                return CommentService;
            }(centralHub_service_1.CentralHubService));
            exports_1("CommentService", CommentService);
        }
    }
});
//# sourceMappingURL=comment.service.js.map