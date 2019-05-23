(function () {
    'use strict';

    angular.module(appMainModule).controller('CrearUsuarioController', controller);

    controller.$inject = ['$http', 'AppConfig', '$stateParams', '$state', '$scope', 'usuarioCreaService', 'NotificationService', 'usuarioService', 'md5'];

    function controller($http, AppConfig, $stateParams, $state, $scope, usuarioCreaService, NotificationService, usuarioService, md5) {
        var vm = this;

        // Properties & Fields ===============================================================================================================================================


        //====================================================================================================================================================================



        // Methods ===========================================================================================================================================================
        vm.isLoading = function () {
            return usuarioCreaService.isLoading();
        };

        vm.regresar = function () {
            $state.go('app.bsqUsuarios', { id: 0, str: $stateParams.str })
        };

        $scope.file_changed = function (element) {
            vm.iconoAplicacion;
            $scope.$apply(function (scope) {
                var photofile = element.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    // handle onload
                };
                reader.readAsDataURL(photofile);
            });
            $scope.$apply();
        };

        vm.save = function () {
            console.log(vm.usuario.password);
            vm.usuario.password = md5.createHash(vm.usuario.password);
            console.log(vm.usuario.password);
            usuarioCreaService.saveUsuario(
                vm.usuario,
                (responseSuccess) => {

                    var cambioEstado = function () {
                        $state.go('app.bsqUsuarios', { id: 0, str: $stateParams.str }, { reload: true });
                    }

                    NotificationService.manageResponse({ responseWrapper: responseSuccess.data, actionAccept: cambioEstado });



                }, (responseError) => {
                    NotificationService.manageResponse({ responseWrapper: responseError.data, actionAccept: null });
                }
            )
        };

        function init() {
            vm.tituloVista = 'Nuevo Usuario';

            if ($stateParams.id > 0) {

                vm.tituloVista = 'Editar Usuario';

                usuarioService.getUsuarioById(
                    (responseSuccess) => {
                        vm.usuario = responseSuccess.data.object;
                    }
                    ,
                    (responseError) => {
                        swal(
                            'Error!',
                            'No se encontro el servidor! ',
                            'error'
                        )
                    }
                    ,
                    $stateParams.id
                );

            };
        };


        //Call constructor
        init();
    };

})();