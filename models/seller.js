var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seller = new Schema({
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    _emailVerified: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Number, required: true
    },
    wallet: {
        type: Number, default: 100
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