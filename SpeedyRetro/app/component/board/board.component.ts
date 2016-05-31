import {Component, OnInit, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Subject, Observer} from 'rxjs/Rx';

import {CommentComponent} from '../comment/comment.component';

@Component({
    selector: 'sr-board',
    templateUrl: 'app/component/board/html/board.component.html',
    styleUrls: ['app/component/board/css/board.component.css'],
    directives: [CommentComponent]
})
export class BoardComponent implements OnInit {
    lanes = [{ 'name': 'Good :)', 'state': 'good' },
        { 'name': 'Bad :(', 'state': 'bad' },
        { 'name': 'Action Points!', 'state': 'action' }];
    subject: Subject<any> = new Subject();

    constructor(private _router: Router,
        private _routeParams: RouteParams,
        private _dynamicComponentLoader: DynamicComponentLoader,
        private _elementRef: ElementRef) { }
    
    ngOnInit() {
        let retroId = this._routeParams.get('retroId');
        if (retroId) {
            //remove any temp cookies
            this.renderComment();
        }
        else {
            this._router.navigate(['Route-Add-Retro']);
        }
    }

    addComment() {
        this.renderComment();
    }

    onCommentDropped(event) {
        var ev = event;

        ev.preventDefault();

        var data = ev.dataTransfer.getData('plain/text');

        var obj = JSON.parse(data);

        ev.target.appendChild(document.getElementById(obj.id));
    }

    onCommentDragOver(event) {
        var ev = event;
        ev.preventDefault();
    }

    private renderComment() {
        this._dynamicComponentLoader.loadIntoLocation(CommentComponent, this._elementRef, 'comment')
            .then(compRef => this.subject.subscribe(compRef.instance));
    }
}