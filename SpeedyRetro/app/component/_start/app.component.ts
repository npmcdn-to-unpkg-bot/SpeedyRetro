import {Component, OnInit, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Subject, Observer} from 'rxjs/Rx';

import {LoginComponent} from '../../component/login/login.component';
import {BoardComponent} from '../../component/board/board.component';
import {RetroService} from '../../hub/svc/retro.service';
import {Retro} from '../../hub/entities/retro';
import {CommentService} from '../../hub/svc/comment.service';

@Component({
    selector: 'my-app',
    template:'<router-outlet></router-outlet>',
    //templateUrl: 'app/component/_start/html/app.component.html',
    //styleUrls: ['app/component/_start/css/app.component.css'],
    directives: [ROUTER_DIRECTIVES, LoginComponent],
    providers: [RetroService],
})
    @RouteConfig([
        { path: '/login/', name: 'Login', component: LoginComponent },
        { path: '/retro/:retroId', name: 'Retros', component: BoardComponent }
])
export class AppComponent implements OnInit {
    error: string;
    retro: Retro;
    userExists: boolean = true;
    retroExist: boolean = true;

    constructor(private _retroService: RetroService,
        private _router: Router,
        private _dynamicComponentLoader: DynamicComponentLoader,
        private _elementRef: ElementRef) {
    }

    ngOnInit() {
        //this.renderUser();

        if (!this.retroExist) {
            this._retroService.add()
                .subscribe(retro => {
                    this._router.navigate(['Retros', { 'retroId': retro.id }]);
                }, error => this.error = <any>error);
        }
        if (!this.userExists) {
            this._router.navigate(['Login']);
        }
        else {
            //render dashboard
        }
    }

    //createRetro() {

    //}

    //private renderUser() {
    //    this._dynamicComponentLoader.loadIntoLocation(LoginComponent, this._elementRef, 'login');
    //}
}