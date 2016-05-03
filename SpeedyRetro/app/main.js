System.register(['angular2/http', 'angular2/router', 'angular2/platform/browser', 'rxjs/Rx', './component/_start/app.component', './hub/svc/comment.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1, router_1, browser_1, app_component_1, comment_service_1;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (_1) {},
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (comment_service_1_1) {
                comment_service_1 = comment_service_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [comment_service_1.CommentService, router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=main.js.map