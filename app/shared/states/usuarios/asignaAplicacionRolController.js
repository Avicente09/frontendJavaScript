(function () {
    'use strict';

    angular.module(appMainModule).controller('AsignaAplicacionRolController', controller);

    controller.$inject = ['$http', 'AppConfig', '$state', '$stateParams', 'usuarioService', 'NotificationService', 'AplicacionService', 'RolService'];

    function controller($http, AppConfig, $state, $stateParams, usuarioService, NotificationService, AplicacionService, RolService) {
        var vm = this;
        vm.selected = [];
        // Properties & Fields ===============================================================================================================================================


        //====================================================================================================================================================================



        // Methods ===========================================================================================================================================================
        vm.isLoading = function () {
            return usuarioService.isLoading();
        };

        vm.editar = function (objetoEditar) {
            if (objetoEditar && objetoEditar.idPersona) {
                $state.go('app.usuarios', { id: objetoEditar.idPersona.idPersona, str: vm.strConsulta });
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

                usuarioService.updateAplicacion(
                    objetoEliminar,

                    (responseSuccess) => {
                        NotificationService.manageResponse({ responseWrapper: responseSuccess.data, actionAccept: null });
                        vm.buscar();
                    }, (responseError) => {
                        NotificationService.manageResponse({ responseWrapper: responseError.data, actionAccept: null });
                    })
            })
        };



        vm.buscar = function () {

            vm.page = 1;
            vm.limitOptions = [5, 10, 15];
            vm.limit = 10;
            vm.showPagineo = true;

            if (vm.strConsulta != 0) {

                usuarioService.getUsuarioListByString(
                    vm.strConsulta,
                    (responseSucces) => {
                        vm.listadoConsulta = responseSucces.data.object;
                        console.log(responseSucces.data.message)
                        if (!vm.listadoConsulta.length > 0)
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


            vm.usuarioSeleccionado = function (p) {
                vm.selectedUsuario = p;

                vm.obtenerListaAplicaciones();
                vm.pageAplicacion = 1;
                vm.limitOptionsAplicacion = [5, 10, 15];
                vm.limitAplicacion = 10;
                vm.showPagineoAplicacion = true;


            }
            vm.regresarSeleccionUsuario = function () {
                vm.selectedUsuario = undefined;
            }


        }


        vm.obtenerListaAplicaciones = function () {
            AplicacionService.getAplicacionList(
                (responseSucces) => {
                    vm.aplicacionesList = responseSucces.data.object;

                }
                , (actionError) => {
                    swal(
                        'Error!',
                        'No se encontro el servidor!',
                        'error'
                    )

                })
        }

        vm.obtenerListaAplicasionesAsignadas = function (p) {



        }

        vm.regresarSeleccionAplicaciones = function () {
            vm.selectedAplicacion = undefined;
        }

        vm.aplicacionSeleccionada = function (p) {

            vm.selectedAplicacion = p;



            vm.pageAplicacionRol = 1;
            vm.limitOptionsAplicacionRol = [5, 10, 15];
            vm.limitAplicacionRol = 10;
            vm.showPagineoAplicacionRol = true;

            AplicacionService.getUsuarioAplicacionRolByIdUsuario(
                (responseSucces) => {
                    vm.usuarioAplicaionRolList = responseSucces.data.object;
                    console.log(responseSucces.data.message)

                    //if (!vm.usuarioAplicaionRolList.length > 0)
                    //vm.mensajeBusqueda = "No se encontraron datos para esta aplicación";
                    console.log(p);
                    RolService.getListRolByIdAplicacion(
                        p,
                        (responseSucces) => {
                            vm.aplicaionRolesList = responseSucces.data.object;
                            console.log(responseSucces.data.message)
                            vm.compararListasAplicacionRol();
                            // if (!vm.aplicaionRolesList.length > 0)
                            //     vm.mensajeBusqueda = "No se encontraron datos para esta aplicación";
                        }
                    ), (actionError) => {
                        swal(
                            'Error!',
                            'No se encontro el servidor!',
                            'error'
                        )
                    }

                }
                , (actionError) => {
                    swal(
                        'Error!',
                        'No se encontro el servidor!',
                        'error'
                    )
                }
                , vm.selectedUsuario.idUsuario, p.idAplicacion
            );
        }

        vm.compararListasAplicacionRol = function () {

            if (vm.usuarioAplicaionRolList.length > 0) {

                vm.aplicaionRolesList.forEach((aplicacionRol) => {
                    var match = false;
                    vm.usuarioAplicaionRolList.forEach((usuarioAplicacionList) => {
                        if (usuarioAplicacionList.idAplicacionRol.idAplicacionRol == aplicacionRol.idAplicacionRol) {
                            match = true;
                        } else {
                            return false;
                        }


                    })

                    if (match == false) {
                        var obj = {};
                        obj.idAplicacionRol = aplicacionRol;
                        obj.idUsuario = vm.selectedUsuario;
                        obj.usuarioCreacion = 0;
                        obj.activo = false;
                        vm.usuarioAplicaionRolList.push(obj);
                    }

                })

            } else {

                vm.aplicaionRolesList.forEach((aplicacionRol) => {
                    var obj = {};
                    obj.idAplicacionRol = aplicacionRol;
                    obj.idUsuario = vm.selectedUsuario;
                    obj.usuarioCreacion = 0;
                    obj.activo = false;
                    vm.usuarioAplicaionRolList.push(obj);
                })
            }
        }

        vm.guardarUsuarioAplicacionRol = function () {

            var listGuardar = [];

            AplicacionService.saveUsuarioAplicacionRol(
                vm.usuarioAplicaionRolList,
                (responseSuccess) => {

                    NotificationService.manageResponse({ responseWrapper: responseSuccess.data, actionAccept: null });
                    vm.aplicacionSeleccionada(vm.selectedAplicacion);


                }, (responseError) => {
                    NotificationService.manageResponse({ responseWrapper: responseError.data, actionAccept: null });
                }

            )
        }

        function init() {

            // if ($stateParams.str && $stateParams.str != "" && $stateParams.str.length > 0)
            if ($stateParams.str && $stateParams.str != "") {
                vm.strConsulta = $stateParams.str;
                vm.page = 1;
                vm.limitOptions = [5, 10, 15];
                vm.limit = 10;
                vm.showPagineo = true;
                usuarioService.getUsuarioListByString(
                    vm.strConsulta,
                    (responseSucces) => {
                        vm.listadoConsulta = responseSucces.data.object;
                        console.log(responseSucces.data.message)
                        if (!vm.listadoConsulta.length > 0)
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