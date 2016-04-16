System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var RetroComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            RetroComponent = (function () {
                function RetroComponent(_routeParams) {
                    this._routeParams = _routeParams;
                }
                RetroComponent.prototype.ngOnInit = function () {
                    //call service
                    var id = +this._routeParams.get('id');
                    console.log('Hello ID: ' + id);
                };
                RetroComponent.prototype.addComment = function () {
                    var rand = Math.random();
                    var userId = 'chicken';
                    var commentId = userId + '_' + rand;
                    var commentMarkup = '<textarea id="' + commentId + '" class="draggable" draggable="true" ondragstart="setData(event);" width="336" height="69"></textarea>';
                    //$('#start').append(commentMarkup);
                };
                RetroComponent.prototype.onCommentDropped = function (event) {
                    //var ev = event.originalEvent;
                    var ev = event;
                    ev.preventDefault();
                    var data = ev.dataTransfer.getData("plain/text");
                    var obj = JSON.parse(data);
                    ev.target.appendChild(document.getElementById(obj.id));
                };
                RetroComponent.prototype.onCommentDragStart = function (event) {
                    //var ev = event.originalEvent;
                    var id = event.target.id;
                    var data = { "id": id };
                    event.dataTransfer.setData("plain/text", JSON.stringify(data));
                };
                RetroComponent.prototype.onCommentDragOver = function (event) {
                    //var ev = event.originalEvent;
                    var ev = event;
                    ev.preventDefault();
                };
                RetroComponent = __decorate([
                    core_1.Component({
                        selector: 'my-retro',
                        templateUrl: 'app/html/retro.component.html',
                        styleUrls: ['app/css/retro.component.css'],
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], RetroComponent);
                return RetroComponent;
            }());
            exports_1("RetroComponent", RetroComponent);
        }
    }
});
//# sourceMappingURL=retro.component.js.map