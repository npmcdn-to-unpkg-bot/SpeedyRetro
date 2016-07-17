System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var PoolService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            PoolService = (function () {
                function PoolService(_http) {
                    this._http = _http;
                }
                PoolService.prototype.get = function (id) {
                    var headers = new http_1.Headers();
                    headers.append('Accept', 'application/json');
                    var requestOptions = new http_1.RequestOptions({ 'headers': headers });
                    //return this._http.post('/adduser/', JSON.stringify(user), requestOptions)
                    //    .map(this.checkResponse)
                    //    .catch(this.handleError);
                    return this._http.get('/pool/' + id, requestOptions)
                        .map(this.checkResponse)
                        .catch(this.handleError);
                };
                PoolService.prototype.checkResponse = function (res) {
                    if (res.status !== 200) {
                        throw new Error('Bad response status: ' + res.status);
                    }
                    return {};
                };
                PoolService.prototype.handleError = function (error) {
                    var errMsg = error.message || 'Server error';
                    console.error(errMsg);
                    return Observable_1.Observable.throw(errMsg);
                };
                PoolService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], PoolService);
                return PoolService;
            }());
            exports_1("PoolService", PoolService);
        }
    }
});
//# sourceMappingURL=pool.service.js.map