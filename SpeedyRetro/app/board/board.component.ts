import {Component, OnInit, DynamicComponentLoader, ViewEncapsulation, ElementRef} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from 'angular2/router';
import {CommentComponent} from '../comment/comment.component';
import {Subject, Observer} from 'rxjs/Rx';

@Component({
    selector: 'my-board',
    templateUrl: 'app/board/html/board.component.html',
    styleUrls: ['app/board/css/board.component.css'],
    directives: [CommentComponent]
})
export class BoardComponent implements OnInit {
    lanes = [{ 'name': 'Good :)', 'state': 'good' },
        { 'name': 'Bad :(', 'state': 'bad' },
        { 'name': 'Action Points !', 'state': 'action' }];
    subject: Subject<any> = new Subject();

    constructor(private _routeParams: RouteParams,
        private _dynamicComponentLoader: DynamicComponentLoader,
        private _elementRef: ElementRef) {

    }
    
    ngOnInit() {
        let id = this._routeParams.get('id');

        //store app id somewhere
        
        console.log('Hello ID: ' + id);

        this.renderComment();
    }

    addComment() {
        //var rand = Math.random();

        //var userId = 'chicken';

        //var commentId = userId + '_' + rand;

        //var commentMarkup = '<textarea id="' + commentId + '" class="draggable" draggable="true" ondragstart="setData(event);" width="336" height="69"></textarea>';

        //$('#start').append(commentMarkup);

        this.renderComment();
    }

    private renderComment() {
        this._dynamicComponentLoader.loadIntoLocation(CommentComponent, this._elementRef, 'comment')
            .then(compRef => this.subject.subscribe(compRef.instance));
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