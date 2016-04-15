System.register(['angular2/core', 'angular2/router', './board/board.component', './client-hub.service'], function(exports_1, context_1) {
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
    var core_1, router_1, board_component_1, client_hub_service_1, router_2;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (board_component_1_1) {
                board_component_1 = board_component_1_1;
            },
            function (client_hub_service_1_1) {
                client_hub_service_1 = client_hub_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_clientHub, _router) {
                    this._clientHub = _clientHub;
                    this._router = _router;
                    //check for app Id in local storage
                }
                AppComponent.prototype.createRetro = function () {
                    var _this = this;
                    //first call returns after id is required
                    this._clientHub.addRetro()
                        .subscribe(function (retro) { return _this.retro = retro; }, function (error) { return _this.error = error; });
                    this._router.navigate(['Retros', { id: this.retro.id }]);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <h1>Create a Retro!</h1>\n    <nav>\n      <input type=\"text\" name=\"txt_retroname\" placeholder=\"retro\"/>\n      <input type=\"text\" name=\"txt_username\" placeholder=\"username\"/>\n      <a (click)=\"createRetro()\">create</a>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
                        styleUrls: ['app/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [client_hub_service_1.ClientHubService]
                    }),
                    router_1.RouteConfig([
                        { path: '/retro/:id', name: 'Retros', component: board_component_1.BoardComponent }
                    ]), 
                    __metadata('design:paramtypes', [client_hub_service_1.ClientHubService, router_2.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map