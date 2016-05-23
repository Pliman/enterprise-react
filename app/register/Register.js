import React from 'react';
import {Link} from 'react-router';
import {Form as FormsyForm} from 'formsy-react';
import FormsyInput from '../components/formsy/input/Input';
import './register.less';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    };
  };
  
  submit(data) {
    console.log(JSON.stringify(data, null, 4));
  };
  
  enableButton() {
    this.setState({
      canSubmit: true
    });
  };
  
  disableButton() {
    this.setState({
      canSubmit: false
    });
  };
    
  render() {
    return (
      <div className="container">
        <FormsyForm className="formsy" onSubmit={this.submit.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
            <div className="form-group">
              <label className="control-label" htmlFor="username">姓名</label>
              <FormsyInput className="form-control" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="username">邮箱</label>
              <FormsyInput className="form-control" name="email" validations="isEmail" validationError="This is not a valid email" />
            </div>
            <div className="form-group">
              <label htmlFor="userID">身份证</label>
              <FormsyInput className="form-control" name="userID" id="userID" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">手机</label>
              <FormsyInput className="form-control" name="phone" id="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="address">地址</label>
              <FormsyInput className="form-control" name="address" id="address" ref="address" required />
            </div>
            <div className="text-center">
              <button type="submit" disabled={!this.state.canSubmit} className="btn btn-success">提交</button>
            </div>
          </FormsyForm>
      </div>
    );
  }
}