// Service =================================================================================
(function () {
    'use strict';

    angular
        .module(appMainModule)
        .service('usuarioService', service);

    service.$inject = ['$http', 'AppConfig', '$state'];

    function service($http, AppConfig, $state) {
        var vm = this;
        var _isLoading = false;



        // Properties and fields ====================

        vm.isLoading = function () {
            return _isLoading;
        };

        vm.isLogin = function () {
            var u = JSON.parse(localStorage.getItem('usuario'));
            // var u = JSON.parse(sessionStorage.getItem('usuario'));

            if (u)
                return u;

            $state.go('login');

        }

        vm.cerrarSesion = function () {
            localStorage.clear();
            //console.log(localStorage.removeItem('usuario'));
            $state.go('login');
        }
        // Fields



        // Properties Getters and Setters

        //Por callback


        vm.getUsuarioListByString = function (strConsulta, actionSuccess, actionError, filters) {
            _isLoading = true;
            var url = AppConfig.url + 'usuario/consulta/' + strConsulta;
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
            var url = AppConfig.url + 'Usuario/consulta/';
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

        vm.getListRolByIdAplicacion = function (aplicacion, actionSuccess, actionError, filters) {
            _isLoading = true;
            var method = 'POST';
            if (aplicacion && aplicacion.id > 0) {
                // method = 'PUT';
            }
            var url = AppConfig.url + 'Usuario/lista'
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

        vm.save = function (usuario, actionSuccess, actionError) {
            _isLoading = true;
            var method = 'POST';
            if (rol && rol.id > 0) {
                // method = 'PUT';
            }
            var url = AppConfig.url + 'Usuario/'
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

        vm.getUsuarioById = function (actionSuccess, actionError, id) {

            var url = AppConfig.url + 'usuario/' + id;
            $http({
                url: url,
                method: 'GET'
            }).then((response) => //Metodo que se ejecuta cuando el servidor contesta con un OK
            {
                if (actionSuccess)
                    actionSuccess(response);

                _isLoading = false;
            }, (response) => //Metodo que se ejectua cuando el servidor da un error de cualquier tipo
                {
                    if (actionError)
                        actionError(response);

                    _isLoading = false;
                });
        }

        vm.update = function (rol, actionSuccess, actionError) {
            _isLoading = true;
            var url = AppConfig.url + 'usuario/';

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

        vm.verificarLogin = function (datosLogin, actionSuccess, actionError) {
            _isLoading = true;
            var method = 'POST';

            var url = AppConfig.url + 'usuario/login'
            $http({
                url: url,
                method: method,
                data: datosLogin
            }).then((response) => //Metodo que se ejecuta cuando el servidor contesta con un OK
            {
                if (actionSuccess)
                    actionSuccess(response);
                vm.usarioLocalStorage(response);
                _isLoading = false;
            },
                (response) => //Metodo que se ejectua cuando el servidor da un error de cualquier tipo
                {
                    if (actionError)
                        actionError(response);

                    _isLoading = false;
                });

        }

        vm.usarioLocalStorage = function (u) {
            localStorage.usuario = JSON.stringify(u.data.object);
            //sessionStorage.setItem('usuario', JSON.stringify(u.data.object));
        }



        return vm;
    };

})();
