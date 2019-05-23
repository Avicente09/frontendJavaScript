// Service =================================================================================
(function () {
    'use strict';

    angular
        .module(appMainModule)
        .service('AplicacionService', service);

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


        vm.getAplicacionConsultaList = function (strConsulta, actionSuccess, actionError, filters) {
            _isLoading = true;
            var url = AppConfig.url + 'aplicacion/consulta/' + strConsulta;
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

        vm.getAplicacionList = function (actionSuccess, actionError, filters) {
            _isLoading = true;
            var url = AppConfig.url + 'aplicacion/';
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

        vm.saveAplicacion = function (aplicacion, actionSuccess, actionError) {
            _isLoading = true;
            var method = 'POST';
            if (aplicacion && aplicacion.id > 0) {
                // method = 'PUT';
            }
            var url = AppConfig.url + 'aplicacion/'
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



        vm.saveUsuarioAplicacionRol = function (obj, actionSuccess, actionError) {
            _isLoading = true;
            var method = 'POST';

            var url = AppConfig.url + 'aplicacion/usuarioAplicacionRol/'
            $http({
                url: url,
                method: method,
                data: obj
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




        vm.getAplicacionById = function (actionSuccess, actionError, id) {
            var url = AppConfig.url + 'aplicacion/' + id;

            actionError = actionError || ((response) => {
                console.error(response.data.errorMessage);
            });

            $http({
                url: url,
                method: 'GET'
            }).then(actionSuccess, actionError);
        }

        vm.getUsuarioAplicacionRolByIdUsuario = function (actionSuccess, actionError, id, id2) {
            var url = AppConfig.url + 'aplicacion/aplicacionAsignada/' + id + '/' + id2;

            actionError = actionError || ((response) => {
                console.error(response.data.errorMessage);
            });

            $http({
                url: url,
                method: 'GET'
            }).then(actionSuccess, actionError);
        }

        vm.getRolAplicacionByIdUsuario = function (actionSuccess, actionError, id, id2) {
            var url = AppConfig.url + 'aplicacion/rolAplicaciones/' + id + '/' + id2;

            actionError = actionError || ((response) => {
                console.error(response.data.errorMessage);
            });

            $http({
                url: url,
                method: 'GET'
            }).then(actionSuccess, actionError);
        }


        vm.updateAplicacion = function (aplicacion, actionSuccess, actionError) {
            _isLoading = true;
            var url = AppConfig.url + 'aplicacion/';

            $http({
                url: url,
                method: 'PUT',
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



        return vm;
    };

})();
