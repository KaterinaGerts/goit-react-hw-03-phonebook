import React, { Component } from 'react';
import Container from 'components/Container/Container';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {  
    const contact = localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(contact);
    if(parcedContacts) {
      this.setState({contact: parcedContacts});
    }
  }

  componentDidUpdate(prevProps, prevState) {   
    if(this.state.contacts !== prevState.contacts) {
      console.log('Обновились контакты');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    console.log(data);
  };

  addContact = ({ name, number }) => {
    const data = {
      id: uuidv4(),
      name,
      number,
    };
    const { contacts } = this.state;
    const nameNormalize = name.toLowerCase();

    const checkedName = contacts.find(
      contact => nameNormalize === contact.name.toLowerCase(),
    );

    checkedName
      ? alert(`${name} is already in contacts!`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, data],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />

          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </Container>
    );
  }
}

export default App;
