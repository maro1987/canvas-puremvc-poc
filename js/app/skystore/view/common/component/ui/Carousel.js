/**
 * @class app.skystore.view.common.component.ui.Carousel
 * @extends app.skystore.view.BaseComponent
 */
define([
    'puremvc',
    'underscore',
    'view/BaseComponent',
    'common/component/ui/renderer/CarouselItemRenderer'
],function(puremvc,_,BaseComponent,CarouselItemRenderer) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.view.common.component.ui.Carousel',
            parent: BaseComponent,
            /** @constructor
             */
            constructor: function () {
                //Call super constructor
                BaseComponent.call(this);


            }
        },
        // INSTANCE MEMBERS
        {
            /**
             * @constant
             * @type {int}
             */

            ITEMS_ON_STAGE: 7,

            /**
             * @private
             * @type {int}
             */
            currentIndex: 0,
            /**
             * @private
             * @type {array}
             */
            carouselDataProvider: null,

            /**
             * @private
             * Add item to the end of menu.
             * @param {CarouselItemVO} data
             * @param {int} index
             * @return {void}
             */
            addItemsToCarousel: function (data, index) {
                var carouselItem = new CarouselItemRenderer(index);

                carouselItem.setData(this.carouselDataProvider[index],index)
                if(index > 0)carouselItem.x = this.getChildAt(index-1).x + 193 + 30;
                this.addChild(carouselItem);
            },

            /**
             * @public
             * Build carousel.
             * @param {array} carouselData
             * @return {void}
             */
            buildCarousel: function (carouselData) {
                this.carouselDataProvider = carouselData;
                for(var i=0; i <= this.ITEMS_ON_STAGE; i++)
                {
                    this.addItemsToCarousel(carouselData[i],i);
                }
                //_.each(carouselData, this.addItemsToCarousel, this);

            },

            getCarouselItem: function (index) {
                return this.getChildAt(index%(this.ITEMS_ON_STAGE+1));
            },

            /**
             * @public
             * Build carousel.
             * @param {array} carouselData
             * @return {void}
             */
            moveToIndex: function (index) {
                var carouselItem
                var lastcarouselItemIndex
                var lastcarouselItem;
                if(index +this.ITEMS_ON_STAGE-1 < this.carouselDataProvider.length)
                {


                    if(this.currentIndex < index)
                    {
                        if(index > 1)
                        {
                            carouselItem = this.getCarouselItem(index-2);
                            lastcarouselItemIndex= index-3;

                            if(lastcarouselItemIndex<0){lastcarouselItemIndex = this.ITEMS_ON_STAGE}

                            lastcarouselItem = this.getCarouselItem(lastcarouselItemIndex)

                            carouselItem.x = lastcarouselItem.x +193 + 30;
                            carouselItem.setData(this.carouselDataProvider[index+this.ITEMS_ON_STAGE-1],index+this.ITEMS_ON_STAGE-1);
                        }
                    }else{
                        if(index > 0)
                        {
                            carouselItem = this.getCarouselItem(index - 1);
                            lastcarouselItemIndex = index;

                            var lastcarouselItem = this.getCarouselItem(lastcarouselItemIndex)

                            carouselItem.x = lastcarouselItem.x - 193 - 30;
                            carouselItem.setData(this.carouselDataProvider[index-1],index-1);
                        }
                    }

                    this.currentIndex = index;

                }

            }

        },
        // STATIC MEMBERS
        {

        }
    )
})
