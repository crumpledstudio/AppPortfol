/*!
 * Modernizr v2.8.3
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */
/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */
window.Modernizr=function(e,t,n){/**
     * setCss applies given styles to the Modernizr DOM node.
     */
function r(e){b.cssText=e}/**
     * setCssAll extrapolates all vendor-specific css strings.
     */
function o(e,t){return r(S.join(e+";")+(t||""))}/**
     * is returns a boolean for if typeof obj is exactly type.
     */
function a(e,t){return typeof e===t}/**
     * contains returns a boolean for if substr is found within str.
     */
function i(e,t){return!!~(""+e).indexOf(t)}/*>>testprop*/
// testProps is a generic CSS / DOM property test.
// In testing support for a given CSS property, it's legit to test:
//    `elem.style[styleName] !== undefined`
// If the property is supported it will return an empty string,
// if unsupported it will return undefined.
// We'll take advantage of this quick test and skip setting a style
// on our modernizr element, but instead just testing undefined vs
// empty string.
// Because the testing of the CSS property names (with "-", as
// opposed to the camelCase DOM properties) is non-portable and
// non-standard but works in WebKit and IE (but not Gecko or Opera),
// we explicitly reject properties with dashes so that authors
// developing in WebKit or IE first don't end up with
// browser-specific content by accident.
function c(e,t){for(var r in e){var o=e[r];if(!i(o,"-")&&b[o]!==n)return"pfx"!=t||o}return!1}/*>>testprop*/
// TODO :: add testDOMProps
/**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
function s(e,t,r){for(var o in e){var i=t[e[o]];if(i!==n)
// return the property name as a string
// return the property name as a string
// let's bind a function
return r===!1?e[o]:a(i,"function")?i.bind(r||t):i}return!1}/*>>testallprops*/
/**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
function u(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),o=(e+" "+k.join(r+" ")+r).split(" ");
// did they call .prefixed('boxSizing') or are we just testing a prop?
// did they call .prefixed('boxSizing') or are we just testing a prop?
return a(t,"string")||a(t,"undefined")?c(o,t):(o=(e+" "+T.join(r+" ")+r).split(" "),s(o,t,n))}/*>>webforms*/
// input features and input types go directly onto the ret object, bypassing the tests loop.
// Hold this guy to execute in a moment.
function l(){/*>>input*/
// Run through HTML5's new input attributes to see if the UA understands any.
// We're using f which is the <input> element created early on
// Mike Taylr has created a comprehensive resource for testing these attributes
//   when applied to all input types:
//   miketaylr.com/code/input-type-attr.html
// spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
// Only input placeholder is tested while textarea's placeholder is not.
// Currently Safari 4 and Opera 11 have support only for the input placeholder
// Both tests are available in feature-detects/forms-placeholder.js
p.input=function(n){for(var r=0,o=n.length;r<o;r++)j[n[r]]=!!(n[r]in E);
// safari false positive's on datalist: webk.it/74252
// see also github.com/Modernizr/Modernizr/issues/146
return j.list&&(j.list=!(!t.createElement("datalist")||!e.HTMLDataListElement)),j}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),/*>>input*/
/*>>inputtypes*/
// Run through HTML5's new input types to see if the UA understands any.
//   This is put behind the tests runloop because it doesn't return a
//   true/false like all the other tests; instead, it returns an object
//   containing each input type with its corresponding true/false value
// Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
p.inputtypes=function(e){for(var r,o,a,i=0,c=e.length;i<c;i++)E.setAttribute("type",o=e[i]),r="text"!==E.type,
// We first check to see if the type we give it sticks..
// If the type does, we feed it a textual value, which shouldn't be valid.
// If the value doesn't stick, we know there's input sanitization which infers a custom UI
r&&(E.value=x,E.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(o)&&E.style.WebkitAppearance!==n?(g.appendChild(E),a=t.defaultView,
// Safari 2-4 allows the smiley as a value, despite making a slider
r=a.getComputedStyle&&"textfield"!==a.getComputedStyle(E,null).WebkitAppearance&&
// Mobile android web browser has false positive, so must
// check the height to see if the widget is actually there.
0!==E.offsetHeight,g.removeChild(E)):/^(search|tel)$/.test(o)||(
// Real url and email support comes with prebaked validation.
r=/^(url|email)$/.test(o)?E.checkValidity&&E.checkValidity()===!1:E.value!=x)),P[e[i]]=!!r;return P}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d,f,m="2.8.3",p={},/*>>cssclasses*/
// option for enabling the HTML classes to be added
h=!0,/*>>cssclasses*/
g=t.documentElement,/**
     * Create our "modernizr" element that we do most feature tests on.
     */
v="modernizr",y=t.createElement(v),b=y.style,/**
     * Create the input element for various Web Forms feature tests.
     */
E=t.createElement("input"),/*>>smile*/
x=":)",/*>>smile*/
w={}.toString,
// TODO :: make the prefixes more granular
/*>>prefixes*/
// List of property values to set for css tests. See ticket #21
S=" -webkit- -moz- -o- -ms- ".split(" "),/*>>prefixes*/
/*>>domprefixes*/
// Following spec is to expose vendor-specific style properties as:
//   elem.style.WebkitBorderRadius
// and the following would be incorrect:
//   elem.style.webkitBorderRadius
// Webkit ghosts their properties in lowercase but Opera & Moz do not.
// Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
//   erik.eae.net/archives/2008/03/10/21.48.10/
// More here: github.com/Modernizr/Modernizr/issues/issue/21
C="Webkit Moz O ms",k=C.split(" "),T=C.toLowerCase().split(" "),/*>>domprefixes*/
/*>>ns*/
N={svg:"http://www.w3.org/2000/svg"},/*>>ns*/
M={},P={},j={},$=[],D=$.slice,// used in testing loop
/*>>teststyles*/
// Inject element with style element and some CSS rules
F=function(e,n,r,o){var a,i,c,s,u=t.createElement("div"),
// After page load injecting a fake body doesn't work so check if body exists
l=t.body,
// IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
d=l||t.createElement("body");if(parseInt(r,10))
// In order not to give false positives we create a node for each test
// This also allows the method to scale for unspecified uses
for(;r--;)c=t.createElement("div"),c.id=o?o[r]:v+(r+1),u.appendChild(c);
// <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
// when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
// with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
// msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
// Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
// IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
// Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
//avoid crashing IE8, if background image is used
//Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
// If this is done after page load we don't want to remove the body so check if body exists
return a=["&#173;",'<style id="s',v,'">',e,"</style>"].join(""),u.id=v,(l?u:d).innerHTML+=a,d.appendChild(u),l||(d.style.background="",d.style.overflow="hidden",s=g.style.overflow,g.style.overflow="hidden",g.appendChild(d)),i=n(u,e),l?u.parentNode.removeChild(u):(d.parentNode.removeChild(d),g.style.overflow=s),!!i},/*>>teststyles*/
/*>>mq*/
// adapted from matchMedia polyfill
// by Scott Jehl and Paul Irish
// gist.github.com/786768
z=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var r;return F("@media "+t+" { #"+v+" { position: absolute; } }",function(t){r="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),r},/*>>mq*/
/*>>hasevent*/
//
// isEventSupported determines if a given element supports the given event
// kangax.github.com/iseventsupported/
//
// The following results are known incorrects:
//   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
//   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
//   ...
A=function(){function e(e,o){o=o||t.createElement(r[e]||"div"),e="on"+e;
// When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
var i=e in o;
// If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
// If property was created, "remove it" (by setting value to `undefined`)
return i||(o.setAttribute||(o=t.createElement("div")),o.setAttribute&&o.removeAttribute&&(o.setAttribute(e,""),i=a(o[e],"function"),a(o[e],"undefined")||(o[e]=n),o.removeAttribute(e))),o=null,i}var r={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return e}(),/*>>hasevent*/
// TODO :: Add flag for hasownprop ? didn't last time
// hasOwnProperty shim by kangax needed for Safari 2.0 support
L={}.hasOwnProperty;f=a(L,"undefined")||a(L.call,"undefined")?function(e,t){/* yes, this can give false positives/negatives, but most of the time we don't care about those */
return t in e&&a(e.constructor.prototype[t],"undefined")}:function(e,t){return L.call(e,t)},
// Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
// es5.github.com/#x15.3.4.5
Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=D.call(arguments,1),r=function(){if(this instanceof r){var o=function(){};o.prototype=t.prototype;var a=new o,i=t.apply(a,n.concat(D.call(arguments)));return Object(i)===i?i:a}return t.apply(e,n.concat(D.call(arguments)))};return r}),/*>>testallprops*/
/**
     * Tests
     * -----
     */
// The *new* flexbox
// dev.w3.org/csswg/css3-flexbox
M.flexbox=function(){return u("flexWrap")},
// The *old* flexbox
// www.w3.org/TR/2009/WD-css3-flexbox-20090723/
M.flexboxlegacy=function(){return u("boxDirection")},
// On the S60 and BB Storm, getContext exists, but always returns undefined
// so we actually have to call getContext() to verify
// github.com/Modernizr/Modernizr/issues/issue/97/
M.canvas=function(){var e=t.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))},M.canvastext=function(){return!(!p.canvas||!a(t.createElement("canvas").getContext("2d").fillText,"function"))},
// webk.it/70117 is tracking a legit WebGL feature detect proposal
// We do a soft detect which may false positive in order to avoid
// an expensive context creation: bugzil.la/732441
M.webgl=function(){return!!e.WebGLRenderingContext},/*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */
M.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:F(["@media (",S.join("touch-enabled),("),v,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},
// geolocation is often considered a trivial feature detect...
// Turns out, it's quite tricky to get right:
//
// Using !!navigator.geolocation does two things we don't want. It:
//   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
//   2. Disables page caching in WebKit: webk.it/43956
//
// Meanwhile, in Firefox < 8, an about:config setting could expose
// a false positive that would throw an exception: bugzil.la/688158
M.geolocation=function(){return"geolocation"in navigator},M.postmessage=function(){return!!e.postMessage},
// Chrome incognito mode used to throw an exception when using openDatabase
// It doesn't anymore.
M.websqldatabase=function(){return!!e.openDatabase},
// Vendors had inconsistent prefixing with the experimental Indexed DB:
// - Webkit's implementation is accessible through webkitIndexedDB
// - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
// For speed, we don't test the legacy (and beta-only) indexedDB
M.indexedDB=function(){return!!u("indexedDB",e)},
// documentMode logic from YUI to filter out IE8 Compat Mode
//   which false positives.
M.hashchange=function(){return A("hashchange",e)&&(t.documentMode===n||t.documentMode>7)},
// Per 1.6:
// This used to be Modernizr.historymanagement but the longer
// name has been deprecated in favor of a shorter and property-matching one.
// The old API is still available in 1.6, but as of 2.0 will throw a warning,
// and in the first release thereafter disappear entirely.
M.history=function(){return!(!e.history||!history.pushState)},M.draganddrop=function(){var e=t.createElement("div");return"draggable"in e||"ondragstart"in e&&"ondrop"in e},
// FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
// will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
// FF10 still uses prefixes, so check for it until then.
// for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
M.websockets=function(){return"WebSocket"in e||"MozWebSocket"in e},
// css-tricks.com/rgba-browser-support/
M.rgba=function(){
// Set an rgba() color and check the returned value
return r("background-color:rgba(150,255,150,.5)"),i(b.backgroundColor,"rgba")},M.hsla=function(){
// Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
//   except IE9 who retains it as hsla
return r("background-color:hsla(120,40%,100%,.5)"),i(b.backgroundColor,"rgba")||i(b.backgroundColor,"hsla")},M.multiplebgs=function(){
// If the UA supports multiple backgrounds, there should be three occurrences
//   of the string "url(" in the return value for elemStyle.background
// Setting multiple images AND a color on the background shorthand property
//  and then querying the style.background property value for the number of
//  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!
return r("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(b.background)},
// this will false positive in Opera Mini
//   github.com/Modernizr/Modernizr/issues/396
M.backgroundsize=function(){return u("backgroundSize")},M.borderimage=function(){return u("borderImage")},
// Super comprehensive table about all the unique implementations of
// border-radius: muddledramblings.com/table-of-css3-border-radius-compliance
M.borderradius=function(){return u("borderRadius")},
// WebOS unfortunately false positives on this test.
M.boxshadow=function(){return u("boxShadow")},
// FF3.0 will false positive on this test
M.textshadow=function(){return""===t.createElement("div").style.textShadow},M.opacity=function(){
// The non-literal . in this regex is intentional:
//   German Chrome returns this value as 0,55
// github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
// Browsers that actually have CSS Opacity implemented have done so
//  according to spec, which means their return values are within the
//  range of [0.0,1.0] - including the leading zero.
return o("opacity:.55"),/^0.55$/.test(b.opacity)},
// Note, Android < 4 will pass this test, but can only animate
//   a single property at a time
//   goo.gl/v3V4Gp
M.cssanimations=function(){return u("animationName")},M.csscolumns=function(){return u("columnCount")},M.cssgradients=function(){/**
         * For CSS Gradients syntax, please see:
         * webkit.org/blog/175/introducing-css-gradients/
         * developer.mozilla.org/en/CSS/-moz-linear-gradient
         * developer.mozilla.org/en/CSS/-moz-radial-gradient
         * dev.w3.org/csswg/css3-images/#gradients-
         */
var e="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",n="linear-gradient(left top,#9f9, white);";
// legacy webkit syntax (FIXME: remove when syntax not in use anymore)
// standard syntax             // trailing 'background-image:'
return r((e+"-webkit- ".split(" ").join(t+e)+S.join(n+e)).slice(0,-e.length)),i(b.backgroundImage,"gradient")},M.cssreflections=function(){return u("boxReflect")},M.csstransforms=function(){return!!u("transform")},M.csstransforms3d=function(){var e=!!u("perspective");
// Webkit's 3D transforms are passed off to the browser's own graphics renderer.
//   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
//   some conditions. As a result, Webkit typically recognizes the syntax but
//   will sometimes throw a false positive, thus we must do a more thorough check:
// Webkit allows this media query to succeed only if the feature is enabled.
// `@media (transform-3d),(-webkit-transform-3d){ ... }`
return e&&"webkitPerspective"in g.style&&F("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e},M.csstransitions=function(){return u("transition")},/*>>fontface*/
// @font-face detection routine by Diego Perini
// javascript.nwbox.com/CSSSupport/
// false positives:
//   WebOS github.com/Modernizr/Modernizr/issues/342
//   WP7   github.com/Modernizr/Modernizr/issues/538
M.fontface=function(){var e;return F('@font-face {font-family:"font";src:url("https://")}',function(n,r){var o=t.getElementById("smodernizr"),a=o.sheet||o.styleSheet,i=a?a.cssRules&&a.cssRules[0]?a.cssRules[0].cssText:a.cssText||"":"";e=/src/i.test(i)&&0===i.indexOf(r.split(" ")[0])}),e},/*>>fontface*/
// CSS generated content detection
M.generatedcontent=function(){var e;return F(["#",v,"{font:0/0 a}#",v,':after{content:"',x,'";visibility:hidden;font:3px/1 a}'].join(""),function(t){e=t.offsetHeight>=3}),e},
// These tests evaluate support of the video/audio elements, as well as
// testing what types of content they support.
//
// We're using the Boolean constructor here, so that we can extend the value
// e.g.  Modernizr.video     // true
//       Modernizr.video.ogg // 'probably'
//
// Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
//                     thx to NielsLeenheer and zcorpan
// Note: in some older browsers, "no" was a return value instead of empty string.
//   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
//   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5
M.video=function(){var e=t.createElement("video"),n=!1;
// IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),
// Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(e){}return n},M.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),
// Mimetypes accepted:
//   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
//   bit.ly/iphoneoscodecs
n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(e){}return n},
// In FF4, if disabled, window.localStorage should === null.
// Normally, we could not test that directly and need to do a
//   `('localStorage' in window) && ` test first because otherwise Firefox will
//   throw bugzil.la/365772 if cookies are disabled
// Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
// will throw the exception:
//   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
// Peculiarly, getItem and removeItem calls do not throw.
// Because we are forced to try/catch this, we'll go aggressive.
// Just FWIW: IE8 Compat mode supports these features completely:
//   www.quirksmode.org/dom/html5.html
// But IE8 doesn't support either with local files
M.localstorage=function(){try{return localStorage.setItem(v,v),localStorage.removeItem(v),!0}catch(e){return!1}},M.sessionstorage=function(){try{return sessionStorage.setItem(v,v),sessionStorage.removeItem(v),!0}catch(e){return!1}},M.webworkers=function(){return!!e.Worker},M.applicationcache=function(){return!!e.applicationCache},
// Thanks to Erik Dahlstrom
M.svg=function(){return!!t.createElementNS&&!!t.createElementNS(N.svg,"svg").createSVGRect},
// specifically for SVG inline in HTML, not within XHTML
// test page: paulirish.com/demo/inline-svg
M.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==N.svg},
// SVG SMIL animation
M.smil=function(){return!!t.createElementNS&&/SVGAnimate/.test(w.call(t.createElementNS(N.svg,"animate")))},
// This test is only for clip paths in SVG proper, not clip paths on HTML content
// demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg
// However read the comments to dig into applying SVG clippaths to HTML content here:
//   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
M.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(w.call(t.createElementNS(N.svg,"clipPath")))};/*>>webforms*/
// End of test definitions
// -----------------------
// Run through all tests and detect their support in the current UA.
// todo: hypothetically we could be doing an array of tests and use a basic loop here.
for(var H in M)f(M,H)&&(
// run the test, throw the return value into the Modernizr,
//   then based on that boolean, define an appropriate className
//   and push it into an array of classes we'll join later.
d=H.toLowerCase(),p[d]=M[H](),$.push((p[d]?"":"no-")+d));/*>>cssclasses*/
/*>>webforms*/
// input tests need to run.
/*>>webforms*/
/**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
// Reset modElem.cssText to nothing to reduce memory footprint.
/*>>shiv*/
// Assign private properties to the return object with prefix
// expose these for the plugin API. Look in the source for how to join() them against your input
/*>>prefixes*/
/*>>prefixes*/
/*>>domprefixes*/
/*>>domprefixes*/
/*>>mq*/
// Modernizr.mq tests a given media query, live against the current state of the window
// A few important notes:
//   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
//   * A max-width or orientation query will be evaluated against the current state, which may change later.
//   * You must specify values. Eg. If you are testing support for the min-width media query use:
//       Modernizr.mq('(min-width:0)')
// usage:
// Modernizr.mq('only screen and (max-width:768)')
/*>>mq*/
/*>>hasevent*/
// Modernizr.hasEvent() detects support for a given event, with an optional element to test on
// Modernizr.hasEvent('gesturestart', elem)
/*>>hasevent*/
/*>>testprop*/
// Modernizr.testProp() investigates whether a given style property is recognized
// Note that the property names must be provided in the camelCase variant.
// Modernizr.testProp('pointerEvents')
/*>>testprop*/
/*>>testallprops*/
// Modernizr.testAllProps() investigates whether a given style property,
//   or any of its vendor-prefixed variants, is recognized
// Note that the property names must be provided in the camelCase variant.
// Modernizr.testAllProps('boxSizing')
/*>>testallprops*/
/*>>teststyles*/
// Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
// Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
/*>>teststyles*/
/*>>prefixed*/
// Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
// Modernizr.prefixed('boxSizing') // 'MozBoxSizing'
// Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
// Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
//
//     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
// If you're trying to ascertain which transition end event to bind to, you might do something like...
//
//     var transEndEventNames = {
//       'WebkitTransition' : 'webkitTransitionEnd',
//       'MozTransition'    : 'transitionend',
//       'OTransition'      : 'oTransitionEnd',
//       'msTransition'     : 'MSTransitionEnd',
//       'transition'       : 'transitionend'
//     },
//     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
/*>>prefixed*/
/*>>cssclasses*/
// Remove "no-js" class from <html> element, if it exists:
// Add the new classes to the <html> element.
return p.input||l(),p.addTest=function(e,t){if("object"==typeof e)for(var r in e)f(e,r)&&p.addTest(r,e[r]);else{if(e=e.toLowerCase(),p[e]!==n)
// we're going to quit if you're trying to overwrite an existing test
// if we were to allow it, we'd do this:
//   var re = new RegExp("\\b(no-)?" + feature + "\\b");
//   docElement.className = docElement.className.replace( re, '' );
// but, no rly, stuff 'em.
return p;t="function"==typeof t?t():t,"undefined"!=typeof h&&h&&(g.className+=" "+(t?"":"no-")+e),p[e]=t}return p},r(""),y=E=null,function(e,t){/*--------------------------------------------------------------------------*/
/**
         * Creates a style sheet with the given CSS text and adds it to the document.
         * @private
         * @param {Document} ownerDocument The document.
         * @param {String} cssText The CSS text.
         * @returns {StyleSheet} The style element.
         */
function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}/**
         * Returns the value of `html5.elements` as an array.
         * @private
         * @returns {Array} An array of shived element node names.
         */
function r(){var e=y.elements;return"string"==typeof e?e.split(" "):e}/**
         * Returns the data associated to the given document
         * @private
         * @param {Document} ownerDocument The document.
         * @returns {Object} An object of data.
         */
function o(e){var t=v[e[h]];return t||(t={},g++,e[h]=g,v[g]=t),t}/**
         * returns a shived element for the given nodeName and document
         * @memberOf html5
         * @param {String} nodeName name of the element
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived element.
         */
function a(e,n,r){if(n||(n=t),l)return n.createElement(e);r||(r=o(n));var a;
// Avoid adding some elements to fragments in IE < 9 because
// * Attributes like `name` or `type` cannot be set/changed once an element
//   is inserted into a document/fragment
// * Link elements with `src` attributes that are inaccessible, as with
//   a 403 response, will cause the tab/window to crash
// * Script elements appended to fragments will execute when their `src`
//   or `text` property is set
return a=r.cache[e]?r.cache[e].cloneNode():p.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!a.canHaveChildren||m.test(e)||a.tagUrn?a:r.frag.appendChild(a)}/**
         * returns a shived DocumentFragment for the given document
         * @memberOf html5
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived DocumentFragment.
         */
function i(e,n){if(e||(e=t),l)return e.createDocumentFragment();n=n||o(e);for(var a=n.frag.cloneNode(),i=0,c=r(),s=c.length;i<s;i++)a.createElement(c[i]);return a}/**
         * Shivs the `createElement` and `createDocumentFragment` methods of the document.
         * @private
         * @param {Document|DocumentFragment} ownerDocument The document.
         * @param {Object} data of the document.
         */
function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){
//abort shiv
//abort shiv
return y.shivMethods?a(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+
// unroll the `createElement` calls
r().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}/*--------------------------------------------------------------------------*/
/**
         * Shivs the given document.
         * @memberOf html5
         * @param {Document} ownerDocument The document to shiv.
         * @returns {Document} The shived document.
         */
function s(e){e||(e=t);var r=o(e);
// corrects block display not defined in IE6/7/8/9
return!y.shivCSS||u||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),l||c(e,r),e}/*jshint evil:true */
/** version */
var u,l,d="3.7.0",f=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h="_html5shiv",g=0,v={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",
//if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
u="hidden"in e,l=1==e.childNodes.length||function(){
// assign a false positive if unable to shiv
t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(e){
// assign a false positive if detection fails => unable to shiv
u=!0,l=!0}}();/*--------------------------------------------------------------------------*/
/**
         * The `html5` object is exposed so that more elements can be shived and
         * existing shiving can be detected on iframes.
         * @type Object
         * @example
         *
         * // options can be changed before the script is included
         * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
         */
var y={/**
           * An array or space separated string of node names of the elements to shiv.
           * @memberOf html5
           * @type Array|String
           */
elements:f.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",/**
           * current version of html5shiv
           */
version:d,/**
           * A flag to indicate that the HTML5 style sheet should be inserted.
           * @memberOf html5
           * @type Boolean
           */
shivCSS:f.shivCSS!==!1,/**
           * Is equal to true if a browser supports creating unknown/HTML5 elements
           * @memberOf html5
           * @type boolean
           */
supportsUnknownElements:l,/**
           * A flag to indicate that the document's `createElement` and `createDocumentFragment`
           * methods should be overwritten.
           * @memberOf html5
           * @type Boolean
           */
shivMethods:f.shivMethods!==!1,/**
           * A string to describe the type of `html5` object ("default" or "default print").
           * @memberOf html5
           * @type String
           */
type:"default",
// shivs the document according to the specified `html5` object options
shivDocument:s,
//creates a shived element
createElement:a,
//creates a shived documentFragment
createDocumentFragment:i};/*--------------------------------------------------------------------------*/
// expose html5
e.html5=y,
// shiv the document
s(t)}(this,t),p._version=m,p._prefixes=S,p._domPrefixes=T,p._cssomPrefixes=k,p.mq=z,p.hasEvent=A,p.testProp=function(e){return c([e])},p.testAllProps=u,p.testStyles=F,p.prefixed=function(e,t,n){return t?u(e,t,n):u(e,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(h?" js "+$.join(" "):""),p}(this,this.document);