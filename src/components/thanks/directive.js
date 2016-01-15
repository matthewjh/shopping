import module from '../../module';

module.directive('cmcThanks', () => {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: './components/thanks/template.html'
  };
});
