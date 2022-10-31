"use strict";
function altUppercase(test) {
    var out = "";
    var count = 0;
    for (var i = 0; i < test.length; i++) {
        if (count % 2 == 0) {
            out += test[i].toUpperCase();
            count += 1;
        }
        else {
            out += test[i];
            count += 1;
        }
    }
    return out;
}
console.log(altUppercase("stringteste"));
