(function () {
    'use strict';

    angular.module(appMainModule).controller('CrearRolController', controller);

    controller.$inject = ['$http', 'AppConfig', '$stateParams', '$state', '$scope', 'RolService', 'NotificationService', 'AplicacionService'];

    function controller($http, AppConfig, $stateParams, $state, $scope, RolService, NotificationService, AplicacionService) {
        var vm = this;

        // Properties & Fields ===============================================================================================================================================


        //====================================================================================================================================================================



        // Methods ===========================================================================================================================================================

        vm.isLoading = function () {
            return RolService.isLoading();
        };

        vm.regresar = function () {
            $state.go('app.buscarRol', { str: $stateParams.str, id: $stateParams.idAplicacion })
        };

        vm.save = function () {
            RolService.save(
                vm.aplicacionRol,
                (responseSuccess) => {

                    var cambioEstado = function () {
                        $state.go('app.buscarRol', { str: $stateParams.str, id: $stateParams.idAplicacion });
                    }

                    NotificationService.manageResponse({ responseWrapper: responseSuccess.data, actionAccept: cambioEstado });



                }, (responseError) => {
                    NotificationService.manageResponse({ responseWrapper: responseError.data, actionAccept: null });
                }
            )
        };

        function init() {
            vm.tituloVista = 'Nuevo Rol';
            vm.aplicacionRol = {};

            if ($stateParams.idAplicacion) {

                //vm.aplicacionRol.idAplicacion = $stateParams.aplicacion;
                AplicacionService.getAplicacionById(
                    (responseSuccess) => {
                        vm.aplicacionRol.idAplicacion = responseSuccess.data.object;
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
                    $stateParams.idAplicacion
                );


            }

            if ($stateParams.idRol > 0) {

                vm.tituloVista = 'Editar Rol';

                RolService.getById(
                    (responseSuccess) => {
                        vm.aplicacionRol.idRol = responseSuccess.data.object;
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
                    $stateParams.idRol
                );


            };


        }

        //Call constructor
        init();
    };

})();