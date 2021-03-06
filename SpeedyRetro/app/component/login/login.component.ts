import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {UserService} from '../../hub/svc/user.service';
import {User} from '../../hub/entities/user';

@Component({
    selector: 'sr-login',
    templateUrl: 'app/component/login/html/login.component.html',
    styleUrls: ['app/component/login/css/login.component.css'],
    providers: [UserService]
})
export class LoginComponent {
    user: User = new User();

    constructor(private _router: Router,
        private _routeParams: RouteParams,
        private _userService: UserService) {
    }

    onClick() {
        let retroId = this._routeParams.get('retroId');

        if (retroId) {
            this._userService.add({ 'name': this.user.name, 'retroId': retroId })
                .subscribe(res => {
                    if (retroId) {
                        this._router.navigate(['Route-Retro-Board', { 'retroId': retroId }]);
                    }
                });
        } else {
            this._router.navigate(['Route-Add-Retro']);
        }
    }
}