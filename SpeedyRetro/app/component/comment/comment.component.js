System.register(['angular2/core', '../../hub/svc/comment.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, comment_service_1;
    var CommentComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (comment_service_1_1) {
                comment_service_1 = comment_service_1_1;
            }],
        execute: function() {
            CommentComponent = (function () {
                function CommentComponent(_commentService) {
                    this._commentService = _commentService;
                    this.comment = { 'id': Math.random() };
                }
                CommentComponent.prototype.onDragStart = function (event) {
                    var id = event.target.id;
                    var data = { 'id': id };
                    event.dataTransfer.setData('plain/text', JSON.stringify(data));
                };
                CommentComponent.prototype.onDragEnd = function (event) {
                    var textArea = event.target;
                    var td = textArea.parentNode.parentNode;
                    var message = textArea.innerText;
                    var commentState = td.dataset.commentstate;
                    var commentId = textArea.id;
                    var comment = { 'retroId': '35e45f1e-aca6-42f8-92ba-124290d13b3c', 'message': message, 'state': commentState, id: commentId };
                    this._commentService.update(comment);
                };
                CommentComponent = __decorate([
                    core_1.Component({
                        selector: 'sr-comment',
                        templateUrl: 'app/component/comment/html/comment.component.html',
                        styleUrls: ['app/component/comment/css/comment.component.css'],
                        providers: [comment_service_1.CommentService]
                    }), 
                    __metadata('design:paramtypes', [comment_service_1.CommentService])
                ], CommentComponent);
                return CommentComponent;
            }());
            exports_1("CommentComponent", CommentComponent);
        }
    }
});
//# sourceMappingURL=comment.component.js.map