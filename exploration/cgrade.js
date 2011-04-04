(function(document) {
    var target, tests = {}, test = 'standards-mode',
    docElem = document.documentElement,
    SCRIPT = "script",
    TEXTJS = "text/javascript",
    STYLE = "style",
    TEXTCSS = "text/css";

    tests['pass'] = {
        pre:  function() { return true;},
        test: function() {
            return true;
        }
    };

    tests['fail'] = {
        pre:  function() { return false;},
        test: function() {
            return false;
        }
    };

    tests['standards-mode'] = {
        pre:  function() { return true;},
        test: function() {
            // http://acidmartin.wordpress.com/2008/10/21/using-compatmode-to-determine-the-standards-compliance-mode-of-the-page-on-the-client/
            return document.compatMode === 'CSS1Compat';
        }
    };

    tests['child-selector'] = {
        pre:  function() { return true;},
        test: function() {
        
        }
    };

    tests['inline-block'] = {
        pre:  function() { return true;},
        test: function() {
        
        }
    };

    tests['inline-block-no-workaround'] = {
        pre:  function() { return true;},
        test: function() {
        
        }
    };

    tests['w3c-events'] = {
        pre:  function() { return true;},
        test: function() {
            return !!document.addEventListener;
        }
    };

    function theTest() {
        return tests[test].test();
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
        // http://www.stevesouders.com/blog/2010/05/11/appendchild-vs-insertbefore/
        target.parentNode.insertBefore(elem, target);
    }

    function loadJsAsynch() {
        var script = buildDynamicTag(SCRIPT, TEXTJS);
        script.async = true; // should this be "true"? string v bool
        script.src = "main.js";

        putInHead(script);
    }

    function insertFoucPreventer() {
        docElem.className = docElem.className.replace(/\bno-js\b/i, "js loading");

        var style = buildDynamicTag(STYLE, TEXTCSS);
        var css = ".loading .hideload {display:none};";
        // http://www.phpied.com/dynamic-script-and-style-elements-in-ie/
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
