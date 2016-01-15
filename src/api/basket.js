import module from '../module';

// mocked. in actuality, we'd be communicating with an api here

class BasketApi {

  constructor($q, $rootScope) {
    this._$q = $q;
    this._$rootScope = $rootScope;

    this.reset();
  }

  getSummary() {
    // mocked. this would all be done by the back-end
    let totalPrice = 0;
    let count = 0;

    Object.keys(this._aggregatedProducts).forEach(name => {
      let p = this._aggregatedProducts[name];

      totalPrice += p.product.price * p.quantity;
      count += p.quantity
    });

    return this._$q.resolve({
      totalPrice: totalPrice,
      count: count
    });
  }
  
  getProducts() {
    return this._$q.resolve(this._products);
  }

  addProduct(product) {
    // this logic would be done by the back end. hence, i haven't unit tested it here
    if (!this._aggregatedProducts[product.id]) {
      this._products.push(product);
      this._aggregatedProducts[product.id] = {
        product: product,
        quantity: 0
      };
    }

    this._aggregatedProducts[product.id].quantity++;

    // we need this event, so that components dependent on basket info know to re-call basketApi.
    // we can't use two-way bindings to do this for us, because presumably the basket state would in actuality
    // be managed by the back-end
    this._$rootScope.$broadcast('basketUpdated');

    return this._$q.resolve();
  }

  removeProduct(product) {
    let aggregatedProduct = this._aggregatedProducts[product.id];

    // this logic would be done by the back end. hence, i haven't unit tested it here
    if (aggregatedProduct) {
      aggregatedProduct.quantity--;

      if (aggregatedProduct.quantity < 0) {
        let index = this._products.indexOf(product);
        this._products.splice(index, 1);

        delete this._aggregatedProducts[product.id];
      }

      this._$rootScope.$broadcast('basketUpdated');
    }
  }

  reset() {
    // mocked
    this._aggregatedProducts = {};
    this._products = [];

    this._$rootScope.$broadcast('basketUpdated');
  }
}

module.service('basketApi', BasketApi);
