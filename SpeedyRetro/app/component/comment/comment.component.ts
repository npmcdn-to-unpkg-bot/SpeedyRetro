import {Component, OnInit, AfterViewInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {CommentService} from '../../hub/svc/comment.service';

@Component({
    selector: 'sr-comment',
    templateUrl: 'app/component/comment/html/comment.component.html',
    styleUrls: ['app/component/comment/css/comment.component.css']
})
export class CommentComponent implements OnInit, AfterViewInit{
    retroId: string;
    commentId: string = "";

    constructor(private _commentService: CommentService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this.retroId = this._routeParams.get('retroId');

        this._commentService.startConnection(this.retroId);
    }

    ngAfterViewInit() {

    }

    onChange(event) {
        this.update(event);
    }

    onDragStart(event) {

        var id = event.target.id;

        var data = { 'id': id };

        event.dataTransfer.setData('plain/text', JSON.stringify(data));
    }

    onDragEnd(event) {
        this.update(event);
    }

    private update(event) {
        var textArea = event.target;

        var td = textArea.parentNode.parentNode;

        var message = textArea.value;

        var commentState = td.dataset.commentstate;

        var commentId = textArea.id;

        let retroId = this._routeParams.get('retroId');

        var comment = { 'retroId': retroId, 'message': message, 'state': commentState, 'id': commentId };

        this._commentService.update(comment);
    }
}