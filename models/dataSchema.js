var mongoose = require('mongoose');

var poolSchema = mongoose.Schema({
    name: { type: String },
    to: { type: String },
    from: { type: String},
    date: { type: String },
    time: { type: String },
    vacancy: { type: Number},
    participants: {type: Array}
});

module.exports= mongoose.model('Pool', poolSchema);