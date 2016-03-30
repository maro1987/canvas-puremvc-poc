/**
 * @class app.skystore.ApplicationFacade
 * @extends puremvc.Facade
 */
define([
    'puremvc',
    'app/AppConstants',
    'command/StartupCommand',
    'command/RemoteKeyDownCommand'
],function(puremvc,AppConstants,StartupCommand,RemoteKeyDownCommand) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.ApplicationFacade',
            parent: puremvc.Facade,
            constructor: function (multitonKey) {
                puremvc.Facade.call(this, multitonKey);

                //puremvc.declare('puremvcjquery.view.common.core');
            }
        },
        // INSTANCE MEMBERS
        {
            /**
             * A convenience method to start the PureMVC apparatus
             *
             * @return {void}
             */
            startup: function (app) {
                if (!this.initialized) {
                    puremvc.Facade.prototype.initializeController.call(this);

                    this.initialized = true;
                    // associate the SetupCommand with the STARTUP notification
                    this.registerCommand(AppConstants.STARTUP, StartupCommand);
                    // issue the SETUP notification to execute StartupCommand
                    this.registerCommand(AppConstants.REMOTE_KEY_DOWN, RemoteKeyDownCommand);

                    this.sendNotification(AppConstants.STARTUP, app);
                }
            }
        },
        // STATIC MEMBERS
        {
            /**
             * Retrieve an instance of ApplicationFacade. If one has not yet been
             * instantiated, one will be created for you.
             *
             * @static
             * @param {string} multitonKey
             * @return demo.ApplicationFacade
             */
            getInstance: function (multitonKey) {
                // all Facade instances, including Facade subclass instances, are stored
                // on Facade.instanceMap. When implementing you own #getInstance factory
                // method, ensure that follow the general pattern implemented here or else
                // puremvc.Facade#hasCore and puremvc.Facade#removeCore will not work if
                // you ever need to use them.
                var instanceMap = puremvc.Facade.instanceMap;
                instance = instanceMap[multitonKey]; // read from the instance map
                if (instance) // if there is an instance...
                    return instance; // return it
                // otherwise create a new instance and cache it on Facade.instanceMap;
                return instanceMap[multitonKey] = new app.skystore.ApplicationFacade(multitonKey);
            },
            /**
             * @static
             * @type {string}
             */
            NAME: 'PureMVCjQuery'
        }
    )
})