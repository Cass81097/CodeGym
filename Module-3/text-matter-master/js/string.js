String.prototype.isLowerCase = function()
{
    "use strict";
    var str = this;
    return str == str.toLowerCase() && str != str.toUpperCase();
}