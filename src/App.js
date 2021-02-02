import React, { Component } from 'react';
import ContactList from './utils/ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './utils/CreateContact';
import { Route } from 'react-router-dom';

class App extends Component {
    state = {
        contacts: [],
        url: 'list',
    };

    componentDidMount() {
        ContactsAPI.getAll().then(contacts => this.setState(() => ({ contacts })));
    }

    removeContact = contact => {
        this.setState(currentState => ({
            contacts: currentState.contacts.filter(c => c.id !== contact.id),
        }));
        ContactsAPI.remove(contact);
    };

    onCreateContact = (contact, history) => {
        ContactsAPI.create(contact).then(contact => {
            this.setState(prevState => ({
                contacts: [...prevState.contacts, contact],
            }));
        });
    };

    render() {
        return (
            <div>
                <Route
                    path="/"
                    exact
                    render={() => (
                        <ContactList contacts={this.state.contacts} onDeleteContact={this.removeContact} />
                    )}
                />
                <Route
                    path="/create"
                    render={({ history }) => (
                        <CreateContact
                            onCreateContact={contact => {
                                this.onCreateContact(contact);
                                history.push('/');
                            }}
                        />
                    )}
                />
            </div>
        );
    }
}

export default App;
