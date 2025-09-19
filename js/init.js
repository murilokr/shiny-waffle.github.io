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
		{ name: "Biomedicina", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Ciência da Computação", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Direito", url: "https://docs.google.com/forms/d/e/1FAIpQLSdCw-upWPVMYgpN6POuvdulxr172pCA_PXrqKxDPJl52orZuA/viewform?usp=header" },
		{ name: "Educação Física", url: "https://docs.google.com/forms/d/e/1FAIpQLScvngS95jiAmKQy75Y6DMKvb9bHyk4H4wsVYuJd5wDmjtl2Ig/viewform?usp=preview" },
		{ name: "Enfermagem", url: "https://forms.gle/MXg89q5avMVe1kay6" },
		{ name: "Med. Veterinária", url: "https://forms.gle/CmteZwHQDM6Gu15g6" },
		{ name: "Odontologia", url: "https://forms.gle/fnAZZfLuaEQPwZHk6" },
		{ name: "Psicologia", url: "https://forms.gle/CmteZwHQDM6Gu15g6" }
	];
	
	// Step 2: Initialize any existing selects
	reinitMaterialSelect($('#course-select'));
	
	// Step 3: Add the courses to the select dynamically.
	addOptionsBulk('#course-select', courses);
});

