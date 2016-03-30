/**
 * @class app.skystore.view.browse.BrowseCarouselView
 */
define([
    'puremvc',
    'jquery',
    'underscore',
    'common/component/ui/Carousel'
],function(puremvc,$,_,Carousel) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.view.browse.BrowseCarouselView',

            /** @constructor */
            constructor: function () {

                // Add canvas element dynamically with jQuery HTML5 querySelector for DOM retrieval
                $('.background') // Replace this selector with one suitable for you
                    .append('<canvas id="carouseViewContainer" width="1536" height="275"/>')


                $('#carouseViewContainer')
                    .css({
                        position: 'relative',
                        top: '150px'
                    });

                // Create root easelJS Stage element
                this.canvasContainer = new createjs.Stage("carouseViewContainer");

                this.carousel = new Carousel();



                this.addChild(this.carousel);
            }
        },
        // INSTANCE MEMBERS
        {
            page:0,
            /**
             * @public
             * @type {createjs.Stage}
             */
            canvasContainer: null,

            /**
             * @private
             * @type {createjs.Container}
             */
            carousel: null,

            /**
             * @public
             * @type {array}
             */
            mainMenuDataProvider: null,

            /**
             * @private
             * Move menu right.
             * @return {void}
             */
            moveToIndex: function (index) {

                var pos = -this.getMenuItem(index).x;
               //this.carousel.x =pos;
               //this.carousel.moveToIndex(index)

                TweenLite.to(this.carousel, 0.2, {x: pos, onUpdateScope: this, onCompleteScope:this.carousel, onUpdate: this.requestAnimationFrame, onStart:function(index,scope){scope.carousel.moveToIndex(index)}, onStartParams:[index,this]})
                //TweenLite.to(this.carousel, 0.5, {x: pos, onUpdateScope: this, onCompleteScope:this.carousel, onUpdate: this.requestAnimationFrame})
                //TweenLite.to(this,0.1,{delay:0.1,onStart:function(index,scope){scope.carousel.moveToIndex(index), scope.requestAnimationFrame()}, onStartParams:[index,this]})
                    //, onComplete:this.carousel.moveToIndex, onCompleteParams:[index]


            },

            /**
             * @public
             * Add child to root canvas element.
             * @param {createjs.DisplayObject} child
             * @return {String}
             */
            addChild: function (child) {
                child.requestAnimationFrameSignal.add(this.requestAnimationFrame,this)
                this.canvasContainer.addChild(child);
                this.requestAnimationFrame();
            },

            /**
             * @public
             * Redraw root canvas element.
             * @return {void}
             */
            requestAnimationFrame: function () {
                this.canvasContainer.update();
            },


            /**
             * @public
             * Build menu.
             * @param {array} menuData
             * @return {void}
             */
            buildCarousel: function (carouselData) {
                //this.carousel.requestAnimationFrameSignal.add(this.requestAnimationFrame.call(this))
                this.carousel.buildCarousel(carouselData);
                this.requestAnimationFrame();
            },

            /**
             * @public
             * Set selected menu item.
             * @param {int} index
             * @return {void}
             */
            setSelection: function (index) {
                this.deselect();
                var menuItem = this.getMenuItem(index);
                menuItem.select();
                this.moveToIndex(index);
            },

            /**
             * @public
             * Get menu item.
             * @param {int} index
             * @return {puremvcjquery.view.mainmenu.MenuItem}
             */
            getMenuItem: function (index) {
                return this.carousel.getCarouselItem(index);
            },

            /**
             * @public
             * Get selected menu item.
             * @param {int} index
             * @return {puremvcjquery.view.mainmenu.MenuItem}
             */
            getSelectedMenuItem: function () {
                return _.find(this.carousel.children, function (menuItem) {
                    return menuItem.isSelected == true;
                });
            },

            /**
             * Deselect view
             * @param {bool = false} withAnimationFrame
             * @return {void}
             */
            deselect: function ( withAnimationFrame ) {
                withAnimationFrame = withAnimationFrame || false;
                var selectedItem = this.getSelectedMenuItem() ;
                if (selectedItem)selectedItem.deselect();
                if(withAnimationFrame)this.requestAnimationFrame();
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
