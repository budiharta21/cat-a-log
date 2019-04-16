import { api } from '../utils/request';

class Author {
  static loadAll() {
    return api().get("/authors");
  }

  static create(values) {
    const author = { ...values };
    return api().post("/authors", { author });
  }

  static update(id, values) {
    const author = { ...values };
    return api().put(`/authors/${id}`, { author });
  }

  static destroy(id) {
    return api().delete(`/authors/${id}`);
  }
}

export default Author;