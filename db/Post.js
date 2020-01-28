const {mongoose} = require('./mongoose');

const Post = mongoose.model('Post', {
    _id: String,
    by: String,
    datePosted: String,
    starter: String,
    content: String,
    likes: Array
});

module.exports = {
	Post
}