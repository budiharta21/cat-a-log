import React, {Component} from 'react';
import {
  Pane, 
  Button, 
  SideSheet, 
  Heading, 
  Icon,
  Table,
  IconButton,
  toaster,
  Dialog
} from 'evergreen-ui';

import Category from '../../actions/category';
import CategoryForm from '../../component/form/CategoryForm';

class CategoryContainer extends Component{

  state = {
    isLoading: false,
    categories: [],
    isShowModal: false,
    isOpenSidebar: false,
    editedCategory: null,
    deletedCategory: null,
  }

  loadAll = () => {
    this.setState({ isLoading: true });
    Category.loadAll().then(data => {
      const { data: { data: categories = [] } } = data;
      this.setState({ isLoading: false, categories })
    })
  }

  onAdd = () => this.setState({ isOpenSidebar: true })
  onCancelAdd = () => this.setState({ isOpenSidebar: false })
  
  onCommitAdd = (values) => {
    Category.create(values).then(() => {
      this.loadAll();
      this.onCancelAdd();
      toaster.success("Category has been created!");
    }).catch(() => {
      toaster.danger("Something error, cant create category!");
    })
  }

  onDelete = (category) => () =>{
    this.setState({ 
      isShowModal: true,
      deletedCategory: category,
    })
  }

  onCancelDelete = () => {
    this.setState({ 
      isShowModal: false, 
      deletedCategory: null 
    })
  } 

  onCommitDelete = () => {
    const { deletedCategory } = this.state;
    Category.destroy(deletedCategory.id).then(() => {
      this.loadAll();
      toaster.success("Category has been deleted!");
    }).catch(() => {
      toaster.danger("Something error, cant delete category!");
    })
    this.onCancelDelete();
  }
  
  onEdit = (category) => () => {
    const editedCategory = {...category};
    this.setState({ editedCategory });
  }
  
  onCancelEdit = () => this.setState({ editedCategory: null }) 
  
  onCommitEdit = (values) =>{
    const { editedCategory } = this.state;
    Category.update(editedCategory.id, values).then(() => {
      this.loadAll();
      this.onCancelEdit();
      toaster.success("Category has been updated!");
    }).catch(() => {
      toaster.danger("Something error, cant update category!");
    })
  
  }

  componentDidMount() {
    this.loadAll();
  }

  render () {
    const { categories = [], isOpenSidebar, editedCategory, isShowModal } = this.state;
    const sortedCategory = categories.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    }); 
    return(
      <Pane>
        <SideSheet isShown={isOpenSidebar} onCloseComplete={this.onCancelAdd}>
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
        {sortedCategory.length === 0 && <center><em>There's no categories added yet.</em></center>}
        {sortedCategory.length > 0 && 
          <Table>
            <Table.Head>
              <Table.TextHeaderCell>Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Description</Table.TextHeaderCell>
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
                  <IconButton display='inline' onClick={this.onDelete(category)} icon="trash" intent="danger"/>
                </Table.TextCell>
              </Table.Row>
            ))}
            </Table.Body>
          </Table>
        }
        </Pane>

        <Dialog
          isShown={isShowModal}
          title="Delete Category"
          intent="danger"
          onCloseComplete={this.onCancelDelete}
          onConfirm={this.onCommitDelete}
          minHeightContent={40}
          confirmLabel="Delete">
          Are you sure want to delete this category?
        </Dialog>
      </Pane> 
    )
  }
}

export default CategoryContainer;