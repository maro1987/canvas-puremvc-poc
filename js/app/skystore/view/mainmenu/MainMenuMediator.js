/**
 * @class app.skystore.view.mainmenu.MainMenuMediator
 * @extends puremvc.Mediator
 */
define([
    'puremvc',
    'app/AppConstants',
    'common/core/RemoteKey',
    'view/mainmenu/MainMenuView',
    'proxy/MainMenuProxy'
],function(puremvc,AppConstants,RemoteKey,MainMenuView,MainMenuProxy) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.view.mainmenu.MainMenuMediator',
            parent: puremvc.Mediator
        },
        // INSTANCE MEMBERS
        {
            // Get the TextProxy
            proxy: null,

            /** @override */
            listNotificationInterests: function () {
                return [
                    MainMenuProxy.INDEX_CHANGED
                ]
            },
            /** @override */
            handleNotification: function (note) {
                switch (note.getName()) {
                    case MainMenuProxy.INDEX_CHANGED:
                        this.viewComponent.setSelection(note.getBody());
                        break;
                }
            },
            /** @override */
            onRegister: function () {
                console.log("UserInfoPanelMediator Registered")
                this.setViewComponent(new MainMenuView);
                this.proxy = this.facade.retrieveProxy(MainMenuProxy.NAME);

                this.proxy.menuData = ["Showcase", "New releases", "Offers", "My Library", "Search", "A to Z", "Family",
                    "Comedy", "Action", "Thriller", "Sci-Fi", "Horror", "Classic", "Romance", "Drama", "Docs", "My Account",
                    "Help", "About Sky Store"];

                this.viewComponent.buildMenu(this.proxy.menuData);
                this.proxy.setSelectedIndex(0);

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
            }
        },
        // STATIC MEMBERS
        {
            /**
             * @static
             * @type {string}
             */
            NAME: 'MainMenuMediator'
        }
    )
})