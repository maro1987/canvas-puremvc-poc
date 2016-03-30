/**
 * @class app.skystore.service.BrowseCarouselService
 */
define([
    'puremvc',
    'service/net/Service',
    'service/vo/CarouselVO',
    'preloadjs',
    'rxjs'
],function(puremvc,Service,CarouselVO) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.service.BrowseCarouselService'

        },
        // INSTANCE MEMBERS
        {

            /**
             * @public
             * @type {Rx.Observable}
             */
            loadCarousel: function () {
                return new Service()
                    .load('trial.test.skystore.com/api/device2/v2/catalog/assets?response=chunky&filter=^A&includecharindex=true&api_key=admin-p0wn3d')
                    .pluck('content')
                    .map(function(data){return new CarouselVO().parse(data)})
            }

        },
        // STATIC MEMBERS
        {


        }
    );
})
