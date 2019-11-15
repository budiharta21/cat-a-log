import { api } from '../utils/request';

class Category {
  static loadAll() {
    return api().get("/categories");
  }

  static create(values) {
    const category = {...values};
    return api().post("/categories", { category });
  }

  static update(id, values) {
    const category = {...values};
    return api().put(`/categories/${id}`, { category });
  }
  
  static destroy(id) {
    return api().delete(`/categories/${id}`);
  }
}

export default Category;