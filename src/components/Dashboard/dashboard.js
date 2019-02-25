import React, { Component } from 'react';
import styles from './dashboard.css';
import FormFields from '../widgets/FormFields/formFields';
import { firebaseTeams, firebase } from '../../firebase';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import Uploader from '../widgets/FileUploader/fireUploader';
class Dashboard extends Component {

	state = {
		edtiorState: EditorState.createEmpty(),
		postError: '',
    loading: false,
		formdata: {
			author: {
        element: 'input',
        value: '',
        config: {
          name: 'author_input',
          type: 'text',
          placeholder: '이름'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
			title: {
        element: 'input',
        value: '',
        config: {
          name: 'title_input',
          type: 'text',
          placeholder: '제목'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
			},
			body: {
				element: 'texteditor',
				value: '',
				valid: true
			},
			teams: {
				element: 'select',
        value: '',
        config: {
          name: 'teams_input',
          options: [
						
					]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
			}
		}
	}

	updateForm = (element, content = '') => {
		const newFormdata = { 
			...this.state.formdata
		}
		const newElement = {
			...newFormdata[element.id]
		}
		
		if(content === ''){
			newElement.value = element.event.target.value;
		} else {
			newElement.value = content;
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
		  	formdata: newFormdata 
		})
	}

	validate = element => {
    let error = [true, ''];

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? '양식을 바르게 입력해주세요' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    return error;
  };

	showError = () => {
		this.state.registerError !== '' ?
		<div className={styles.error}>{this.state.postError}</div>
		: ''
	}

	submitForm = (event) => {
		event.preventDefault();
		  let dataToSubmit = {};
      let formIsValid = true;
      for (let key in this.state.formdata) {
        dataToSubmit[key] = this.state.formdata[key].value;
      }
      for (let key in this.state.formdata) {
        formIsValid = this.state.formdata[key].valid && formIsValid;
      }

			console.log(dataToSubmit);

			if(formIsValid){
				console.log('submit post')
			} else {
				this.setState({
						postError: 'sth went wrong'
				})
			}
	}
	
	onEditorStateChange = editorState => {
		
		let contentState = editorState.getCurrentContent();
		let rawState = convertToRaw(contentState);
		
		let html = stateToHTML(contentState);
		
		console.log(html)
		
		this.setState({
				editorState
		})
	}


  submitButton = () =>
    this.state.loading ? (
      'loading...'
    ) : (
      <div>
        <button type="submit">
					포스트 작성 
				</button>
      </div>
		);
		
	componentDidMount = () => {
		this.loadTeams()
	}
	
	loadTeams = () => {
		firebaseTeams.once('value')
		.then((snapshot)=>{
				let teams = [];
				snapshot.forEach(childSnapshot =>{
					teams.push({
						id: childSnapshot.val().teamId,
						name: childSnapshot.val().city
					})
				})
				const newFormdata = {...this.state.formdata};
				const newElement = { ...newFormdata['teams']};
				newElement.config.options = teams;
				
				this.setState({
					formdata: newFormdata
				})
		})
	}

	render(){
		return(
			<div className={styles.postContainer}>
				<form onSubmit={this.submitForm}>
					<h2>add post</h2>
					
					<Uploader/>

					<FormFields 
					id={'author'}
					formdata={this.state.formdata.author}
					change={(element)=> this.updateForm(element)}
					/>
					<FormFields 
					id={'title'}
					formdata={this.state.formdata.title}
					change={(element)=> this.updateForm(element)}
					/>
					
					<Editor 
						editorState={this.state.editorState}
						wrapperClassName="myEditor-wrapper"
						editorClassName="myEditor-editor"
						onEditorStateChange={this.onEditorStateChange}
					/>
					
					<FormFields 
					id={'teams'}
					formdata={this.state.formdata.teams}
					change={(element)=> this.updateForm(element)}
					/>

					    {this.submitButton()}
					 {this.showError()}
				</form>
			</div>
		)
	}

}

export default Dashboard;