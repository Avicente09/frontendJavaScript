// Service =================================================================================
(function () {
    'use strict';

    angular
        .module(appMainModule)
        .service('ComponenteService', service);

    service.$inject = ['$http', 'AppConfig'];

    function service($http, AppConfig) {
        var vm = this;
        var _isLoading = false;



        // Properties and fields ====================

        vm.isLoading = function () {
            return _isLoading;
        };
        // Fields



        // Properties Getters and Setters

        //Por callback


        vm.getListByString = function (strConsulta, actionSuccess, actionError, filters) {
            _isLoading = true;
            var url = AppConfig.url + 'componente/consulta/' + strConsulta;
            var a = actionSuccess;
            var b = actionError;

            if (filters)
                url += '?' + filters;

            $http({
                url: url,
                method: 'GET'
            }).then((response) => //Metodo que se ejecuta cuando el servidor contesta con un OK
            {
                if (actionSuccess)
                    actionSuccess(response);

                _isLoading = false;
            },
                (response) => //Metodo que se ejectua cuando el servidor da un error de cualquier tipo
                {
                    if (actionError)
                        actionError(response);

                    _isLoading = false;
                });

        }

        vm.getList = function (actionSuccess, actionError, filters) {
            _isLoading = true;
            var url = AppConfig.url + 'componente/consulta/';
            var a = actionSuccess;
            var b = actionError;

            if (filters)
                url += '?' + filters;

            $http({
                url: url,
                method: 'GET'
            }).then((response) => //Metodo que se ejecuta cuando el servidor contesta con un OK
            {
                if (actionSuccess)
                    actionSuccess(response);

                _isLoading = false;
            },
                (response) => //Metodo que se ejectua cuando el servidor da un error de cualquier tipo
                {
                    if (actionError)
                        actionError(response);

                    _isLoading = false;
                });

        }

        vm.getNodoPadreList = function (actionSuccess, actionError, id) {
            _isLoading = true;
            var url = AppConfig.url + 'componente/listaNodos/' + id;
            var a = actionSuccess;
            var b = actionError;

          

            $http({
                url: url,
                method: 'GET'
            }).then((response) => //Metodo que se ejecuta cuando el servidor contesta con un OK
            {
                if (actionSuccess)
                    actionSuccess(response);

                _isLoading = false;
            },
                (response) => //Metodo que se ejectua cuando el servidor da un error de cualquier tipo
                {
                    if (actionError)
                        actionError(response);

                    _isLoading = false;
                });

        }

        vm.getListComponenteByIdAplicacion = function (aplicacion, actionSuccess, actionError, filters ) {
            _isLoading = true;
            var method = 'POST';
            if (aplicacion && aplicacion.id > 0) {
                // method = 'PUT';
            }
            var url = AppConfig.url + 'componente/lista'
            $http({
                url: url,
                method: method,
                data: aplicacion
            }).then((response) => //Metodo que se ejecuta cuando el servidor contesta con un OK
            {
                if (actionSuccess)
                    actionSuccess(response);

                _isLoading = false;
            },
                (response) => //Metodo que se ejectua cuando el servidor da un error de cualquier tipo
                {
                    if (actionError)
                        actionError(response);

                    _isLoading = false;
                });

        }

        vm.save = function (componente, actionSuccess, actionError) {
            _isLoading = true;
            var method = 'POST';
            if (componente && componente.id > 0) {
                // method = 'PUT';
            }
            var url = AppConfig.url + 'componente/'
            $http({
                url: url,
                method: method,
                data: componente
            }).then((response) => //Metodo que se ejecuta cuando el servidor contesta con un OK
            {
                if (actionSuccess)
                    actionSuccess(response);

                _isLoading = false;
            },
                (response) => //Metodo que se ejectua cuando el servidor da un error de cualquier tipo
                {
                    if (actionError)
                        actionError(response);

                    _isLoading = false;
                });

        }

        vm.getById = function (actionSuccess, actionError, id) {
            var url = AppConfig.url + 'componente/' + id;

            actionError = actionError || ((response) => {
                console.error(response.data.errorMessage);
            });

            $http({
                url: url,
                method: 'GET'
            }).then(actionSuccess, actionError);
        }

        vm.update = function (componente, actionSuccess, actionError) {
            _isLoading = true;
            var url = AppConfig.url + 'componente/';

            $http({
                url: url,
                method: 'PUT',
                data: componente
            }).then((response) => //Metodo que se ejecuta cuando el servidor contesta con un OK
            {
                if (actionSuccess)
                    actionSuccess(response);

                _isLoading = false;
            },
                (response) => //Metodo que se ejectua cuando el servidor da un error de cualquier tipo
                {
                    if (actionError)
                        actionError(response);

                    _isLoading = false;
                });

        }



        return vm;
    };

})();
