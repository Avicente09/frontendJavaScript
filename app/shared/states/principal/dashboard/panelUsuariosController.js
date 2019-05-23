(function () {
  'use strict';

  angular.module(appMainModule).controller('PanelUsuariosController', controller);

  controller.$inject = ['$http', 'AppConfig', '$state', '$stateParams', '$scope', 'NotificationService', '$window', '$location', 'usuarioService', '$mdSidenav', 'AplicacionService'];

  function controller($http, AppConfig, $state, $stateParams, $scope, NotificationService, $window, $location, UsuarioService, $mdSidenav, AplicacionService) {
    var vm = this;

    // Properties & Fields ===============================================================================================================================================


    //====================================================================================================================================================================

    //ROUTE DISPLAY _____________________________________________________________________________________________________________________________________________________
    //===============================================================================================================================================================
    vm.getNavigationRoute = function () {
      if ($state && $state.current) {
        return $state.current.data.displayRoute;
      }
    }



    // Methods ===========================================================================================================================================================

    vm.cerrarSesion = function () {
      localStorage.clear();
      $state.go('login');
      //  $location.path();
    }

    vm.seleccionarAplicacion = function (a) {
      let idApplication = a.id;
      let idUsuario = vm.idUser;

      AplicacionService.getRolAplicacionByIdUsuario(
        (responseSucces) => {
          vm.usuarioAplicaionRolList = responseSucces.data.object;
          //console.log(vm.usuarioAplicaionRolList);
          if (vm.usuarioAplicaionRolList.length > 0) {

            let permissions = {};
            let dataPermissions = {};
            vm.usuarioAplicaionRolList.forEach((permiso) => {
              let nombreComponente = permiso.idComponente.nombreComponente;
              let valorcomponente = permiso.activo;
              permissions[nombreComponente] = valorcomponente;
            });

            dataPermissions["rol"] = "admin";
            dataPermissions["permissions"] = permissions;
            dataPermissions["user"] = "administrador";

            localStorage.setItem("Credentials", JSON.stringify(dataPermissions));
            // console.log(dataPermissions);
            $window.location.href = '' + a.url + '';

          }
          else {
            swal(
              'Error!',
              'No tiene un rol asignado!',
              'error'
            );
          }
        }
        , (actionError) => {
          swal(
            'Error!',
            'No se encontro el servidor!',
            'error'
          );
        }
        , idUsuario, idApplication
      );
    }

    function init() {
      vm.user = UsuarioService.isLogin();
      if (vm.user) {
        vm.thumbnails = [];
        vm.user.forEach((a) => {
          vm.application = a[0];
          vm.idUser = a[1];
          vm.thumbnails.push({ id: vm.application.idAplicacion, name: vm.application.nombreAplicacion, urlImagen: 'app/css/images/logoSalud.png', url: vm.application.urlAcceso })
        });
      }

    };



    //Call constructor
    init();
  };

})();