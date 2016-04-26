import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {bootstrap} from 'angular2/platform/browser';
import 'rxjs/Rx';

import {AppComponent} from './component/_start/app.component';
import {CommentService} from './hub/svc/comment.service';

bootstrap(AppComponent, [CommentService, ROUTER_PROVIDERS, HTTP_PROVIDERS]);