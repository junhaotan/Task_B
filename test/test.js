const { Contact } = require('../model/contactModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Contacts start with empty database', () => {
    this.timeout(120000);

    before((done) => { //Before start of test we empty the database
        Contact.deleteMany({}, (err) => {
           done();
        });
    });

    describe("GET /contacts", () => {
        // Test to get all contacts in database
        it("should get 0 contacts since initialized with empty database", (done) => {
            chai.request(app)
                .get('/api/contacts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe("POST /contacts/:contact_name", () => {
        const person = {
            name: 'Jared',
            email: 'jared@example.com',
            phone: '999',
            gender: 'male',
        };

        it("should add new contact successfully", (done) => {
            chai.request(app)
                .post('/api/contacts')
                .send(person)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.be.eql('New contact created!');
                    res.body.data.name.should.be.eql('Jared');
                    done();
                });
        });
    });

    describe("PUT /contacts/:contact_name", () => {
        const person = {
            name: 'Alex Teo',
            email: 'alexteo@example.com',
            phone: '995',
            gender: 'male',
        };

        it("should update existing contact successfully", (done) => {
            chai.request(app)
                .put('/api/contacts/Jared')
                .send(person)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.be.eql('Contact updated!');
                    res.body.data.name.should.be.eql('Alex Teo');
                    res.body.data.email.should.be.eql('alexteo@example.com');
                    res.body.data.phone.should.be.eql('995');
                    done();
                });
        });
    });

    describe("DELETE /contacts/:contact_name", () => {
        it("should delete contact successfully", (done) => {
            chai.request(app)
                .delete('/api/contacts/Alex Teo')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.be.eql('Contact deleted successfully!');
                    done();
                });
        });
    });
});