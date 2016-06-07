import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {RetroService} from '../../hub/svc/retro.service';

@Component({
    selector: 'sr-addRetro',
    templateUrl: 'app/component/addRetro/html/addRetro.component.html',
    styleUrls: ['app/component/addRetro/css/addRetro.component.css'],
    providers: [RetroService],
})

export class AddRetroComponent {
    error: string;
    login = { 'id': Math.random() + '_username' };

    constructor(private _retroService: RetroService,
        private _router: Router) {
    }

    createRetro() {
        this._retroService.add()
            .subscribe(retro => {
                this._router.navigate(['Route-Retro-Board', { 'retroId': retro.id }]);
            }, error => this.error = <any>error);
    }
}