define([
    'mongoose',
    'schema/library.schema',
    'models/accountModel'
], function (mongoose, librarySchema, AccountModel) {
    'use strict';

    var applicationServer = {
        options: {
            baseServicePath: '/lib/library'
        }
    };

    function checkFunction(cb, type) {
        return !cb || typeof cb !== type;
    }

    applicationServer.init = function (appReference, ioReference, options) {
        this.initializeModels();

        if (checkFunction(appReference, 'function')) {
            throw new Error('Application Reference was not passed as an argument.')
        }

        if (checkFunction(ioReference, 'object')) {
            throw new Error('Socket reference was not passed as an argument.');
        }

        this.appReference = appReference;
        this.ioReference = ioReference;

        if (options && options !== null) {
            this.options = Object.assign(this.options, options);
        }
        this.registerEvents();
        this.registerRoutes();
    };

    applicationServer.registerEvents = function () {
        if (checkFunction(this.ioReference, 'object')) {
            throw new Error("UNINITIALIZED ERROR: Controller not initialized.");
        }

        this.ioReference.on('library-added', function () {
            debugger;
        });
    };

    applicationServer.registerRoutes = function () {
        let context = this;
        // setting the servicePaths
        //get requests
        this.appReference.get(this.options.baseServicePath, context.getLibrary.bind(this));
        this.appReference.get(this.options.baseServicePath + '/users', context.getUsers.bind(this));
        this.appReference.get(this.options.baseServicePath + '/users/checkUser', context.checkUserNameInUse.bind(this));

        //post requests
        this.appReference.post(this.options.baseServicePath, context.addNewLibrary.bind(this));
        this.appReference.post(this.options.baseServicePath + '/login', context.loginUser.bind(this));
        this.appReference.post(this.options.baseServicePath + '/users', context.addUser.bind(this));

        //delete requests
        this.appReference.delete(this.options.baseServicePath + '/delete/:id', async (req, res) => {
            context.deleteLibrary(req, res);
        });
    };

    applicationServer.initializeModels = function () {
        this.Library = mongoose.model('Library', librarySchema);
        this.Account = AccountModel;
    };

    applicationServer.addNewLibrary = async function (data, res) {
        var entry = {
            title: data.body.title,
            dateAdded: data.body.timestamp,
            address: {
                street: data.body.street,
                city: data.body.city,
                state: data.body.state,
                zipCode: data.body.zipCode
            },
            dateModified: data.body.timestamp
        };

        try {
            let lib = new this.Library(entry);
            await lib.save();
            this.ioReference.emit('library-added', entry);
            res.sendStatus(200);
        } catch (ex) {
            res.sendStatus(500);
            console.error(ex);
        }
    };

    applicationServer.deleteLibrary = function (data, res) {
        this.Library.deleteOne(data, function (err) {
            if (err) {
                res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    };

    applicationServer.getUsers = function (data, res) {
        this.Account.find({}, (error, accounts) => {
            res.send(accounts);
        });
    };

    applicationServer.getLibrary = function (data, res) {
        this.Library.find({}, (error, libraries) => {
            res.send(libraries);
        });
    };

    applicationServer.addUser = async function (data, res, next) {
        let entry = Object.assign(data.body, {
            dateAdded: data.body.timestamp,
            dateModified: data.body.timestamp
        });

        try {
            let account = new this.Account(entry);
            await account.save(function (err) {
                if (err) {
                    throw err;
                }
                res.json({status:200, message: 'User added successfully.'});
            });
        } catch (ex) {
            res.json({status:203, message: 'An error has been found'});
            next(ex);
            console.error(ex);
        }
    };

    applicationServer.loginUser = function (data, res) {
        let toCheck = data.body.params, resObject = {
            matched: false,
            message: ''
        };

        if (!toCheck.userName || !toCheck.password) {
            resObject.message = 'User name or password not provided!';
            res.json(resObject);
            return;
        }
        this.Account.findOne({userName: toCheck.userName}, function (err, account) {
            if (err) {
                res.json(resObject);
                /*todo: update resObject with failure message: something like could not find user*/
                throw err;
            }

            if (!account) {
                resObject.message = 'No account found for userName: ' + toCheck.userName;
                res.json(resObject);
                return;
            }

            account.comparePassword(toCheck.password, function (err, isMatch) {
                if (err) {
                    /*todo: update resObject with failure message: something like could not find user*/
                    res.json(resObject);
                    throw err;
                }
                resObject.user = {
                    userName: account.userName,
                    firstName: account.firstName,
                    lastName: account.lastName,
                    emailAddress: account.emailAddress,
                    reservations: account.reservations || [],
                    createdOn: account.dateAdded,
                    modifiedOn: account.dateModified
                };
                resObject.matched = isMatch;
                res.json(resObject);
            })
        });
    };

    applicationServer.checkUserNameInUse = function (data, res) {
        let searchFor = data.query;
        this.Account.find(searchFor, function (err, user) {
            if (err) {
                throw err;
            }

            res.json({isValid: user.length});
        });
    };

    return applicationServer;
});