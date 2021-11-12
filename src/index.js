import React from "react";
import { render } from "react-dom";
import axios from 'axios';
import "./index.css";


const Contact = ({ id, name, email, phone, gender }) => {
    return (
      <div key={id}>
        <h1 className="ContactItem-name">{name}</h1>
        <p className="ContactItem-email"> Email: {email}</p>
        {phone && (
          <p className="ContactItem-phone"> Phone: {phone}</p>
        )}
        {gender && (
          <p className="ContactItem-gender"> Gender: {gender}</p>
        )}
      </div>
    );
  };

  const contacts = [];

  class ContactApp extends React.Component {

    state = {
      contacts: contacts,
      name: '',
      email: '',
      phone: '',
      gender: '',
    }
  
    handleChange = (evt) => {
      this.setState({ 
        [evt.target.name]: evt.target.value
      })
    }
  
    handleSubmit = (evt) => {
      evt.preventDefault();
      const { name, email, phone, gender } = this.state;
      const newContact = { name, email, phone, gender }
      this.setState({
        contacts: [...this.state.contacts, newContact]
      })
    }

    handleDelete = (evt) => {
      evt.preventDefault();
      this.setState({
        contacts: []
      })
    }
  
    render() {
      const { contacts, name, email, phone, gender } = this.state
      return (
        <div className="ContactView">
          <h1 className="ContactView-title">Contacts</h1>
          <ul className="ContactView-list">
            {contacts.map(contact => <Contact key={contact.name} {...contact} />)}
          </ul>
          <form className="ContactForm">
            <input onChange={this.handleChange} name="name" type="text" value={name} placeholder="Name (required)" />
            <input onChange={this.handleChange} name="email" type="email" value={email} placeholder="Email (required)" />
            <textarea onChange={this.handleChange} name="phone" value={phone} placeholder="Enter your phone number" />
            <textarea onChange={this.handleChange} name="gender" value={gender} placeholder="Enter your gender" />
            <button type="button" onClick={this.handleSubmit}>Add Contact</button>
            <button type="button" onClick={this.handleDelete}>Delete Contact</button>
          </form>
        </div>
      );
    }
  }
  
  
  render(<ContactApp  />, document.getElementById("root"));