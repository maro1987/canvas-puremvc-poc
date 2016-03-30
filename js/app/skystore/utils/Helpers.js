// Place any jQuery/helper plugins in here.
function extend(base, sub) {

    sub.prototype = new base();
    sub.prototype.constructor = sub;
    sub.constructor = base.prototype.constructor
}