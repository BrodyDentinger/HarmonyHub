<!--
Names:
Date:
File:
Description:
-->

"use strict";

(function(){

    // Change the "Blog" word in our navbar to "News"
    let BlogText = document.getElementById("BlogText");
    BlogText.textContent = "News";

    // Functions that provide actions when a page is loaded. Will be implemented in our switch.
    function DisplayHomepage(){
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

                if(index === 0){
                    index++;
                }
                else{
                    index--;
                }
            }
            // Initial update
            updateText();
            // Set interval to update text every 4 seconds
            setInterval(updateText, 4000);
    }

    function DisplayPortfolioPage(){
        console.log("Called DisplayPortfolioPage...");
    }

    function DisplayServicesPage(){
        console.log("Called DisplayServicesPage...");
    }

    function DisplayTeamPage(){
        console.log("Called DisplayTeamPage...");
    }

    function DisplayNewsPage(){
        console.log("Called DisplayNewsPage...");
    }

    function DisplayContactUsPage(){
        console.log("Called DisplayContactUsPage...");
    }

    function Start(){
        console.log("App Started...");

        // Creating a switch that checks the title for the current page.
        switch(document.title){
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

}) ()