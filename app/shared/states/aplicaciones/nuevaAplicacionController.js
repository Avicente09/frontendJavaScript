(function () {
    'use strict';

    angular.module(appMainModule).controller('NuevaAplicacionController', controller);

    controller.$inject = ['$http', 'AppConfig', '$stateParams', '$state', '$scope', 'AplicacionService', 'NotificationService'];

    function controller($http, AppConfig, $stateParams, $state, $scope, AplicacionService, NotificationService) {
        var vm = this;

        // Properties & Fields ===============================================================================================================================================


        //====================================================================================================================================================================



        // Methods ===========================================================================================================================================================
        vm.isLoading = function () {
            return AplicacionService.isLoading();
        };

        vm.regresar = function () {
            $state.go('app.aplicaciones', { str: $stateParams.str })
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
            AplicacionService.saveAplicacion(
                vm.aplicacion,
                (responseSuccess) => {

                    var cambioEstado = function () {
                        $state.go('app.nuevaAplicacion', { id: 0 }, { reload: true });
                    }

                    NotificationService.manageResponse({ responseWrapper: responseSuccess.data, actionAccept: cambioEstado });



                }, (responseError) => {
                    NotificationService.manageResponse({ responseWrapper: responseError.data, actionAccept: null });
                }
            )
        };

        function init() {
            vm.tituloVista = 'Nueva Aplicación';

            if ($stateParams.id > 0) {

                vm.tituloVista = 'Editar Aplicación';

                AplicacionService.getAplicacionById(
                    (responseSuccess) => {
                        vm.aplicacion = responseSuccess.data.object;
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
        }

        //Call constructor
        init();
    };

})();