const {mongoose} = require('./mongoose');

const User = mongoose.model('User', {
    _id: String,
	username: { type: String, unique: true },
    email: String
});

module.exports = {
	User
}