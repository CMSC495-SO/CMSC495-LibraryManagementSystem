define(['mongoose'], function(mongoose) {
    'use strict';

    return mongoose.Schema('LibraryCard', {
        cardNumber: String,
        barcode: String,
        issuedAt: Date,
        active: Boolean
    });
});