import module from '../../module';

module.directive('cmcApp', () => {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: './components/app/template.html'
  };
});
