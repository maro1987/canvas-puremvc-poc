/**
 * @class app.skystore.view.mainmenu.MainMenuView
 */
define([
    'puremvc',
    'jquery',
    'underscore',
    'tweenlite',
    'view/mainmenu/MenuItem'
],function(puremvc,$,_,TweenLite,MenuItem) {
    return puremvc.define(
        // CLASS INFO
        {
            name: 'app.skystore.view.mainmenu.MainMenuView',

            /** @constructor */
            constructor: function () {

                // Add canvas element dynamically with jQuery HTML5 querySelector for DOM retrieval
                $('.background') // Replace this selector with one suitable for you
                    .append('<canvas id="mainMenuContainer" width="1536" height="30"/>')


                $('#mainMenuContainer')
                    .css({
                        position: 'relative',
                        top: '100px'
                    });

                // Create root easelJS Stage element
                this.canvasContainer = new createjs.Stage("mainMenuContainer");

                this.mainMenu = new createjs.Container();


                this.addChild(this.mainMenu);
            }
        },
        // INSTANCE MEMBERS
        {
            /**
             * @public
             * @type {createjs.Stage}
             */
            canvasContainer: null,

            /**
             * @private
             * @type {createjs.Container}
             */
            mainMenu: null,

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
                var pos = -this.getMenuItem(index).x
                TweenLite.to(this.mainMenu, 0.5, {x: pos, onUpdateScope: this, onUpdate: this.requestAnimationFrame})
            },

            /**
             * @public
             * Add child to root canvas element.
             * @param {createjs.DisplayObject} child
             * @return {String}
             */
            addChild: function (child) {
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
             * @private
             * Add item to the end of menu.
             * @param {string} label
             * @param {int} index
             * @return {void}
             */
            addItemsToMainMenu: function (label, index) {
                var menuItem = new MenuItem(label,index);
                if (index > 0)menuItem.x = this.mainMenu.getChildAt(index - 1).x + this.mainMenu.getChildAt(index - 1).getBounds().width + 30;
                this.mainMenu.addChild(menuItem);
            },

            /**
             * @public
             * Build menu.
             * @param {array} menuData
             * @return {void}
             */
            buildMenu: function (menuData) {
                this.mainMenuDataProvider = menuData;
                _.each(menuData, this.addItemsToMainMenu, this);
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
                return this.mainMenu.getChildAt(index);
            },

            /**
             * @public
             * Get selected menu item.
             * @param {int} index
             * @return {puremvcjquery.view.mainmenu.MenuItem}
             */
            getSelectedMenuItem: function ( ) {
                return _.find(this.mainMenu.children, function (menuItem) {
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
