import {Component, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {BoardComponent} from '../../component/board/board.component';
import {ClientHubService} from '../../hub/svc/client.service';
import {Retro} from '../../hub/entities/retro';

@Component({
    selector: 'my-app',
    templateUrl: 'app/component/_start/html/app.component.html',
    styleUrls: ['app/component/_start/css/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ClientHubService]
})
@RouteConfig([
    { path: '/retro/:id', name: 'Retros', component: BoardComponent }
])
export class AppComponent {
    error: string;
    retro: Retro;
    retroExist: boolean = false;

    constructor(private _clientHub: ClientHubService,
        private _router: Router) {
        //check for app Id in local storage
    }

    createRetro() {
        //first call returns after id is required
        this._clientHub.addRetro()
            .subscribe(retro => this.retro = retro, error => this.error = <any>error);

        this._router.navigate(['Retros', { id: this.retro.id }]);
    }
}