import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {RetroService} from '../../hub/svc/retro.service';
import {UserService} from '../../hub/svc/user.service';
import {User} from '../../hub/entities/user';
import {Retro} from '../../hub/entities/retro';

@Component({
    selector: 'sr-addRetro',
    templateUrl: 'app/component/addRetro/html/addRetro.component.html',
    styleUrls: ['app/component/addRetro/css/addRetro.component.css'],
    providers: [RetroService, UserService],
})

export class AddRetroComponent {
    user: User = new User();
    retro: Retro = new Retro();
    error: string;
    login = { 'id': Math.random() + '_username' };

    constructor(private _retroService: RetroService,
        private _router: Router,
        private _userService: UserService) {
    }

    createRetro() {
        this._retroService.add(this.retro.name)
            .subscribe(retro => {

                this.user.retroId = retro.id;

                this._userService.add(this.user)
                    .subscribe(res => {
                        this._router.navigate(['Route-Retro-Board', { 'retroId': retro.id }]);

                    }, error => this.error = <any>error);
            }, error => this.error = <any>error);
    }
}