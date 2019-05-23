// Service =================================================================================
(function () {
    'use strict';

    angular
        .module(appMainModule)
        .service('NotificationService', service);

    service.$inject = [];

    function service() {
        var vm = this;

        // Properties and fields ====================


        // Fields



        // Properties Getters and Setters

        //Methods
        //params {responseWraper, actionAccept }
        vm.manageResponse = function (params) {
            if (params) {
                if (params.responseWrapper) {
                    if (params.responseWrapper.success == true) {
                        //Se ejecuta la respuesta positiva 
                        if (params.autoContinue == false) {
                            swal(
                                '¡Bien hecho!',
                                params.responseWrapper.message,
                                'success'
                            ).then(function () {
                                if (params.actionAccept) {
                                    params.actionAccept();
                                }
                            });
                        } else {
                            swal(
                                '¡Bien hecho!',
                                params.responseWrapper.message,
                                'success'
                            )

                            if (params.actionAccept) {
                                params.actionAccept();
                            }
                        }

                    } else {
                        //Se ejecuta la respuesta negativa
                        swal(
                            '¡Error!',
                            params.responseWrapper.message,
                            'error'
                        )
                    }

                }
            }
        }

        return vm;
    };

})();
