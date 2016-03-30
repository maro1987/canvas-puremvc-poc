/**
 * @class app.skystore.service.vo.CarouselVO
 */
define([
    'puremvc',
    'underscore',
    'service/vo/CarouselItemVO'
],function(puremvc,_,CarouselItemVO) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.service.vo.CarouselVO',

        },
        // INSTANCE MEMBERS
        {
            /**
             * @private
             * @return {array}
             */
            items:null,

            /**
             * @public
             * @param {Object} data
             * @return {void}
             */
            parse: function (data) {
                this.items = [];
                _.each(
                    data.assets,
                    function(item, index)
                    {
                        this.items[index] = new CarouselItemVO().parse(item)
                    },
                    this);

                return this;

            }

        },
        // STATIC MEMBERS
        {

        }
    );
})
