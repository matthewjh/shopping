import module from '../module';
import {Product} from '../models/product';

class ProductsApi {

  constructor($q) {
    this._$q = $q;
  }
  /*
   * Returns a promise for a list of products. Mocked data as required by the spec.
   */
  getProducts() {
    return this._$q.resolve([
      new Product('1', 'Laptop', 500),
      new Product('2', 'Tea Cup', 5),
      new Product('3', 'Phone', 350)
    ]);
  }
}

module.service('productsApi', ProductsApi);
