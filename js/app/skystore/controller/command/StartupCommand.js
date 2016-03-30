/**
 * @class app.skystore.controller.command.StartupCommand
 * @extends puremvc.MacroCommand
 */
define([
    'puremvc',
    'app/AppConstants',
    'command/PrepareModelCommand',
    'command/PrepareViewCommand'
],function(puremvc,AppConstants,PrepareModelCommand,PrepareViewCommand) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.controller.command.StartupCommand',
            parent: puremvc.MacroCommand
        },
        // INSTANCE MEMBERS
        {
            /** @override */
            initializeMacroCommand: function () {
                // add the PrepareControllerCommand- it will register Commands with the Facade

                // add the PrepareModelCommand- it will register Proxys with the Facade
                this.addSubCommand(PrepareModelCommand);
                // add the SetupViewsCommand- it will register Mediators with the Facade
                this.addSubCommand(PrepareViewCommand);



            }
        }
    )
})