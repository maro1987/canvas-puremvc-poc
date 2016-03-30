/**
 * @class app.skystore.controller.command.RemoteKeyDownCommand
 * @extends puremvc.SimpleCommand
 */
define([
    'puremvc',
    'view/app/AppMediator',
    'view/mainmenu/MainMenuMediator',
    'view/browse/BrowseCarouselMediator',
    'proxy/MainMenuProxy',
    'common/core/RemoteKey'
],function(puremvc,AppMediator,MainMenuMediator,BrowseCarouselMediator,MainMenuProxy,RemoteKey) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.controller.command.RemoteKeyDownCommand',
            parent: puremvc.SimpleCommand
        },
        // INSTANCE TRAITS
        {
            mainMenuProxy: null,

            /** @override */
            execute: function (note) {
                var remoteKey = note.getBody().remoteKey;
                var proxy = note.getBody().selectedViewProxy;

                if (remoteKey == RemoteKey.RIGHT) {
                    var index = proxy.selectedIndex + 1;
                    proxy.setSelectedIndex(index);
                } else if (remoteKey == RemoteKey.LEFT) {
                    var index = proxy.selectedIndex - 1;
                    proxy.setSelectedIndex(index);
                }


            }
        }
    )
})