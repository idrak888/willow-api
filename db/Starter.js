const {mongoose} = require('./mongoose');
var Schema = mongoose.Schema;

const StarterSchema = new Schema({
    text: String
}, {_id: false}); 
const Starter = mongoose.model('Starter', StarterSchema);

module.exports = {
	Starter
}