define(['mongoose'], function(mongoose) {
    'use strict';

    return mongoose.Schema({
        cardNumber: String,
        barcode: String,
        issuedAt: Date,
        active: Boolean
    });
});