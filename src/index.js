import * as angular from 'angular';
import module from './module';
import './routes';
import './components/app/directive.js';

angular.bootstrap(document.documentElement, [module.name]);
