(function () {
    'use strict';

    angular.module(appMainModule).controller('BuscarComponenteController', controller);

    controller.$inject = ['$http', 'AppConfig', '$state', '$stateParams', 'AplicacionService', 'NotificationService', '$scope', 'ComponenteService'];

    function controller($http, AppConfig, $state, $stateParams, AplicacionService, NotificationService, $scope, ComponenteService) {
        var vm = this;

        // Properties & Fields ===============================================================================================================================================
        vm.selected = [];
        vm.banderaBusqueda = 1;


        //====================================================================================================================================================================



        // Methods ===========================================================================================================================================================
        vm.isLoading = function () {
            return AplicacionService.isLoading();
        };

        vm.regresarSeleccionAplicacion = function () {
            vm.banderaBusqueda = 1;
            console.log(vm.banderaBusqueda);
        }

        vm.editar = function (objetoEditar) {
            if (objetoEditar && objetoEditar.idAplicacion) {
                $state.go('app.nuevoComponente', { id: objetoEditar.idComponente, str: vm.strConsulta, idAplicacion: 0 })
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

                ComponenteService.update(
                    objetoEliminar,

                    (responseSuccess) => {
                        NotificationService.manageResponse({ responseWrapper: responseSuccess.data, actionAccept: null });
                        vm.buscar();
                        vm.refrescarListaComponentes(objetoEliminar);

                    }, (responseError) => {
                        NotificationService.manageResponse({ responseWrapper: responseError.data, actionAccept: null });
                    })
            })
        };

        vm.aplicacionSeleccionada = function (p) {

            ComponenteService.getListComponenteByIdAplicacion(
                p,
                (responseSucces) => {
                    vm.componentesList = responseSucces.data.object;
                    console.log(responseSucces.data.message)
                    if (!vm.componentesList.lenght > 0)
                        vm.mensajeBusqueda = "No se encontraron datos para esta aplicación";
                }
            ), (actionError) => {
                swal(
                    'Error!',
                    'No se encontro el servidor!',
                    'error'
                )
            }
            vm.banderaBusqueda = 0;
            vm.pageComponente = 1;
            vm.limitOptionsComponente = [5, 10, 15];
            vm.limitComponente = 10;
            vm.showPagineoComponente = true;
            $stateParams.id = p.idAplicacion;


        }

        vm.refrescarListaComponentes = function (p) {
            ComponenteService.getListComponenteByIdAplicacion(
                p,
                (responseSucces) => {
                    vm.componentesList = responseSucces.data.object;
                    console.log(responseSucces.data.message)
                    if (!vm.componentesList.lenght > 0)
                        vm.mensajeBusqueda = "No se encontraron datos para esta aplicación";
                }
            ), (actionError) => {
                swal(
                    'Error!',
                    'No se encontro el servidor!',
                    'error'
                )
            }
        }


        vm.nuevo = function () {
            vm.selected;

            $state.go('app.nuevoComponente', { id: 0, str: vm.strConsulta, idAplicacion: $stateParams.id })

            // $state.go('app.nuevoComponente', { id: vm.selected[0].idAplicacion, str: vm.strConsulta })
        }

        vm.buscar = function () {

            vm.page = 1;
            vm.limitOptions = [5, 10, 15];
            vm.limit = 10;
            vm.showPagineo = true;
            vm.selected = [];

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

        vm.buscarEnLista = function () {
            if (vm.showBusqueda === true) {
                vm.showBusqueda = false;
                vm.searchText = "";

            }
            else
                vm.showBusqueda = true;

        }

        vm.focus = function () {
            return true;
        }

        function init() {

            // if ($stateParams.str && $stateParams.str != "" && $stateParams.str.length > 0)
            if ($stateParams.str && $stateParams.str != "") {
                vm.strConsulta = $stateParams.str;
                vm.page = 1;
                vm.limitOptions = [5, 10, 15];
                vm.limit = 10;
                vm.showPagineo = true;

                var objAplicacion = {};
                objAplicacion.idAplicacion = $stateParams.id;
                if ($stateParams.id) {

                    vm.banderaBusqueda = 0;
                }




                AplicacionService.getAplicacionConsultaList(
                    vm.strConsulta,
                    (responseSucces) => {
                        vm.listadoConsulta = responseSucces.data.object;
                        console.log(responseSucces.data.message)

                        AplicacionService.getAplicacionById(

                            (responseSucces) => {

                                vm.selected[0] = responseSucces.data.object;
                                vm.refrescarListaComponentes(vm.selected[0]);
                                vm.banderaBusqueda = 0;
                                vm.pageComponente = 1;
                                vm.limitOptionsComponente = [5, 10, 15];
                                vm.limitComponente = 10;
                                vm.showPagineoComponente = true;
                            }
                            , (actionError) => {
                                swal(
                                    'Error!',
                                    'No se encontro el servidor!',
                                    'error'
                                )
                            }, $stateParams.id
                        );



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