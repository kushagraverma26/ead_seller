var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seller = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    
    _emailVerified: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Number, required: true
    },
    location: {
        lat: {
            type: Number, required: true
        },
        long: {
            type: Number, required: true
        }
    },
    address: {
        line1: { type: String, required: true },
        line2: String,
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: Number, required: true }

    },
    createdDate: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Sellers',seller)