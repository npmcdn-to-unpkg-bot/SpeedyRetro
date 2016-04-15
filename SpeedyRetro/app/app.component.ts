import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {BoardComponent} from './board/board.component';
import {ClientHubService} from './client-hub.service';
import {Router} from 'angular2/router';
import {Retro} from './board/retro';

@Component({
    selector: 'my-app',
    templateUrl: 'app/_start/html/app.component.html',
    styleUrls: ['app/_start/css/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ClientHubService]
})
@RouteConfig([
    { path: '/retro/:id', name: 'Retros', component: BoardComponent }
])
export class AppComponent {
    error: string;
    retro: Retro;

    constructor(private _clientHub: ClientHubService, private _router: Router) {
        //check for app Id in local storage
    }

    createRetro() {
        //first call returns after id is required
        this._clientHub.addRetro()
            .subscribe(retro => this.retro = retro, error => this.error = <any>error);

        this._router.navigate(['Retros', { id: this.retro.id }]);
    }
}