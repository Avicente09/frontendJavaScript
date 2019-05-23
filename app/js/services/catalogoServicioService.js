// Service =================================================================================
(function () {
    'use strict';

    angular
        .module(appMainModule)
        .service('CatalogoServicioService', service);

    service.$inject = ['$http', 'AppConfig'];

    function service($http, AppConfig) {
        var vm = this;
        var _isLoading = false;
        vm.arregloDeObjetos = [];


        // Properties and fields ====================

        vm.isLoading = function () {
            return _isLoading;
        };
        // Fields



        // Properties Getters and Setters

        //Por callback


        vm.updateCatalogoServicioList = function (searchText, actionSuccess, actionError) {



            actionError = actionError || ((error) => { console.log(error) });

            var url = AppConfig.url + 'catalogoServicio/consulta/' + searchText;


            $http({
                url: url,
                method: 'GET'
            }).then(actionSuccess, actionError);
        };


        vm.getCatalogoServicioConsultaList = function (strConsulta, actionSuccess, actionError, filters) {
            _isLoading = true;
            var url = AppConfig.url + 'catalogoServicio/consulta/' + strConsulta;
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

        vm.getCatalogoServicioList = function (actionSuccess, actionError, filters) {
            _isLoading = true;
            var url = AppConfig.url + 'catalogoServicio/consulta/';
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

        vm.saveCatalogoServicio = function (catalogoServicio, actionSuccess, actionError) {
            _isLoading = true;
            var method = 'POST';
            if (catalogoServicio && catalogoServicio.id > 0) {
                // method = 'PUT';
            }
            var url = AppConfig.url + 'catalogoServicio/'
            $http({
                url: url,
                method: method,
                data: catalogoServicio
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

        vm.getCatalogoServicioById = function (actionSuccess, actionError, id) {
            var url = AppConfig.url + 'catalogoServicio/' + id;

            actionError = actionError || ((response) => {
                console.error(response.data.errorMessage);
            });

            $http({
                url: url,
                method: 'GET'
            }).then(actionSuccess, actionError);
        }

        vm.updateCatalogoServicio = function (id, actionSuccess, actionError) {
            _isLoading = true;
            var url = AppConfig.url + 'catalogoServicio/' + id;

            $http({
                url: url,
                method: 'PUT'
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


        vm.getCatalogoServicioClasificacionListById = function (actionSuccess, actionError, id) {
            var url = AppConfig.url + 'catalogoServicio/listByDepartamentoMedico/' + id;

            $http({
                url: url,
                method: 'GET'
            }).then(actionSuccess, actionError);
        }

        vm.getCatalogoServicioByIdClasificacion = function (actionSuccess, actionError, id) {
            var url = AppConfig.url + 'catalogoServicio/listByClasificacion/' + id;

            $http({
                url: url,
                method: 'GET'
            }).then(actionSuccess, actionError);
        }


        return vm;
    };

})();
