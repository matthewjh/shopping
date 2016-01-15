import module from '../../module';

module.directive('cmcProduct', () => {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: './components/product/template.html',
    controller: ProductController,
    controllerAs: 'ctrl',
    bindToController: {
      product: '='
    }
  };
});

class ProductController {
}
