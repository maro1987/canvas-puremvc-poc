/**
 * @class app.skystore.model.proxy.MainMenuProxy
 * @extends puremvc.Proxy
 */
define([
    'puremvc',
    'proxy/MainMenuProxy'
],function(puremvc,MainMenuProxy) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.model.proxy.MainMenuProxy',
            parent: puremvc.Proxy
        },
        // INSTANCE MEMBERS
        {
            /**
             * @public
             * @type {array}
             */
            menuData: null,

            /**
             * @private
             * @type {int}
             */
            selectedIndex: 0,


            /**
             * Set the selectedIndex.
             *
             * Sends a MainMenuProxy.INDEX_CHANGED.
             *
             * @param {int} index
             * @return {void}
             */
            setSelectedIndex: function (index) {
                if (index >= 0 && index < this.menuData.length) {
                    this.selectedIndex = index;
                    // Send a notification that the text changed
                    this.sendNotification(app.skystore.model.proxy.MainMenuProxy.INDEX_CHANGED, index);
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
            NAME: 'MainMenuProxy',
            /**
             * A notification that the selectedIndex has changed.
             */
            INDEX_CHANGED: 'main_menu_index_changed'
        }
    );
})