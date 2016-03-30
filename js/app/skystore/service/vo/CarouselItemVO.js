/**
 * @class app.skystore.service.vo.CarouselItemVO
 */
define(['puremvc'],function(puremvc) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.service.vo.CarouselItemVO',
            /** @constructor
             */
            constructor: function ( ) {

            }
        },
        // INSTANCE MEMBERS
        {
            /**
             * @private
             * @type {String}
             */
            _id: Object.defineProperty(this, 'id', {
                get: function() { return this._id; }
            }),

            /**
             * @private
             * @type {String}
             */
            _title: Object.defineProperty(this, 'title', {
                get: function() { return this._title }
            }),

            /**
             * @private
             * @type {String}
             */
            _imageURL: Object.defineProperty(this, 'imageURL', {
                get: function() { return this._imageURL }
            }),

            /**
             * @public
             * @param {Object} data
             * @return {void}
             */
            parse: function (data) {

                this._id = data.id;
                this._title = data.title;
                this._imageURL = data.links[0].href;

                return this;

            }
        },
        // STATIC MEMBERS
        {

        }
    );
})
