System.register(['angular2/core', './hero-detail.component'], function(exports_1, context_1) {
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
    var core_1, hero_detail_component_1;
    var HeroesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hero_detail_component_1_1) {
                hero_detail_component_1 = hero_detail_component_1_1;
            }],
        execute: function() {
            HeroesComponent = (function () {
                function HeroesComponent() {
                }
                //heroes: Hero[];
                //selectedHero: Hero;
                //constructor(private _heroService: HeroService, private _router: Router) { }
                //getHeroes() {
                //  this._heroService.getHeroes().then(heroes => this.heroes = heroes);
                //}
                //gotoDetail() {
                //  this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
                //}
                //ngOnInit() {
                //  this.getHeroes();
                //}
                //onSelect(hero: Hero) { this.selectedHero = hero; }
                HeroesComponent.prototype.ngOnInit = function () {
                    //call service
                };
                HeroesComponent.prototype.addComment = function () {
                    var rand = Math.random();
                    var userId = 'chicken';
                    var commentId = userId + '_' + rand;
                    var commentMarkup = '<textarea id="' + commentId + '" class="draggable" draggable="true" ondragstart="setData(event);" width="336" height="69"></textarea>';
                    //$('#start').append(commentMarkup);
                };
                HeroesComponent.prototype.onCommentDropped = function (event) {
                    //var ev = event.originalEvent;
                    var ev = event;
                    ev.preventDefault();
                    var data = ev.dataTransfer.getData("plain/text");
                    var obj = JSON.parse(data);
                    ev.target.appendChild(document.getElementById(obj.id));
                };
                HeroesComponent.prototype.onCommentDragStart = function (event) {
                    //var ev = event.originalEvent;
                    var id = event.target.id;
                    var data = { "id": id };
                    event.dataTransfer.setData("plain/text", JSON.stringify(data));
                };
                HeroesComponent.prototype.onCommentDragOver = function (event) {
                    //var ev = event.originalEvent;
                    var ev = event;
                    ev.preventDefault();
                };
                HeroesComponent = __decorate([
                    core_1.Component({
                        selector: 'my-heroes',
                        templateUrl: 'app/heroes.component.html',
                        styleUrls: ['app/heroes.component.css'],
                        directives: [hero_detail_component_1.HeroDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HeroesComponent);
                return HeroesComponent;
            }());
            exports_1("HeroesComponent", HeroesComponent);
        }
    }
});
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=heroes.component.js.map