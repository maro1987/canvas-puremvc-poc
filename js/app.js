requirejs.config({
    // By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    // except, if the module ID starts with "app",
    // load it from the js/app directory. paths
    // config is relative to the baseUrl, and
    // never includes a ".js" extension since
    // the paths config could be for a directory.
    paths: {
        //External libraries
        puremvc : "puremvc-1.0.1",
        createjs: "easeljs-0.8.0.min",
        tweenlite: 'TweenLite.min',
        jquery: "jquery-2.1.3",
        preloadjs: "preloadjs-0.6.0.min",
        rxjs: "rx.lite",
        signal: "Signal",
        signalbinding: "SignalBinding",
        wrapper: "wrapper",
        underscore: "underscore",
        statsjs: "Stats",

        //App paths
        app: '../app/skystore/',
        view: '../app/skystore/view',
        model: '../app/skystore/model',
        service: '../app/skystore/service',
        controller: '../app/skystore/controller',

        command: '../app/skystore/controller/command/',
        proxy: '../app/skystore/model/proxy/',
        common: '../app/skystore/view/common'


    },
    // or if the module begins with "puremvc"
    // we will use the global "puremvc" variable
    // as the location of the module
    shim: {
        underscore : {
            exports : "_"
        },
        jquery: {
            exports : "$"
        },
        'puremvc': {
            deps: [],
            exports: 'puremvc'
        },
        'tweenlite': {
            deps: [],
            exports: 'TweenLite'
        },
        'signal': {
            deps: ["signalbinding"],
            exports: 'Signal'
        },
        'signalbinding': {
            deps: [],
            exports: 'SignalBinding'
        },
        wrapper: {
            deps:["signalbinding", "signal"]
        },
        rxjs: {
            exports: 'Rx'
        },
        statsjs: {
            exports: 'Stats'
        }
    }
});

// Start the main app logic.
requirejs(
    ['app/ApplicationFacade'],
    function(ApplicationFacade)
    {
        var app = ApplicationFacade.getInstance(ApplicationFacade.NAME);
        app.startup();
    }
);
