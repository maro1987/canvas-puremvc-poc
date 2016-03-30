/**
 * @class app.skystore.view.common.component.ui.renderer.CarouselItemRenderer
 * @extends app.skystore.view.BaseComponent
 */
define([
    'puremvc',
    'view/BaseComponent',
    'common/core/Colours',
    'service/net/loader/ImageLoader',
    'createjs'
],function(puremvc,BaseComponent, Colours, ImageLoader) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.view.common.component.ui.renderer.CarouselItemRenderer',
            parent: BaseComponent,
            /** @constructor
             *  @param {Image} img
             */
            constructor: function (index) {
                //Call super constructor
                BaseComponent.call(this);



                this.loader = new ImageLoader();



                var bitmap = new createjs.Bitmap("assets/img/default_placeholder_193x275.png");
                bitmap.x = 100;
                this.addChild(bitmap);

                this.image = new createjs.Bitmap();
                this.image.x = 100;
                this.addChild(this.image );

                this.textLabel = new createjs.Text("", "25px SkyScreen", Colours.SELECTED_WHITE);
                this.textLabel.x = 190;
                this.textLabel.y = 50;
                this.addChild(this.textLabel);


                this.borderStroke = new createjs.Shape();
                this.borderStroke.graphics.beginStroke(Colours.FOCUSED_YELLOW);
                this.borderStroke.graphics.setStrokeStyle(5);
                this.borderStroke.snapToPixel = true;
                this.borderStroke.graphics.drawRect(100, 0, 193, 275);
                this.borderStroke.visible = false;
                this.addChild(this.borderStroke);

                this.isSelected = false;

                //this.cache(100, 0, 193, 275)
            }
        },
        // INSTANCE MEMBERS
        {
            /**
             * @private
             * @type {CarouselItemVO}
             */
            _data: Object.defineProperty(this, 'data', {
                get: function() { return this._id; },
                set: function (value) { this._data = value }
            }),

            scope:this,
            loader:null,

            subscription:null,



            textLabel:null,
            /**
             * @private
             * @type {bool}
             */
            isSelected: null,

            image:null,

            /**
             * @private
             * @type {createjs.Shape}
             */
            borderStroke: null,

            /**
             * @public
             * Selects item.
             * @return {void}
             */
            select: function () {
                this.borderStroke.visible = true;
                this.isSelected = true;
                //this.updateCache()
            },

            /**
             * @public
             * Selects item.
             * @return {void}
             */
            deselect: function () {
                this.borderStroke.visible = false;
                this.isSelected = false;
                //this.updateCache()
            },

            setData: function (data,index) {

                var scope = this

                this.image.image = null;
                this.textLabel.text = index;
                this._data = data;
                console.log(index)

                if(this.subscription)
                {
                    this.subscription.dispose()
                    this.subscription = null;
                }


                this.subscription = this.loader
                    .load(this._data._imageURL)
                    .debounce(500)
                    .take(1)
                    .subscribe(function(dat){scope.setPackshot(dat)})
            },

            setPackshot: function(img)
            {
                this.image.image = img;
                this.requestAnimationFrameSignal.dispatch();
            }

        },
        // STATIC MEMBERS
        {

        }
    )
})
