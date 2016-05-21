import {Component, OnInit, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {Subject, Observer} from 'rxjs/Rx';

import {LoginComponent} from '../../component/login/login.component';
import {BoardComponent} from '../../component/board/board.component';
import {AddRetroComponent} from '../../component/addretro/addretro.component';
import {Retro} from '../../hub/entities/retro';
import {CommentService} from '../../hub/svc/comment.service';

@Component({
    selector: 'my-app',
    template:'<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES, LoginComponent]
})
@RouteConfig([
    { path: '/login/', name: 'Route-Login', component: LoginComponent },
    { path: '/start/', name: 'Route-Add-Retro', component: AddRetroComponent },
    { path: '/retro/:retroId', name: 'Route-Retro-Board', component: BoardComponent }
])
export class AppComponent implements OnInit {
    error: string;
    retro: Retro;
    userExists: boolean = true;
    retroExist: boolean = false;

    constructor(private _router: Router,
        private _dynamicComponentLoader: DynamicComponentLoader,
        private _elementRef: ElementRef) {
    }

    ngOnInit() {
        if (!this.retroExist) {
            this._router.navigate(['Route-Add-Retro']);
        }
        if (!this.userExists) {
            this._router.navigate(['Route-Login']);
        }
        else {
            //let retroId = this._routeParams.get('retroId');

            //this._router.navigate(['Route-Retro-Board', { 'retroId': retroId }]);
        }
    }
}