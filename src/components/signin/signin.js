import React, { Component } from 'react';
import { firebase } from '../../firebase';
import styles from './signin.css';
import FormField from '../widgets/FormFields/formFields';

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
          placeholder: '이메일'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: '패스워드'
        },
        validation: {
          required: true,
          password: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

updateForm = (element) => {
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        newElement.value = element.event.target.value;
        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];   
        }
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;
        
        this.setState({
            formdata:newFormdata
        })
    }

  validate = element => {
    let error = [true, ''];

    if (element.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(element.value);
      const message = `${!valid ? '이메일을 바르게 입력해주세요' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.password) {
      const valid = element.value.length >= 5;
      const message = `${!valid ? '비밀번호는 5자 이상 입력해주세요' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? '양식을 바르게 입력해주세요' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    return error;
  };

  submitButton = () =>
    this.state.loading ? (
      'loading...'
    ) : (
      <div>
        <button onClick={event => this.submitForm(event, false)}>
          회원가입
        </button>
        <button onClick={event => this.submitForm(event, true)}>로그인</button>
      </div>
    );

  submitForm = (event, type) => {
    event.preventDefault();
    if (type !== null) {
      let dataToSubmit = {};
      let formIsValid = true;
      for (let key in this.state.formdata) {
        dataToSubmit[key] = this.state.formdata[key].value;
      }
      for (let key in this.state.formdata) {
        formIsValid = this.state.formdata[key].valid && formIsValid;
      }
      if (formIsValid) {
        // console.log(dataToSubmit);
        this.setState({
          loading: true,
          registerError: ''
        });
        if (type) {
					firebase.auth()
					.signInWithEmailAndPassword(
						dataToSubmit.email,
						dataToSubmit.password
					).then(()=>{
							this.props.history.push('/')
					}).catch(error=>{
							this.setState({
								loading: false,
								registerError: error.message
							})
					})
        } else {
          // console.log('register');
					firebase.auth()
					.createUserWithEmailAndPassword(
						dataToSubmit.email,
						dataToSubmit.password
					).then(()=>{
							this.props.history.push('/')
					}).catch(error=>{
							this.setState({
								loading: false,
								registerError: error.message
							})
					})
        }
      }
    }
  };

	showError = () => {
		this.state.registerError !== '' ?
		(<div className={styles.error}>
			{this.state.registerError}
		</div>
		) : ''
	}


  render() {
    return (
      <div className={styles.logContainer}>
        <form onSubmit={event => this.submitForm(event, null)}>
          <h2>회원가입 / 로그인</h2>
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={element => this.updateForm(element)}
          />

          {this.submitButton()}
					 {this.showError()}
        </form>
      </div>
    );
  }
}

export default SignIn;
