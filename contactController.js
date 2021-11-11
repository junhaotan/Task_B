// contactController.js
// Import contact model
const { Contact, validate } = require("./model/contactModel")
// Handle index actions
exports.index = function (req, res) {
    
};
// Handle create contact actions
exports.new = async (req, res) => {
    try {
        console.log(req.body);

        //Create new Contact and save it into the Database
        const doc = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender
        });
        await doc.save();

    } catch (error) {
        res.status(400).send("An error occured, details: " + error);
    }
};
// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};