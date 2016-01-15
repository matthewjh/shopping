import module from '../../module';
import '../../api/basket';

module.directive('cmcProduct', () => {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: './components/product/template.html',
    controller: ProductController,
    controllerAs: 'ctrl',
    bindToController: {
      product: '='
    }
  };
});

class ProductController {
  constructor(basketApi) {
    this._basketApi = basketApi;
  }

  addToBasket() {
    this._basketApi.addProduct(this.product);
  }

  removeFromBasket() {
    this._basketApi.removeProduct(this.product);
  }
}
