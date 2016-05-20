System.register(['angular2/core', 'angular2/router', 'rxjs/Rx', '../comment/comment.component'], function(exports_1, context_1) {
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
    var core_1, router_1, Rx_1, comment_component_1;
    var BoardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (comment_component_1_1) {
                comment_component_1 = comment_component_1_1;
            }],
        execute: function() {
            BoardComponent = (function () {
                function BoardComponent(_routeParams, _dynamicComponentLoader, _elementRef) {
                    this._routeParams = _routeParams;
                    this._dynamicComponentLoader = _dynamicComponentLoader;
                    this._elementRef = _elementRef;
                    this.lanes = [{ 'name': 'Good :)', 'state': 'good' },
                        { 'name': 'Bad :(', 'state': 'bad' },
                        { 'name': 'Action Points !', 'state': 'action' }];
                    this.subject = new Rx_1.Subject();
                }
                BoardComponent.prototype.ngOnInit = function () {
                    var retroId = this._routeParams.get('retroId');
                    if (retroId) {
                    }
                    else {
                    }
                    this.renderComment();
                };
                BoardComponent.prototype.addComment = function () {
                    this.renderComment();
                };
                BoardComponent.prototype.onCommentDropped = function (event) {
                    var ev = event;
                    ev.preventDefault();
                    var data = ev.dataTransfer.getData('plain/text');
                    var obj = JSON.parse(data);
                    ev.target.appendChild(document.getElementById(obj.id));
                };
                BoardComponent.prototype.onCommentDragOver = function (event) {
                    var ev = event;
                    ev.preventDefault();
                };
                BoardComponent.prototype.renderComment = function () {
                    var _this = this;
                    this._dynamicComponentLoader.loadIntoLocation(comment_component_1.CommentComponent, this._elementRef, 'comment')
                        .then(function (compRef) { return _this.subject.subscribe(compRef.instance); });
                };
                BoardComponent = __decorate([
                    core_1.Component({
                        selector: 'sr-board',
                        templateUrl: 'app/component/board/html/board.component.html',
                        styleUrls: ['app/component/board/css/board.component.css'],
                        directives: [comment_component_1.CommentComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, core_1.DynamicComponentLoader, core_1.ElementRef])
                ], BoardComponent);
                return BoardComponent;
            }());
            exports_1("BoardComponent", BoardComponent);
        }
    }
});
//# sourceMappingURL=board.component.js.map