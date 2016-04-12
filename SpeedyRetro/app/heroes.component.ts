import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {HeroService} from './hero.service';
import {HeroDetailComponent} from './hero-detail.component';
import {Hero} from './hero';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css'],
    directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
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

    ngOnInit() {
        //call service
    }

    addComment() {
        var rand = Math.random();

        var userId = 'chicken';

        var commentId = userId + '_' + rand;

        var commentMarkup = '<textarea id="' + commentId + '" class="draggable" draggable="true" ondragstart="setData(event);" width="336" height="69"></textarea>';

        //$('#start').append(commentMarkup);
    }

    onCommentDropped(event) {
        //var ev = event.originalEvent;
        var ev = event;

        ev.preventDefault();

        var data = ev.dataTransfer.getData("plain/text");

        var obj = JSON.parse(data);

        ev.target.appendChild(document.getElementById(obj.id));
    }

    onCommentDragStart(event) {
        //var ev = event.originalEvent;
        var id = event.target.id;
        var data = { "id": id };
        event.dataTransfer.setData("plain/text", JSON.stringify(data));
    }

    onCommentDragOver(event) {
        //var ev = event.originalEvent;
        var ev = event;
        ev.preventDefault();
    }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/