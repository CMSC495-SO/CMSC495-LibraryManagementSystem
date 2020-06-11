define(['mongoose'], function(mongoose) {
    'use strict';

    return mongoose.Schema('Author', {
        name: String,
        description: String
    });
});