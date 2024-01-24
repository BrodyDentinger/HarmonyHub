/*
Name 1: Brody Dentinger
Student Number 1: 100561604
Name 2:
Student Number 2:
Date of Completion:
File: main.js
Description: Javascript functionality for harmony hub.
*/

"use strict";



// Defining a class to create the projects for the portfolio page. Refer to DisplayPortfolioPage().

class Project {
    constructor(title, description, image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }
}

class NewsArticle {
    constructor(title, image, author, date, summary, description) {
        this.title = title;
        this.image = image;
        this.author = author;
        this.date = date;
        this.summary = summary;
        this.description = description;
    }
}

// IIFE
(function() {


    // Using JavaScript, add a dynamic header nav bar, and a footer nav bar
    document.addEventListener("DOMContentLoaded", function() {

        // ADD HEADER NAV BAR SECTION --------------------------------------------------------
        // Include header and attach to header-container. Header contains doctype, html, head, meta, title, css section,
        // end head, starting body tag, and header nav bar.

        // Fetch the content of the 'header.html' file
        fetch("./header.html")
            // Convert the response to text
            .then(response => response.text())
            // Handle the HTML content
            .then(html => {
                // Insert the fetched HTML into the element with id 'header-container'
                document.getElementById("header-container").innerHTML = html;

                // Access the 'data-page-title' attribute from 'header-container'
                const pageTitle = document.getElementById("header-container").dataset.pageTitle;

                // Set the document title dynamically based on the page title attribute
                document.title = `${pageTitle}`;

                // Change the "Blog" word in our navbar to "News"
                let BlogText = document.getElementById("BlogText");
                BlogText.textContent = "News";
            });

        // END HEADER NAV BAR SECTION --------------------------------------------------------


        // ADD FOOTER NAV BAR SECTION --------------------------------------------------------

        // Nav tag -----
        // Create a variable to hold the parent/anchor footer tag in our index.html. Will append to this.
        //let Footer = document.getElementById("footer-nav")

        // Create a new nav element for the footer, and set its class to a Bootstrap navbar class
        let FooterNavTag = document.createElement("nav");
        FooterNavTag.setAttribute("class", "navbar fixed-bottom navbar-expand bg-body-tertiary");

        // Anchor the nav element to the body
        document.body.appendChild(FooterNavTag);

        // Create a new div element for the navbar content
        let FooterDivTag = document.createElement("div");
        FooterDivTag.setAttribute("class", "container-fluid");

        // Anchor the div element to the nav element
        FooterNavTag.appendChild(FooterDivTag);

        // Create a new unordered list element for the navbar items
        let FooterNavList = document.createElement("ul");
        FooterNavList.setAttribute("class", "navbar-nav mx-auto mb-2 mb-lg-0"); // Add 'navbar-nav' class here

        // Anchor the list to the div element
        FooterDivTag.appendChild(FooterNavList);

        // Create a new anchor element for each navbar item

        // Nav Item 1 - Privacy Policy
        let FooterNavItem1 = document.createElement("li");
        FooterNavItem1.setAttribute("class", "nav-item");
        let FooterNavLink1 = document.createElement("a");
        FooterNavLink1.setAttribute("class", "nav-link");
        FooterNavLink1.href = "./privacypolicy.html";
        FooterNavLink1.textContent = "Privacy Policy";
        FooterNavItem1.appendChild(FooterNavLink1);
        FooterNavList.appendChild(FooterNavItem1);

        // Nav Item 2 - Terms of Service
        let FooterNavItem2 = document.createElement("li");
        FooterNavItem2.setAttribute("class", "nav-item");
        let FooterNavLink2 = document.createElement("a");
        FooterNavLink2.setAttribute("class", "nav-link");
        FooterNavLink2.href = "./ToS.html";
        FooterNavLink2.textContent = "Terms of Service";
        FooterNavItem2.appendChild(FooterNavLink2);
        FooterNavList.appendChild(FooterNavItem2);

        // Nav Item 3 - Contact
        let FooterNavItem3 = document.createElement("li");
        FooterNavItem3.setAttribute("class", "nav-item");
        let FooterNavLink3 = document.createElement("a");
        FooterNavLink3.setAttribute("class", "nav-link");
        FooterNavLink3.href = "./contact.html";
        FooterNavLink3.textContent = "Contact";
        FooterNavItem3.appendChild(FooterNavLink3);
        FooterNavList.appendChild(FooterNavItem3);

    });

    // END DYNAMIC JAVASCRIPT FOOTER NAV BAR SECTION ----------------------------------------------------

    // Change the "Blog" word in our navbar to "News"
    /*let BlogText = document.getElementById("BlogText");
    BlogText.textContent = "News";*/

    // Functions that provide actions when a page is loaded. Will be implemented in our switch.
    function DisplayHomepage() {
        console.log("Called DisplayHomepage...");
        
        // CAROUSEL OVERLAY ANIMATED TEXT SECTION ---------------------------------------------

        // Array of words to cycle through
        const words = ["Energetic", "Vibrant"];

        // index to control the array of strings
        let index = 0;

        // fetching the animatedText target span tag from our HTML.
        const textElement = document.getElementById("animatedText");

        // Function to update the text
        function updateText() {

            textElement.classList.add("animate-text-fade-in-and-out");

            // Wait for the animation to finish before updating text and removing the class.
            setTimeout(() => {
                textElement.textContent = words[index];

                textElement.classList.remove("animate-text-fade-in-and-out");

                // Increment or decrement index to control the array of words.
                index === 0 ? index++: index--;

                // Call the next update after 0 delay
                setTimeout(updateText, 0);

                // Timeout below should match the animation duration in style.css file.
            }, 6000);
        }

        // Initial update
        updateText();
    }
        // END CAROUSEL OVERLAY ANIMATED TEXT SECTION ---------------------------------------------

    function DisplayPortfolioPage() {
        console.log("Called DisplayPortfolioPage...");


        // START DYNAMIC PORTFOLIO.HTML, PROJECT CARD POPULATION SECTION ------------------------------------

        // Define an array to hold our project card objects.
        const ProjectCardsArray = [];

        // Initialize the project card objects to be stored in the array.
        const project1 = new Project("Day Drop In", "General community drop-in, all ages", "./images/project1image.png");
        const project2 = new Project("Kids Sports Day", "Youth drop in for all sports.", "./images/project2image.png");
        const project3 = new Project("Hiking Adventure", "Community hike of the trails.", "./images/project3image.png");
        const project4 = new Project("Community Social", "Social with music, drinks, and snacks.", "./images/project4image.jpg");
        const project5 = new Project("Tennis Club", "Bi-Weekly tennis club.", "./images/project5image.jpg");
        const project6 = new Project("Pilates in the Park", "Workout and push each other!", "./images/project6image.jpg");
        const project7 = new Project("Basketball Tournament", "Above 16 Basketball.", "./images/project7image.jpg");
        const project8 = new Project("Sunset Mediation", "Led by a talented practitioner.", "./images/project8image.jpg");
        const project9 = new Project("Yoga", "Led by a talented practitioner.", "./images/project9image.jpg");
        const project10 = new Project("Soccer Drop-In", "Under 16 youth soccer drop-in.", "./images/project10image.jpg");

        ProjectCardsArray.push(project1);
        ProjectCardsArray.push(project2);
        ProjectCardsArray.push(project3);
        ProjectCardsArray.push(project4);
        ProjectCardsArray.push(project5);
        ProjectCardsArray.push(project6);
        ProjectCardsArray.push(project7);
        ProjectCardsArray.push(project8);
        ProjectCardsArray.push(project9);
        ProjectCardsArray.push(project10);

        // Variable to hold the parent container to attach the list objects.
        let projectListContainer = document.getElementById("project-list-container");


        /** @function PopulateProjects()
         *  @description This function serves to loop through the project card array, and dynamically create HTML
         *        card elements with the object data. It also renders a "load more" button, which when pressed, will
         *        increase the number of project objects that are rendered by a given number.
         * @param projectsToRender: A number that represents how many elements from our project card array
         *        will be rendered. This is increased when the user clicks the "load more" button.
         * @Additional Info: loadMoreIncrement: A number that represents how many elements will be added to the initial
         *        2 every time the "load more" button is clicked.
         *
         */
        let projectsToRender = 2;
        let loadMoreIncrement = 2;
        function PopulateProjects(projectsToRender) {

            // Empty the project list container. Exists to avoid duplication of rendered project array objects after
            // "load more" is clicked.
            projectListContainer.innerHTML = '';

            // Delete the existing "Load More" button if it exists. Exists to avoid button duplication as "load more"
            // is clicked.
            const existingLoadMoreBtn = document.getElementById("load-more-btn");
            if (existingLoadMoreBtn) {
                existingLoadMoreBtn.remove();
            }

            // Loop through and create HTML project cards for every element up to the number specified by
            // projectsToRender. (Variable exists at top of function)
            // Create a row div to contain the columns
            const rowDiv = document.createElement("div");
            rowDiv.className = "row";

            // Loop through and create HTML project cards for every element up to the number specified by projectsToRender
            for (let i = 0; i < projectsToRender; i++) {
                // Create a column div for each project
                const colDiv = document.createElement("div");
                colDiv.className = "col-md-6 mb-4";

                // Create HTML Content and append to column
                colDiv.innerHTML = '';
                const cardDiv = document.createElement("div");
                cardDiv.className = "card";

                const image = document.createElement("img");
                image.src = ProjectCardsArray[i].image;
                image.className = "card-img-top custom-image";
                image.alt = `${ProjectCardsArray[i].title}Image`;

                const cardBody = document.createElement("div");
                cardBody.className = "card-body";

                const title = document.createElement("h5");
                title.className = "card-title";
                title.textContent = ProjectCardsArray[i].title;

                const description = document.createElement("p");
                description.className = "card-text";
                description.textContent = ProjectCardsArray[i].description;

                // Append elements to their respective parents
                cardBody.appendChild(title);
                cardBody.appendChild(description);

                cardDiv.appendChild(image);
                cardDiv.appendChild(cardBody);

                colDiv.appendChild(cardDiv);

                // Append the column to the row
                rowDiv.appendChild(colDiv);
            }

            // Append the row to the container
            projectListContainer.appendChild(rowDiv);
            // Add a load more button if number of projects is > projectsToRender

            // Fetch the html parent for the button
            let LoadMoreBtnParent = document.getElementById("load-more-btn-container");

            // If projectsToRender is less than the total projects, create and render the load more button.
            if(projectsToRender < ProjectCardsArray.length){

                let LoadMoreBtn = document.createElement("button");
                LoadMoreBtn.setAttribute("id", "load-more-btn");
                LoadMoreBtn.setAttribute("class", "btn btn-primary mx-auto");
                LoadMoreBtn.textContent = "Load More";

                LoadMoreBtnParent.appendChild(LoadMoreBtn);

                // A click event for the button that calls our populate projects function, and increments the
                // projectsToRender by loadMoreIncrement. (Variable located at top of this function.)
                LoadMoreBtn.addEventListener("click", function (){

                    PopulateProjects(projectsToRender + loadMoreIncrement);
                })
            }
        }

        // Call the initial function to populate the projects on portfolio.html.
        PopulateProjects(projectsToRender);

        // END DYNAMIC PORTFOLIO.HTML, PROJECT CARD POPULATION SECTION ------------------------------------
    }

    function DisplayServicesPage() {
        console.log("Called DisplayServicesPage...");


    }

    function DisplayTeamPage() {
        console.log("Called DisplayTeamPage...");
    }

    /**
     * @function DisplayNewsPage()
     * @description This function fires when the title of the page is "News". It serves to create an array of
     *              news article objects, then loop through said array to create an html/css news article for each
     *              object.
     * @additional In the future, the variable NewsArticlesToRender can be used to limit the number of articles
     *              that render by default. A Load More button can be implemented to increment the default render
     *              value.
     *
     */
    function DisplayNewsPage() {
        console.log("Called DisplayNewsPage...");

        // Create an array to hold our news articles.
        const NewsArticlesArray = []

        // Create 2 dummy objects of our news article class.
        const newsArticle1 = new NewsArticle(
            "Introduction to Harmony Hub!",
            "./images/news1image.png",
            "Jane Doe",
            "January 15, 2024",
            "Learn about the exciting classes, services, and clubs we offer here." +
                        "We offer a wide array of community driven adventures and experiences!",
            "More.");

        const newsArticle2 = new NewsArticle(
            "Harmony Hub Community Event",
            "./images/news2image.jpg",
            "John Smith",
            "February 20, 2024",
            "Join us for a day of community bonding and fun activities at Harmony Hub! We'll have workshops, games, and delicious food. Don't miss out on this exciting event.",
            "https://example.com/news2"
        );

        // Append them to the array.
        NewsArticlesArray.push(newsArticle1);
        NewsArticlesArray.push(newsArticle2);

        //let NewsArticlesToRender = 10;


        /* STRUCTURE WE ARE RECREATING IN THE FOR LOOP EXAMPLE ----------------------------------------------------
            @Credit Bootstrap 5.3
          <div id = "single-article-container" class="post row g-0 p-4 border rounded overflow-hidden
                                                      flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <h1 id = "news-title" class="fw-semibold">Introduction to Bootstrap 5.3.0</h1>
            <div id = "image-author-date-container" class="d-flex align-items-center mb-4 text-muted">
                <img class="mb-0 me-2 rounded-2 news-image-dimensions" src="https://via.placeholder.com/32" alt="">
                    <span>@john_doe</span>
                    <span id = "news-date-container" class="d-flex align-items-center ms-3">
                        <span id = "news-date-icon>
                              <i class="fa-regular fa-calendar"></i>
                        </span>
                            January 15, 2024
                            </span>
            </div>
            <p id = "news-summary">Learn about the exciting....
            <a href="#" class="text-body-emphasis fw-bold">Continue reading...</a>
        </div>

         ------------------------------------------------------------------------------------------------------------
        */
        // Loop through the array and add the items to our HTML structure in news.html.
        for(let i = 0; i < NewsArticlesArray.length; i ++){

            // Create the HTML structure (divs, classes, id's, etc) and store the current news article object data in
            // variables. Fill the structure with the object data. Append it to HTML parent.

            // Parent Div creation
            let singleArticleDiv = document.createElement("div");
            singleArticleDiv.setAttribute("class", "post row g-0 p-4 border rounded overflow-hidden " +
                                                                "flex-md-row mb-4 shadow-sm h-md-250 position-relative");
            // News Container Div
            let newsContainer = document.getElementById("news-container");
            newsContainer.appendChild(singleArticleDiv);

            // News Title Section
            let newsPostTitle = document.createElement("h1");
            newsPostTitle.setAttribute("class", "fw-semibold");
            newsPostTitle.textContent = NewsArticlesArray[i].title;

            // Creating the div to hold image, author, and date
            let imageAuthorAndDateDiv = document.createElement("div");
            imageAuthorAndDateDiv.setAttribute("class", "d-flex align-items-center mb-4 text-muted");

            singleArticleDiv.appendChild(newsPostTitle);
            singleArticleDiv.appendChild(imageAuthorAndDateDiv);


            // News Image
            let newsImageTag = document.createElement("img");
            newsImageTag.setAttribute("class", "mb-0 me-2 rounded-2 news-image-dimensions");
            newsImageTag.setAttribute("src", NewsArticlesArray[i].image);
            newsImageTag.setAttribute("alt", `${NewsArticlesArray[i].title} Image`);

            imageAuthorAndDateDiv.appendChild(newsImageTag);

            // News Author
            let newsAuthorSpanTag = document.createElement("span");
            newsAuthorSpanTag.textContent = NewsArticlesArray[i].author;

            imageAuthorAndDateDiv.appendChild(newsAuthorSpanTag);

            // News Date
            let newsDateSpanTag = document.createElement("span");
            newsDateSpanTag.setAttribute("class", "d-flex align-items-center ms-3");
            newsDateSpanTag.textContent = NewsArticlesArray[i].date;

            imageAuthorAndDateDiv.appendChild(newsDateSpanTag);

            // Calendar Icon
            let calendarIcon = document.createElement("i");
            calendarIcon.setAttribute("class", "fa-regular fa-calendar");
            newsDateSpanTag.appendChild(calendarIcon);


            // News Summary Section
            let newsSummaryP = document.createElement("p");
            newsSummaryP.textContent = NewsArticlesArray[i].summary;

            // Read More Link Section
            let readMoreLink = document.createElement("a");
            readMoreLink.setAttribute("class", "text-body-emphasis fw-bold");
            readMoreLink.setAttribute("href", "#");
            readMoreLink.textContent = "Read More..."

            singleArticleDiv.appendChild(newsSummaryP);
            singleArticleDiv.appendChild(readMoreLink);
        }
    }

    /**
     *
     * @constructor
     */
    function DisplayContactUsPage() {
        console.log("Called DisplayContactUsPage...");

        // Form constant
        const contactForm = document.getElementById("contactForm");
        // Constant for the first modal popup body which is the one that shows the form inputs
        const modalBody = document.getElementById("modal-body");
        // First modal pop up confirm button
        const looksGoodButton = document.getElementById("contactUsModalButton")
        //the actual modal, yes the whole thing
        const contactModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
            keyboard: false
        });
        //thank you message modal
        const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'), {
            keyboard: false,
            backdrop: 'static'
        });
        // event listener when the submit on the forms clicked
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Check if the form inputs are valid
            if (!contactForm.checkValidity()) {
                // If the form is not valid, add was-validated class to show Bootstrap's validation feedback
                contactForm.classList.add('was-validated');
            } else {
                // If the form is valid, process the form data
                console.log("Form is valid. Submitting...");
                const userName = document.getElementById("userName").value;
                const email = document.getElementById("email").value;
                const subject = document.getElementById("subject").value;
                const message = document.getElementById("message").value;

                // Insert form data into modal
                modalBody.innerHTML = `
                <p><strong>User Name:</strong> ${userName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong> ${message}</p>
            `;

                // Show the modal
                contactModal.show();

                // Reset the form fields
                contactForm.reset();
                // Remove was-validated class after the reset to clear validation feedback
                contactForm.classList.remove('was-validated');
            }
        });
        looksGoodButton.addEventListener('click', function () {

            contactModal.hide();
            // Show the thank you modal
            thankYouModal.show();

            // Start the countdown
            let countdownNumber = 5;
            const countdownElement = document.getElementById('countdown');
            countdownElement.textContent = countdownNumber;

            const intervalId = setInterval(function () {
                countdownNumber--;
                countdownElement.textContent = countdownNumber;

                if (countdownNumber === 0) {
                    clearInterval(intervalId);
                    thankYouModal.hide();
                    // Redirect to Home page
                    window.location.href = './index.html';
                }
            }, 1000);
        });
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