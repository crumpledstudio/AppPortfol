// Device.js
// (c) 2014 Matthew Hudson
// Device.js is freely distributable under the MIT license.
// For all details and documentation:
// http://matthewhudson.me/projects/device.js/
(function(){var n,e,o,t,i,r,d,a,c,l;
// Save the previous value of the device variable.
e=window.device,n={},
// Add device as a global object.
window.device=n,
// The <html> element.
t=window.document.documentElement,
// The client user agent string.
// Lowercase, so we can use the more efficient indexOf(), instead of Regex
l=window.navigator.userAgent.toLowerCase(),
// Main functions
// --------------
n.ios=function(){return n.iphone()||n.ipod()||n.ipad()},n.iphone=function(){return!n.windows()&&i("iphone")},n.ipod=function(){return i("ipod")},n.ipad=function(){return i("ipad")},n.android=function(){return!n.windows()&&i("android")},n.androidPhone=function(){return n.android()&&i("mobile")},n.androidTablet=function(){return n.android()&&!i("mobile")},n.blackberry=function(){return i("blackberry")||i("bb10")||i("rim")},n.blackberryPhone=function(){return n.blackberry()&&!i("tablet")},n.blackberryTablet=function(){return n.blackberry()&&i("tablet")},n.windows=function(){return i("windows")},n.windowsPhone=function(){return n.windows()&&i("phone")},n.windowsTablet=function(){return n.windows()&&i("touch")&&!n.windowsPhone()},n.fxos=function(){return(i("(mobile;")||i("(tablet;"))&&i("; rv:")},n.fxosPhone=function(){return n.fxos()&&i("mobile")},n.fxosTablet=function(){return n.fxos()&&i("tablet")},n.meego=function(){return i("meego")},n.cordova=function(){return window.cordova&&"file:"===location.protocol},n.nodeWebkit=function(){return"object"==typeof window.process},n.mobile=function(){return n.androidPhone()||n.iphone()||n.ipod()||n.windowsPhone()||n.blackberryPhone()||n.fxosPhone()||n.meego()},n.tablet=function(){return n.ipad()||n.androidTablet()||n.blackberryTablet()||n.windowsTablet()||n.fxosTablet()},n.desktop=function(){return!n.tablet()&&!n.mobile()},n.television=function(){var n;for(television=["googletv","viera","smarttv","internet.tv","netcast","nettv","appletv","boxee","kylo","roku","dlnadoc","roku","pov_tv","hbbtv","ce-html"],n=0;n<television.length;){if(i(television[n]))return!0;n++}return!1},n.portrait=function(){return window.innerHeight/window.innerWidth>1},n.landscape=function(){return window.innerHeight/window.innerWidth<1},
// Public Utility Functions
// ------------------------
// Run device.js in noConflict mode,
// returning the device variable to its previous owner.
n.noConflict=function(){return window.device=e,this},
// Private Utility Functions
// -------------------------
// Simple UA string search
i=function(n){return l.indexOf(n)!==-1},
// Check if documentElement already has a given class.
d=function(n){var e;return e=new RegExp(n,"i"),t.className.match(e)},
// Add one or more CSS classes to the <html> element.
o=function(n){var e=null;d(n)||(e=t.className.replace(/^\s+|\s+$/g,""),t.className=e+" "+n)},
// Remove single CSS class from the <html> element.
c=function(n){d(n)&&(t.className=t.className.replace(" "+n,""))},
// HTML Element Handling
// ---------------------
// Insert the appropriate CSS class based on the _user_agent.
n.ios()?n.ipad()?o("ios ipad tablet"):n.iphone()?o("ios iphone mobile"):n.ipod()&&o("ios ipod mobile"):n.android()?o(n.androidTablet()?"android tablet":"android mobile"):n.blackberry()?o(n.blackberryTablet()?"blackberry tablet":"blackberry mobile"):n.windows()?o(n.windowsTablet()?"windows tablet":n.windowsPhone()?"windows mobile":"desktop"):n.fxos()?o(n.fxosTablet()?"fxos tablet":"fxos mobile"):n.meego()?o("meego mobile"):n.nodeWebkit()?o("node-webkit"):n.television()?o("television"):n.desktop()&&o("desktop"),n.cordova()&&o("cordova"),
// Orientation Handling
// --------------------
// Handle device orientation changes.
r=function(){n.landscape()?(c("portrait"),o("landscape")):(c("landscape"),o("portrait"))},
// Detect whether device supports orientationchange event,
// otherwise fall back to the resize event.
a=Object.prototype.hasOwnProperty.call(window,"onorientationchange")?"orientationchange":"resize",
// Listen for changes in orientation.
window.addEventListener?window.addEventListener(a,r,!1):window.attachEvent?window.attachEvent(a,r):window[a]=r,r(),"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return n}):"undefined"!=typeof module&&module.exports?module.exports=n:window.device=n}).call(this);