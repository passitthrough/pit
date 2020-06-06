parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"kIKx":[function(require,module,exports) {
"use strict";var C;Object.defineProperty(exports,"__esModule",{value:!0}),exports.PriceIndication=void 0,function(C){C.CURRENCY_SYMBOL="€",C.CURRENCY_PREFIX_UC="EUR",C.CURRENCY_PREFIX_LC="eur",C.CURRENCY_PREFIX_CC="Eur",C.CURRENCY_NAME_CC="Euro",C.CURRENCY_NAME_LC="euro",C.CURRENCY_NAME_UC="EURO"}(C=exports.PriceIndication||(exports.PriceIndication={}));
},{}],"Gu2M":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),exports.Flag=void 0,function(e){e.CLASS_EXCLUDE_ITEM="pit-exclude",e.WHITESPACE=" "}(e=exports.Flag||(exports.Flag={}));
},{}],"aX2I":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DomExtract=void 0;var e=require("../enums/price-indication"),i=require("../enums/flag"),t=function(){function t(e){void 0===e&&(e="*"),this.selector=e,this.filter=Array.prototype.filter,this.fetchNodes()}return t.prototype.getTextNodes=function(){return this.filter.call(this.domNodes,function(t){var n=t.childNodes[0];if(!!n&&"string"==typeof n.nodeValue){var r=n.nodeValue.toString();return"string"==typeof t.className&&!t.className.includes(i.Flag.CLASS_EXCLUDE_ITEM)&&(r.includes(e.PriceIndication.CURRENCY_SYMBOL)||r.includes(e.PriceIndication.CURRENCY_PREFIX_UC)||r.includes(e.PriceIndication.CURRENCY_PREFIX_CC)||r.includes(e.PriceIndication.CURRENCY_PREFIX_LC)||r.includes(e.PriceIndication.CURRENCY_NAME_CC)||r.includes(e.PriceIndication.CURRENCY_NAME_LC)||r.includes(e.PriceIndication.CURRENCY_NAME_UC))}return!1})},t.prototype.fetchNodes=function(){return this.domNodes=document.querySelectorAll(this.selector)},t}();exports.DomExtract=t;
},{"../enums/price-indication":"kIKx","../enums/flag":"Gu2M"}],"ZPv3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Detector=void 0;var e=function(){function e(){}return e.prototype.isOnlineshop=function(){return!0},e}();exports.Detector=e;
},{}],"t1nf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PriceParser=void 0;var e=function(){function e(){}return e.prototype.parse=function(e){return parseFloat(e.replace(/[^0-9,]/g,"").replace(/,/g,"."))},e}();exports.PriceParser=e;
},{}],"rqlg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DomExtend=void 0;var e=require("./price-parser"),t=require("../enums/flag"),r=require("../enums/price-indication"),i=function(){function i(t){this.textNodes=t,this.queue=[],this.priceParser=new e.PriceParser,t.length>0&&this.process()}return i.prototype.apply=function(){this.queue.forEach(function(e){e.node.className+=t.Flag.WHITESPACE+t.Flag.CLASS_EXCLUDE_ITEM,e.node.innerHTML+=e.extend,e.applied=!0})},i.prototype.process=function(){var e=this;this.textNodes.forEach(function(t){e.addDomExtendItem(t)})},i.prototype.addDomExtendItem=function(e){var i=this.priceParser.parse(e.childNodes[0].nodeValue);if("number"==typeof i){var n=(.97*i).toFixed(2);this.queue.push({node:e,price:i,extend:'<span class="pitprice '+t.Flag.CLASS_EXCLUDE_ITEM+'">-3%MwSt. ~'+n+r.PriceIndication.CURRENCY_SYMBOL+"</span>",applied:!1})}},i}();exports.DomExtend=i;
},{"./price-parser":"t1nf","../enums/flag":"Gu2M","../enums/price-indication":"kIKx"}],"XEH4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Observer=void 0;var e=require("./dom-extract"),t=require("./detector"),o=require("./dom-extend"),i=function(){function i(e,o){void 0===e&&(e=500),void 0===o&&(o="*"),this.frequency=e,this.selector=o,this.isShop=(new t.Detector).isOnlineshop(),this.isShop?console.info("PIT::onlineshop detected"):console.info("PIT::exit")}return i.prototype.start=function(){var e=this;!this.interval&&this.isShop&&(this.exec(),this.interval=setInterval(function(){e.exec()},this.frequency))},i.prototype.stop=function(){this.interval&&(clearInterval(this.interval),console.info("PIT::stopped"))},i.prototype.exec=function(){new o.DomExtend(new e.DomExtract(this.selector).getTextNodes()).apply()},i}();exports.Observer=i;
},{"./dom-extract":"aX2I","./detector":"ZPv3","./dom-extend":"rqlg"}],"iBZp":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./classes/observer");console.info("PIT::init");var r=new e.Observer;r.start();
},{"./classes/observer":"XEH4"}]},{},["iBZp"], null)