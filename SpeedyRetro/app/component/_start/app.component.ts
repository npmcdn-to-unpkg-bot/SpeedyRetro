import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {LoginComponent} from '../../component/login/login.component';
import {BoardComponent} from '../../component/board/board.component';
import {AddRetroComponent} from '../../component/addretro/addretro.component';

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