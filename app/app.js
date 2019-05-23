
var appMainModule = 'angularMaterial';

(function () {

    var app = angular.module(appMainModule, [
        'ui.router',
        'ngAnimate',
        'oc.lazyLoad',
        'ngMessages',
        'ngMaterial',
        'md.data.table',
        'ngMaterialSidemenu',
        'vAccordion'

    ]);

    app.config(configApp).run(runApp);


    configApp.$inject = ['$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        '$httpProvider',
        '$ocLazyLoadProvider',
        'APP_REQUIRES',
        'RouteHelpersProvider',
        '$mdDateLocaleProvider',
        '$mdThemingProvider',
    ];

    function configApp($stateProvider,
        $locationProvider,
        $urlRouterProvider,
        $httpProvider,
        $ocLazyLoadProvider,
        APP_REQUIRES, helper,
        $mdDateLocaleProvider,
        $mdThemingProvider
    ) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: APP_REQUIRES.modules
        });

        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/login');

        $mdThemingProvider.definePalette('seguridad', {
            '50': '#3ADF00',
            '100': 'e6e6e6',
            '200': 'cccccc',
            '300': 'b3b3b3',
            '400': 'a6a6a6',
            '500': '255197', // Color principal, es el color por default 255197
            '600': '8c8c8c',
            '700': '808080',
            '800': '666666',
            '900': '4d4d4d',
            'A100': '404040',
            'A200': '333333',
            'A400': '262626',
            'A700': '000000',
            'fondoThumbnailsAplicaciones': '1FB3CF',
            'toolbarComponentes': 'DB7A42', // Color para toolbar de Componentes
            'toolbarRoles': '7BA234', // Color para toolbar de sección de Roles
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
            // on this palette should be dark or light
            // PALETA PARA dashboard
            'colorBaseDashborad': '39636B',


            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('seguridad');

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('/views/app.html'),
                controller: 'appController',
                controllerAs: 'vm',
                resolve: helper.resolveFor()
            })
            .state('app.home', {
                url: '/home',
                title: 'Home',
                templateUrl: helper.basepath('/shared/states/home/home.html'),
                controller: 'HomeController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('HomeCtrl'),
                data: { displayRoute: ["Inicio"] }
            })
            .state('app.aplicaciones', {
                url: '/aplicaciones/:str',
                title: 'Aplicaciones',
                templateUrl: helper.basepath('/shared/states/aplicaciones/buscarAplicacion.html'),
                controller: 'BuscarAplicacionController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('BuscarAplicacionCtrl', 'AplicacionService', 'NotificationService'),
                data: { displayRoute: ["Búscar Aplicación"] }
            })
            .state('app.nuevaAplicacion', {
                url: '/aplicaciones/nuevaAplicacion/:id/:str',
                title: 'Nueva Aplicación',
                templateUrl: helper.basepath('/shared/states/aplicaciones/nuevaAplicacion.html'),
                controller: 'NuevaAplicacionController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('NuevaAplicacionCtrl', 'AplicacionService', 'NotificationService'),
                data: { displayRoute: ["Nueva Aplicación"] }
            })
            .state('app.bsqUsuarios', {
                url: '/usuarios/buscarUsuario/:id/:str',
                title: 'Administracion Usuarios',
                templateUrl: helper.basepath('/shared/states/usuarios/buscarUsuario.html'),
                controller: 'BuscarUsuarioController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('BuscarUsuarioCtrl', 'UsuarioService', 'NotificationService'),
                data: { displayRoute: ["Buscar Usuario"] }
            })
            .state('app.usuarios', {
                url: '/usuarios/crearUsuario/:id/:str',
                title: 'Usuarios',
                templateUrl: helper.basepath('/shared/states/usuarios/crearUsuario.html'),
                controller: 'CrearUsuarioController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('CrearUsuarioCtrl', 'UsuarioCreaService', 'NotificationService', 'UsuarioService'),
                data: { displayRoute: ["Crear Usuario"] }
            })
            .state('app.buscarComponente', {
                url: '/componentes/:id/:str',
                title: 'Componentes',
                templateUrl: helper.basepath('/shared/states/componentes/buscarComponente.html'),
                controller: 'BuscarComponenteController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('BuscarComponenteCtrl', 'AplicacionService', 'NotificationService', 'ComponenteService'),
                data: { displayRoute: ["Búscar Componente"] }
            })
            .state('app.nuevoComponente', {
                url: '/componentes/nuevoComponente/:id/:str/:idAplicacion',
                title: 'Componentes',
                templateUrl: helper.basepath('/shared/states/componentes/nuevoComponente.html'),
                controller: 'NuevoComponenteController',
                controllerAs: 'vm',
                params: { aplicacion: '' },
                resolve: helper.resolveFor('NuevoComponenteCtrl', 'AplicacionService', 'NotificationService', 'ComponenteService'),
                data: { displayRoute: ["Nuevo Componente"] }
            })
            .state('app.nuevoRol', {
                url: '/roles/:idAplicacion/:idRol/:str',
                title: 'Roles',
                templateUrl: helper.basepath('/shared/states/roles/crearRol.html'),
                controller: 'CrearRolController',
                controllerAs: 'vm',
                params: { aplicacion: '' },
                resolve: helper.resolveFor('CrearRolCtrl', 'NotificationService', 'RolService', 'AplicacionService'),
                data: { displayRoute: ["Crear Rol"] }
            })
            .state('app.buscarRol', {
                url: '/buscarRol/:id/:str',
                title: 'Roles',
                templateUrl: helper.basepath('/shared/states/roles/buscarRol.html'),
                controller: 'BuscarRolController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('BuscarRolCtrl', 'NotificationService', 'AplicacionService', 'ComponenteService', 'RolService'),
                data: { displayRoute: ["Roles", "Búscar Rol"] }
            })
            .state('app.asignaAplicacionRol', {
                url: '/usuarios/aplicacionRol/:id/:str',
                title: 'Asignar Rol',
                templateUrl: helper.basepath('/shared/states/usuarios/asignaAplicacionRol.html'),
                controller: 'AsignaAplicacionRolController',
                controllerAs: 'vm',
                params: { aplicacion: '' },
                resolve: helper.resolveFor('AsignaAplicacionRolCtrl', 'UsuarioService', 'NotificationService', 'AplicacionService', 'RolService'),
                data: { displayRoute: ["Usuarios", "Asigna Rol"] }
            })
            .state('login', {
                url: '/login',
                title: 'Login',
                templateUrl: helper.basepath('/shared/states/principal/login/login.html'),
                controller: 'LoginController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('LoginCtrl', 'NotificationService', 'UsuarioService', 'md5Service')
            })
            .state('panel', {
                url: '/dashborad',
                title: 'Dashboard Usuarios',
                templateUrl: helper.basepath('/shared/states/principal/dashboard/panelUsuarios.html'),
                controller: 'PanelUsuariosController',
                controllerAs: 'vm',
                params: { login: '' },
                resolve: helper.resolveFor('PanelUsuariosCtrl', 'NotificationService', 'UsuarioService','AplicacionService'),
                data: { displayRoute: ["Panel", "Aplicaciones"] }
            })
            ;


        // CONFIGURACION DE DateLocaleProvider
        $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
        $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
        $mdDateLocaleProvider.msgCalendar = 'Calendario';
        $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
        // Example uses moment.js to parse and format dates.
        $mdDateLocaleProvider.parseDate = function (dateString) {
            var m = moment(dateString, 'L', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };

        $mdDateLocaleProvider.formatDate = function (date) {
            var m = moment(date);
            m.lang("es").format('LLL');
            return m.isValid() ? m.format('L') : '';
        };

        // CONFIGURACION DE AUTOFOCUS EN LOS INPUTS ====================================================================

        app.directive('focusMe', function ($timeout) {
            return {
                link: function (scope, element, attrs) {
                    scope.$watch(attrs.focusMe, function (value) {
                        if (value === true) {
                            console.log('value=', value);
                            $timeout(function () {
                                element[0].focus();
                                scope[attrs.focusMe] = false;
                            });
                        }
                    });
                }
            };
        });
        // =============================================================================================================


    };



    //RUN FUNCTION _______________________________________________________________________________________________________________________________________________________ 
    //====================================================================================================================================================================
    runApp.$inject = [];

    function runApp() {

    };
    //====================================================================================================================================================================




    //CONSTANTS __________________________________________________________________________________________________________________________________________________________ 
    //====================================================================================================================================================================

    //Constante que es usada para definir, los scripts y módulos que podrán ser cargados en el resolveFor de las Rutas para poder realizar el Lazy Loading.
    //Es posible crear grupos de scripts. Se creará una entrada por cada controlador, el cual será cargado como necesario en su respectiva ruta.
    //Podrán cargarse además de js, css. 
    //Otra manera de agrupar es por módulos, los cuales serán cargados con un nombre y una colección de archivos.

    app.constant('AppConfig', { 'url': 'http://localhost:8080/seguridad-service/' })

    app.constant('APP_REQUIRES', {
        scripts: {
            //CSS ========================================================================================================================================================



            //Controllers for Views ======================================================================================================================================
            'HomeCtrl': ['app/shared/states/home/homeController.js'],
            'BuscarAplicacionCtrl': ['app/shared/states/aplicaciones/buscarAplicacionController.js'],
            'CrearRolCtrl': ['app/shared/states/roles/crearRolController.js'],
            'BuscarRolCtrl': ['app/shared/states/roles/buscarRolController.js'],
            'CrearUsuarioCtrl': ['app/shared/states/usuarios/crearUsuarioController.js'],
            'BuscarUsuarioCtrl': ['app/shared/states/usuarios/buscarUsuarioController.js'],
            'NuevaAplicacionCtrl': ['app/shared/states/aplicaciones/nuevaAplicacionController.js'],
            'BuscarComponenteCtrl': ['app/shared/states/componentes/buscarComponenteController.js'],
            'NuevoComponenteCtrl': ['app/shared/states/componentes/nuevoComponenteController.js'],
            'AsignaAplicacionRolCtrl': ['app/shared/states/usuarios/asignaAplicacionRolController.js'],


            'LoginCtrl': ['app/shared/states/principal/login/loginController.js'],
            'PanelUsuariosCtrl': ['app/shared/states/principal/dashboard/panelUsuariosController.js'],

            //Controllers for Services ===================================================================================================================================
            'CatalogoService': ['app/js/services/catalogoService.js'],
            'CatalogoServicioService': ['app/js/services/catalogoServicioService.js'],
            'NotificationService': ['app/js/services/notificationService.js'],
            'AplicacionService': ['app/js/services/aplicacionService.js'],
            'ComponenteService': ['app/js/services/componenteService.js'],
            'RolService': ['app/js/services/rolService.js'],
            'UsuarioService': ['app/js/services/usuarioService.js'],
            'UsuarioCreaService': ['app/js/services/usuarioCreaService.js'],
            'md5Service': ['vendor/angular-md5/angular-md5.js'],
            // 'RolCreaService': ['app/js/services/rolCreaService.js']
            //JavaScript Utils ===========================================================================================================================================

        },

        //Modules ========================================================================================================================================================
        modules: [

        ]
    });

    //====================================================================================================================================================================

    app.provider('RouteHelpers', RouteHelpersProvider);

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {
        return {
            // provider access level
            basepath: basepath,
            resolveFor: resolveFor,
            // controller access level
            $get: function () {
                return {
                    basepath: basepath,
                    resolveFor: resolveFor
                };
            }
        };

        // Set here the base of the relative path
        // for all app js or css to load
        function basepath(uri) {
            return 'app/' + uri;
        }

        // Generates a resolve object by passing script names
        // previously configured in constant APP_REQUIRES
        function resolveFor() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q', function ($ocLL, $q) {
                    // Creates a promise chain for each argument
                    var promise = $q.when(1); // empty promise
                    for (var i = 0, len = _args.length; i < len; i++) {
                        promise = andThen(_args[i]);
                    }
                    return promise;

                    // creates promise to chain dynamically
                    function andThen(_arg) {
                        // also support a function that returns a promise
                        if (typeof _arg === 'function')
                            return promise.then(_arg);
                        else
                            return promise.then(function () {
                                // if is a module, pass the name. If not, pass the array
                                var whatToLoad = getRequired(_arg);
                                // simple error check
                                if (!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                // finally, return a promise
                                return $ocLL.load(whatToLoad);
                            });
                    }

                    // check and returns required data
                    // analyze module items with the form [name: '', files: []]
                    // and also simple array of script files (for not angular js)
                    function getRequired(name) {
                        if (APP_REQUIRES.modules)
                            for (var m in APP_REQUIRES.modules)
                                if (APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                                    return APP_REQUIRES.modules[m];
                        return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
                    }

                }]
            };
        }
    };
    //====================================================================================================================================================================


})();


(function () {
    'use strict';

    angular
        .module(appMainModule)
        .controller('appController', controller);

    controller.$inject = ['$state', '$mdSidenav', '$location', 'usuarioService'];

    //Declaración de la función
    function controller($state, $mdSidenav, $location, UsuarioService) {

        var vm = this;

        function activate() {

        };

        //VARIABLES _____________________________________________________________________________________________________________________________________________________
        //===============================================================================================================================================================

        vm.user = UsuarioService.isLogin();

        //ROUTE DISPLAY _____________________________________________________________________________________________________________________________________________________
        //===============================================================================================================================================================
        vm.getNavigationRoute = function () {
            if ($state && $state.current) {
                return $state.current.data.displayRoute;
            }
        }

        //NAVBAR ELEMENTS SIDNAV IZQUIERDO________________________________________________________________________________________________________________________________ 
        //================================================================================================================================================================

        vm.navbarElements = [
            {
                name: "Inicio",
                href: "#!/app/home",
                icon: "home",
                click: () => { $state.go('app.home'); vm.nombrePagina = "Inicio" },
                state: "app.home"
            },
            {
                name: "Aplicaciones",
                href: "#!/app/acplicaciones",
                icon: "assignment",
                click: () => { vm.nombrePagina = "Consultas" },
                state: "app.vista",
                submenuItems: [

                    {
                        name: "Aplicación",
                        href: "#!/app/aplicaciones/buscarAplicacion.html",
                        state: "app.aplicaciones"
                    }

                ]
            },
            {
                name: "Usuarios",
                href: "#!/app/usuarios",
                icon: "build",
                click: () => { vm.nombrePagina = "Usuarios" },
                state: "app.usuarios",
                submenuItems: [
                    {
                        name: "Usuarios",
                        href: "#!/app/usuarios/buscarUsuario",
                        state: "app.bsqUsuarios"
                    },
                    {
                        name: "Asignar Rol",
                        href: "#!/app/usuarios/asignaAplicacionRol",
                        state: "app.asignaAplicacionRol"
                    },

                ]
            },
            {
                name: "Roles y Componentes",
                href: "#!/app/roles",
                icon: "dvr",
                click: () => { vm.nombrePagina = "Roles" },
                state: "app.roles",
                submenuItems: [
                    {
                        name: "Roles",
                        href: "#!/app/roles/buscarRol",
                        state: "app.buscarRol"
                    },
                    {
                        name: "Componentes",
                        href: "#!/app/componentes/buscarComponente",
                        state: "app.buscarComponente"
                    }
                ]
            }
        ];


        vm.cerrarSesion = function () {
            UsuarioService.cerrarSesion();
        }

        vm.regresarDashboard = function () {
            $state.go('panel', { login: "" });
        }


        vm.clickElement = function (element) {
            if (element && element.click)
                element.click();
        };

        vm.showMobileMainHeader = true;
        vm.openSideNavPanel = function () {
            $mdSidenav('left').open();
        };
        vm.closeSideNavPanel = function () {
            $mdSidenav('left').close();
        };

        //Configuraciones del proyecto, nombre y quién lo desarrolla

        vm.projectName = " SEGURIDAD";
        vm.poweredBy = "Powered By AV";


        activate();
    };

})();