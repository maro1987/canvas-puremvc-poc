/**
 * @class app.skystore.controller.command.PrepareViewCommand
 * @extends puremvc.SimpleCommand
 */
define(['puremvc',
    'view/app/AppMediator',
    'view/mainmenu/MainMenuMediator',
    'view/browse/BrowseCarouselMediator'],function(puremvc,AppMediator,MainMenuMediator,BrowseCarouselMediator) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.controller.command.PrepareViewCommand',
            parent: puremvc.SimpleCommand
        },
        // INSTANCE TRAITS
        {
            /** @override */
            execute: function (note) {

                // register the MainMenuMediator
                this.facade.registerMediator(new MainMenuMediator);

                //register the BrowseCarouselMediator
                this.facade.registerMediator(new BrowseCarouselMediator);

                // register the AppMediator
                this.facade.registerMediator(new AppMediator);



            }
        }
    )
})