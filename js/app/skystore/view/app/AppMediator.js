/**
 * @class puremvcjquery.view.app.AppMediator
 * @extends puremvc.Mediator
 */
define([
    'puremvc',
    'app/AppConstants',
    'common/core/RemoteKey',
    'view/app/AppView',
    'view/mainmenu/MainMenuMediator',
    'view/browse/BrowseCarouselMediator'
],function(puremvc,AppConstants,RemoteKey,AppView,MainMenuMediator,BrowseCarouselMediator) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.view.app.AppMediator',
            parent: puremvc.Mediator
        },
        // INSTANCE MEMBERS
        {

            selectedViewMediator:null,

            /** @override */
            listNotificationInterests: function () {
                return [
                    AppConstants.REQUEST_ANIMATION_FRAME
                ]
            },
            /** @override */
            handleNotification: function (note) {

                switch (note.getName()) {
                    case AppConstants.REQUEST_ANIMATION_FRAME:
                        this.viewComponent.requestAnimationFrame();
                        break;
                }

            },
            /** @override */
            onRegister: function () {
                console.log("AppMediator Registered")

                this.setViewComponent(new AppView);

                this.viewComponent.onKeyDownSignalSignal.add(this.handleOnKeyDownSignal, this);

                this.setSelectedViewMediator(MainMenuMediator.NAME);
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
            handleOnKeyDownSignal: function (remoteKey) {
                if(this.selectedViewMediator.getMediatorName() == MainMenuMediator.NAME)
                {
                    if(remoteKey == RemoteKey.DOWN)
                    {
                        this.setSelectedViewMediator(BrowseCarouselMediator.NAME);
                    }
                }

                if(this.selectedViewMediator.getMediatorName() == BrowseCarouselMediator.NAME)
                {
                    if(remoteKey == RemoteKey.UP)
                    {
                        this.setSelectedViewMediator(MainMenuMediator.NAME);
                    }
                }

                var body = {remoteKey: remoteKey, selectedViewProxy: this.selectedViewMediator.proxy};
                this.sendNotification(AppConstants.REMOTE_KEY_DOWN, body)
                //this.sendNotification(AppConstants.REMOTE_KEY_DOWN, remoteKey)
            },
            /**
             * Set selected view mediator
             * @param {String} mediatorName
             * @return {void}
             */
            setSelectedViewMediator: function( mediatorName )
            {
                if(this.selectedViewMediator)
                    this.selectedViewMediator.getViewComponent().deselect(true);

                this.selectedViewMediator = this.facade.retrieveMediator(mediatorName);
                this.selectedViewMediator.getViewComponent().setSelection(this.selectedViewMediator.proxy.selectedIndex);;
            }
        },
        // STATIC MEMBERS
        {
            /**
             * @static
             * @type {string}
             */
            NAME: 'AppMediator'
        }
    );
})