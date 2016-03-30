/**
 * @class app.skystore.service.net.loader.ImageLoader
 */
define([
    'puremvc',
    'rxjs'
],function(puremvc) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.service.net.loader.ImageLoader',
            constructor: function( )
            {
            }

        },
        // INSTANCE MEMBERS
        {


            load: function ( url ) {

                var queue = new createjs.LoadQueue(false)
                queue.loadFile(url.split("?")[0]+"?s=193x275");

                return Rx.Observable.fromEvent(queue,"fileload").pluck('result')
            }
        },
        // STATIC MEMBERS
        {


        }
    );
})
