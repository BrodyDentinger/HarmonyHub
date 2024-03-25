/*
Names: Brody Dentinger and Muhammad Yasir Patel
Student IDs: 100561604 and 100854895
Date: January 26, 2024
File: main.js
Description: Main javascript file for Harmony Hub.
*/

"use strict";

// IIFE

(function():void {

    /**
     * This function will check the rating given by the user, and based on that rating, provide a
     *
     */
    function CheckRating(){

        // Define the message area div for validation messages.
        let messageArea = $("#feedbackReasonMessage");

        // This gets the value of the checked radio button, which corresponds to the number of stars
        let ratingValue = $('input[type="radio"][name="rating"]:checked').val();

        // If it's 5
        if(ratingValue === "5"){
            $.get("./five_star.html", function (html_data) {
                // Insert the loaded content into the modal
                messageArea.addClass("alert alert-info").text(html_data);
            });

            // Use setTimeout to clear the message after 3 seconds
            setTimeout(function() {
                messageArea.text("").removeClass("alert alert-info");

            }, 3000);

        }
        if(ratingValue !== "5"){
            messageArea.addClass("alert alert-info").text("We are really sorry you did not have a 5 star experience. " +
                "We appreciate your feedback.");

            // Use setTimeout to clear the message after 3 seconds
            setTimeout(function() {
                messageArea.text("").removeClass("alert alert-info");

            }, 3000);
        }
    }

    /**
     * This function will check if there is a user stored in local storage, and if so, dynamically alter the
     * navbar to include the username of the logged in user. Also assigns a click event to the logout button.
     *
     */
    function CheckLogin(){

        if(sessionStorage.getItem("user")){

            //$('#login').attr('id', 'logout').attr('href', '#').text('Logout');

            // create a user object container
            let user = new User;
            // Fetch the session storage with the key User (as we've stored it from the login page function)
            let userKey:string|null = sessionStorage.getItem("user");

            // Deserialize that string and pass its values into our user object.
            if (userKey != null) {
                user.deserialize(userKey);
            }

            // User's first name
            let username = user["firstName"]

            // Modify the login button to show the user's name and add a dropdown for logout
            $('#login').replaceWith(`
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" 
                    data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-regular fa-user"></i> ${username}
                </a>
                <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="#" id="logout">Logout</a></li>
                </ul>
            </li>
        `);

        }

        $("#logout").on("click", function(){
            sessionStorage.clear();
            location.href = "/login";
        });
    }

    /**
     * displayResults() will loop through the results of the user's search bar input and append them to a drop down
     * menu underneath the search bar.
     * @param results the results of the search bar input from user
     */
    function displayResults(results: any[]) {
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
            let userKey:string|null = sessionStorage.getItem("user")!;

            // Deserialize that string and pass its values into our user object.
            user.deserialize(userKey);

            // Query the login message div and add our welcome data.
            $("#loginMessage").addClass("alert alert-light").text("Welcome " + user["firstName"] + "!");

            // Use setTimeout to clear the message after 3 seconds
            setTimeout(function() {
                $("#loginMessage").text("").removeClass();
            }, 5000);
        }

        // Array of words to cycle through
        const words = ["Energetic", "Vibrant"];

        // Index to control the array of strings
        let index = 0;

        // Fetching the animatedText target span tag from our HTML.
        const textElement:HTMLElement = document.getElementById("animatedText")!;

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
        ("Day Drop In", "General community drop-in, all ages", "/assets/images/project1image.png");
        const project2 = new Project
        ("Kids Sports Day", "Youth drop in for all sports.", "/assets/images/project2image.png");
        const project3 = new Project
        ("Hiking Adventure", "Community hike of the trails.", "/assets/images/project3image.png");
        const project4 = new Project
        ("Community Social", "Social with music, drinks, and snacks.", "/assets/images/project4image.jpg");
        const project5 = new Project
        ("Tennis Club", "Bi-Weekly tennis club.", "/assets/images/project5image.jpg");
        const project6 = new Project
        ("Pilates in the Park", "Workout and push each other!", "/assets/images/project6image.jpg");
        const project7 = new Project
        ("Basketball Tournament", "Above 16 Basketball.", "/assets/images/project7image.jpg");
        const project8 = new Project
        ("Sunset Mediation", "Led by a talented practitioner.", "/assets/images/project8image.jpg");
        const project9 = new Project
        ("Yoga", "Led by a talented practitioner.", "/assets/images/project9image.jpg");

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
        let projectListContainer:HTMLElement = document.getElementById("project-list-container")!;

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
        let projectsToRender:number = 3;
        let loadMoreIncrement:number = 3;
        function PopulateProjects(projectsToRender:number):void {
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

            let LoadMoreBtnParent:HTMLElement = document.getElementById("load-more-btn-container")!;

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

        $.get("/feedback_form", function (html_data) {
            // Insert the loaded content into the modal
            $("#feedbackModal").html(html_data);

            // Submit button
            $(document).on("click", "#feedbackFormBtn", function(event){
                event.preventDefault();

                // Keep the "Thank You" html data, and change the text asynchronously.
                $.get("/feedback_form1", function (html_data) {
                    $("#feedbackModelQuestion1").html(html_data);
                });

                // change What is the main reason --> we look forward to implementing your feedback.
                $("#feedbackModelQuestion2").text("We look forward to implementing your feedback. " +
                                                    "You can close this window when ready");

                // Disable the stars
                $("#star_div input[type='radio']").prop('disabled', true);

                // Disable the message area
                $("#feedbackReason").prop('disabled', true);

                // Disable the submit button
                $("#feedbackFormBtn").prop('disabled', true);

            });

            // close button
            $(document).on("click", "#feedbackFormCloseBtn", function(){

                CheckRating();
                // Reset the form's contents to default... Request from original file.
                $.get("/feedback_form", function (html_data) {
                    $("#feedbackModal").html(html_data)
                });
            });
        });


        let map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Form constant
        const contactForm: HTMLFormElement = document.getElementById("contactForm") as HTMLFormElement;
        // Constant for the first modal popup body which is the one that shows the form inputs
        const modalBody:HTMLElement = document.getElementById("modal-body")!;
        // First modal pop up confirm button
        const looksGoodButton:HTMLElement = document.getElementById("contactUsModalButton")!;
        //the actual modal, yes the whole thing

        const contactModal: bootstrap.Modal = new bootstrap.Modal(document.getElementById('staticBackdrop')!, {
            keyboard: false
        });
        //thank you message modal
        const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal')!, {
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
                const userNameElement:HTMLInputElement = document.getElementById("userName") as HTMLInputElement;
                const userName = userNameElement.value;
                const emailElement:HTMLInputElement = document.getElementById("email") as HTMLInputElement;
                const email = emailElement.value;
                const subjectElement = document.getElementById("subject") as HTMLInputElement;
                const subject = subjectElement.value;
                const messageElement = document.getElementById("message") as HTMLInputElement;
                const message = messageElement.value;

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
            const countdownElement:HTMLElement = document.getElementById('countdown')!;
            countdownElement.textContent = countdownNumber.toString();

            const intervalId = setInterval(function () {
                countdownNumber--;
                countdownElement.textContent = countdownNumber.toString();

                if (countdownNumber === 0) {
                    clearInterval(intervalId);
                    thankYouModal.hide();
                    // Redirect to Home page
                    window.location.href = '/index';
                }
            }, 1000);
        });
    }

    /**
     * This function will be called when the title matches the login page.
     *
     */
    function DisplayLoginPage(){

        console.log("DisplayLoginPage() called...");

        // Define the message area div for validation messages.
        let messageArea = $("#messageArea");

        // Handle if a successful registration occured
        if(window.location.href.includes("registerSuccess")){
            messageArea.addClass("alert alert-success").text("Successful Registration");
        }

            // Fetch button with jquery
            $("#login-button").on("click", function () {

                const usernameInput = $("#username").val() as string;
                const passwordInput = $("#password").val() as string;

                // If fields are empty, don't waste compute power.
                if(usernameInput !== "" && passwordInput !== "") {

                    let success : boolean = false;
                    let newUser : User = new User();
                    // Reset message area.
                    messageArea.removeClass("").text("");

                    // JQuery version of an HTTP request
                    // function(data) = data already represents the returnText
                    // JQuery also already checks for 4 readystatechange, and 200 ok
                    $.get("/data/users.json", function (data) {

                        // loop through each user of the response json file
                        for (const user of data.users) {

                            // check if the username and password text fields from the form match the user and password from
                            // the JSON user.
                            if (usernameInput === user.Username && passwordInput === user.Password) {

                                // store the data from the matching user in the JSON file in this User Object
                                newUser.fromJSON(user);
                                success = true;
                                break;
                            }
                        }
                        if (success) {
                            // create a user object to serialize it into local storage.
                            sessionStorage.setItem("user", newUser.serialize()!);
                            // Redirect with appended success message to url
                            location.href = "/home#loginSuccess";
                        } else {
                            messageArea.addClass("alert alert-danger").text("Error: Invalid Credentials");
                        }

                    })
                }
                // No credentials provided
                else{
                    messageArea.addClass("alert alert-danger").text("Error: Please provide credentials.");
                }
        })
    }

    /**
     *  This function validates the registration form using regex patterns that match the patterns stipulated
     *  by the html registration page. Returns true if all fields are valid, false otherwise.
     * @return {boolean}
     */
    function validateRegisterForm() {
        // Defining regex patterns to match the ones in HTML input fields
        let usernamePattern:RegExp = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
        let emailPattern:RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
        let phonePattern:RegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        let passwordPattern :RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,30}$/;

        const username: string = ($("#username").val() as string || "").trim();
        const email: string = ($("#email").val() as string || "").trim();
        const phone: string = ($("#phone").val() as string || "").trim();
        const password: string = ($("#password").val() as string || "").trim();

        let registerForm = $("#register-form");

        if (($("#firstName").val() as string ?? "").trim() === "") {
            registerForm.addClass('was-validated');
            return false;
        } else if (($("#lastName").val() as string ?? "").trim() === "") {
            registerForm.addClass('was-validated');
            return false;
        }
        else if (!usernamePattern.test(username)) {
            registerForm.addClass('was-validated');
            return false;
        }
        else if (!emailPattern.test(email)) {
            registerForm.addClass('was-validated');
            return false;
        }
        else if (!phonePattern.test(phone)) {
            registerForm.addClass('was-validated');
            return false;
        }
        else if (!passwordPattern.test(password)) {
            registerForm.addClass('was-validated');
            return false;
        }
        // All validations passed, return true
        else {
            return true;
        }
    }

    /**
     * This function will be called when the title matches the register page.
     *
     */
    function DisplayRegisterPage(){
        console.log("DisplayRegisterPage() called...")

        let registerForm = $("#register-form");

        $("#register-button").on("click", function(event){

            event.preventDefault(); // Prevent the default form submission behavior

            // Invalid form
            if(!validateRegisterForm()) {
                registerForm.addClass('was-validated');

            // Valid
            } else {

                // Fetch the valid data from form
                let firstname = ($("#firstName").val() as string ?? "").trim();
                let lastname = ($("#lastName").val() as string ?? "").trim();
                let username = ($("#username").val() as string ?? "").trim();
                let email = ($("#email").val() as string ?? "").trim();
                let phone = ($("#phone").val() as string ?? "").trim();
                let password = ($("#password").val() as string ?? "").trim();


                // Create a user object with it for future storage into users.JSON.
                let newlyRegisteredUser = new User(firstname, lastname, username, email, phone, password);

                // Add to session storage to test functionality.
                //sessionStorage.setItem("user", newlyRegisteredUser.serialize());

                // Redirect login page with register in url
                location.href = "/home#registerSuccess";
            }
        });
    }

    /**
     * This function will be called when the title matches the events page.
     *
     */
    function DisplayEventsPage() {
        console.log("DisplayEventsPage() called...");

        fetch('/data/events.json')
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector('.row');
                // Access the 'events' array within the JSON
                const events = data.events;

                // Defining an interface data type for typescript
                interface EventItem {
                    image: string;
                    month: string;
                    day: string;
                    title: string;
                    subtitle: string;
                    learnMoreLink: string;
                }
                // For each event item in the json create an event card with the data
                events.forEach((item : EventItem) => {
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
                    if (container instanceof HTMLElement) { // Ensure container is HTMLElement
                        container.appendChild(card);
                    }
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    /**
     * GalleryItem interface to define a data. For typescript defintions.
     */
    interface GalleryItem {
        image: string;
        title: string;
    }
    /**
     * This function will be called when the title matches the gallery page.
     *
     */
    function DisplayGalleryPage() {
        fetch('/data/gallery.json')

            .then(response => response.json())
            .then(data => {
                const container = document.querySelector('#dynamic-gallery-container');

                data.gallery.forEach((item : GalleryItem, index : GalleryItem) => {
                    // Use Bootstrap's grid system to allocate 4 columns per item for medium devices and up
                    const col = document.createElement('div');
                    col.className = 'col-12 col-md-4 mb-4';
                    col.innerHTML = `
                <a class="gallery-item"
                 data-index="${index}" data-image="${item.image}" data-caption="${item.title}">
                    <img src="${item.image}" class="img-fluid" alt="${item.title}">
                </a>
            `;
                    if (container != null){
                        container.appendChild(col);
                    }
                });

                setupLightboxModal(data.gallery);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    /**
     * This function sets up the lightbox modal for the gallery page
     * @param galleryItems
     */
    function setupLightboxModal(galleryItems : GalleryItem[]) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function (this: HTMLElement, e:Event) {
                e.preventDefault();
                const index:number = parseInt(this.getAttribute('data-index')!);
                updateCarousel(index, galleryItems);
                $('#lightbox-modal').modal('show');
            });
        });

        // Fullscreen toggle buttons
        const enlargeBtn = document.querySelector('.btn-fullscreen-enlarge')!;
        const exitBtn = document.querySelector('.btn-fullscreen-exit')!;
        const modalDialog = document.querySelector('#lightbox-modal .modal-dialog')!;

        enlargeBtn.addEventListener('click', function() {
            modalDialog.classList.add('modal-fullscreen');
            enlargeBtn.classList.add('d-none');
            exitBtn.classList.remove('d-none');
        });

        exitBtn.addEventListener('click', function() {
            modalDialog.classList.remove('modal-fullscreen');
            enlargeBtn.classList.remove('d-none');
            exitBtn.classList.add('d-none');
        });

        // Ensure the carousel is reset when the modal is closed
        $('#lightbox-modal').on('hidden.bs.modal', function () {
            modalDialog.classList.remove('modal-fullscreen');
            enlargeBtn.classList.remove('d-none');
            exitBtn.classList.add('d-none');
        });
    }

    /**
     * Updates the image in the carousel
     * @param selectedIndex
     * @param galleryItems
     */
    function updateCarousel(selectedIndex: number, galleryItems: GalleryItem[]) {
        const indicatorsContainer = document.querySelector('#lightboxCarousel .carousel-indicators');
        const innerContainer = document.querySelector('#lightboxCarousel .carousel-inner');

        if (!indicatorsContainer || !innerContainer) {
            console.error('Could not find carousel containers.');
            return;
        }
        // Reset carousel content
        indicatorsContainer.innerHTML = '';
        innerContainer.innerHTML = '';

        // Generate new carousel content
        galleryItems.forEach((item, index) => {
            const activeClass = index === selectedIndex ? 'active' : '';

            // Indicators
            indicatorsContainer.innerHTML += `
            <button type="button" data-bs-target="#lightboxCarousel" data-bs-slide-to="${index}" class="${activeClass}" aria-current="${activeClass ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>
        `;

            // Slides
            innerContainer.innerHTML += `
            <div class="carousel-item ${activeClass}">
                <img src="${item.image}" class="d-block img-fluid vw-100" alt="${item.title}">
                <div class="carousel-caption d-none d-md-block">
                    <p>${item.title}</p>
                </div>
            </div>
        `;
        });
    }

    /**
     *
     */
    function DisplayStatsPage(){

        async function fetchDataGeneric(jsonPath : string, arrayName : string): Promise<number[]> {
            try {

                // AWAIT (pause) the function until data is fetched from the json
                const response = await fetch(jsonPath);
                const data = await response.json();

                const targetArray = data[arrayName];

                // If our data traffic data is not empty and is of type array, set the array of data values
                // for the chart equal to the array of data values in the JSON.
                if (Array.isArray(targetArray) && targetArray.length > 0) {
                    const fromJSONData = targetArray[0];
                    const Data: number[] = Object.values(fromJSONData);
                    return Data;
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                return []; // Return empty array as fallback
            }
        }

        // Function to fetch data from the JSON file
        /*async function fetchData(): Promise<number[]> {
            try {

                // AWAIT (pause) the function until data is fetched from the json
                const response = await fetch('/data/statsData.json');
                const data = await response.json();

                // If our data traffic data is not empty and is of type array, set the array of data values
                // for the chart equal to the array of data values in the JSON.
                if (Array.isArray(data.traffic) && data.traffic.length > 0) {
                    const monthlyTraffic = data.traffic[0];
                    const trafficData: number[] = Object.values(monthlyTraffic);
                    return trafficData;
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                return []; // Return empty array as fallback
            }
        }*/

        // Function to update the chart with fetched data
        async function updateChart(jsonPath: string, arrayName: string, chartToUpdate: Chart) {
            const data = await fetchDataGeneric(jsonPath, arrayName);
            if (data.length > 0 && chartToUpdate.data && chartToUpdate.data.datasets) {
                chartToUpdate.data.datasets[0].data = data;
                chartToUpdate.update();
            }
        }

        const ctx = document.getElementById('myChart') as HTMLCanvasElement;

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'February', 'March', 'April', 'May', 'June',
                         'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'Monthly Website Traffic',
                    data: [], // Populates dynamically from our statsData.Json
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)',
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)'
                    ],
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        // Update the chart with fetched data
        updateChart('/data/statsData.json', 'traffic', chart);

        const ctx2 = document.getElementById('myChart2') as HTMLCanvasElement;
        const chart2 = new Chart(ctx2, {
            type: 'polarArea',
            data: {
                labels: ['Gym Sports', 'Arts/Crafts', 'Outdoor Sports', 'Classes', 'Meeting Space', 'Clubs'],
                datasets: [{
                    label: 'User Usage Distribution',
                    data: [], // Populates dynamically from our statsData.Json
                    backgroundColor: [
                        'rgba(66,58,60,0.2)',
                        'rgba(150,64,255,0.21)',
                        'rgba(25,138,4,0.2)',
                        'rgba(255,0,109,0.2)',
                        'rgba(9,145,239,0.22)',
                        'rgba(189,88,15,0.2)',
                    ],
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        updateChart('/data/statsData.json', 'userUsage', chart2);

        async function fetchAndUpdateChart(chart: Chart) {
            try {
                const response = await fetch('/data/events.json');
                const jsonData = await response.json();

                const labels = jsonData.events.map((event: any) => event.title);
                const data = jsonData.events.map((event: any) => event.signUps);

                if (chart.data.datasets && chart.data.datasets.length > 0) {
                    chart.data.labels = labels;
                    chart.data.datasets.forEach((dataset) => {
                        dataset.data = data;
                    });
                    chart.update();
                } else {
                    console.error('Dataset is undefined or empty.');
                }
            } catch (error) {
                console.error('Error fetching or updating chart data:', error);
            }
        }

        const ctx3 = document.getElementById('myChart3') as HTMLCanvasElement;
        const chart3 = new Chart(ctx3, {
            type: 'line',
            data: {

                labels:  [], // Populates dynamically with the last
                datasets: [{
                    label: 'Event Sign-Ups',
                    data: [],
                    fill: false,// Populates dynamically from our statsData.Json
                    borderColor: 'rgb(75, 192, 192)',
                    lineTension: 0.1,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        fetchAndUpdateChart(chart3);
    }
    /**
     * A function that calls when the website starts. Will handle page detection logic, using a switch to check the
     * given page's title, and call it's relevant DisplayFunction().
     * @return none
     */
    function Start() {
        console.log("App Started...");

        /**
         * This is the section for the search function. This fires whenever an input is entered in the search bar.
         * It will loop through the content element of the contentIndex.Json for matching words and populate the
         * search drop down with the pages that have matching words.
         */
        $("#search-input").on("input", function() {

            const query: string = $(this).val()?.toString().toLowerCase() || '';
            const resultsContainer: JQuery<HTMLElement> = $("#search-dropdown");

            // If the query is empty, reset the child <li> elements and hide the <ul> parent because it's empty.
            if (query === '') {
                resultsContainer.empty().hide();
                return;
            }
            // Use an ajax request to fetch the contentIndex.json
            $.ajax({
                url: '/data/contentIndex.json',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    // Access the 'content' array from the response
                    const data = response.content;
                    // Check if 'data' is an array before filtering
                    if (Array.isArray(data)) {
                        // Filter the content element to finding matching "queries"
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

        // get the page id that the router is passing in through the ejs variable
        let page_id = $("body")[0].getAttribute("id"); // body tags are in an array in the dom

        CheckLogin();

        // use the page id to determine which JS display function to call
        switch(page_id){
            case "home":
                DisplayHomepage();
                break;
            case "events":
                DisplayEventsPage();
                break;
            case "contact":
                DisplayContactUsPage();
                break;
            case "portfolio":
                DisplayPortfolioPage();
                break;
            case "gallery":
                DisplayGalleryPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "news":
                DisplayNewsPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "services":
                DisplayServicesPage();
                break;
            case "team":
                DisplayTeamPage();
                break;
            case "stats":
                DisplayStatsPage();
                break;
        }
    }
    window.addEventListener("load", Start);
})()