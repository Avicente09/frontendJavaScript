
(function () {
    'use strict';

    angular.module(appMainModule).controller('buscarPersonaDialogController', controller);

    controller.$inject = ['$http', 'AppConfig', 'timeout', '$q', '$scope', '$mdDialog'];

    function controller($http, AppConfig, $timeout, $q, $scope, $mdDialog) {
        var vm = this;
        

        // list of `state` value/display objects
        vm.states = loadAll();
        vm.querySearch = querySearch;

        // ******************************
        // Template methods
        // ******************************

        /**
          * Search for states... use $timeout to simulate
          * remote dataservice call.
          */
        function querySearch(query) {
            return query ? vm.states.filter(createFilterFor(query)) : vm.states;
        }

        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

            return allStates.split(/, +/g).map(function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };

        }



        function init() {

        };


        //Call constructor
        init();
    };

})();


