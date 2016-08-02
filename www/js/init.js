
(function($){
  $(function(){

var itens =	[];

function removerItem(nome) {
	itens.forEach(function(result, index) {
		if (result['nome'] === nome) {
			itens.splice(index, 1);
		}
	});
	localStorage.setItem('localItens', JSON.stringify(itens));
	atualizarListas();
}

function alternarItem(nome) {
	$.each(itens, function(i, v) {
		if (v.nome == nome) {
			if (v.comprar) {v.comprar = 0;} else {v.comprar = 1;}
			return false;
		}
	});
	localStorage.setItem('localItens', JSON.stringify(itens));
	atualizarListas();
}

function atualizarListas() {
	
	
	if (localStorage.getItem('localItens')) {
		console.log( localStorage.getItem('localItens') );
		
		itens = JSON.parse(localStorage.getItem('localItens'));

} else {
	itens = [{"nome":"Arroz","comprar":1},{"nome":"Feijão","comprar":1},{"id":2,"nome":"Caldo de carne","comprar":1},{"nome":"Carne","comprar":0}];
}

	
	//console.log( JSON.stringify(itens) );
	
	$('#ListaComprar').empty();
	$('#ListaEstoque').empty();
	
	
	$.each(itens, function(key, item) {

	var coisa = $('<a/>');
		div = $('<div/>');
coisa.addClass('collection-item waves-effect waves-orange white orange-text');
		div.text(item.nome);
		coisa.append(div);

	if (item.comprar) {
		$('#ListaComprar').append(coisa);
	} else {
		$('#ListaEstoque').append(coisa);
	}

	coisa.click(function() {
		var nomeItem = $(this).text();
		alternarItem(nomeItem);
	});
		
		// CLIQUE LONGO PARA EXCLUIR
		  var timer;
coisa.on("touchstart",function(){
	var nomeItem = $(this).text();
    timer = setTimeout(function(){
			
			$('#spanNomeItem').text(nomeItem);
          $('#modalExcluir').openModal();

    },500);
}).on("touchend mouseleave",function(){
    clearTimeout(timer);
});
		
});
}



$('.modal-trigger').leanModal();


atualizarListas();

$('#btnMostrarAdd').click(function() {
	$('#listas').fadeOut(200, function(){
   $('#adicionar').fadeIn(500);
		 $('#nomeNovo').focus();
		 $('#nomeNovo').trigger('click');
});
	$('#btnMostrarAdd').fadeOut(500);
	
});

$('#btnCancel').click(function() {
	$('#adicionar').hide(500);
	$('#listas').show(500);
	$('#btnMostrarAdd').fadeIn(500);
});

$('#btnAdd').click(function() {
	var nomeNovo = $('#nomeNovo').val();
	itens.push( {"nome": nomeNovo,"comprar": 1 } );
	$('#nomeNovo').val('');
	localStorage.setItem('localItens', JSON.stringify(itens));
	atualizarListas();
	
	$('#adicionar').hide(500);
	$('#listas').show(500);
	$('#btnMostrarAdd').fadeIn(500);
	
});

$('#btnRemover').click(function() {
	var nomeItem = $('#spanNomeItem').text();
	removerItem(nomeItem);
});

/*
localStorage.setItem('dados', $("#listas").html());

if (localStorage.getItem('dados')) {
	$("#listas").html(localStorage.getItem('dados'));
}

*/


  }); // end of document ready
})(jQuery); // end of jQuery name space
