import module from '../../module';

module.directive('cmcProductsList', () => {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: './components/products-list/template.html'
  };
});
