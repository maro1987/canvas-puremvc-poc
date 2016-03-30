/**
 * @class puremvcjquery.AppConstants
 */
define(['puremvc'],function(puremvc) {
    return puremvc.define({ name: 'app.AppConstants' }, {}, {

            // MVC Notifications
            STARTUP: 'startup',
            SET_SELECTION: 'set_selection',

            //Livecycle Notifications
            REQUEST_ANIMATION_FRAME: 'request_animation_frame',
            REMOTE_KEY_DOWN: 'remote_key_down'
        }
    );
})