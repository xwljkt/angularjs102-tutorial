(function() {
  'use strict';

  angular
    .module('angularjsTutorial')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
