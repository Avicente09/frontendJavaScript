// Service =================================================================================
(function () {
        'use strict';

        angular
                .module(appMainModule)
                .service('CatalogoService', service);

        service.$inject = ['$http', 'AppConfig'];

        function service($http, AppConfig) {
                var vm = this;
                var _isLoadingCatalogo = false;

                // Fields
                vm.isLoadingCatalogo = function () {
                        return _isLoadingCatalogo;
                }

                // Properties Getters and Setters

                //Por callback
                vm.getRedServicioList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/redServicio/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getRedServicioById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/redServicio/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }


                vm.getDepartamentoMedicoList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/departamentoMedico/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getDepartamentoMedicoById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/departamentoMedico/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getTipoServicioList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/tipoServicio/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getTipoServicioById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/tipoServicio/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getTipoViolenciaList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/tipoViolencia/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getTipoViolenciaById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/tipoViolencia/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getTipoConsultaList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/tipoConsulta/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getTipoConsultaById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/tipoConsulta/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getDepartamentoList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/departamento/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getDepartamentoById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/departamento/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getMunicipioById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/municipio/' + id;

                        var a = actionSuccess;
                        var b = actionError;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getMunicipioListByDepartamento = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/municipio/list/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getProfesionList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/profesion/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getProfesionById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/profesion/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getEscolaridadList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/escolaridad/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getEscolaridadById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/escolaridad/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getDiscapacidadList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/discapacidad/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getDiscapacidadById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/discapacidad/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getOrientacionSexualList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/orientacionSexual/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getOrientacionSexualById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/orientacionSexual/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getGrupoEtnicoList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/grupoEtnico/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getGrupoEtnicoById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/grupoEtnico/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getEtniaList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/etnia/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getEtniaById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/etnia/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getSexoList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/sexo/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getSexoById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/sexo/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getEstadoCivilList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/estadoCivil/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getEstadoCivilById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/estadoCivil/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getCie10List = function (descripcion, sexo, edad, actionSuccess, actionError) {
                        _isLoadingCatalogo = true;
                        var method = 'GET';

                        var url = AppConfig.url + 'catalogo/cie10/?descripcion=' + descripcion + '&edad=' + edad + '&sexo=' + sexo
                        $http({
                                url: url,
                                method: method,
                        }).then((response) => //Metodo que se ejecuta cuando el servidor contesta con un OK
                        {
                                if (actionSuccess)
                                        actionSuccess(response);

                                _isLoadingCatalogo = false;
                        },
                                (response) => //Metodo que se ejectua cuando el servidor da un error de cualquier tipo
                                {
                                        if (actionError)
                                                actionError(response);

                                        _isLoadingCatalogo = false;
                                });
                }

                vm.getMedicamentosList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/medicamento/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getEstudioComplementarioList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/estudioComplementario/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getProcedimientoMedicoList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/procedimientoMedico/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.updateProcedimientoMedicoList = function (searchText, actionSuccess, actionError) {



                        actionError = actionError || ((error) => { console.log(error) });

                        var url = AppConfig.url + 'catalogo/procedimientoMedico/' + searchText;


                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                };

                vm.getDepartamentoMedicoList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/departamentoMedico/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getAreaEstudioList = function (actionSuccess, actionError, filters) {
                        var url = AppConfig.url + 'catalogo/areaEstudio/';

                        var a = actionSuccess;
                        var b = actionError;

                        if (filters)
                                url += '?' + filters;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getAreaEstudioById = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/areaEstudio/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getClasificacionEstudioComplementarioByArea = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/clasificacionEstudioComplementarioArea/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getClasificacionEstudioComplementarioByPadre = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/clasificacionEstudioComplementarioPadre/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }

                vm.getEstudioComplementarioByIdClasificacion = function (actionSuccess, actionError, id) {
                        var url = AppConfig.url + 'catalogo/estudiocomplementarioByIdClasificacion/' + id;

                        $http({
                                url: url,
                                method: 'GET'
                        }).then(actionSuccess, actionError);
                }


                return vm;
        };

})();
