import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
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
    { path: '/start/', name: 'Route-Add-Retro', component: AddRetroComponent },
    { path: '/retro/:retroId/login/', name: 'Route-Login', component: LoginComponent },
    { path: '/retro/:retroId', name: 'Route-Retro-Board', component: BoardComponent }
])
export class AppComponent {
}