(function () {
  'use strict';

  angular.module(appMainModule).controller('LoginController', controller);

  controller.$inject = ['$http', 'AppConfig', '$state', '$stateParams', '$scope', 'NotificationService', 'usuarioService', 'md5'];

  function controller($http, AppConfig, $state, $stateParams, $scope, NotificationService, UsuarioService, md5) {
    var vm = this;
    // Properties & Fields ===============================================================================================================================================


    //====================================================================================================================================================================
    vm.hacerLogin = function () {
      var usuarioPermisos;

      vm.login.password = md5.createHash(vm.login.password);

      UsuarioService.verificarLogin(
        vm.login,
        (responseSucces) => {
          usuarioPermisos = responseSucces.data;
          //localStorage.setItem('usuario', JSON.stringify(responseSucces.data.object));
          //sessionStorage.setItem('usuario', JSON.stringify(responseSucces.data.object));
          $state.go('panel', { login: usuarioPermisos });

        }
        , (actionError) => {
          NotificationService.manageResponse({ responseWrapper: actionError.data });
          vm.login.password = '';
          

        },

      )



    }

    // vm.isLoading = function () {
    //   return LoginService.isLoading();
    // };


    // Methods ===========================================================================================================================================================

    function init() {


    };


    //Call constructor
    init();
  };

})();