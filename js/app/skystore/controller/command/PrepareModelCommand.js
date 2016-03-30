/**
 * @class app.skystore.controller.command.PrepareModelCommand
 * @extends puremvc.SimpleCommand
 */
define(['puremvc',
    'proxy/MainMenuProxy',
    'proxy/BrowseCarouselProxy'],function(puremvc,MainMenuProxy,BrowseCarouselProxy) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.controller.command.PrepareModelCommand',
            parent: puremvc.SimpleCommand
        },
        // INSTANCE MEMBERS
        {
            /** @override */
            execute: function (note) {
                // register the MainMenuProxy
                this.facade.registerProxy(new MainMenuProxy);

                // register the BrowseCarouselProxy
                this.facade.registerProxy(new BrowseCarouselProxy);
            }
        }
    )
})