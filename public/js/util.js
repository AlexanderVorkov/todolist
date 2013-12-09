var inherit = (function(){
    function F() {}
    return function (child, parent) {
        F.prototype = parent.prototype;
        child.prototype = new F;
        child.prototype.constructor = child;
        child.superproto = parent.prototype;
        return child;
    };
})();