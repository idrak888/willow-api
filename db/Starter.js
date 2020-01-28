const {mongoose} = require('./mongoose');

const Starter = mongoose.model('Starter', {
    text: String
});

module.exports = {
	Starter
}