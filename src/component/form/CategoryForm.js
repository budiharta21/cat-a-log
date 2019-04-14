import React, { Component } from 'react';
import { 
  Pane, 
  TextInputField,
  Label,
  Textarea,
  Button
} from 'evergreen-ui';

class CategoryForm extends Component{

  state = {
    formValue: {
      name: "",
      description: "",
    },
  }

  onSave = () => {
    const { formValue } = this.state;
    const { onCommit } = this.props;
    onCommit(formValue);
  }

  onChange = (key) => (e) =>{
    const { formValue = {} } = this.state;
    formValue[key] = e.target.value;

    this.setState({ formValue });
  }


  render() {
    const { formValue } = this.state;
    const { onCancel } = this.props;
    // const isReadyForSubmit = ( !!formValue.name && !!formValue.description )

    return(<div>
      <Pane>
        <TextInputField
          label="Name"
          placeholder="Category Name"
          value={formValue.name}
          onChange={this.onChange("name")}
        />
        <Label
          marginBottom={4}
          display="block">
          Description
        </Label>
        <Textarea label="Description" 
          placeholder="Category Description"
          value={formValue.description}
          onChange={this.onChange("description")}
          />
      </Pane>
      <br/>
      <Pane display="flex" justifyContent="flex-end">
        <Button appearance="primary" onClick={this.onSave} >Save</Button>
        &nbsp;
        <Button onClick={onCancel} >Cancel</Button>
      </Pane>
      </div>
    )
  }

}

export default CategoryForm;