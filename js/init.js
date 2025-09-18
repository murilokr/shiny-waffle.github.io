// js/init.js
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
});
