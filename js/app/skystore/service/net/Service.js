/**
 * @class app.skystore.service.net.Service
 */
define([
    'puremvc',
    'rxjs'
],function(puremvc) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.service.net.Service'

        },
        // INSTANCE MEMBERS
        {
            /**
             * @public
             * @param {string} url
             * @type {Rx.Observable}
             */
            load: function (url) {


                var request = new XMLHttpRequest();

                request.open('GET', 'http://localhost:9292/'+url, true);
                request.send()

                return Rx.Observable.fromEvent(request,"load").map(function (data) {
                    return JSON.parse(data.target.response);
                });
            }

        },
        // STATIC MEMBERS
        {


        }
    );
})
