import React, { Component } from 'react';
import styles from './signin.css';

import FormFields from '../widgets/FormFields/formFields';

class SignIn extends Component {
  state = {
    registerError: '',
    loading: false,
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'enter your email'
        }
      },
      validation: {
        required: true,
        email: true
      },
      valid: false,
      touched: false,
      validationMessage: '',
      password: {}
    },
    password: {
      element: 'input',
      value: '',
      config: {
        name: 'password_input',
        type: 'password',
        placeholder: 'enter your password'
      }
    },
    validation: {
      required: true,
      password: true
    },
    valid: false,
    touched: false,
    validationMessage: ''
  };

  updateForm = (element) => {
    // console.log(element);
    const newFormdata = {
      ...this.state.formdata
    };
    const newElement = {
      ...newFormdata[element.id]
    };
    newElement.value = element.event.target.value;
    newFormdata[element.id] = newElement;
    console.log(newFormdata);
    this.setState({
      formdata: newFormdata
    });
  };

  render() {
    return (
      <div className={styles.logContainer}>
        <form>
          <FormFields
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />
        </form>
      </div>
    );
  }
}
export default SignIn;
