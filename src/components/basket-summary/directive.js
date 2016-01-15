import module from '../../module';
import '../../api/basket';

module.directive('cmcBasketSummary', () => {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: './components/basket-summary/template.html',
    controller: BasketSummaryController,
    controllerAs: 'ctrl'
  };
});

class BasketSummaryController {
  constructor($scope, basketApi) {
    this._basketApi = basketApi;

    $scope.$on('basketUpdated', () => {
      this._load();
    });

    this._load();
  }

  _load() {
    this._basketApi.getSummary().then(summary => {
      this.totalPrice = summary.totalPrice;
      this.count = summary.count;
    })
  }
}
