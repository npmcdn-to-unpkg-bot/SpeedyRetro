import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {UserService} from '../../hub/svc/user.service';

@Component({
    selector: 'sr-login',
    templateUrl: 'app/component/login/html/login.component.html',
    styleUrls: ['app/component/login/css/login.component.css'],
    providers: [UserService]
})
export class LoginComponent {
    login = { 'id': Math.random() + '_username' };

    constructor(private _router: Router,
        private _userService: UserService) {
    }

    onClick() {
        var username = document.getElementById(this.login.id).nodeValue;

        //check session storage for temp retro ID
        //if retro ID exists render login box and proceed
        //if retro ID does not exits redirect to add retro page

        let retroId = document.cookie.replace(/(?:(?:^|.*;\s*)sr-temp-retroId\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        if (retroId) {
            this._userService.add({ 'username': username })
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