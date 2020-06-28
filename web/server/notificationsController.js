define([], function() {
    'use strict';

    const notificationsController = {};
    let initailized = false;

    function checkFunction(cb) {
        return cb && typeof cb === 'function';
    }

    notificationsController.init = function(appReference, ioReference) {
        if (checkFunction(appReference)) {
            throw new Error('No application reference provided.');
        }

        if (checkFunction(ioReference)) {
            throw new Error('No application reference provided.');
        }

        if (notificationsController.hasOwnProperty('reference')) {
            throw new Error('Reference already defined, check code');
        }

        this.appReference = appReference;
        this.ioReference = ioReference;

        this.registerRoutes();

        initailized = true;
    };

    notificationsController.registerRoutes = function() {
        if (!initailized) {
            throw new Error('UnInitialized Application: run init() function.');
        }

        /*place routes here*/

    }
});