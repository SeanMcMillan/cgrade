(function(document) {
    var target,
    SCRIPT = "script",
    TEXTJS = "text/javascript",
    STYLE = "style",
    TEXTCSS = "text/css";

    function theTest() {
        return true;
    }

    function preTest() {
        target = document.getElementsByTagName(SCRIPT)[0];
        return true;
    }

    function buildDynamicTag(tag, type) {
        var elem = document.createElement(tag);
        elem.type = type
        return elem;
    }

    function putInHead(elem) {
        target.parentNode.insertBefore(elem, target);
    }

    function loadJsAsynch() {
        var script = buildDynamicTag(SCRIPT, TEXTJS);
        script.async = true; // should this be "true"? string v bool
        script.src = "main.js";

        putInHead(script);
    }

    function insertFoucPreventer() {
        $(document.documentElement).removeClass("no-js").addClass("js loading");

        var style = buildDynamicTag(STYLE, TEXTCSS);
        var css = ".loading .hideload {display:none};";
        if (style.styleSheet) {
            //weird IE way
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        putInHead(style);
    }

    function doIt() {
        if (preTest() && theTest()) {
            insertFoucPreventer();
            loadJsAsynch();
        }
    }

    doIt();
})(window.document);
