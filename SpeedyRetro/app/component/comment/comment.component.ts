import {Component} from 'angular2/core';
import {CommentService} from '../../hub/svc/comment.service';

@Component({
    selector: 'sr-comment',
    templateUrl: 'app/component/comment/html/comment.component.html',
    styleUrls: ['app/component/comment/css/comment.component.css']
})
export class CommentComponent {
    comment = { 'id': Math.random(), 'userId': 'blah'};

    constructor(private _commentService: CommentService) {
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

        var comment = { 'retroId': '35e45f1e-aca6-42f8-92ba-124290d13b3c', 'message': message, 'state': commentState, 'id': commentId };

        this._commentService.update(comment);
    }
}