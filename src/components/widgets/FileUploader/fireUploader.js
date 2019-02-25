import React, { Component } from 'react';
import { firebase } from '../../../firebase';
import FileUploader from 'react-firebase-file-uploader';

class Uploader extends Component {
  state = {
    name: '',
    isUploading: false,
    progress: 0,
    fileURL: ''
  };

  handleUploadSuccess = () => {
    this.setState({ isUploading: true, progress: 0 });
  };

  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.log(error);
  };

  handleUploadSuccess = (filename) => {
    console.log(filename);
    this.setState({
      name: filename,
      progress: 100,
      isUploading: false
    });
    ///
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({
          fileURL: url
        });
      });
	};
	
	handleProgress = progress => {
		this.setState({
			progress
		})
	}

  render() {
    return (
      <div>
        <FileUploader
          accept='image/*'
          name='image'
          randomMizeFilename
          stroageRef={firebase.storage().ref('images')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploaderSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
      </div>
    );
  }
}

export default Uploader;
