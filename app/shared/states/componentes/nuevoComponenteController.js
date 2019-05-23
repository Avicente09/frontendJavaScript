(function () {
    'use strict';

    angular.module(appMainModule).controller('NuevoComponenteController', controller);

    controller.$inject = ['$http', 'AppConfig', '$stateParams', '$state', '$scope', 'AplicacionService', 'NotificationService', 'ComponenteService'];

    function controller($http, AppConfig, $stateParams, $state, $scope, AplicacionService, NotificationService, ComponenteService) {
        var vm = this;

        // Properties & Fields ===============================================================================================================================================


        //====================================================================================================================================================================



        // Methods ===========================================================================================================================================================

        vm.isLoading = function () {
            return ComponenteService.isLoading();
        };

        vm.regresar = function () {
            // if ($stateParams.idAplicacion > 0) 
            // $state.go('app.buscarComponente', { str: $stateParams.str, id: vm.componente.idAplicacion })
            // else
            $state.go('app.buscarComponente', { str: $stateParams.str, id: vm.componente.idAplicacion })
        };

        vm.save = function () {
            ComponenteService.save(
                vm.componente,
                (responseSuccess) => {

                    var cambioEstado = function () {
                        $state.go('app.buscarComponente', { str: $stateParams.str, id: vm.componente.idAplicacion })
                    }

                    NotificationService.manageResponse({ responseWrapper: responseSuccess.data, actionAccept: cambioEstado });



                }, (responseError) => {
                    NotificationService.manageResponse({ responseWrapper: responseError.data, actionAccept: null });
                }
            )
        };

        function init() {
            vm.tituloVista = 'Nuevo Componente';

            // if ($stateParams.aplicacion) {
            //     vm.componente = {};
            //     vm.componente.idAplicacion = $stateParams.aplicacion.idAplicacion;
            // }

            if ($stateParams.id > 0) {
                vm.tituloVista = 'Editar Componente';

                ComponenteService.getById(
                    (responseSuccess) => {
                        vm.componente = responseSuccess.data.object;

                        ComponenteService.getNodoPadreList(

                            (responseSuccess) => {
                                vm.componentePadreList = responseSuccess.data.object;
                            }
                            ,
                            (responseError) => {
                                swal(
                                    'Error!',
                                    'No se encontro el servidor! ',
                                    'error'
                                )
                            },
                            vm.componente.idAplicacion
                        )

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
                )
            };

            if ($stateParams.idAplicacion > 0) {
                vm.tituloVista = 'Nuevo Componente';
                AplicacionService.getAplicacionById(
                    (responseSuccess) => {
                        vm.componente = {};
                        //vm.compenente.idAplicacion = {};
                        vm.componente.idAplicacion = responseSuccess.data.object.idAplicacion;

                        ComponenteService.getNodoPadreList(

                            (responseSuccess) => {
                                vm.componentePadreList = responseSuccess.data.object;
                            }
                            ,
                            (responseError) => {
                                swal(
                                    'Error!',
                                    'No se encontro el servidor! ',
                                    'error'
                                )
                            },
                            vm.componente.idAplicacion
                        )
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


        }

        //Call constructor
        init();
    };

})();