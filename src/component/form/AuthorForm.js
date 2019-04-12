import React, { Component } from 'react';
import { Pane, TextInputField, Textarea, Label, Button } from 'evergreen-ui';

class AuthorForm extends Component {
  state = {
    formValue: {
      name: "",
      biography: "",
    },
  }

  onChange = (key) => (e) => {
    const { formValue = {} } = this.state;
		formValue[key] = e.target.value;
    
    this.setState({ formValue });
  }

  onSave = () => {
    const { formValue } = this.state;
    const { onCommit } = this.props;
    onCommit(formValue);
  }

  render() {
    const { formValue } = this.state;
    const { onCancel } = this.props;

    return (<div>
      <TextInputField label="Name" 
        value={formValue.name} 
        placeholder="Author Name"
        onChange={this.onChange("name")}/>
      <Pane>
        <Label
          marginBottom={4}
          display="block">
          Biography
        </Label>
        <Textarea label="Biography" 
          placeholder="Biography"
          value={formValue.biography}
          onChange={this.onChange("biography")}/>
      </Pane>
      <br/>
      <Pane display="flex" justifyContent="flex-end">
        <Button appearance="primary" onClick={this.onSave}>Save</Button>
        &nbsp;
        <Button onClick={onCancel}>Cancel</Button>
      </Pane>
    </div>)
  }
}

export default AuthorForm;