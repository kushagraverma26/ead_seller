var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({
    name: { type: String, required: true, unique: true},
    category: { type: String, required: true, enum: ["meats", "dairy", "vegetables", "fruits"]},
    unit: {type: String, required: true, enum: ["Kilogram", "Litre", "Unit"]},
    defaultPrice: { type: Number, required: true},
    createdDate: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Items',item)