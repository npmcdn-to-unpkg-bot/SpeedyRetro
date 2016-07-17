import {Component, OnInit, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Subject, Observer} from 'rxjs/Rx';

import {Lane}  from '../../hub/entities/lane';
import {PoolService} from '../../hub/svc/pool.service';
import {CommentComponent} from '../comment/comment.component';
import {CommentService} from '../../hub/svc/comment.service';

@Component({
    selector: 'sr-board',
    templateUrl: 'app/component/board/html/board.component.html',
    styleUrls: ['app/component/board/css/board.component.css'],
    providers: [PoolService],
    directives: [CommentComponent]
})
export class BoardComponent implements OnInit {
    lanes: Lane[] = [{ 'name': 'Good :)', 'id': 1 },
        { 'name': 'Bad :(', 'id': 2 },
        { 'name': 'Action Points!', 'id': 3 }];
    subject: Subject<any> = new Subject();
    error: string;

    constructor(private _router: Router,
        private _commentService: CommentService,
        private _routeParams: RouteParams,
        private _dynamicComponentLoader: DynamicComponentLoader,
        private _elementRef: ElementRef,
        private _poolService: PoolService) { }

    ngOnInit() {
        let retroId = this._routeParams.get('retroId');
        if (retroId) {

            //this._poolService.get(1)
            //    .subscribe(pool => {
            //        this.lanes = pool.lanes;
            //    });

            //this.renderComment();
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
        this._commentService.getCommentId()
            .subscribe(comment => {
                this._dynamicComponentLoader.loadIntoLocation(CommentComponent, this._elementRef, 'comment')
                    .then(compRef => {
                        compRef.instance.commentId = comment.id; console.log(compRef.instance)
                    });
            }, error => this.error = <any>error);
    }
}