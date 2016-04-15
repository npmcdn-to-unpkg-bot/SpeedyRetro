import {Component} from 'angular2/core';

@Component({
    selector: 'my-comment',
    templateUrl: 'app/comment/html/comment.component.html',
    styleUrls: ['app/comment/css/comment.component.css'],
})
export class CommentComponent {
    comment = { 'id': 'someGUID'};

    onCommentDragStart(event) {
        var id = event.target.id;
        var data = { "id": id };
        event.dataTransfer.setData("plain/text", JSON.stringify(data));
    }
}