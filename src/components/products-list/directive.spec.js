import * as angular from 'angular';
import module from '../../module';
import './directive';
import {Product} from '../../models/product';

const TEMPLATE = `<cmc-products-list></cmc-products-list>`;

describe('products list directive', () => {
  let element;
  let parentScope;
  let productsApi;
  let $q;

  let mockProducts = [
    new Product('1', 'item1', 1),
    new Product('2', 'item2', 2)
  ];

  beforeEach(angular.mock.module(module.name));
  beforeEach(angular.mock.module('templates'));

  beforeEach(inject(($injector) => {
    let $compile = $injector.get('$compile');
    let $rootScope = $injector.get('$rootScope');

    $q = $injector.get('$q');
    productsApi = $injector.get('productsApi');

    parentScope = $rootScope.$new();
    element = $compile(TEMPLATE)(parentScope);
  }));

  beforeEach(() => {
    spyOn(productsApi, 'getProducts').and.returnValue($q.resolve(mockProducts));

    parentScope.$apply();
  });

  it('should render as many product elements as there are products', () => {
    expect(element.find('cmc-product').length).toEqual(mockProducts.length);
  });
});
