import module from './module';
import './components/products-list/directive';

module.config($routeProvider => {
  $routeProvider.when('/', {
    template: '<cmc-products-list></cmc-products-list>'
  });
  
});
