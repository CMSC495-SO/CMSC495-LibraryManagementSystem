define([
    'mongoose',
    'bcrypt',
    'schema/account.schema'
], function(mongoose, bcrypt, AccountSchema) {
    'use strict';
    const SALT_WORK_FACTOR = 10;

    //var accountSchema = new AccountSchema();

    AccountSchema.pre('save', function(next) {
        var account = this;

        if (!account.isModified('password')) {
            return next();
        }

        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(account.password, salt, function(err, hash) {
               if (err) {
                   return next(err);
               }

               // override the cleartext password with the hashed one
               account.password = hash;
               next();
            });
        });
    });

    AccountSchema.methods.comparePassword =  function(candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) {
                return callback(err);
            }
            callback(null, isMatch);
        });
    };

    return mongoose.model('Account', AccountSchema);
});