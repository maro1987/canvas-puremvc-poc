/**
 * @class app.skystore.view.app.AppView
 * @implements EventListener
 */
define([
    'puremvc',
    'statsjs',
    'common/core/RemoteKey'
],function(puremvc,Stats,RemoteKey) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.view.app.AppView',
            /** @constructor */
            constructor: function () {
                this.viewComponent = document;

                // listen for input keystrokes, handled by #handleEvent
                this.viewComponent.addEventListener('keydown', this);

                var stats = new Stats();
                stats.setMode(0); // 0: fps, 1: ms

                // align top-left
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';
                stats.domElement.style.width = 300;

                document.body.appendChild( stats.domElement );

                var update = function () {

                    stats.begin();

                    // monitored code goes here

                    stats.end();

                    requestAnimationFrame( update );

                };

                requestAnimationFrame( update );

            }
        },
        // INSTANCE MEMBERS
        {
            /**
             * @private
             * @type {HTMLDocument}
             */
            viewComponent: null,

            /**
             * @public
             * @param {RemoteKey}
             * @type {signals.Signal}
             */
            onKeyDownSignalSignal: new signals.Signal(),

            addEventListener: function (type, listener, useCapture) {
                // delegate to #textForm
                // this.textForm.addEventListener( type, listener, useCapture );
            },
            /**
             * An implementation of the
             * {@link http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Registration-interfaces W3C EventListener interface}.
             * This allows the component to be added to its child components as
             * an event listener, without explicitly specifying a Function callback
             * - the #handleEvent method will be invoked by EventDispatchers automatically.
             *
             * If the component was more complex, actions would be broken
             * out and encapsulated as individual methods.
             *
             * @param {Event} domEvent
             * @return {void}
             * @see
             */
            handleEvent: function (domEvent) {
                switch (domEvent.type) {
                    /*
                     * The TextComponent's reverse as I type option is
                     * enabled and a keypress has been detected- j
                     * ust fire a text changed event
                     */
                    case 'keydown':
                        console.log(domEvent.keyCode)
                        this.onKeyDownSignalSignal.dispatch(RemoteKey.mapKeyCode(domEvent.keyCode))
                        //if (this.checkbox.checked) this.dispatchTextChangedEvent();
                        break;
                    /*
                     * The TextComponent's reverse button has been clicked.
                     * Prevent the form from submitting, and fire a
                     * text changed event
                     */
                    case 'click':
                        //domEvent.preventDefault();
                        //this.dispatchTextChangedEvent();
                        break;
                }
            }
        },
        // STATIC MEMBERS
        {
            /**
             * @static
             * @type {string}
             */
            TEXT_CHANGED: 'textChanged'
        }
    )
})
