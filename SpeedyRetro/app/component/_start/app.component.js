System.register(['angular2/core', 'angular2/router', '../../component/board/board.component', '../../hub/svc/retro.service'], function(exports_1, context_1) {
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
    var core_1, router_1, board_component_1, retro_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (board_component_1_1) {
                board_component_1 = board_component_1_1;
            },
            function (retro_service_1_1) {
                retro_service_1 = retro_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_retroService, _router) {
                    this._retroService = _retroService;
                    this._router = _router;
                    this.retroExist = false;
                    //check for app Id in local storage
                }
                AppComponent.prototype.createRetro = function () {
                    var _this = this;
                    //first call returns after id is required
                    this._retroService.add()
                        .subscribe(function (retro) { return _this.retro = retro; }, function (error) { return _this.error = error; });
                    this._router.navigate(['Retros', { id: this.retro.id }]);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/component/_start/html/app.component.html',
                        styleUrls: ['app/component/_start/css/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [retro_service_1.RetroService]
                    }),
                    router_1.RouteConfig([
                        { path: '/retro/:id', name: 'Retros', component: board_component_1.BoardComponent }
                    ]), 
                    __metadata('design:paramtypes', [retro_service_1.RetroService, router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map