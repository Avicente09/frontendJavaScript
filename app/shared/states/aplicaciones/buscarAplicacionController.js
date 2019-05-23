(function () {
    'use strict';

    angular.module(appMainModule).controller('BuscarAplicacionController', controller);

    controller.$inject = ['$http', 'AppConfig', '$state', '$stateParams', 'AplicacionService', 'NotificationService'];

    function controller($http, AppConfig, $state, $stateParams,AplicacionService, NotificationService) {
        var vm = this;

        // Properties & Fields ===============================================================================================================================================


        //====================================================================================================================================================================



        // Methods ===========================================================================================================================================================
        vm.isLoading = function () {
            return AplicacionService.isLoading();
        };

        vm.editar = function (objetoEditar) {
            if (objetoEditar && objetoEditar.idAplicacion) {
                $state.go('app.nuevaAplicacion', { id: objetoEditar.idAplicacion, str: vm.strConsulta })
            }
        }

        vm.eliminar = function (objetoEliminar) {

            swal({
                title: '¿Esta seguro?',
                text: "Usted no podra revertir esta acción!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Si, eliminar!',
                cancelButtonText: 'Cancelar'
            }).then(function () {

                AplicacionService.updateAplicacion(
                    objetoEliminar,

                    (responseSuccess) => {
                        NotificationService.manageResponse({ responseWrapper: responseSuccess.data, actionAccept: null });
                        vm.buscar();
                    }, (responseError) => {
                        NotificationService.manageResponse({ responseWrapper: responseError.data, actionAccept: null });
                    })
            })
        };



        vm.nuevo = function () {
            $state.go('app.nuevaAplicacion')
        }

        vm.buscar = function () {

            vm.page = 1;
            vm.limitOptions = [5, 10, 15];
            vm.limit = 10;
            vm.showPagineo = true;

            if (vm.strConsulta != 0) {

                AplicacionService.getAplicacionConsultaList(
                    vm.strConsulta,
                    (responseSucces) => {
                        vm.listadoConsulta = responseSucces.data.object;
                        console.log(responseSucces.data.message)
                        if (!vm.listadoConsulta.lenght > 0)
                            vm.mensajeBusqueda = "No se encontraron coincidencias en la búsqueda";
                    }
                ), (actionError) => {
                    swal(
                        'Error!',
                        'No se encontro el servidor!',
                        'error'
                    )
                }
            }

        }



        function init() {

            // if ($stateParams.str && $stateParams.str != "" && $stateParams.str.length > 0)
            if ($stateParams.str && $stateParams.str != "") {
                vm.strConsulta = $stateParams.str;
                vm.page = 1;
                vm.limitOptions = [5, 10, 15];
                vm.limit = 10;
                vm.showPagineo = true;
                AplicacionService.getAplicacionConsultaList(
                    vm.strConsulta,
                    (responseSucces) => {
                        vm.listadoConsulta = responseSucces.data.object;
                        console.log(responseSucces.data.message)
                        if (!vm.listadoConsulta.lenght > 0)
                            vm.mensajeBusqueda = "No se encontraron coincidencias en la búsqueda";
                    }
                ), (actionError) => {
                    swal(
                        'Error!',
                        'No se encontro el servidor!',
                        'error'
                    )
                }

            }

        };






        //Call constructor
        init();
    };

})();