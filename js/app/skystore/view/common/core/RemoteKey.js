/**
 * @class app.skystore.view.common.core.RemoteKey
 */
define([
    'puremvc',
    'common/core/RemoteKey'
],function(puremvc,RemoteKey) {
    return puremvc.define({ name: 'app.skystore.view.common.core.RemoteKey' }, {}, {

            RIGHT: 39,
            LEFT: 37,
            DOWN: 40,
            UP: 38,

            /**
             * @static
             * Add child to root canvas element.
             * @param {int} keyCode
             * @return {app.skystore.view.common.core.RemoteKey}
             */
            mapKeyCode: function (keyCode) {
                switch (keyCode) {
                    case 39:
                        return app.skystore.view.common.core.RemoteKey.RIGHT;
                        break;
                    case 37:
                        return app.skystore.view.common.core.RemoteKey.LEFT;
                        break;
                    case 40:
                        return app.skystore.view.common.core.RemoteKey.DOWN;
                        break;
                    case 38:
                        return app.skystore.view.common.core.RemoteKey.UP;
                        break;
                }
            }

        }
    )
})

