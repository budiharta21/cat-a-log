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
    editedAuthor: null
  };

  onAdd = () => this.setState({ isOpen: true });
  onCancelAdd = () => this.setState({ isOpen: false });

  onCommitAdd = (values) => {
    const { authors = [] } = this.state;
    authors.push(values);
    this.setState({ authors });
    this.onCancelAdd();
  }

  onDelete = (index) => () => {
    const { authors = [] } = this.state;
    authors.splice(index, 1);
    this.setState({ authors });
  }

  onEdit = (author, index) => () => {
    const editedAuthor = { ...author, index };
    this.setState({ editedAuthor });
  }

  onCancelEdit = () => {
    this.setState({ editedAuthor: null });
  }

  onCommitEdit = (values) => {
    const { editedAuthor, authors = [] } = this.state;
    authors[editedAuthor.index] = { ...values };
    this.setState({ authors });
    this.onCancelEdit();
  }

  render() {
    const { authors = [], isOpen, editedAuthor } = this.state;
    const sortedAuthors = authors.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });
    
    return (<Pane>
      <SideSheet isShown={isOpen} onCloseComplete={this.onCancelAdd}>
        <Pane zIndex={1} flexShrink={0} elevation={0}>
          <Pane padding={16}>
            <Heading size={600}>Add Author</Heading>
          </Pane>
        </Pane>
        <Pane padding={16}>
          <AuthorForm onCommit={this.onCommitAdd} onCancel={this.onCancelAdd}/>
        </Pane>
      </SideSheet>
      <SideSheet isShown={!!editedAuthor} onCloseComplete={this.onCancelEdit}>
        <Pane zIndex={1} flexShrink={0} elevation={0}>
          <Pane padding={16}>
            <Heading size={600}>Edit Author</Heading>
          </Pane>
        </Pane>
        <Pane padding={16}>
          <AuthorForm initialValue={editedAuthor} onCommit={this.onCommitEdit} onCancel={this.onCancelEdit}/>
        </Pane>
      </SideSheet>

      <Button onClick={this.onAdd} appearance="primary">
        <Icon icon="plus" style={{ marginRight: 8 }} /> Add Author
      </Button>

      <Pane marginTop={24}>
        {sortedAuthors.length === 0 && <center><em>There's no author added yet.</em></center>}
        {sortedAuthors.length > 0 && <Table>
          <Table.Head>
            <Table.TextHeaderCell>Name</Table.TextHeaderCell>
            <Table.TextHeaderCell>Biography</Table.TextHeaderCell>
            <Table.TextHeaderCell>Options</Table.TextHeaderCell>
          </Table.Head>

          <Table.Body height={320}>
            {sortedAuthors.map((author, index) => (
              <Table.Row key={index}>
                <Table.TextCell>{author.name}</Table.TextCell>
                <Table.TextCell>{author.biography}</Table.TextCell>
                <Table.TextCell>
                  <IconButton display='inline' onClick={this.onEdit(author, index)} icon="edit"/>
                  &nbsp;
                  <IconButton display='inline' onClick={this.onDelete(index)} icon="trash" intent="danger"/>
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>}
      </Pane>
    </Pane>);
  }
}

export default AuthorContainer;