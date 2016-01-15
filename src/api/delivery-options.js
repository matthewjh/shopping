import module from '../module';
import {DeliveryOption} from '../models/delivery-option';

class DeliveryOptionsApi {

  constructor($q) {
    this._$q = $q;
  }
  /*
   * Returns a promise for a list of products. Mocked data as required by the spec.
   */
  getOptions() {
    return this._$q.resolve([
      new DeliveryOption('First Class', 5),
      new DeliveryOption('Standard', 3.50),
      new DeliveryOption('Slow', 1)
    ]);
  }
}

module.service('deliveryOptionsApi', DeliveryOptionsApi);
