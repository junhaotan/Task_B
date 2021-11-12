const { Contact, validate } = require('./model/contactModel');

// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'working',
        message: 'CS3219 Task B1',
    });
});

// Contact routes
router.route('/contacts').get(function (req, res) {
    Contact.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
    });
}).post(async (req, res) => {
    try {
        //Get account details (email, pw etc.) from request body
        const { error } = validate(req.body);
        
        //Error, send 400 Bad Request, and details of error
        if (error) return res.status(400).send(error.details[0].message);

        //Do not allow duplicate emails, if email already exists send 400 Bad Request
        let doc = await Contact.findOne({ email: req.body.email });
        if (doc) return res.status(400).send("Contact already exists!");

        doc = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone
        });
        await doc.save();
        res.json({
            message: 'New contact created!',
            data: doc
        });
    } catch (err) {
        res.status(400).send("An error occured, details: " + err);
    }
});

router.route('/contacts/:contact_name').put(async (req, res) => {
    try {
        const doc = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone
        };

        let test = await Contact.findOne({ name: req.params.contact_name });
        if (!test) return res.status(400).send("Contact with this name do not exist!");

        const contact = await Contact.findOneAndUpdate(req.params.contact_name, doc, { new: true });
        res.json({
            message: 'Contact updated!',
            data: contact
        });
    } catch (err) {
        res.status(400).send("An error occured, details: " + err);
    }
}).delete(async (req, res) => {
    try {
        let test = await Contact.findOne({ name: req.params.contact_name });
        if (!test) return res.status(400).send("Contact with this name do not exist!");

        await Contact.deleteOne({ name: req.params.contact_name });
        
        res.json({
            status: 'success',
            message: 'Contact deleted successfully!'
        });
    } catch (err) {
        res.status(400).send("An error occured, details: " + err);
    }
});
// Export API routes
module.exports = router;