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
		{ name: "Debug", url: "https://youtu.be/RTMrI3CWgrc?list=RDRTMrI3CWgrc" },
		{ name: "Administração", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Agronomia - Manhã", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Agronomia - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Análise de Sistemas", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Arquitetura - Manhã", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Arquitetura - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Biomedicina - Manhã", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Biomedicina - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Ciência da Computação", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Ciências Contábeis", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Design de Moda", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Direito - Manhã", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Direito - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Educação Física - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Educação Física - Licenciatura", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Enfermagem - Manhã", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Enfermagem - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Engenharia Civil", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Engenharia de Produção", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Engenharia Elétrica", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Engenharia Mecânica", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Farmácia - Manhã", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Farmácia - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Fisioterapia - Manhã", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Fisioterapia - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Fonoaudiologia - Manhã", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Fonoaudiologia - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Jornalismo", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Med. Veterinária - Manhã", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Med. Veterinária - Tarde", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Med. Veterinária - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Nutrição - Manhã", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Nutrição - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Odontologia - Integral", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Odontologia - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Pilotagem de Aeronaves ", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Pilotagem de Aeronaves - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Psicologia - Manhã", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Psicologia - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Publicidade e Propaganda - Manhã", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Publicidade e Propaganda - Noite", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Radiologia", url: "https://forms.gle/CmteZwHQDM6Gu15g6" }
	];
	
	// Step 2: Initialize any existing selects
	reinitMaterialSelect($('#course-select'));
	
	// Step 3: Add the courses to the select dynamically.
	addOptionsBulk('#course-select', courses);
});

