/*
Names:
Student number:
Date of Completion:
File:
Description:
*/

"use strict";

(function() {

    // Using JavaScript, add a footer navigation bar fixed at the bottom of

    document.addEventListener("DOMContentLoaded", function() {

        // Creating and rendering our Nav tag ----------------------------------------------------------
        // Create a variable to hold the parent/anchor footer tag in our index.html. Will append to this.
        let Footer = document.getElementById("footer-nav")

        // Create a new nav element, and set it's class to our bootstrap nav bar.
        let FooterNavTag = document.createElement("nav");
        FooterNavTag.setAttribute("class", "navbar fixed-bottom bg-body-tertiary")
        // Anchor it to our parent element.
        Footer.appendChild(FooterNavTag);

        // Creating and rendering our Div tag ----------------------------------------------------------
        // Create a new div element, and set it's class to our bootstrap value.
        let FooterDivTag = document.createElement("div");
        FooterDivTag.setAttribute("class", "container-fluid d-flex justify-content-center ");
        // Anchor our div element to it's parent element (Our Nav element)
        FooterNavTag.appendChild(FooterDivTag);

        // Creating our anchor elements for our footer nav bar -----------------------------------------

        // Create a new anchor element, and set it's class to our bootstrap, and set it's href to our second nav item.
        let FooterNavItem1 = document.createElement("a")
        FooterNavItem1.setAttribute("class", "navbar-brand");
        FooterNavItem1.href = "./privacypolicy.html";
        FooterNavItem1.textContent = "Privacy Policy";
        FooterDivTag.appendChild(FooterNavItem1);

        // Create a new anchor element, and set it's class to our bootstrap, and set it's href to our second nav item.
        let FooterNavItem2 = document.createElement("a")
        FooterNavItem2.setAttribute("class", "navbar-brand");
        FooterNavItem2.href = "./ToS.html";
        FooterNavItem2.textContent = "Terms of Service";
        FooterDivTag.appendChild(FooterNavItem2);

        // Create a new anchor element, and set it's class to our bootstrap, and set it's href to our third nav item.
        let FooterNavItem3 = document.createElement("a")
        FooterNavItem3.setAttribute("class", "navbar-brand");
        FooterNavItem3.href = "./contact.html";
        FooterNavItem3.textContent = "Contact";
        FooterDivTag.appendChild(FooterNavItem3);
    });

    // END DYNAMIC JAVASCRIPT FOOTER NAV BAR SECTION ----------------------------------------------------

    // Change the "Blog" word in our navbar to "News"
    let BlogText = document.getElementById("BlogText");
    BlogText.textContent = "News";

    // Functions that provide actions when a page is loaded. Will be implemented in our switch.
    function DisplayHomepage() {
        console.log("Called DisplayHomepage...");

        console.log("DOMContextLoaded event called...");
        // Array of words to cycle through
        const words = ["Energetic Community Experience", "Vibrant Community Experience"];

        let index = 0;
        const textElement = document.getElementById("animatedText");
        console.log(textElement);

        // Function to update the text
        function updateText() {
            textElement.textContent = words[index];

            if (index === 0) {
                index++;
            } else {
                index--;
            }
        }

        // Initial update
        updateText();
        // Set interval to update text every 4 seconds
        setInterval(updateText, 4000);
    }

    function DisplayPortfolioPage() {
        console.log("Called DisplayPortfolioPage...");
    }

    function DisplayServicesPage() {
        console.log("Called DisplayServicesPage...");
    }

    function DisplayTeamPage() {
        console.log("Called DisplayTeamPage...");
    }

    function DisplayNewsPage() {
        console.log("Called DisplayNewsPage...");
    }

    function DisplayContactUsPage() {
        console.log("Called DisplayContactUsPage...");
    }

    function Start() {
        console.log("App Started...");

        // Creating a switch that checks the title for the current page.
        switch (document.title) {
            case "Harmony Hub":
                DisplayHomepage();
                break;

            case "Portfolio":
                DisplayPortfolioPage();
                break;

            case "Services":
                DisplayServicesPage();
                break;

            case "Team":
                DisplayTeamPage();
                break;

            case "News":
                DisplayNewsPage();
                break;
            case "Contact":
                DisplayContactUsPage();
                break;
        }
    }

    window.addEventListener("load", Start);

})()