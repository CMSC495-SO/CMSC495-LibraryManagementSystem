define(['datatypes/address.datatype'], function(Address) {
    'use strict';

    return {
        name: String,
        address: Address,
        email: String,
        phone: String
    };
});