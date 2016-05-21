System.register(['angular2/core', '../../component/login/login.component'], function(exports_1, context_1) {
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
    var core_1, login_component_1;
    var AddRetroComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }],
        execute: function() {
            AddRetroComponent = (function () {
                function AddRetroComponent(_dynamicComponentLoader, _elementRef) {
                    this._dynamicComponentLoader = _dynamicComponentLoader;
                    this._elementRef = _elementRef;
                    this.userExists = false;
                }
                AddRetroComponent.prototype.ngOnInit = function () {
                    this.renderUser();
                };
                AddRetroComponent.prototype.renderUser = function () {
                    this._dynamicComponentLoader.loadIntoLocation(login_component_1.LoginComponent, this._elementRef, 'login');
                };
                AddRetroComponent = __decorate([
                    core_1.Component({
                        selector: 'my-retro',
                        templateUrl: 'app/component/addRetro/html/addRetro.component.html',
                        styleUrls: ['app/component/addRetro/css/addRetro.component.css'],
                    }), 
                    __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.ElementRef])
                ], AddRetroComponent);
                return AddRetroComponent;
            }());
            exports_1("AddRetroComponent", AddRetroComponent);
        }
    }
});
//# sourceMappingURL=addRetro.component.js.map