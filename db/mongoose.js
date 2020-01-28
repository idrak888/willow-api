const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:8nov2016@ds227146.mlab.com:27146/willow-api');

module.exports = {
	mongoose
}