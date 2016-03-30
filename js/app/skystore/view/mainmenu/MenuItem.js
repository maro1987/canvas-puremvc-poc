/**
 * @class app.skystore.view.mainmenu.MenuItem
 * @extends app.skystore.view.BaseComponent
 */
define([
    'puremvc',
    'view/BaseComponent',
    'common/core/Colours'
],function(puremvc,BaseComponent,Colours) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.view.mainmenu.MenuItem',
            parent: BaseComponent,
            /** @constructor
             *  @param {string} label
             */
            constructor: function (label) {
                //Call super constructor
                BaseComponent.call(this);

                this.textLabel = new createjs.Text(label, "25px SkyScreen", Colours.SELECTED_WHITE);
                this.textLabel.x = 100;
                this.addChild(this.textLabel);

                this.isSelected = false;

                //this.cache(100,0,this.getBounds().width,this.getBounds().height);
            }
        },
        // INSTANCE MEMBERS
        {
            /**
             * @private
             * @type {createjs.Text}
             */
            textLabel: null,

            /**
             * @private
             * @type {bool}
             */
            isSelected: null,


            /**
             * @public
             * Selects item.
             * @return {void}
             */
            select: function () {
                this.textLabel.color = Colours.FOCUSED_YELLOW;
                this.isSelected = true;
            },

            /**
             * @public
             * Selects item.
             * @return {void}
             */
            deselect: function () {
                this.textLabel.color = Colours.SELECTED_WHITE;
                this.isSelected = false;
            }
        },
        // STATIC MEMBERS
        {

        }
    )
})
