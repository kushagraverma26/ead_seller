var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var posting = new Schema({
    item : {
        name: { type: String, required: true},
        category: { type: String, required: true, enum: ["meats", "dairy", "vegetables", "fruits"]},
        defaultPrice: { type: Number, required: true},
    },
    quantity: { type: Number, required: true},
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'Sellers', required: true
    },
    cancellable: {type: Boolean, default: true},
    isPicked: {type: Boolean, default: false},
    amountReceived: {type:Number, default: 0},
    createdDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Postings',posting)