/**
 * @class app.skystore.view.browse.BrowseCarouselMediator
 * @extends puremvc.Mediator
 */
define([
    'puremvc',
    'app/AppConstants',
    'common/core/RemoteKey',
    'proxy/BrowseCarouselProxy',
    'view/browse/BrowseCarouselView',
    'app/AppContext'
],function(puremvc,AppConstants,RemoteKey,BrowseCarouselProxy,BrowseCarouselView,AppContext) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.view.browse.BrowseCarouselMediator',
            parent: puremvc.Mediator
        },
        // INSTANCE MEMBERS
        {
            // Get the TextProxy
            proxy: null,

            scope:null,

            /** @override */
            listNotificationInterests: function () {
                return [
                    BrowseCarouselProxy.INDEX_CHANGED
                ]
            },
            /** @override */
            handleNotification: function (note) {
                switch (note.getName()) {
                    case BrowseCarouselProxy.INDEX_CHANGED:
                        this.viewComponent.setSelection(note.getBody());
                        break;
                }
            },
            /** @override */
            onRegister: function () {
                console.log("BrowseCarouselMediator Registered")
                this.setViewComponent(new BrowseCarouselView);
                this.proxy = this.facade.retrieveProxy(BrowseCarouselProxy.NAME);

                AppContext.browseCarouselService.loadCarousel().subscribe(this.fillCarousel);

                scope = this;
            },
            /** @override */
            onRemove: function () {
                // The TextComponentMediator has been removed from the Facade, and so is no longer
                // in use. Clean up by removing event listeners and dereferencing its viewComponent
                //this.viewComponent.removeEventListener( demo.view.component.TextComponent.TEXT_CHANGED, this );
                this.setViewComponent(null);
            },
            /**
             * Handle the W3CTextComponent.TEXT_CHANGED event
             * @param {Event} textChangedEvent
             * @return {void}
             */
            handleEvent: function (textChangedEvent) {
                //this.sendNotification( demo.AppConstants.PROCESS_TEXT, textChangedEvent.text );
            },

            fillCarousel: function (data) {
                scope.proxy.carouselData = data;
                scope.viewComponent.buildCarousel(data.items);
            }
        },
        // STATIC MEMBERS
        {
            /**
             * @static
             * @type {string}
             */
            NAME: 'BrowseCarouselMediator'
        }
    )
})