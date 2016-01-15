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
      new Product('Laptop', 500, 5),
      new Product('Tea Cup', 5, 20),
      new Product('Phone', 350, 25)
    ]);
  }
}

module.service('productsApi', ProductsApi);
