/*
Names: Brody Dentinger and Muhammad Yasir Patel
Student IDs: 100561604 and 100854895
Date: January 26, 2024
File: main.js
Description: Main javascript file for Harmony Hub.
*/

"use strict";

// IIFE
(function() {

    function CheckRating(){

        // Define the message area div for validation messages.
        let messageArea = $("#feedbackReasonMessage");

        if(window.location.href.includes("rating=5")){
            messageArea.addClass("alert alert-info").text("We are really glad you had a 5 star experience");

            // Use setTimeout to clear the message after 3 seconds
            setTimeout(function() {
                messageArea.text("").removeClass();

            }, 3000);

        }
        if(!window.location.href.endsWith("rating=5") && !window.location.href.endsWith("html")){
            messageArea.addClass("alert alert-info").text("We are really sorry you did not have a 5 star experience. We appreciate your feedback.");

            // Use setTimeout to clear the message after 3 seconds
            setTimeout(function() {
                messageArea.text("").removeClass();
            }, 3000);
        }

    }




    // Using JavaScript, add a dynamic header nav bar, and a footer nav bar
    document.addEventListener("DOMContentLoaded", function() {

        // ADD HEADER NAV BAR SECTION --------------------------------------------------------
        // Include header and attach to header-container. Header contains doctype, html, head, meta, title, css section,
        // end head, starting body tag, and header nav bar.

        // Using the axios library, we can get the header via a http request (get), and use it to import our header file.
        axios.get("./header.html")
            .then(response => {
                // Insert the fetched HTML into the element with id 'header-container'
                document.getElementById("header-container").innerHTML = response.data;

                // Access the 'data-page-title' attribute from 'header-container'
                const pageTitle = document.getElementById("header-container").dataset.pageTitle;

                // Set the document title dynamically based on the page title attribute
                document.title = `${pageTitle}`;

                // Change the "Blog" word in our navbar to "News"
                let BlogText = document.getElementById("BlogText");
                BlogText.textContent = "News";

                // Add a Careers Link to header
                let CareerDiv = document.getElementById("career-link-div");
                let CareerAnchorTag = document.createElement("a");
                CareerAnchorTag.setAttribute("class", "nav-link");
                CareerAnchorTag.setAttribute("href", "#");
                CareerAnchorTag.innerHTML = "Careers";
                CareerDiv.appendChild(CareerAnchorTag);

                CheckLogin();

            })
            .catch(error => {
                console.error("Error fetching header:", error);
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
    /**
     *
     *
     */
    function CheckLogin(){

        if(sessionStorage.getItem("user")){

            $('#login').attr('id', 'logout').attr('href', '#').text('Logout');

        }

        $("#logout").on("click", function(){
            sessionStorage.clear();
            location.href = "./login.html";
        });
    }

    /**
     * displayResults() will loop through the results of the user's search bar input and append them to a drop down
     * menu underneath the search bar.
     * @param results the results of the search bar input from user
     */
    function displayResults(results) {
        console.log("DisplayResults called...");
        const resultsContainer = $("#search-dropdown");
        resultsContainer.empty(); // Clear previous results

        if($("#search-input").val() == ""){
            resultsContainer.children().empty();
        }

        if (results.length > 0) {
            // There are results, construct the list items and make the dropdown visible
            results.forEach(result => {
                $('<li>').html(`<a href="${result.url}">${result.title}</a></li>`).appendTo(resultsContainer);
            });
            resultsContainer.css('display', 'block'); // Make the dropdown visible
        } else {
            // No results, ensure the dropdown is not visible
            resultsContainer.css('display', 'none');
        }
    }


    /**
     * A function that calls when the title is "Harmony Hub". Will handle all relevant logic to the index page.
     * @return none
     */
    function DisplayHomepage() {
        console.log("Called DisplayHomepage...");

        // If the url has loginSuccess in it, then add the welcome message to our div.
        if(window.location.href.includes("loginSuccess")){

            // create a user object container
            let user = new User;
            // Fetch the session storage with the key User (as we've stored it from the login page function)
            let userKey = sessionStorage.getItem("user");

            // Deserialize that string and pass its values into our user object.
            user.deserialize(userKey);

            // Query the login message div and add our welcome data.
            $("#loginMessage").addClass("alert alert-light").text("Welcome " + user["firstName"] + "!");

            // Use setTimeout to clear the message after 3 seconds
            setTimeout(function() {
                $("#loginMessage").text("").removeClass();
            }, 3000);
        }

        // Array of words to cycle through
        const words = ["Energetic", "Vibrant"];

        // Index to control the array of strings
        let index = 0;

        // Fetching the animatedText target span tag from our HTML.
        const textElement = document.getElementById("animatedText");

        // Function to update the text
        function updateText() {
            textElement.classList.add("animate-text-fade-in-and-out");

            // Wait for the animation to halfway finish before updating text.
            // This might need adjustment based on the actual animation effect you desire.
            setTimeout(() => {
                // Remove the class halfway through the animation to ensure the text fades out smoothly
                textElement.classList.remove("animate-text-fade-in-and-out");
            }, 5500); // Adjust this based on when you want the fade-out to start.

            // Change the text and restart the animation at the end of the animation cycle.
            setTimeout(() => {
                textElement.textContent = words[index];
                // Cycle through the words array
                index = (index + 1) % words.length; // This ensures a loop through the array
                updateText(); // Call the next update after the full animation duration.
            }, 6000); // This should match the total animation duration.
        }

        // Initial update
        updateText();
    }

    // END CAROUSEL OVERLAY ANIMATED TEXT SECTION ---------------------------------------------

    /**
     * A function that calls when the title is "Portfolio". Will handle all relevant logic to the portfolio page.
     * @return none
     */
    function DisplayPortfolioPage() {
        console.log("Called DisplayPortfolioPage...");

        // START DYNAMIC PORTFOLIO.HTML, PROJECT CARD POPULATION SECTION ------------------------------------

        // Initialize the project card objects to be stored in the array.
        const project1 = new Project
        ("Day Drop In", "General community drop-in, all ages", "./images/project1image.png");
        const project2 = new Project
        ("Kids Sports Day", "Youth drop in for all sports.", "./images/project2image.png");
        const project3 = new Project
        ("Hiking Adventure", "Community hike of the trails.", "./images/project3image.png");
        const project4 = new Project
        ("Community Social", "Social with music, drinks, and snacks.", "./images/project4image.jpg");
        const project5 = new Project
        ("Tennis Club", "Bi-Weekly tennis club.", "./images/project5image.jpg");
        const project6 = new Project
        ("Pilates in the Park", "Workout and push each other!", "./images/project6image.jpg");
        const project7 = new Project
        ("Basketball Tournament", "Above 16 Basketball.", "./images/project7image.jpg");
        const project8 = new Project
        ("Sunset Mediation", "Led by a talented practitioner.", "./images/project8image.jpg");
        const project9 = new Project
        ("Yoga", "Led by a talented practitioner.", "./images/project9image.jpg");

        project9.pushObjectToArray();
        project4.pushObjectToArray();
        project7.pushObjectToArray();
        project3.pushObjectToArray();
        project5.pushObjectToArray();
        project1.pushObjectToArray();
        project2.pushObjectToArray();
        project6.pushObjectToArray();
        project8.pushObjectToArray();

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
         * @return none
         */
        let projectsToRender = 3;
        let loadMoreIncrement = 3;
        function PopulateProjects(projectsToRender) {
            projectListContainer.innerHTML = ''; // Empty the container

            const existingLoadMoreBtn = document.getElementById("load-more-btn");
            if (existingLoadMoreBtn) {
                existingLoadMoreBtn.remove(); // Remove the existing "Load More" button
            }

            const rowDiv = document.createElement("div");
            rowDiv.className = "row";

            for (let i = 0; i < projectsToRender; i++) {
                Project.renderProjectCard(i, rowDiv);
            }

            projectListContainer.appendChild(rowDiv);

            let LoadMoreBtnParent = document.getElementById("load-more-btn-container");

            if (projectsToRender < Project.ProjectCardsArray.length) {
                let LoadMoreBtn = document.createElement("button");
                LoadMoreBtn.setAttribute("id", "load-more-btn");
                LoadMoreBtn.setAttribute("class", "btn btn-primary mx-auto");
                LoadMoreBtn.textContent = "Load More";

                LoadMoreBtnParent.appendChild(LoadMoreBtn);

                LoadMoreBtn.addEventListener("click", function () {
                    PopulateProjects(projectsToRender + loadMoreIncrement);
                });
            }
        }

// Initial call
        PopulateProjects(projectsToRender);

        // END DYNAMIC PORTFOLIO.HTML, PROJECT CARD POPULATION SECTION ------------------------------------
    }

    /**
     * A function that calls when the title is "Services". Will handle all relevant logic to the service page.
     * @return none
     */
    function DisplayServicesPage() {
        console.log("Called DisplayServicesPage...");

    }

    /**
     * A function that calls when the title is "Team". Will handle all relevant logic to the team page.
     * @return none
     */
    function DisplayTeamPage() {
        console.log("Called DisplayTeamPage...");
    }

    /**
     * A function that calls when the title is "News". Will handle all relevant logic to the news page.
     * @return none
     */
    function DisplayNewsPage() {
        console.log("Called DisplayNewsPage...");

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
            "Join us for a day of community bonding and fun activities at Harmony Hub! We'll have " +
                     "workshops, games, and delicious food. Don't miss out on this exciting event.",
            "https://example.com/news2"
        );

        // Append them to the array.
        newsArticle1.pushObjectToArray();
        newsArticle2.pushObjectToArray();

        //let NewsArticlesToRender = 10;

        // Loop through the array and add the items to our HTML structure in news.html.
        for(let i = 0; i < NewsArticle.NewsArticlesArray.length; i ++){

            // Calling our class method to render each article.
            NewsArticle.renderNewsArticle(i);
        }
    }

    /**
     * A function that calls when the title is "Contact Us". Will handle all relevant logic to the contact page.
     * @return none
     */
    function DisplayContactUsPage() {
        console.log("Called DisplayContactUsPage...");
        // Load the modal content
        $.get("./feedback_form.html", function (html_data) {
            // Insert the loaded content into the modal
            $("#feedbackModal").html(html_data);
        });
        CheckRating();
        let map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

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

    /**
     *
     *
     */
    function DisplayLoginPage(){

        console.log("DisplayLoginPage() called...");

        // Define the message area div for validation messages.
        let messageArea = $("#messageArea");

        // Fetch button with jquery
        $("#login-button").on("click", function (){

            let success = false;

            let newUser = new User();

            // Reset message area.
            messageArea.removeClass("").text("");

            // JQuery version of an HTTP request
            // function(data) = data already represents the returnText
            // JQuery also already checks for 4 readystatechange, and 200 ok
            $.get("./data/users.json", function(data) {

                // loop through each user of the response json file
                for (const user of data.users) {

                    console.log(user);

                    // check if the username and password text fields from the form match the user and password from
                    // the JSON user.
                    if (username.value === user.Username && password.value === user.Password) {

                        // store the data from the matching user in the JSON file in this User Object
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                    //
                    if(success){

                        // create a user object to serialize it into local storage.
                        sessionStorage.setItem("user", newUser.serialize());

                        // Redirect with appended success message to url
                        location.href = "index.html#loginSuccess";
                    }
                    else{
                            messageArea.addClass("alert alert-danger").text("Error: Invalid Credentials");
                        }

            })
        });
    }

    //(firstName, lastName, userName, email, phoneNumber, password)
    function validateRegisterForm() {
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let phonePattern = /^\d{3}[- ]?\d{3}[- ]?\d{4}$/;
        let usernamePattern = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;

        // Validate first name
        if($("#firstName").val().trim() === ""){
            return false;
        }
        // Validate last name
        if ($("#lastName").val().trim() === ""){
            return false;
        }
        // Username character limit
        let username = $("#username").val().trim();
        if (!usernamePattern.test(username)) {
            return false;
        }

        // Validate email
        let email = $("#email").val().trim();
        if (!emailPattern.test(email)) {
            return false;
        }

        // Validate phone number
        let phone = $("#phone").val().trim();
        if (!phonePattern.test(phone)) {
            return false;
        }

        // All validations passed, return true
        return true;
    }

    function DisplayRegisterPage(){
        console.log("DisplayRegisterPage() called...")

        let registerForm = $("#register-form");

        $("#register-button").on("click", function(event){


            console.log($("#phone").val());
            console.log($("#username").val());

            event.preventDefault(); // Prevent the default form submission behavior

            if(!validateRegisterForm()) { // Check if the form is valid

                registerForm.addClass('was-validated');
                console.log("Form is invalid.");

            } else {
                // Form is not valid, display error messages or take appropriate action
                console.log("Form is valid.");
            }

        });
    }

    function DisplayEventsPage() {
        console.log("DisplayEventsPage() called...");

        fetch('./data/events.json')
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector('.row');
                // Access the 'events' array within the JSON
                const events = data.events;

                events.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'col-md-4 on-hover';

                    card.innerHTML = `
                    <div class="card border-1 mb-4">
                        <a href="#"><img class="card-img-top" src="${item.image}" alt="Event Image"></a>
                        <div class="date-pos bg-info-gradiant p-2 d-inline-block text-center rounded text-white position-absolute">${item.month}<span class="d-block">${item.day}</span></div>
                        <h5 class="font-weight-medium mt-3"><a href="#" class="text-decoration-none link">${item.title}</a></h5>
                        <p class="mt-3">${item.subtitle}</p>
                        <a href="${item.learnMoreLink}" class="text-decoration-none linking text-themecolor mt-2">Learn More</a>
                    </div>
                `;
                    container.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function DisplayGalleryPage() {
        fetch('./data/gallery.json')
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector('#dynamic-gallery-container');

                // Change 'events' to 'gallery' to match your JSON structure
                const events = data.gallery;

                events.forEach(item => {
                    const col = document.createElement('div');
                    col.className = 'col';
                    col.innerHTML = `
                <a class="gallery-item" href="${item.image}" data-bs-toggle="modal" data-bs-target="#lightbox-modal">
                    <img src="${item.image}" class="img-fluid" alt="${item.title}">
                </a>
                `;
                    container.appendChild(col);
                });

                // Setup modal for lightbox
                setupLightboxModal();
            })
            .catch(error => console.error('Error fetching data:', error));
    }


    function setupLightboxModal() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const modalBody = document.querySelector('.lightbox-content');
        const bsModal = new bootstrap.Modal(document.getElementById('lightbox-modal'));

        galleryItems.forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const imgSrc = this.getAttribute('href');
                modalBody.innerHTML = `<img src="${imgSrc}" class="img-fluid" alt="Event Image">`;
                bsModal.show();
            });
        });
        const fsEnlargeBtn = document.querySelector('.btn-fullscreen-enlarge');
        const fsExitBtn = document.querySelector('.btn-fullscreen-exit');

        fsEnlargeBtn.addEventListener('click', function() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.getElementById('lightbox-modal').requestFullscreen();
            }
        });

        fsExitBtn.addEventListener('click', function() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        });
    }

    /**
     * A function that calls when the website starts. Will handle page detection logic, using a switch to check the
     * given page's title, and call it's relevant DisplayFunction().
     * @return none
     */
    function Start() {
        console.log("App Started...");

        // COMPARE WHAT PROF HAS ...
        // ALSO NEED TO APPEND EACH RESULT TO THE DROP DOWN MENU
        $("#search-input").on("input", function() {
            console.log("Search input event firing...");
            const query = $(this).val().toLowerCase();

            const resultsContainer = $("#search-dropdown");

            // If the query is empty, reset the child <li> elements and hide the <ul> parent because it's empty.
            if (query === '') {
                resultsContainer.empty().hide();
                return;
            }
            $.ajax({
                url: './data/contentIndex.json',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    // Access the 'content' array from the response
                    const data = response.content;
                    // Check if 'data' is an array before filtering
                    if (Array.isArray(data)) {
                        const results = data.filter(page => page.content.toLowerCase().includes(query));
                        displayResults(results);
                    } else {
                        console.error('Invalid data format: expected an array');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Failed to fetch content index:', error);
                }
            });
        });

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
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            case "Events":
                DisplayEventsPage();
                break;
            case "Gallery":
                DisplayGalleryPage();
                break;
        }
    }

    window.addEventListener("load", Start);

})()