import React, { Component } from 'react';
import { 
  Pane, 
  Button, 
  SideSheet, 
  Heading, 
  Icon,
  IconButton,
  Table,
} from 'evergreen-ui';

import AuthorForm from '../../component/form/AuthorForm';

class AuthorContainer extends Component {
  state = {
    authors: [],
    isOpen: false,
  };

  onAdd = () => this.setState({ isOpen: true });
  onClose = () => this.setState({ isOpen: false });

  onCommitAdd = (values) => {
    const { authors = [] } = this.state;
    authors.push(values);
    this.setState({ authors });
    this.onClose();
  }

  onDelete = (index) => () => {
    const { authors = [] } = this.state;
    authors.splice(index, 1);
    this.setState({ authors });
  };

  render() {
    const { authors = [], isOpen } = this.state;

    return (<Pane>
      <SideSheet isShown={isOpen} onCloseComplete={this.onClose}>
        <Pane zIndex={1} flexShrink={0} elevation={0}>
          <Pane padding={16}>
            <Heading size={600}>Add Author</Heading>
          </Pane>
        </Pane>
        <Pane padding={16}>
          <AuthorForm onCommit={this.onCommitAdd} onCancel={this.onClose}/>
        </Pane>
      </SideSheet>

      <Button onClick={this.onAdd} appearance="primary">
        <Icon icon="plus" style={{ marginRight: 8 }} /> Add Author
      </Button>

      <Pane marginTop={24}>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Name</Table.TextHeaderCell>
            <Table.TextHeaderCell>Biography</Table.TextHeaderCell>
            <Table.TextHeaderCell>Options</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height={320}>
            {authors.map((author, index) => (
              <Table.Row key={index}>
                <Table.TextCell>{author.name}</Table.TextCell>
                <Table.TextCell>{author.biography}</Table.TextCell>
                <Table.TextCell>
                  <IconButton onClick={this.onDelete(index)} icon="trash" intent="danger"/>
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Pane>
    </Pane>);
  }
}

export default AuthorContainer;