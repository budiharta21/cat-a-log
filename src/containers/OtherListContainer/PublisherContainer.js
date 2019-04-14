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
  }

  onAdd = () => this.setState({ isOpen: true })
  onClose = () => this.setState({ isOpen: false });

  onCommitAdd = (values) => {
    const { publishers = [] } = this.state;
    publishers.push(values);
    this.setState({ publishers })

    this.onClose();
  }

  onDelete = (index) => () => {
    const { publishers = [] } = this.state;
    publishers.splice(index, 1);
    this.setState({ publishers });
  }

  render () {
    const { publishers = [] ,isOpen }  = this.state;

    return(
      <Pane>
      <SideSheet isShown={isOpen} onCloseComplete={this.onClose}>
        <Pane zIndex={1} flexShrink={0} elevation={0}>
          <Pane padding={16}>
            <Heading size={600}>Add Publisher</Heading>
          </Pane>
        </Pane>
        <Pane padding={16}>
          <PublisherForm onCommit={this.onCommitAdd} onCancel={this.onClose}/>
        </Pane>
      </SideSheet>

      <Button onClick={this.onAdd} appearance="primary">
        <Icon icon="plus" style={{ marginRight: 8 }} /> Add Publisher
      </Button>

      <Pane marginTop={24}>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Name</Table.TextHeaderCell>
            <Table.TextHeaderCell>Phone</Table.TextHeaderCell>
            <Table.TextHeaderCell>Email</Table.TextHeaderCell>
            <Table.TextHeaderCell>Address</Table.TextHeaderCell>
            <Table.TextHeaderCell>Options</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height={320}>
            {publishers.map((publisher, index) => (
              <Table.Row key={index}>
                <Table.TextCell>{publisher.name}</Table.TextCell>
                <Table.TextCell>{publisher.phone}</Table.TextCell>
                <Table.TextCell>{publisher.email}</Table.TextCell>
                <Table.TextCell>{publisher.address}</Table.TextCell>
                <Table.TextCell>
                  <IconButton onClick={this.onDelete(index)} icon="trash" intent="danger"/>
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Pane>
    </Pane>
    );
  }
}

export default PublisherContainer;