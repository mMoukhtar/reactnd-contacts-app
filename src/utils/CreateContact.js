import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import serializeForm from 'form-serialize';
import ImageInput from '../ImageInput';

export class CreateContact extends Component {
    static propTypes = {
        onCreateContact: PropTypes.func.isRequired,
    };

    handleSubmit = e => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        if (this.props.onCreateContact) {
            this.props.onCreateContact(values);
        }
    };

    render() {
        return (
            <div>
                <Link to="/" className="close-create-contact">
                    back
                </Link>
                <form className="create-contact-form" onSubmit={this.handleSubmit}>
                    <ImageInput className="create-contact-avatar-input" name="avatarURL" maxHeight={64} />
                    <div className="create-contact-details">
                        <label htmlFor="name" />
                        <input type="Text" name="name" placeholder="please enter your name" />
                        <label htmlFor="twitter" />
                        <input type="Text" name="handle" placeholder="please enter your twitter" />
                        <button>Add Contact</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateContact;
/*

*/
