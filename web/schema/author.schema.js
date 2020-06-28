define(['mongoose'], function(mongoose) {
    'use strict';

    return mongoose.Schema({
        name: String,
        description: String
    });
});