// js/init.js
// --- Helper to reinitialize Materialize select after updating options ---
function reinitMaterialSelect($select) {
  // Materialize v0.98.x
  if (typeof $.fn.material_select === 'function') {
    $select.material_select();
    return;
  }

  // Materialize v1.x
  if (window.M && M.FormSelect) {
    var el = $select[0];
    var instance = M.FormSelect.getInstance(el);
    if (instance) instance.destroy();
    M.FormSelect.init(el);
    return;
  }

  console.warn('Materialize select init not found');
}

// --- Helper to add multiple options at once ---
function addOptionsBulk(selectSelector, items) {
  // items should be an array of {value:'...', text:'...', selected:true/false}
  var $sel = $(selectSelector);

  // Create a document fragment for better performance
  var frag = $(document.createDocumentFragment());
  items.forEach(function(it) {
    var $opt = $('<option>').val(it.url).text(it.name);	
    //if (it.selected) $opt.prop('selected', true);
    frag.append($opt);
  });

  $sel.append(frag);
  reinitMaterialSelect($sel);
}



$(document).ready(function() {
	console.log("DOM is ready, initializing selects...");
	$('.button-collapse').sideNav();
	$('.parallax').parallax();
	$('select').material_select();
	$('.dropdown-button').dropdown();

	// Listen for the course select dropdown.
	$('#course-select').on('change', function() {
		const url = $(this).val();
		if (url) {
			window.open(url, '_blank');
		}
	});	
  
	// Step 1: Setup Data Array
	const courses = [
		{ name: "Administração", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Agronomia - Manhã", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Agronomia - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Análise de Sistemas", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Arquitetura - Manhã", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Arquitetura - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Biomedicina - Manhã", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Biomedicina - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Ciência da Computação", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Ciências Contábeis", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Design de Moda", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Direito - Manhã", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Direito - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Educação Física - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Educação Física - Licenciatura", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Enfermagem - Manhã", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Enfermagem - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Engenharia Civil", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Engenharia de Produção", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Engenharia Elétrica", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Engenharia Mecânica", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Farmácia - Manhã", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Farmácia - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Fisioterapia - Manhã", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Fisioterapia - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Fonoaudiologia - Manhã", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Fonoaudiologia - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Jornalismo", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Med. Veterinária - Manhã", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Med. Veterinária - Tarde", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Med. Veterinária - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Nutrição - Manhã", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Nutrição - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Odontologia - Integral", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Odontologia - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Pilotagem de Aeronaves ", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Pilotagem de Aeronaves - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Psicologia - Manhã", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Psicologia - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Publicidade e Propaganda - Manhã", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Publicidade e Propaganda - Noite", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Radiologia", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" }
	];
	
	// Step 2: Initialize any existing selects
	reinitMaterialSelect($('#course-select'));
	
	// Step 3: Add the courses to the select dynamically.
	addOptionsBulk('#course-select', courses);
});

