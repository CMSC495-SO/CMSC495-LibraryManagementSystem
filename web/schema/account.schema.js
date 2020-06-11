define([
    'mongoose',
    'enumerations/accountStatus.enum',
    'enumerations/person.enum',
    'schema/libraryCard.schema'
], function (mongoose, AccountStatus, Person, LibraryCard) {
    'use strict';

    return mongoose.Schema('Account', {
        id: String,
        password: String,
        status: AccountStatus,
        person: Person,
        card: LibraryCard
    });
});