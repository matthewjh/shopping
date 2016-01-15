import * as angular from 'angular';
import module from '../../module';
import './directive';
import {Product} from '../../models/product';

const TEMPLATE = `<cmc-basket></cmc-basket>`;

describe('basket summary directive', () => {
  let element;
  let parentScope;
  let basketApi;
  let $q;

  let mockSummary = {
    totalPrice: 500.50,
    count: 20
  };

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
    basketApi = $injector.get('basketApi');

    parentScope = $rootScope.$new();
    element = $compile(TEMPLATE)(parentScope);
  }));

  beforeEach(() => {
    spyOn(basketApi, 'getSummary').and.returnValue($q.resolve(mockSummary));
    spyOn(basketApi, 'getProducts').and.returnValue($q.resolve(mockProducts));
    
    parentScope.$apply();
  });

  it('should show the summary info', () => {
    expect(element.find('.count').text()).toEqual('20');
    expect(element.find('.total-price').text()).toEqual('£500.50');
  });

  it('should update the summary info when the basket is updated', () => {
    let newSummary = {
      totalPrice: 1000,
      count: 10
    };

    basketApi.getSummary.and.returnValue($q.resolve(newSummary));

    parentScope.$broadcast('basketUpdated');
    parentScope.$apply();

    expect(element.find('.count').text()).toEqual('10');
    expect(element.find('.total-price').text()).toEqual('£1,000.00');
  });

  it('should render as many product elements as there are products in the basket', () => {
    expect(element.find('cmc-product').length).toEqual(mockProducts.length);
  });
});
