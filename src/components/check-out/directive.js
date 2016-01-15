import module from '../../module';
import '../../api/basket';
import '../../api/order';
import '../../api/delivery-options';

module.directive('cmcCheckOut', () => {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: './components/check-out/template.html',
    controller: CheckOutController,
    controllerAs: 'ctrl'
  };
});

class CheckOutController {
  constructor($scope, $injector) {
    this._$location = $injector.get('$location');
    this._basketApi = $injector.get('basketApi');
    this._orderApi = $injector.get('orderApi');
    this._deliveryOptionsApi = $injector.get('deliveryOptionsApi');
    this._currencyFilter = $injector.get('$filter')('currency');

    this.deliveryOptions = [];
    this._isOrderBeingPlaced = false;
    this.grandTotalPrice = 0;

    this._load();

    $scope.$watchGroup([
      () => this.selectedDeliveryOption,
      () => this.totalPrice
    ], () => {
      this._updateGrandTotal();
    });
  }

  getDeliveryOptionLabel(deliveryOption) {
    return `${deliveryOption.name} — ${this._currencyFilter(deliveryOption.price, '£')}`;
  }

  placeOrder() {
    // prevent the user from being able to press the button twice
    this._isOrderBeingPlaced = true;

    this._orderApi.placeOrder(this.basketSummary, this.selectedDeliveryOption)
      .then(() => {
        this._$location.path('thanks');
      })
      .finally(() => {
        this._isOrderBeingPlaced = false;
      });
  }

  _load() {
    this._basketApi.getSummary().then(summary => {
      this.basketSummary = summary;
      this.totalPrice = summary.totalPrice;
      this.count = summary.count;
    });

    this._deliveryOptionsApi.getOptions().then(options => {
      this.deliveryOptions = options;
    });
  }

  _updateGrandTotal() {
    if (this.selectedDeliveryOption) {
      this.grandTotalPrice = this.selectedDeliveryOption.price + this.totalPrice;
    }
  }

}
