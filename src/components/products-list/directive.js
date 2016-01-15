import module from '../../module';
import '../../api/products';
import '../product/directive';
import '../basket-summary/directive';

module.directive('cmcProductsList', () => {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: './components/products-list/template.html',
    controller: ProductsListController,
    controllerAs: 'ctrl'
  };
});

class ProductsListController {
  constructor(productsApi) {
    this._productsApi = productsApi;

    this._load();
  }

  _load() {
    this._productsApi.getProducts().then(products => {
      this.products = products;
    });
  }
}
