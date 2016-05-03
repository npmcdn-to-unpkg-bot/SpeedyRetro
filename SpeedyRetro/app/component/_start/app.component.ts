import {Component, OnInit, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Subject, Observer} from 'rxjs/Rx';

import {UserComponent} from '../../component/user/user.component';
import {BoardComponent} from '../../component/board/board.component';
import {RetroService} from '../../hub/svc/retro.service';
import {Retro} from '../../hub/entities/retro';
import {CommentService} from '../../hub/svc/comment.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/component/_start/html/app.component.html',
    styleUrls: ['app/component/_start/css/app.component.css'],
    directives: [ROUTER_DIRECTIVES, UserComponent],
    providers: [RetroService, CommentService],
})
    @RouteConfig([
        { path: '/retro/:id', name: 'Retros', component: BoardComponent }
])
export class AppComponent implements OnInit {
    error: string;
    retro: Retro;
    retroExist: boolean = false;

    constructor(private _retroService: RetroService,
        private _router: Router,
        private _dynamicComponentLoader: DynamicComponentLoader,
        private _elementRef: ElementRef) {
    }

    ngOnInit() {
        this.renderUser();
    }

    createRetro() {
        this._retroService.add()
            .subscribe(retro => this.retro = retro, error => this.error = <any>error);

        this._router.navigate(['Retros', { id: this.retro.id }]);
    }

    private renderUser() {
        this._dynamicComponentLoader.loadIntoLocation(UserComponent, this._elementRef, 'user');
    }
}