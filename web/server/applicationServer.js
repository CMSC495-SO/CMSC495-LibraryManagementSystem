define([
    'mongoose',
    'schema/library.schema',
    'schema/account.schema'
], function(mongoose, librarySchema, accountSchema) {
    'use strict';

    var applicationServer = {
        options: {
            baseServicePath: '/lib'
        }
    };

    applicationServer.init = function(appReference, options) {
        var context = this;

        this.initializeModels();

        if (!appReference || typeof appReference !== 'object') {
            throw new Error('Application Reference was not passed as an argument.')
        }

        if (options && options !== null) {
            this.options = Object.assign(this.options, options);
        }

        // setting the servicePaths
        //get requests
        appReference.get(this.options.baseServicePath + '/library', async(req, res) => {
            context.getLibrary(req, res);
        });
        //post requests
        appReference.post(this.options.baseServicePath + '/library', async(req, res) => {
            context.addNewLibrary(req, res);
        });
    };

    applicationServer.initializeModels = function() {
        this.Library = mongoose.model('Library', librarySchema);
        //this.Account = mongoose.model('Account', accountSchema);
    };

    applicationServer.addNewLibrary = function(data, res) {
        try {
            let lib = new this.Library(data.body);
            await lib.save();
            res.sendStatus(200);
        } catch (ex) {
            res.sendStatus(500);
            console.error(error);
        }
    };

    applicationServer.getLibrary = function(data, res) {
        this.Library.find({}, (error, libraries) => {
            res.send(libraries);
        });
    };

    return applicationServer;
});