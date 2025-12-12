//Disclaimer: This code was modified from the following tutorial: https://www.w3schools.com/howto/howto_js_full_page_tabs.asp

function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons and the change text color
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
		tablinks[i].style.color = "black";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";
	//document.getElementById(pageName).style.color = "white";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
	elmnt.style.color = "white";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
