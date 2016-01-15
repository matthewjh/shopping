import module from './module';
import './components/products-list/directive';
import './components/basket/directive';
import './components/check-out/directive';
import './components/thanks/directive';

module.config($routeProvider => {
  $routeProvider.when('/', {
    template: '<cmc-products-list></cmc-products-list>'
  });

  $routeProvider.when('/basket', {
    template: '<cmc-basket></cmc-basket>'
  });

  $routeProvider.when('/check-out', {
    template: '<cmc-check-out></cmc-check-out>'
  });

    $routeProvider.when('/thanks', {
    template: '<cmc-thanks></cmc-thanks>'
  });
  
});
