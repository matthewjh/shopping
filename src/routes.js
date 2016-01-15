import module from './module';
import './components/products-list/directive';
import './components/basket/directive';

module.config($routeProvider => {
  $routeProvider.when('/', {
    template: '<cmc-products-list></cmc-products-list>'
  });

  $routeProvider.when('/basket', {
    template: '<cmc-basket></cmc-basket>'
  });
  
});
