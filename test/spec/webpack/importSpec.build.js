/*! For license information please see importSpec.build.js.LICENSE.txt */
(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{JsonPatchError:()=>w,_areEquals:()=>T,applyOperation:()=>A,applyPatch:()=>E,applyReducer:()=>_,deepClone:()=>y,getValueByPointer:()=>b,validate:()=>P,validator:()=>g});var o={};e.r(o),e.d(o,{compare:()=>L,generate:()=>j,observe:()=>D,unobserve:()=>C});var n={};e.r(n),e.d(n,{JsonPatchError:()=>v,_areEquals:()=>T,applyOperation:()=>A,applyPatch:()=>E,applyReducer:()=>_,compare:()=>L,deepClone:()=>s,default:()=>S,escapePathComponent:()=>h,generate:()=>j,getValueByPointer:()=>b,observe:()=>D,unescapePathComponent:()=>f,unobserve:()=>C,validate:()=>P,validator:()=>g});var r,i=(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function o(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),a=Object.prototype.hasOwnProperty;function p(e,t){return a.call(e,t)}function u(e){if(Array.isArray(e)){for(var t=new Array(e.length),o=0;o<t.length;o++)t[o]=""+o;return t}if(Object.keys)return Object.keys(e);var n=[];for(var r in e)p(e,r)&&n.push(r);return n}function s(e){switch(typeof e){case"object":return JSON.parse(JSON.stringify(e));case"undefined":return null;default:return e}}function c(e){for(var t,o=0,n=e.length;o<n;){if(!((t=e.charCodeAt(o))>=48&&t<=57))return!1;o++}return!0}function h(e){return-1===e.indexOf("/")&&-1===e.indexOf("~")?e:e.replace(/~/g,"~0").replace(/\//g,"~1")}function f(e){return e.replace(/~1/g,"/").replace(/~0/g,"~")}function d(e){if(void 0===e)return!0;if(e)if(Array.isArray(e)){for(var t=0,o=e.length;t<o;t++)if(d(e[t]))return!0}else if("object"==typeof e)for(var n=u(e),r=n.length,i=0;i<r;i++)if(d(e[n[i]]))return!0;return!1}function l(e,t){var o=[e];for(var n in t){var r="object"==typeof t[n]?JSON.stringify(t[n],null,2):t[n];void 0!==r&&o.push("".concat(n,": ").concat(r))}return o.join("\n")}var v=function(e){function t(t,o,n,r,i){var a=this.constructor,p=e.call(this,l(t,{name:o,index:n,operation:r,tree:i}))||this;return p.name=o,p.index=n,p.operation=r,p.tree=i,Object.setPrototypeOf(p,a.prototype),p.message=l(t,{name:o,index:n,operation:r,tree:i}),p}return i(t,e),t}(Error),w=v,y=s,m={add:function(e,t,o){return e[t]=this.value,{newDocument:o}},remove:function(e,t,o){var n=e[t];return delete e[t],{newDocument:o,removed:n}},replace:function(e,t,o){var n=e[t];return e[t]=this.value,{newDocument:o,removed:n}},move:function(e,t,o){var n=b(o,this.path);if(this.from!==this.path&&this.path.startsWith(this.from+"/"))throw new w("Cannot move to a path that is a descendant of the source","OPERATION_PATH_CREATES_CIRCULAR_REFERENCE",0,this,o);n&&(n=s(n));var r=A(o,{op:"remove",path:this.from}).removed;return A(o,{op:"add",path:this.path,value:r}),{newDocument:o,removed:n}},copy:function(e,t,o){var n=b(o,this.from);if((""===this.from||"/"===this.from)&&this.path.startsWith("/"))throw new w("Creating a circular reference","OPERATION_PATH_CREATES_CIRCULAR_REFERENCE",0,this,o);return A(o,{op:"add",path:this.path,value:s(n)}),{newDocument:o}},test:function(e,t,o){return{newDocument:o,test:T(e[t],this.value)}},_get:function(e,t,o){return this.value=e[t],{newDocument:o}}},O={add:function(e,t,o){return c(t)?e.splice(t,0,this.value):e[t]=this.value,{newDocument:o,index:t}},remove:function(e,t,o){return{newDocument:o,removed:e.splice(t,1)[0]}},replace:function(e,t,o){var n=e[t];return e[t]=this.value,{newDocument:o,removed:n}},move:m.move,copy:m.copy,test:m.test,_get:m._get};function b(e,t){if(""==t)return e;var o={op:"_get",path:t};return A(e,o),o.value}function A(e,t,o,n,r,i,a){if(void 0===o&&(o=!1),void 0===n&&(n=!0),void 0===r&&(r=!0),void 0===i&&(i=0),o&&("function"==typeof o?o(t,0,e,t.path):g(t,0)),""===t.path){var p={newDocument:e};if("add"===t.op)return p.newDocument=t.value,p;if("replace"===t.op)return p.newDocument=t.value,p.removed=e,p;if("move"===t.op||"copy"===t.op)return p.newDocument=b(e,t.from),"move"===t.op&&(p.removed=e),p;if("test"===t.op){if(p.test=T(e,t.value),!1===p.test)throw new w("Test operation failed","TEST_OPERATION_FAILED",i,t,e);return p.newDocument=e,p}if("remove"===t.op)return p.removed=e,p.newDocument=null,p;if("_get"===t.op)return t.value=e,p;if(o)throw new w("Operation `op` property is not one of operations defined in RFC-6902","OPERATION_OP_INVALID",i,t,e);return p}n||(e=s(e));var u=(t.path||"").split("/"),h=e,d=1,l=u.length,v=void 0,y=void 0,A=void 0;for(A="function"==typeof o?o:g;;){if((y=u[d])&&-1!=y.indexOf("~")&&(y=f(y)),r&&("__proto__"==y||"prototype"==y&&d>0&&"constructor"==u[d-1]))throw new TypeError("JSON-Patch: modifying `__proto__` or `constructor/prototype` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README");if(o&&void 0===v&&(void 0===h[y]?v=u.slice(0,d).join("/"):d==l-1&&(v=t.path),void 0!==v&&A(t,0,e,v)),d++,Array.isArray(h)){if("-"===y)y=h.length;else{if(o&&!c(y))throw new w("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index","OPERATION_PATH_ILLEGAL_ARRAY_INDEX",i,t,e);if(c(y)){if(o&&y.length>15)throw new w("Array index too large","OPERATION_PATH_ARRAY_INDEX_TOO_LARGE",i,t,e);y=~~y}}if(o&&"number"==typeof y&&y>Number.MAX_SAFE_INTEGER)throw new w("Array index too large","OPERATION_PATH_ARRAY_INDEX_TOO_LARGE",i,t,e);if(d>=l){if(o&&"add"===t.op&&"number"==typeof y&&y>h.length)throw new w("The specified index MUST NOT be greater than the number of elements in the array","OPERATION_VALUE_OUT_OF_BOUNDS",i,t,e);if(!1===(p=O[t.op].call(t,h,y,e)).test)throw new w("Test operation failed","TEST_OPERATION_FAILED",i,t,e);return p}}else if(d>=l){if(!1===(p=m[t.op].call(t,h,y,e)).test)throw new w("Test operation failed","TEST_OPERATION_FAILED",i,t,e);return p}if(void 0===h[y]&&a)if("function"==typeof a)h[y]=a(h,t,y);else{var E=u[d];E&&c(E)&&parseInt(E)>=0?h[y]=[]:h[y]={}}if(h=h[y],o&&d<l&&(!h||"object"!=typeof h))throw new w("Cannot perform operation at the desired path","OPERATION_PATH_UNRESOLVABLE",i,t,e)}}function E(e,t,o,n,r){if(void 0===n&&(n=!0),void 0===r&&(r=!0),o&&!Array.isArray(t))throw new w("Patch sequence must be an array","SEQUENCE_NOT_AN_ARRAY");n||(e=s(e));for(var i=new Array(t.length),a=0,p=t.length;a<p;a++)i[a]=A(e,t[a],o,!0,r,a),e=i[a].newDocument;return i.newDocument=e,i}function _(e,t,o){var n=A(e,t);if(!1===n.test)throw new w("Test operation failed","TEST_OPERATION_FAILED",o,t,e);return n.newDocument}function g(e,t,o,n){if("object"!=typeof e||null===e||Array.isArray(e))throw new w("Operation is not an object","OPERATION_NOT_AN_OBJECT",t,e,o);if(!m[e.op])throw new w("Operation `op` property is not one of operations defined in RFC-6902","OPERATION_OP_INVALID",t,e,o);if("string"!=typeof e.path)throw new w("Operation `path` property is not a string","OPERATION_PATH_INVALID",t,e,o);if(0!==e.path.indexOf("/")&&e.path.length>0)throw new w('Operation `path` property must start with "/"',"OPERATION_PATH_INVALID",t,e,o);if(("move"===e.op||"copy"===e.op)&&"string"!=typeof e.from)throw new w("Operation `from` property is not present (applicable in `move` and `copy` operations)","OPERATION_FROM_REQUIRED",t,e,o);if(("add"===e.op||"replace"===e.op||"test"===e.op)&&void 0===e.value)throw new w("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)","OPERATION_VALUE_REQUIRED",t,e,o);if(("add"===e.op||"replace"===e.op||"test"===e.op)&&d(e.value))throw new w("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)","OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED",t,e,o);if(o)if("add"==e.op){var r=e.path.split("/").length,i=n.split("/").length;if(r!==i+1&&r!==i)throw new w("Cannot perform an `add` operation at the desired path","OPERATION_PATH_CANNOT_ADD",t,e,o)}else if("replace"===e.op||"remove"===e.op||"_get"===e.op){if(e.path!==n)throw new w("Cannot perform the operation at a path that does not exist","OPERATION_PATH_UNRESOLVABLE",t,e,o)}else if("move"===e.op||"copy"===e.op){var a=P([{op:"_get",path:e.from,value:void 0}],o);if(a&&"OPERATION_PATH_UNRESOLVABLE"===a.name)throw new w("Cannot perform the operation from a path that does not exist","OPERATION_FROM_UNRESOLVABLE",t,e,o)}}function P(e,t,o){try{if(!Array.isArray(e))throw new w("Patch sequence must be an array","SEQUENCE_NOT_AN_ARRAY");if(t)E(s(t),s(e),o||!0);else{o=o||g;for(var n=0;n<e.length;n++)o(e[n],n,t,void 0)}}catch(e){if(e instanceof w)return e;throw e}}function T(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){var o,n,r,i=Array.isArray(e),a=Array.isArray(t);if(i&&a){if((n=e.length)!=t.length)return!1;for(o=n;0!=o--;)if(!T(e[o],t[o]))return!1;return!0}if(i!=a)return!1;var p=Object.keys(e);if((n=p.length)!==Object.keys(t).length)return!1;for(o=n;0!=o--;)if(!t.hasOwnProperty(p[o]))return!1;for(o=n;0!=o--;)if(!T(e[r=p[o]],t[r]))return!1;return!0}return e!=e&&t!=t}var R=new WeakMap,N=function(e){this.observers=new Map,this.obj=e},x=function(e,t){this.callback=e,this.observer=t};function C(e,t){t.unobserve()}function D(e,t){var o,n=function(e){return R.get(e)}(e);if(n){var r=function(e,t){return e.observers.get(t)}(n,t);o=r&&r.observer}else n=new N(e),R.set(e,n);if(o)return o;if(o={},n.value=s(e),t){o.callback=t,o.next=null;var i=function(){j(o)},a=function(){clearTimeout(o.next),o.next=setTimeout(i)};"undefined"!=typeof window&&(window.addEventListener("mouseup",a),window.addEventListener("keyup",a),window.addEventListener("mousedown",a),window.addEventListener("keydown",a),window.addEventListener("change",a))}return o.patches=[],o.object=e,o.unobserve=function(){j(o),clearTimeout(o.next),function(e,t){e.observers.delete(t.callback)}(n,o),"undefined"!=typeof window&&(window.removeEventListener("mouseup",a),window.removeEventListener("keyup",a),window.removeEventListener("mousedown",a),window.removeEventListener("keydown",a),window.removeEventListener("change",a))},n.observers.set(t,new x(t,o)),o}function j(e,t){void 0===t&&(t=!1);var o=R.get(e.object);I(o.value,e.object,e.patches,"",t),e.patches.length&&E(o.value,e.patches);var n=e.patches;return n.length>0&&(e.patches=[],e.callback&&e.callback(n)),n}function I(e,t,o,n,r){if(t!==e){"function"==typeof t.toJSON&&(t=t.toJSON());for(var i=u(t),a=u(e),c=!1,f=a.length-1;f>=0;f--){var d=e[v=a[f]];if(!p(t,v)||void 0===t[v]&&void 0!==d&&!1===Array.isArray(t))Array.isArray(e)===Array.isArray(t)?(r&&o.push({op:"test",path:n+"/"+h(v),value:s(d)}),o.push({op:"remove",path:n+"/"+h(v)}),c=!0):(r&&o.push({op:"test",path:n,value:e}),o.push({op:"replace",path:n,value:t}));else{var l=t[v];"object"==typeof d&&null!=d&&"object"==typeof l&&null!=l&&Array.isArray(d)===Array.isArray(l)?I(d,l,o,n+"/"+h(v),r):d!==l&&(r&&o.push({op:"test",path:n+"/"+h(v),value:s(d)}),o.push({op:"replace",path:n+"/"+h(v),value:s(l)}))}}if(c||i.length!=a.length)for(f=0;f<i.length;f++){var v;p(e,v=i[f])||void 0===t[v]||o.push({op:"add",path:n+"/"+h(v),value:s(t[v])})}}}function L(e,t,o){void 0===o&&(o=!1);var n=[];return I(e,t,n,"",o),n}const S=Object.assign({},t,o,{JsonPatchError:v,deepClone:s,escapePathComponent:h,unescapePathComponent:f});function B(e){expect(typeof e).withContext("result from import should be an object").toEqual("object"),expect(typeof e).withContext("result from import should not be a function").not.toEqual("function"),expect(e.applyOperation).withContext("applyOperation should be a method within the object").toBeDefined(),expect(e.applyPatch).withContext("applyPatch should be a method within the object").toBeDefined(),expect(e.applyReducer).withContext("applyReducer should be a method within the object").toBeDefined(),expect(e.getValueByPointer).withContext("getValueByPointer should be a method within the object").toBeDefined(),expect(e.validate).withContext("validate should be a method within the object").toBeDefined(),expect(e.validator).withContext("validator should be a method within the object").toBeDefined(),expect(e._areEquals).withContext("_areEquals should be a method within the object").toBeDefined(),expect(e.JsonPatchError).withContext("JsonPatchError should be a method within the object").toBeDefined(),expect(e.deepClone).withContext("deepClone should be a method within the object").toBeDefined(),expect(e.escapePathComponent).withContext("escapePathComponent should be a method within the object").toBeDefined(),expect(e.unescapePathComponent).withContext("unescapePathComponent should be a method within the object").toBeDefined(),expect(e.unobserve).withContext("unobserve should be a method within the object").toBeDefined(),expect(e.observe).withContext("observe should be a method within the object").toBeDefined(),expect(e.generate).withContext("generate should be a method within the object").toBeDefined(),expect(e.compare).withContext("compare should be a method within the object").toBeDefined()}describe("This package imported by Webpack",(function(){describe("import default",(function(){it("should have the expected structure",(function(){B(S)}))})),describe("import asterisk",(function(){it("should have the expected structure",(function(){B(n)}))})),describe("named import",(function(){it("should have the expected structure",(function(){expect(A).withContext("applyOperation should be defined").toBeDefined()}))}))}))})();