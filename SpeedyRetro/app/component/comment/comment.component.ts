import {Component} from 'angular2/core';
import {CommentService} from '../../hub/svc/comment.service';

@Component({
    selector: 'sr-comment',
    templateUrl: 'app/component/comment/html/comment.component.html',
    styleUrls: ['app/component/comment/css/comment.component.css']
    //providers: [CommentService]
})
export class CommentComponent {
    comment = { 'id': Math.random()};

    constructor(private _commentService: CommentService) {
    }

    onDragStart(event) {
        var id = event.target.id;
        var data = { 'id': id };
        event.dataTransfer.setData('plain/text', JSON.stringify(data));
    }

    onDragEnd(event) {
        var textArea = event.target;

        var td = textArea.parentNode.parentNode;

        var message = textArea.innerText;

        var commentState = td.dataset.commentstate;

        var commentId = textArea.id;

        var comment = { 'retroId': '35e45f1e-aca6-42f8-92ba-124290d13b3c', 'message': message, 'state': commentState, id: commentId };

        this._commentService.update(comment);
    }
}