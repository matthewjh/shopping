import module from '../module';
import './basket';

class OrderApi {

  constructor($q, basketApi) {
    this._$q = $q;
    this._basketApi = basketApi;
  }

  placeOrder(basketSummary, deliveryOption) {
    // nothing to do here as no real api, except to clear the basket so that
    // the user can start anew

    this._basketApi.reset();

    return this._$q.resolve();
  }
}

module.service('orderApi', OrderApi);
