(function() {

    function theTest() {
        return true;
    }

    function preTest() {
        return true;
    }

    function loadJsAsynch() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "main.js";

        var target = document.getElementsByTagName("script")[0];
        target.parentNode.insertBefore(script, target);
    }

    function insertFoucPreventer() {
        $(document.documentElement).removeClass("no-js").addClass("js loading");

        var foucPreventer = $("<style/>").text(".loading .hideload {display:none};");
        var target = document.getElementsByTagName("script")[0];
        target.parentNode.insertBefore(foucPreventer.get(0), target);
    }

    function doIt() {
        if (preTest() && theTest()) {
            insertFoucPreventer();
            loadJsAsynch();
        }
    }

    doIt();
})();
