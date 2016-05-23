import React from 'react';
import {Decorator as FormsyElement} from 'formsy-react';
import './input.less';

@FormsyElement()
class FormsyInput extends React.Component {
  render() {
    const className = (this.props.className || ' ') + (this.props.showRequired() ? ' required' : this.props.showError() ? ' error' : '');
    const errorMessage = this.props.getErrorMessage();
    return (
      <div className="formsy-input">
        <input className={className} value={this.props.getValue()} onChange={(e) => this.props.setValue(e.target.value)} />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
};

export default FormsyInput;