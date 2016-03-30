/**
 * @class app.skystore.view.BaseComponent
 */
define([
    'puremvc',
    'signal',
    'createjs'
],function(puremvc,Signal) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.view.BaseComponent',
            parent: createjs.Container,
            /** @constructor */
            constructor: function () {
                //Call super constructor
                createjs.Container.call(this);
            }
        },
        // INSTANCE MEMBERS
        {
            /**
             * @public
             * @type {signals.Signal}
             */
            requestAnimationFrameSignal: new Signal()

        },
        // STATIC MEMBERS
        {

        }
    )
})
