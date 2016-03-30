/**
 * @class app.skystore.model.proxy.BrowseCarouselProxy
 * @extends puremvc.Proxy
 */
define(['puremvc'],function(puremvc) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.model.proxy.BrowseCarouselProxy',
            parent: puremvc.Proxy

        },
        // INSTANCE MEMBERS
        {
            scope: this,

            /**
             * @private
             * @type {CarouselVO}
             */
            carouselData: null,

            /**
             * @private
             * @type {int}
             */
            selectedIndex: 0,


            /**
             * Set the selectedIndex.
             *
             * Sends a TextProxy.TEXT_CHANGED notification.
             *
             * @param {int} index
             * @return {void}
             */
            setSelectedIndex: function (index) {
                console.log(this.carouselData.items.length)
                if (index >= 0 && index < this.carouselData.items.length) {
                    this.selectedIndex = index;
                    // Send a notification that the text changed
                    this.sendNotification(app.skystore.model.proxy.BrowseCarouselProxy.INDEX_CHANGED, index);
                }
            }
        },
        // CLASS MEMBERS
        {
            /**
             * The MainMenuProxy's name.
             *
             * @static
             * @type {string}
             */
            NAME: 'BrowseCarouselProxy',

            /**
             * A notification that the selectedIndex has changed.
             */
            INDEX_CHANGED: 'browse_carousel_index_changed'
        }
    );
})