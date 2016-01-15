import module from '../../module';
import '../basket-summary/directive';

module.directive('cmcApp', () => {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: './components/app/template.html'
  };
});
