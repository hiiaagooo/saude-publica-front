(function(){
  angular
    .module('filmes')
    .controller('FilmesController', function($scope, MeusFilmes) {
      $scope.titulo = "Controle de Pacientes";

      $scope.filmes = [];
	  
	  var carregarPacientes = function() {
		MeusFilmes.listar().then(function(filmes){
			$scope.filmes = filmes;
			console.log('dados', filmes);
		});
	  }

      $scope.novoPaciente = {};

      $scope.criarPaciente = function() {
      	var filme = {
      		id: Date.now() + "",
      		nome: $scope.novoPaciente.nome,
      		sexo: $scope.novoPaciente.sexo,
      		idade: $scope.novoPaciente.idade,
			endereco: $scope.novoPaciente.endereco,
			sintomas: $scope.novoPaciente.sintomas,
      		medico: $scope.novoPaciente.medico
      	};

		MeusFilmes.inserir(filme).then(carregarPacientes);

      	$scope.novoPaciente = {};
	  }
	  

      $scope.removerFilme = function(id) {
      	angular.forEach($scope.filmes, function(filme, i){
      		if(filme.id == id){
      			$scope.filmes.splice(i, 1);
      		};
      	});
      }

	  carregarPacientes();

		});
	
})();

function tableToJson(table) {
	var data = [];

	// first row needs to be headers
	var headers = [];
	for (var i=0; i<table.rows[0].cells.length; i++) {
			headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
	}
	data.push(headers);
	// go through cells
	for (var i=1; i<table.rows.length; i++) {

			var tableRow = table.rows[i];
			var rowData = {};

			for (var j=0; j<tableRow.cells.length; j++) {

					rowData[ headers[j] ] = tableRow.cells[j].innerHTML;

			}

			data.push(rowData);
	}       

	return data;
}

function callme(){
	var table = tableToJson($('#table-id').get(0));
	var doc = new jsPDF('l','pt','letter',true);
	
	
	$.each(table, function(i, row){
		$.each(row, function(j,cell){
		if(j=="email" | j==1){
		 doc.cell(1,10,190,20,cell,i);	
		}
		else{
			doc.cell(1,10,90,20,cell,i);
		}
		
		});
	});
	
	doc.save('relatorio.pdf');
	}