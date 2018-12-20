const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcryptjs');

const schemaOptions = {
    timestamps: true,
    versionKey: false
}

// User schema
const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    likes: []
}, schemaOptions);

UserSchema.options.toJSON = {
    transform: ret => {
        delete ret.password
    }
}

UserSchema.pre('save', function (next) {
    const user = this;
    const SALT_FACTOR = 10;
    // If User's password is not modified just go next phase
    if (!user.isModified('password')) return next();

    // Generate salt for hash
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        // If there is error just go next phase show error
        if (err) return next();

        // Hash password
        bcrypt.hash(user.password, salt, function (err, hash) {
            // If there is error just go next phase show error
            if (err) return next();

            user.password = hash
            next();
        });
    });
});

const User = (module.exports = mongoose.model('user', UserSchema));

// Function for adding a user
module.exports.addUser = newUser => {
    return newUser.save()
}

module.exports.findUserByUsername = username => {
    return User.findOne({ username: username });
}


// Function for finding user with _id
module.exports.findUserById = id => {
    return User.aggregate([
        {$match:{"_id" : ObjectId(id)}},
        {$project:{"username": "$username", "likes":{$size:"$likes"}}}
    ])
}


// Function for comparing passwords
module.exports.comparePassword = (candidatePassword, hash) => {
    return bcrypt.compare(candidatePassword, hash)
        .then(res => {
            return res;
        })
        .catch(err => {
            throw err;
        });
}

// Function for updating password
module.exports.updatePassword = (id, password) => {
    return User.findOneAndUpdate({ _id: ObjectId(id) }, { $set: { password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) } }, { new: true });
}

// Function for liking user
module.exports.like = (id, loggedInId) => {
    return User.findOneAndUpdate({ _id: ObjectId(id) }, { $push: { likes: ObjectId(loggedInId) } }, { new: true });
}

// Function for liking user
module.exports.findLike = (id, loggedInId) => {
    return User.findOne({ _id: ObjectId(id),  likes: {$in: ObjectId(loggedInId)}});
}

// Function for liking user
module.exports.unlike = (id, loggedInId) => {
    return User.findOneAndUpdate({ _id: ObjectId(id) }, { $pull: { likes: ObjectId(loggedInId) } }, { new: true });
}

// Function for finding user with _id
module.exports.getAllUsersByLikes= () => {
    return User.aggregate([
        {$project:{"username": "$username", "likes":{$size:"$likes"}}},
        {$sort:{"likes": -1}}
    ])
}

