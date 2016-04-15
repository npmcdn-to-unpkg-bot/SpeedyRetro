import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from 'angular2/router';
import {CommentComponent} from '../comment/comment.component';

@Component({
    selector: 'my-board',
    templateUrl: 'app/board/html/board.component.html',
    styleUrls: ['app/board/css/board.component.css'],
    directives: [CommentComponent]
})
export class BoardComponent implements OnInit {
    lanes = [{ 'name': 'Good :)', 'state': 'good' }, { 'name': 'Bad :(', 'state': 'bad' }, { 'name': 'Action Points !', 'state': 'action' }];

    constructor(private _routeParams: RouteParams) {}

    ngOnInit() {
        let id = this._routeParams.get('id');

        //store app id somewhere

        console.log('Hello ID: ' + id);
    }

    addComment() {
        var rand = Math.random();

        var userId = 'chicken';

        var commentId = userId + '_' + rand;

        var commentMarkup = '<textarea id="' + commentId + '" class="draggable" draggable="true" ondragstart="setData(event);" width="336" height="69"></textarea>';

        //$('#start').append(commentMarkup);
    }

    onCommentDropped(event) {
        var ev = event;

        ev.preventDefault();

        var data = ev.dataTransfer.getData("plain/text");

        var obj = JSON.parse(data);

        ev.target.appendChild(document.getElementById(obj.id));
    }

    onCommentDragStart(event) {
        var id = event.target.id;
        var data = { "id": id };
        event.dataTransfer.setData("plain/text", JSON.stringify(data));
    }

    onCommentDragOver(event) {
        var ev = event;
        ev.preventDefault();
    }
}