import {Component, OnInit, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {RetroService} from '../../hub/svc/retro.service';
import {LoginComponent} from '../../component/login/login.component';

@Component({
    selector: 'sr-addRetro',
    templateUrl: 'app/component/addRetro/html/addRetro.component.html',
    styleUrls: ['app/component/addRetro/css/addRetro.component.css'],
    providers: [RetroService],
})

export class AddRetroComponent implements OnInit {
    error: string;

    constructor(private _dynamicComponentLoader: DynamicComponentLoader,
        private _elementRef: ElementRef,
        private _retroService: RetroService,
        private _router: Router) {
    }

    ngOnInit() {
        this.renderUser();
    }

    createRetro() {
        this._retroService.add()
            .subscribe(retro => {
                this._router.navigate(['Route-Retro-Board', { 'retroId': retro.id }]);
            }, error => this.error = <any>error);
    }

    private renderUser() {
        this._dynamicComponentLoader.loadIntoLocation(LoginComponent, this._elementRef, 'login');
    }
}