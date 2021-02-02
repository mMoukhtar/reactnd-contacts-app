import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ContactList extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired,
    };

    state = {
        query: '',
    };

    updateQuery = newValue => {
        this.setState(currentState => ({
            query: newValue.trim(),
        }));
    };

    clearQuery = () => {
        this.updateQuery('');
    };

    render() {
        const { query } = this.state;
        const { contacts, onDeleteContact } = this.props;
        const showenContacts =
            query === ''
                ? contacts
                : contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input
                        className="search-contacts"
                        type="text"
                        value={query}
                        onChange={event => this.updateQuery(event.target.value)}
                    />
                    <Link to="/create" className="add-contact" />
                </div>
                {contacts.length !== showenContacts.length && (
                    <div className="showing-contacts">
                        <span>
                            Now showen {showenContacts.length} out of {contacts.length}
                        </span>
                        <button onClick={this.clearQuery}>Show All</button>
                    </div>
                )}
                <ol className="contact-list">
                    {showenContacts.map(contact => (
                        <li className="contact-list-item" key={contact.id}>
                            <div
                                className="contact-avatar"
                                style={{
                                    backgroundImage: `url(${contact.avatarURL})`,
                                }}
                            />
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                            </div>
                            <button className="contact-remove" onClick={() => onDeleteContact(contact)} />
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default ContactList;
