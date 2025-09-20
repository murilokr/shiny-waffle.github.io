// js/init.js
// --- Helper to reinitialize Materialize select after updating options ---
function reinitMaterialSelect($select) 
{
  // Materialize v0.98.x
  if (typeof $.fn.material_select === 'function') 
  {
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
function addOptionsBulk(selectSelector, items) 
{
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

function updateParallaxCustom()
{
	const $parallaxImages = $('.sync-bg img');
	const speed = 0.5; // smaller = slower parallax movement

	let latestScrollTop = 0;
	let ticking = false;

	function updateParallax() {
		$parallaxImages.css('transform', `translate3d(-50%, ${latestScrollTop * speed}px, 0)`);
		ticking = false;
	}

	function requestTick() {
		if (!ticking) {
		  requestAnimationFrame(updateParallax);
		  ticking = true;
		}
	}

	// Update scroll position
	function onScroll() {
		latestScrollTop = window.scrollY || window.pageYOffset;
		requestTick();
	}

	// Desktop and most mobile browsers
	window.addEventListener('scroll', onScroll, { passive: true });

	// iOS Safari / certain Android browsers
	window.addEventListener('touchmove', onScroll, { passive: true });
}


$(document).ready(function() 
{
	console.log("DOM is ready, initializing selects...");
	$('.button-collapse').sideNav();
	$('select').material_select();
	$('.dropdown-button').dropdown();
	
	// Enable custom parallax?
	const customParallax = true;
	if (!customParallax)
	{
		$('.parallax').parallax();
	}
	else
	{		
		updateParallaxCustom();
	}	

	// Listen for the course select dropdown.
	$('#course-select').on('change', function() 
	{
		const url = $(this).val();
		if (url) {
			window.open(url, '_blank');
		}
	});	
  
	// Step 1: Setup Data Array
	const courses = 
	[
		{ name: "Biomedicina", url: "https://docs.google.com/forms/d/e/1FAIpQLScUuHZopEOKthiXAp1Vn31xU4KeOPcgG94cS3yaw3ue_q2VlQ/viewform?usp=header" },
		{ name: "Ciência da Computação", url: "https://docs.google.com/forms/d/1XwEI_bnX_rMtgdCX-dNqy-I3Gx3WUyYkHJ97zT5XfCI/edit?usp=drivesdk" },
		{ name: "Direito", url: "https://docs.google.com/forms/d/e/1FAIpQLSdCw-upWPVMYgpN6POuvdulxr172pCA_PXrqKxDPJl52orZuA/viewform?usp=header" },
		{ name: "Educação Física", url: "https://docs.google.com/forms/d/e/1FAIpQLScvngS95jiAmKQy75Y6DMKvb9bHyk4H4wsVYuJd5wDmjtl2Ig/viewform?usp=preview" },
		{ name: "Enfermagem", url: "https://forms.gle/MXg89q5avMVe1kay6" },
		{ name: "Med. Veterinária", url: "https://forms.cloud.microsoft/r/LCEzyYdyyQ" },
		{ name: "Odontologia", url: "https://forms.gle/fnAZZfLuaEQPwZHk6" },
		{ name: "Psicologia", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=79DCVaR0ikOmE2FgehPu4KYJYHdUgtlIm6FKyTqQ4CdUQTc0OVhUUFNHU0NWNFcxQlpZMkFQTldSRS4u" }
	];
	
	// Step 2: Initialize any existing selects
	reinitMaterialSelect($('#course-select'));
	
	// Step 3: Add the courses to the select dynamically.
	addOptionsBulk('#course-select', courses);
});

