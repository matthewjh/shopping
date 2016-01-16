import * as angular from 'angular';
import module from '../../module';
import './directive';
import {Product} from '../../models/product';

const TEMPLATE = `
<cmc-product product="product"></cmc-product>
`;

describe('product directive', () => {
  let element;
  let parentScope;
  let basketApi;
  let $q;

  let mockProduct = new Product('1', 'item1', 1);

  beforeEach(angular.mock.module(module.name));
  beforeEach(angular.mock.module('templates'));

  beforeEach(inject(($injector) => {
    let $compile = $injector.get('$compile');
    let $rootScope = $injector.get('$rootScope');

    $q = $injector.get('$q');
    basketApi = $injector.get('basketApi');

    parentScope = $rootScope.$new();
    element = $compile(TEMPLATE)(parentScope);
  }));

  beforeEach(() => {
    spyOn(basketApi, 'addProduct');
    spyOn(basketApi, 'removeProduct');

    parentScope.product = mockProduct;

    parentScope.$apply();
  });

  it('should display the info', () => {
    expect(element.find('.name').text()).toEqual(mockProduct.name);
    expect(element.find('.price').text()).toEqual('£1.00');
  });

  it('should add the product to the basket when the \'add to basket\' button is clicked', () => {
    element.find('.add-to-basket').click();

    expect(basketApi.addProduct).toHaveBeenCalledWith(mockProduct);
  });

  it('should remove the product from the basket when the \'remove from basket\' button is clicked', () => {
    element.find('.remove-from-basket').click();

    expect(basketApi.removeProduct).toHaveBeenCalledWith(mockProduct);
  });
});
