// For the MECO website
// Laurens Jacobs, 9 March 2017

function highlightCurrentPage() {
	var page = getURLParameter('page');
	var file = document.getElementById('the_overview');
	var svgDoc = file.contentDocument;
	var object = svgDoc.getElementById(page);
	// object.setAttributeNS(null, 'style', 'color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:svgfont;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#00407A;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#00407A;solid-opacity:1;fill:#00407A;fill-opacity:1;fill-rule:evenodd;stroke:#00407A;stroke-width:10.62992096;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate');
  // TODO add other properties, if needed
  object.style.fill='#00407A';
  object.style.stroke='#00407A';
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
