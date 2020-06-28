define(['mongoose'], function(mongoose) {
    'use strict';

    var addressSubSchema = new mongoose.Schema({
        street: String,
        city: String,
        state: String,
        zipCode: String,
    });

    return new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        address: {
            type: addressSubSchema,
            required: true
        },
        dateAdded: {
            type: Date
        },
        dateModified: {
            type: Date
        }
    });
});