// contactModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
// Setup schema
const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String
});
// Export Contact model
const Contact = mongoose.model("contact", contactSchema);
const validate = (contact) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        phone: Joi.string().allow(),
        gender: Joi.string().allow()
    });
    return schema.validate(contact);
};

module.exports = {
    Contact,
    validate
}