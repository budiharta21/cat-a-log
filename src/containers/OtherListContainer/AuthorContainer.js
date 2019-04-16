import React, { Component } from 'react';
import { 
  Pane, 
  Button, 
  SideSheet, 
  Heading, 
  Icon,
  IconButton,
  Table,
  Text,
  toaster,
} from 'evergreen-ui';
import Loading from '../../component/Loading';

import Author from '../../actions/author';

import AuthorForm from '../../component/form/AuthorForm';

class AuthorContainer extends Component {
  state = {
    isLoading: false,
    authors: [],
    isOpen: false,
    editedAuthor: null
  };

  loadAll = () => {
    this.setState({ isLoading: true });
    Author.loadAll().then(data => {
      const { data: { data: authors = [] } } = data;
      this.setState({ isLoading: false, authors });
    });
  }

  onAdd = () => this.setState({ isOpen: true });

  onCancelAdd = () => this.setState({ isOpen: false });

  onCommitAdd = (values) => {
    Author.create(values).then(() => {
      this.loadAll();
      this.onCancelAdd();
      toaster.success("Author has been created!");
    });
  }

  onDelete = (author) => () => {
    Author.destroy(author.id).then(() => {
      this.loadAll();
      toaster.success("Author has been deleted!");
    });
  }

  onEdit = (author) => () => {
    const editedAuthor = { ...author };
    this.setState({ editedAuthor });
  }

  onCancelEdit = () => {
    this.setState({ editedAuthor: null });
  }

  onCommitEdit = (values) => {
    const { editedAuthor } = this.state;
    Author.update(editedAuthor.id, values).then(() => {
      this.loadAll();
      this.onCancelEdit();
      toaster.success("Author has been updated!");
    });
  }

  componentDidMount() {
    this.loadAll();
  }

  render() {
    const { isLoading, authors = [], isOpen, editedAuthor } = this.state;
    
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
        {isLoading && <Loading label='Loading authors...'/>}

        {!isLoading && authors.length === 0 && <center><Text>There's no author added yet.</Text></center>}
        {!isLoading && authors.length > 0 && <Table>
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
                  <IconButton display='inline' onClick={this.onEdit(author, index)} icon="edit"/>
                  &nbsp;
                  <IconButton display='inline' onClick={this.onDelete(author)} icon="trash" intent="danger"/>
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