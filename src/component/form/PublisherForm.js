import React, { Component } from 'react';
import { Pane, TextInputField, Button } from 'evergreen-ui';

class PublisherForm extends Component {
  state = {
    formValue: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  }

  onChange = (key) => (e) => {
    const { formValue = {} } = this.state;
    formValue[key] = e.target.value;

    this.setState({ formValue });
  }

  onSave = () => {
    const { formValue = {} } = this.state;
    const { onCommit } = this.props;

    onCommit(formValue);
  }

  componentDidMount() {
    const { initialValue } = this.props;
    if (initialValue) {
      const formValue = {
        name: initialValue.name,
        phone: initialValue.phone,
        email: initialValue.email,
        address: initialValue.address,
      }

      this.setState({ formValue });
    }
  }

  render() {
    const { formValue = {} } = this.state;
    const { onCancel } = this.props;

    const isReadyForSubmit = (!!formValue.name && !!formValue.phone && !!formValue.email && !!formValue.address);

    return (<div>
      <TextInputField label="Name" 
        value={formValue.name} 
        placeholder="Publisher Name"
        onChange={this.onChange("name")}
        />
      <Pane>
      <TextInputField label="Phone" 
        value={formValue.phone} 
        placeholder="Phone Number"
        onChange={this.onChange("phone")}
        />
      <TextInputField label="Email" 
        value={formValue.email} 
        placeholder="Email"
        onChange={this.onChange("email")}
        />
      <TextInputField label="Address" 
        value={formValue.address} 
        placeholder="Address"
        onChange={this.onChange("address")}
        />
      </Pane>
      <br/>
      <Pane display="flex" justifyContent="flex-end">
        <Button appearance="primary" disabled={!isReadyForSubmit} onClick={this.onSave}>Save</Button>
        &nbsp;
        <Button onClick={onCancel}>Cancel</Button>
      </Pane>
    </div>);
  }
}

export default PublisherForm;