// A cleaner version for the software overview SVG
// Laurens Jacobs, 18 September 2017

  var svgDoc;
  var lightblue = "#54BCEB";
  var darkblue = "#00407A";

  function init(evt) {
    if ( window.svgDocument == null ) {
      svgDoc = evt.target.ownerDocument;
    }
  }

  function highlightCasadi() {

    // hide logo
	parts = svgDoc.getElementById('caslogo').children;
	for(var i = 0; i < parts.length; i++){
		parts[i].style.opacity = 0;
	}

	// show text
	svgDoc.getElementById('casadi_text').style["fillOpacity"] = 1;

	// show arrow
	svgDoc.getElementById('castolct').style.opacity = 1;
	svgDoc.getElementById('castoomg').style.opacity = 1;

	// change color
	svgDoc.getElementById('casadi').style.fill = lightblue;
	svgDoc.getElementById('castoomg').style.fill = lightblue;
	svgDoc.getElementById('castolct').style.fill = lightblue;
  }

  function highlightOmgtools() {

    // hide logo
	parts = svgDoc.getElementById('omglogo').children;
	for(var i = 0; i < parts.length; i++){
		parts[i].style.opacity = 0;
	}

	// show text
	svgDoc.getElementById('omg_text').style["fillOpacity"] = 1;

	// show arrow
	svgDoc.getElementById('cpptoomg').style.opacity = 1;
	svgDoc.getElementById('castoomg').style.opacity = 1;

	// change color
	svgDoc.getElementById('omg').style.fill = lightblue;
  }

  function highlightLctoolbox() {

    // hide logo
	parts = svgDoc.getElementById('lctlogo').children;
	for(var i = 0; i < parts.length; i++){
		parts[i].style.opacity = 0;
		console.log(parts[i]);
	}

	// show text
	svgDoc.getElementById('lct_text').style["fillOpacity"] = 1;

	// show arrow
	svgDoc.getElementById('castolct').style.opacity = 1;
	svgDoc.getElementById('cpptolct').style.opacity = 1;

	// change color
	svgDoc.getElementById('lct').style.fill = lightblue;
  }

  function highlightCppsplines() {

    // hide logo
	parts = svgDoc.getElementById('cpplogo').children;
	for(var i = 0; i < parts.length; i++){
		parts[i].style["fillOpacity"] = 0;
		parts[i].style["strokeOpacity"] = 0;
	}

	// show text
	svgDoc.getElementById('cpp_text').style["fillOpacity"] = 1;

	// show arrow
	svgDoc.getElementById('cpptoomg').style.opacity = 1;
	svgDoc.getElementById('cpptolct').style.opacity = 1;

	// change color
	svgDoc.getElementById('cpptoomg').style.fill = lightblue;
	svgDoc.getElementById('cpptolct').style.fill = lightblue;
	svgDoc.getElementById('cpp_splines').style.fill = lightblue;
  }

  function standard() {
    // make everything darkblue
	svgDoc.getElementById('cpp_splines').style.fill = darkblue;
	svgDoc.getElementById('lct').style.fill = darkblue;
	svgDoc.getElementById('omg').style.fill = darkblue;
	svgDoc.getElementById('casadi').style.fill = darkblue;
	svgDoc.getElementById('castoomg').style.fill = darkblue;
	svgDoc.getElementById('castolct').style.fill = darkblue;
	svgDoc.getElementById('cpptolct').style.fill = darkblue;
	svgDoc.getElementById('cpptoomg').style.fill = darkblue;

	// hide arrows
	svgDoc.getElementById('cpptoomg').style.opacity = 0;
	svgDoc.getElementById('cpptolct').style.opacity = 0;
	svgDoc.getElementById('castolct').style.opacity = 0;
	svgDoc.getElementById('castoomg').style.opacity = 0;

	// hide text
	svgDoc.getElementById('cpp_text').style["fillOpacity"] = 0;
	svgDoc.getElementById('lct_text').style["fillOpacity"] = 0;
	svgDoc.getElementById('casadi_text').style["fillOpacity"] = 0;
	svgDoc.getElementById('omg_text').style["fillOpacity"] = 0;

	// show logos
	parts = svgDoc.getElementById('cpplogo').children;
	for(var i = 0; i < parts.length; i++){
		parts[i].style["fillOpacity"] = 1;
		parts[i].style["strokeOpacity"] = 1;
	}
	parts = svgDoc.getElementById('caslogo').children;
	for(var i = 0; i < parts.length; i++){
		parts[i].style.opacity = 1;
	}
	parts = svgDoc.getElementById('omglogo').children;
	for(var i = 0; i < parts.length; i++){
		parts[i].style.opacity = 1;
	}
	parts = svgDoc.getElementById('lctlogo').children;
	for(var i = 0; i < parts.length; i++){
		parts[i].style.opacity = 1;
	}
  }