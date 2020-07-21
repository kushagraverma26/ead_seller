var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var posting = new Schema({
    item : {
        name: { type: String, required: true},
        defaultPrice: { type: Number, required: true},
    },
    quantity: { type: Number, required: true},
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'Sellers', required: true
    },
    cancellable: {type: Boolean, default: true},
    isPicked: {type: Boolean, default: false},
    createdDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Postings',posting)