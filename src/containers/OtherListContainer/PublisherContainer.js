import React, { Component } from "react";
import {
  Pane, 
  Button, 
  SideSheet, 
  Heading, 
  Icon,
  IconButton,
  Table,
} from 'evergreen-ui';

import PublisherForm from '../../component/form/PublisherForm';

class PublisherContainer extends Component {
  state = {
    publishers: [],
    isOpen: false,
    editedPublisher: null,
  }

  onAdd = () => this.setState({ isOpen: true })
  onCancelAdd = () => this.setState({ isOpen: false });

  onCommitAdd = (values) => {
    const { publishers = [] } = this.state;
    publishers.push(values);
    this.setState({ publishers })

    this.onCancelAdd();
  }

  onDelete = (index) => () => {
    const { publishers = [] } = this.state;
    publishers.splice(index, 1);
    this.setState({ publishers });
  }

  onEdit = (publisher, index) => () => {
    const editedPublisher = { ...publisher, index }; // Store the publisher data & the index to new variable (editedPublisher)
    this.setState({ editedPublisher })
  }

  onCommitEdit = (values) => {
    const { editedPublisher, publishers = [] } = this.state;
    publishers[editedPublisher.index] = { ...values }
    this.setState({ publishers });
   
    this.onCancelEdit();
  }

  onCancelEdit = () => {
    this.setState({ editedPublisher: null })
  }

  render () {
    const { publishers = [], isOpen, editedPublisher }  = this.state;

    // Sort the list of publishers (A - Z)  
    const sortedPublishers = publishers.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });

    return(
      <Pane>
      <SideSheet isShown={isOpen} onCloseComplete={this.onCancelAdd}>
        <Pane zIndex={1} flexShrink={0} elevation={0}>
          <Pane padding={16}>
            <Heading size={600}>Add Publisher</Heading>
          </Pane>
        </Pane>
        <Pane padding={16}>
          <PublisherForm onCommit={this.onCommitAdd} onCancel={this.onCancelAdd}/>
        </Pane>
      </SideSheet>
      
      {/* Open the Edit Sidepanel when editedPublisher state is not NULL */}
      <SideSheet isShown={!!editedPublisher} onCloseComplete={this.onCancelEdit}>
        <Pane zIndex={1} flexShrink={0} elevation={0}>
          <Pane padding={16}>
            <Heading size={600}>Edit Publisher</Heading>
          </Pane>
        </Pane>
        <Pane padding={16}>
          <PublisherForm initialValue={editedPublisher} onCommit={this.onCommitEdit} onCancel={this.onCancelEdit}/>
        </Pane>
      </SideSheet>

      <Button onClick={this.onAdd} appearance="primary">
        <Icon icon="plus" style={{ marginRight: 8 }} /> Add Publisher
      </Button>

      <Pane marginTop={24}>
        {sortedPublishers.length === 0 && <center><em>There's no publisher added yet.</em></center>}
        {sortedPublishers.length > 0 && <Table>
            <Table.Head>
              <Table.TextHeaderCell>Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Phone</Table.TextHeaderCell>
              <Table.TextHeaderCell>Email</Table.TextHeaderCell>
              <Table.TextHeaderCell>Address</Table.TextHeaderCell>
              <Table.TextHeaderCell>Options</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body height={320}>
              {sortedPublishers.map((publisher, index) => (
                <Table.Row key={index}>
                  <Table.TextCell>{publisher.name}</Table.TextCell>
                  <Table.TextCell>{publisher.phone}</Table.TextCell>
                  <Table.TextCell>{publisher.email}</Table.TextCell>
                  <Table.TextCell>{publisher.address}</Table.TextCell>
                  <Table.TextCell>
                    <IconButton display='inline' onClick={this.onEdit(publisher, index)} icon="edit" />
                    &nbsp;
                    <IconButton display='inline' onClick={this.onDelete(index)} icon="trash" intent="danger"/>
                  </Table.TextCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>}
      </Pane>
    </Pane>
    );
  }
}

export default PublisherContainer;