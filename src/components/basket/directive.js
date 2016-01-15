import module from '../../module';
import '../../api/basket';

module.directive('cmcBasket', () => {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: './components/basket/template.html',
    controller: BasketController,
    controllerAs: 'ctrl'
  };
});

class BasketController {
  constructor($scope, $location, basketApi) {
    this._basketApi = basketApi;
    this._$location = $location;

    $scope.$on('basketUpdated', () => {
      this._load();
    });

    this._load();
  }

  _load() {
    this._basketApi.getSummary().then(summary => {
      this.totalPrice = summary.totalPrice;
      this.count = summary.count;
    });

    this._basketApi.getProducts().then(products => {
      this.products = products;
    });
  }

  checkOut() {
    this._$location.path('check-out');
  }
}
