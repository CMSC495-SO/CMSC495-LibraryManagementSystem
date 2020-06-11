define([
    'mongoose',
    'enumerations/bookFormat.enum',
    'enumerations/bookStatus.enum'
], function (mongoose, BookFormat, BookStatus) {
    'use strict';

    return mongoose.Schema('Book', {
        title: String,
        ISBN: String,
        subject: String,
        publisher: String,
        language: String,
        numberOfPages: Number,
        borrowed: Date,
        dueDate: Date,
        price: Number,
        format: BookFormat,
        status: BookStatus,
        dateOfPurchase: Date,
        publicationDate: Date,
        id: String
    });
});