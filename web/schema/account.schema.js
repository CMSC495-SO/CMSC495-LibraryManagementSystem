define([
    'mongoose',
    'enumerations/accountStatus.enum',
    'schema/libraryCard.schema'
], function (mongoose, AccountStatus) {
    'use strict';

    return mongoose.Schema({
        id: String,
        firstName: String,
        lastName: String,
        emailAddress: String,
        userName: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: AccountStatus
        },
        dateAdded: {
            type: Date
        },
        dateModified: {
            type: Date
        },
        reservations: {
            type: Array,
            of: String
        }
    });
});