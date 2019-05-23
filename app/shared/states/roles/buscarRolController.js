(function () {
    'use strict';

    angular.module(appMainModule).controller('BuscarRolController', controller);

    controller.$inject = ['$http', 'AppConfig', '$state', '$stateParams', '$mdToast', '$filter', 'AplicacionService', 'RolService', 'NotificationService', '$scope', 'ComponenteService'];

    function controller($http, AppConfig, $state, $stateParams, $mdToast, $filter, AplicacionService, RolService, NotificationService, $scope, ComponenteService) {
        var vm = this;

        // Properties & Fields ===============================================================================================================================================
        vm.selected = [];

        //====================================================================================================================================================================



        // Methods ===========================================================================================================================================================
        vm.isLoading = function () {
            return RolService.isLoading();
        };

        vm.editar = function (objetoEditar) {
            if (objetoEditar && objetoEditar.idAplicacion) {
                $state.go('app.nuevoRol', { idAplicacion: vm.idAplicacion.idAplicacion, idRol: objetoEditar.idRol.idRol, str: vm.strConsulta })
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

                RolService.update(
                    objetoEliminar,

                    (responseSuccess) => {
                        NotificationService.manageResponse({ responseWrapper: responseSuccess.data, actionAccept: null });
                        vm.aplicacionSeleccionada(vm.idAplicacion);
                    }, (responseError) => {
                        NotificationService.manageResponse({ responseWrapper: responseError.data, actionAccept: null });
                    })
            })
        };

        vm.getListaComponentesByIdAplicacion = function () {

            ComponenteService.getListComponenteByIdAplicacion(
                vm.idAplicacion,
                (responseSucces) => {
                    vm.componentesList = responseSucces.data.object;


                    vm.componentesList;

                    // REALIZA COMPARACIÓN SI EL OBJECTO ROL YA CONTIENE LA LISTA ACTUALIZADA DE COMPONENTES DE LA APLICACIÓN SELECCIONADA
                    if (vm.selectedRol.idRol.ttSaRolComponenteList.length > 0) {
                        vm.componentesList.forEach((componente) => {
                            var match = false;

                            // COMPARA LISTAS Y AGREGA EL NUEVO OBJETO SI HACE FALTA
                            vm.selectedRol.idRol.ttSaRolComponenteList.forEach((rolComponente) => {
                                if (rolComponente.idComponente.idComponente == componente.idComponente) {
                                    match = true;
                                } else {
                                    return false;
                                }
                            })

                            if (match == false) {
                                var obj = {};
                                obj.idComponente = componente;
                                obj.idRol = vm.selectedRol.idRol.idRol;
                                obj.usuarioCreacion = 0;
                                obj.activo = false;
                                vm.selectedRol.idRol.ttSaRolComponenteList.push(obj);
                            }
                        })
                    } else {

                        vm.componentesList.forEach((componente) => {
                            var obj = {};
                            obj.idComponente = componente;
                            obj.idRol = vm.selectedRol.idRol.idRol;
                            obj.usuarioCreacion = 0;
                            obj.activo = false;
                            vm.selectedRol.idRol.ttSaRolComponenteList.push(obj);

                        })
                    }

                    console.log(responseSucces.data.message)
                    if (!vm.componentesList.length > 0) {
                        vm.mensajeBusqueda = "No se encontraron componentes para este rol";
                    }

                }
            ), (actionError) => {
                swal(
                    'Error!',
                    'No se encontro el servidor!',
                    'error'
                )
            }
        }

        vm.seleccionarRol = function (p) {
            vm.selectedRol = p;
            vm.getListaComponentesByIdAplicacion();
            vm.pageRolComponente = 1;
            vm.limitOptionsRolComponente = [5, 10, 15];
            vm.limitRolComponente = 10;
            vm.showPagineoRolComponente = true;



        }

        vm.regresarSeleccionAplicacion = function () {
            vm.selected = [];
        }
        vm.regresarSeleccionRoles = function () {
            vm.selectedRol = undefined;
            vm.aplicacionSeleccionada(vm.idAplicacion);
            $mdToast.show(
                $mdToast.simple()
                    .textContent('No se guardo ninguna configuración de componenetes')
                    .position('top right')
                    .hideDelay(5000)
                    .action('OK')
                    .highlightAction(true)
                    .highlightClass('md-accent')
            );

        }

        vm.guardarRolComponente = function () {
            var aplicacionRol = {};
            aplicacionRol.idRol = vm.selectedRol.idRol;
            RolService.save(
                aplicacionRol,
                (responseSuccess) => {

                    NotificationService.manageResponse({ responseWrapper: responseSuccess.data, actionAccept: null });



                }, (responseError) => {
                    NotificationService.manageResponse({ responseWrapper: responseError.data, actionAccept: null });
                }
            )
        };


        vm.aplicacionSeleccionada = function (p) {
            //vm.selected = 1;
            vm.idAplicacion = p;
            RolService.getListRolByIdAplicacion(
                p,

                (responseSucces) => {
                    vm.rolesList = responseSucces.data.object;
                    console.log(responseSucces.data.message)

                    if (!vm.rolesList.lenght > 0)
                        vm.mensajeBusqueda = "No se encontraron datos para esta aplicación";

                }

            ), (actionError) => {
                swal(
                    'Error!',
                    'No se encontro el servidor!',
                    'error'
                )
            }

            vm.pageComponente = 1;
            vm.limitOptionsComponente = [5, 10, 15];
            vm.limitComponente = 10;
            vm.showPagineoComponente = true;


        }


        vm.nuevo = function () {

            $state.go('app.nuevoRol', { idAplicacion: vm.idAplicacion.idAplicacion, idRol: 0, str: vm.strConsulta })
        }

        vm.buscar = function () {

            vm.page = 1;
            vm.limitOptions = [5, 10, 15];
            vm.limit = 10;
            vm.showPagineo = true;
            //vm.selected = [];

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

        vm.buscarEnListaComponentes = function () {
            if (vm.showBusquedaComponentes === true) {
                vm.showBusquedaComponentes = false;
                vm.searchTextRolComponentes = "";
            }
            else
                vm.showBusquedaComponentes = true;
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
                    $stateParams.str,
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

            if ($stateParams.id > 0) {
                AplicacionService.getAplicacionById(
                    (responseSuccess) => {
                        vm.object = {};
                        vm.object.idAplicacion = responseSuccess.data.object;
                        vm.selected[0] = vm.object.idAplicacion;
                        vm.aplicacionSeleccionada(vm.object.idAplicacion);
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
            }

        };

        //Call constructor
        init();
    };

})();