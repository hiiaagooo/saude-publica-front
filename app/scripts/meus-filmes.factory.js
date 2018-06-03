angular.module("filmes").factory("MeusFilmes", function($q, $http){
    return {
        listar: function() {
            var promessa = $q.defer();

            $http.get("https://saude-publica.herokuapp.com/api/formulario").then(
                function(result){
                    var filmes = [];
                    angular.forEach(result.data, function(filme, id){
                        filme.id = id;
                        filmes.push(filme);
                    });

                    promessa.resolve(filmes);
            });

            return promessa.promise;
        },
        inserir: function(filme) {
            var id = filme.id + 1
            delete filme.id;

            return $http.post("https://saude-publica.herokuapp.com/api/formulario/" + id, filme)
        }
    }
});