import {Component} from 'angular2/core';

@Component({
    selector: 'sr-comment',
    templateUrl: 'app/component/comment/html/comment.component.html',
    styleUrls: ['app/component/comment/css/comment.component.css'],
})
export class CommentComponent {
    comment = { 'id': Math.random()};

    onCommentDragStart(event) {
        var id = event.target.id;
        var data = { 'id': id };
        event.dataTransfer.setData('plain/text', JSON.stringify(data));
    }
}