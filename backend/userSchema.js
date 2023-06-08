const mongoose = require('mongoose'), 
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;


// Define schema for Users
const userSchema = new mongoose.Schema({
    // User first name
    firstName: {
        type: String,
        required: true
    },
    // User last name
    lastName: {
        type: String,
        required: true
    },
    // User email
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    // User password (hashed)
    password: {
        type: String,
        required: true
    },
    // User avatar (not used)
    avatar: {
        type: String
    },
    // Friends of user
    friends: {
        type: [String],
        default: []
    },
    requests: {
        type: [String],
        default: []
    }
});

// Performs hashing of password from input password so it is stored encrypted
userSchema.pre('save', function(next){
    const user = this;
    if(this.isModified("password") || this.isNew){
        bcrypt.genSalt(SALT_WORK_FACTOR, function(saltError, salt){
            if(saltError){
                return next(saltError);
            }
            bcrypt.hash(user.password, salt, function(hashError, hash){
                if(hashError){
                    return next(hashError);
                }
        
                user.password = hash;
                next();
            })
        })
    }
    else{
        return next();
    }
})

userSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
      if (error) {
        return callback(error)
      } else {
        return callback(null, isMatch)
      }
    })
}

const User = mongoose.model('User', userSchema);

module.exports = User;