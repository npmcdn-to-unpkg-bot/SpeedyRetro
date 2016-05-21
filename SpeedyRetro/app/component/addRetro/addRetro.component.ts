import {Component, OnInit, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {LoginComponent} from '../../component/login/login.component';

@Component({
    selector: 'my-retro',
    templateUrl: 'app/component/addRetro/html/addRetro.component.html',
    styleUrls: ['app/component/addRetro/css/addRetro.component.css'],
})

export class AddRetroComponent implements OnInit {
    userExists: boolean = false;

    constructor(private _dynamicComponentLoader: DynamicComponentLoader,
        private _elementRef: ElementRef) {
    }

    ngOnInit() {
        this.renderUser();
    }

    private renderUser() {
        this._dynamicComponentLoader.loadIntoLocation(LoginComponent, this._elementRef, 'login');
    }
}