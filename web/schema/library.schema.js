define(['mongoose', 'enumerations/accountStatus.enum'], function(mongoose, AccountStatus) {
    'use strict';

    return mongoose.Schema('Library', {
        name: String,
        address: String
    });
});