// Service =================================================================================
(function () {
    'use strict';

    angular
        .module(appMainModule)
        .service('RolService', service);

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
            var url = AppConfig.url + 'rol/consulta/' + strConsulta;
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
            var url = AppConfig.url + 'rol/consulta/';
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

        vm.getListRolByIdAplicacion = function (aplicacion, actionSuccess, actionError, filters ) {
            _isLoading = true;
            var method = 'POST';
            if (aplicacion && aplicacion.id > 0) {
                // method = 'PUT';
            }
            var url = AppConfig.url + 'rol/lista'
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

        vm.save = function (rol, actionSuccess, actionError) {
            _isLoading = true;
            var method = 'POST';
            if (rol && rol.id > 0) {
                // method = 'PUT';
            }
            var url = AppConfig.url + 'rol/'
            $http({
                url: url,
                method: method,
                data: rol
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
            var url = AppConfig.url + 'rol/' + id;

            actionError = actionError || ((response) => {
                console.error(response.data.errorMessage);
            });

            $http({
                url: url,
                method: 'GET'
            }).then(actionSuccess, actionError);
        }

        vm.update = function (rol, actionSuccess, actionError) {
            _isLoading = true;
            var url = AppConfig.url + 'rol/';

            $http({
                url: url,
                method: 'PUT',
                data: rol
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
