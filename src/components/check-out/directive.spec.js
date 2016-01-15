import * as angular from 'angular';
import module from '../../module';
import './directive';

const TEMPLATE = `<cmc-check-out></cmc-check-out>`;

describe('check out directive', () => {
  let element;
  let parentScope;
  let basketApi;
  let $q;

  let mockSummary = {
    totalPrice: 500.50,
    count: 20
  };

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
    
    parentScope.$apply();
  });

  it('should show the summary info', () => {
    expect(element.find('.count').text()).toEqual('20');
    expect(element.find('.total-price').text()).toEqual('£500.50');
  });
});
