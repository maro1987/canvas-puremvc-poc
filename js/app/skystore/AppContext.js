/**
 * @class app.AppContext
 */
define([
    'puremvc',
    'service/BrowseCarouselService'
],function(puremvc,BrowseCarouselService) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.AppContext'

        },
        // INSTANCE MEMBERS
        {
            data: 'sadasdasdas'

        },
        // STATIC MEMBERS
        {
            browseCarouselService: Object.create(BrowseCarouselService.prototype)

        }
    )
})
