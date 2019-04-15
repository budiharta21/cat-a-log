import React, {Component} from 'react';
import {
  Pane, 
  Button, 
  SideSheet, 
  Heading, 
  Icon,
  Table,
  IconButton
} from 'evergreen-ui';

import CategoryForm from '../../component/form/CategoryForm';

class CategoryContainer extends Component{

  state = {
    categories: [],
    isOpen: false,
    editedCategory: null
  }

  onAdd = () => this.setState({ isOpen:true })
  onCancelAdd = () => this.setState({ isOpen:false })
  
  onCommitAdd = (values) => {
    const { categories = [] } = this.state;
    categories.push(values);
    this.setState({ categories });
    this.onCancelAdd();
  }

  onDelete = (index) => () =>{
    const { categories = [] } = this.state;
    categories.splice(index, 1);
    this.setState({ categories });
  }

  onEdit = (category, index) => () => {
    const editedCategory = {...category, index};
    this.setState({ editedCategory });
  }

  onCancelEdit = () => this.setState({ editedCategory: null }) 

  onCommitEdit = (values) =>{
    const { editedCategory, categories = [] } = this.state;
    categories[editedCategory.index] = { ...values };
    this.setState({ categories });
    this.onCancelEdit();
  }


  render () {
    const { categories = [], isOpen, editedCategory } = this.state;
    const sortedCategory = categories.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    }); 
    return(
      <Pane>
        <SideSheet isShown={isOpen} onCloseComplete={this.onCancelAdd}>
          <Pane zIndex={1} flexShrink={0} elevation={0}>
            <Pane padding={16}>
              <Heading size={600}>Add Category</Heading>
            </Pane>
          </Pane>
          <Pane padding={16}>
            <CategoryForm onCommit={this.onCommitAdd} onCancel={this.onCancelAdd}></CategoryForm>
          </Pane>
        </SideSheet>

        <SideSheet isShown={!!editedCategory} onCloseComplete={this.onCancelEdit}>
          <Pane zIndex={1} flexShrink={0} elevation={0}>
            <Pane padding={16}>
              <Heading size={600}>Add Category</Heading>
            </Pane>
          </Pane>
          <Pane padding={16}>
            <CategoryForm initialValue={editedCategory} onCommit={this.onCommitEdit} onCancel={this.onCancelEdit}></CategoryForm>
          </Pane>
        </SideSheet>

        <Button onClick={this.onAdd} appearance="primary">
          <Icon icon="plus" style={{ marginRight: 8 }} /> Add Category
        </Button> 
          
        <Pane  marginTop={24}> 
        {sortedCategory.length === 0 && <center><em>There's no author added yet.</em></center>}
        {sortedCategory.length > 0 && 
          <Table>
            <Table.Head>
              <Table.TextHeaderCell>Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Biography</Table.TextHeaderCell>
              <Table.TextHeaderCell>Options</Table.TextHeaderCell>
            </Table.Head>

            <Table.Body height={320}>
            {categories.map((category, index) => (
              <Table.Row key={index}>
                <Table.TextCell>{category.name}</Table.TextCell>
                <Table.TextCell>{category.description}</Table.TextCell>
                <Table.TextCell>
                  <IconButton display='inline' onClick={this.onEdit(category, index)} icon="edit"/>
                    &nbsp;
                  <IconButton display='inline' onClick={this.onDelete(index)} icon="trash" intent="danger"/>
                </Table.TextCell>
              </Table.Row>
            ))}
            </Table.Body>
          </Table>
        }
        </Pane>
      </Pane> 
    )
  }
}

export default CategoryContainer;