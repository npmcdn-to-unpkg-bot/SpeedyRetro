System.register(['angular2/core', 'angular2/router', '../../hub/svc/user.service', '../../hub/entities/user'], function(exports_1, context_1) {
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
    var core_1, router_1, user_service_1, user_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_router, _routeParams, _userService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._userService = _userService;
                    this.user = new user_1.User();
                }
                LoginComponent.prototype.onClick = function () {
                    //var username = document.getElementById(this.login.id).nodeValue;
                    var _this = this;
                    //check session storage for temp retro ID
                    //if retro ID exists render login box and proceed
                    //if retro ID does not exits redirect to add retro page
                    //let retroId = document.cookie.replace(/(?:(?:^|.*;\s*)sr-temp-retroId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                    var retroId = this._routeParams.get('retroId');
                    if (retroId) {
                        this._userService.add({ 'name': this.user.name, 'retroId': retroId })
                            .subscribe(function (res) {
                            if (retroId) {
                                _this._router.navigate(['Route-Retro-Board', { 'retroId': retroId }]);
                            }
                        });
                    }
                    else {
                        this._router.navigate(['Route-Add-Retro']);
                    }
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'sr-login',
                        templateUrl: 'app/component/login/html/login.component.html',
                        styleUrls: ['app/component/login/css/login.component.css'],
                        providers: [user_service_1.UserService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, user_service_1.UserService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map