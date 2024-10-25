/*
Names: Brody Dentinger and Muhammad Yasir Patel
Student IDs: 100561604 and 100854895
Date: January 26, 2024
File: main.js
Description: Main javascript file for Harmony Hub.
*/
"use strict";
// IIFE
(function () {
    /**
     * Authguard references path name, and if it's in the protected_routes, redirects to the login page.
     *
     */
    function AuthGuard() {
        let protected_routes = ["/stats", "/event_planning"];
        if (protected_routes.indexOf(location.pathname) > -1) { //reads path name everything after the port number
            if (!sessionStorage.getItem("user")) {
                location.href = "/login";
            }
        }
    }
    /**
     * This function will check the rating given by the user, and based on that rating, provide feedback.
     *
     */
    function CheckRating() {
        // Define the message area div for validation messages.
        let messageArea = $("#feedbackReasonMessage");
        // This gets the value of the checked radio button, which corresponds to the number of stars
        let ratingValue = $('input[type="radio"][name="rating"]:checked').val();
        // If it's 5
        if (ratingValue === "5") {
            $.get("./five_star.html", function (html_data) {
                // Insert the loaded content into the modal
                messageArea.addClass("alert alert-info").text(html_data);
            });
            // Use setTimeout to clear the message after 3 seconds
            setTimeout(function () {
                messageArea.text("").removeClass("alert alert-info");
            }, 3000);
        }
        if (ratingValue !== "5") {
            messageArea.addClass("alert alert-info").text("We are really sorry you did not have a 5 star experience. " +
                "We appreciate your feedback.");
            // Use setTimeout to clear the message after 3 seconds
            setTimeout(function () {
                messageArea.text("").removeClass("alert alert-info");
            }, 3000);
        }
    }
    /**
     * This function will check if there is a user stored in local storage, and if so, dynamically alter the
     * navbar to include the username of the logged in user. Also assigns a click event to the logout button.
     *
     */
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            // create a user object container
            let user = new User;
            // Fetch the session storage with the key User (as we've stored it from the login page function)
            let userKey = sessionStorage.getItem("user");
            let username = "";
            // Deserialize that string and pass its values into our user object.
            if (userKey != null) {
                const user = JSON.parse(userKey);
                // Access the user's first name
                username = user.firstName;
            }
            // Modify the login button to show the user's name and add a dropdown for logout
            $('#login').replaceWith(`
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" 
                    data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-regular fa-user"></i> ${username}
                </a>
                <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="userDropdown">
                    <li><a class ="dropdown-item" href = "/update">Update</a></li>
                    <li><a class="dropdown-item" href="#" id="logout">Logout</a></li>
                </ul>
            </li>
        `);
            // Modify the empty statistics link to include the link and label
            $('#statsLink').replaceWith(`
            <li id = "statsLink" class="nav-item">
                <a class="nav-link" href="/stats"><i class="fa-solid fa-chart-line"></i> Statistics</a>
            </li>
        `);
        }
        $("#logout").on("click", function () {
            sessionStorage.clear();
            location.href = "/login";
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
        if ($("#search-input").val() == "") {
            resultsContainer.children().empty();
        }
        if (results.length > 0) {
            // There are results, construct the list items and make the dropdown visible
            results.forEach(result => {
                $('<li>').html(`<a href="${result.url}">${result.title}</a></li>`).appendTo(resultsContainer);
            });
            resultsContainer.css('display', 'block'); // Make the dropdown visible
        }
        else {
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
        if (window.location.href.includes("loginSuccess")) {
            // create a user object container
            let user = new User;
            // Fetch the session storage with the key User (as we've stored it from the login page function)
            let userKey = sessionStorage.getItem("user");
            // Deserialize that string and pass its values into our user object.
            user.deserialize(userKey);
            // Deserialize the string and parse it into an object
            user = JSON.parse(userKey);
            // Access the "firstName" property of the user object
            const firstName = user.firstName;
            // Query the login message div and add our welcome message
            $("#loginMessage").addClass("messageBox").text("Welcome " + firstName + "!");
            // Use setTimeout to clear the message after 3 seconds
            setTimeout(function () {
                $("#loginMessage").text("").removeClass();
            }, 5000);
        }
        // If a user has navigated here after successfully updating their information
        if (window.location.href.includes("updatedSuccess")) {
            // Query the login message div and add our welcome message
            $("#loginMessage").addClass("messageBox").text("Update Success.");
            // Use setTimeout to clear the message after 3 seconds
            setTimeout(function () {
                $("#loginMessage").text("").removeClass();
            }, 5000);
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
    /**
     * A function that calls when the title is "Portfolio". Will handle all relevant logic to the portfolio page.
     * @return none
     */
    function DisplayPortfolioPage() {
        console.log("Called DisplayPortfolioPage...");
        // START DYNAMIC PORTFOLIO.HTML, PROJECT CARD POPULATION SECTION ------------------------------------
        // Initialize the project card objects to be stored in the array.
        const project1 = new Project("Day Drop In", "General community drop-in, all ages", "/assets/images/project1image.png");
        const project2 = new Project("Kids Sports Day", "Youth drop in for all sports.", "/assets/images/project2image.png");
        const project3 = new Project("Hiking Adventure", "Community hike of the trails.", "/assets/images/project3image.png");
        const project4 = new Project("Community Social", "Social with music, drinks, and snacks.", "/assets/images/project4image.jpg");
        const project5 = new Project("Tennis Club", "Bi-Weekly tennis club.", "/assets/images/project5image.jpg");
        const project6 = new Project("Pilates in the Park", "Workout and push each other!", "/assets/images/project6image.jpg");
        const project7 = new Project("Basketball Tournament", "Above 16 Basketball.", "/assets/images/project7image.jpg");
        const project8 = new Project("Sunset Mediation", "Led by a talented practitioner.", "/assets/images/project8image.jpg");
        const project9 = new Project("Yoga", "Led by a talented practitioner.", "/assets/images/project9image.jpg");
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
        const newsArticle1 = new NewsArticle("Introduction to Harmony Hub!", "/assets/images/news1image.png", "Jane Doe", "January 15, 2024", "Learn about the exciting classes, services, and clubs we offer here." +
            "We offer a wide array of community driven adventures and experiences!", "More.");
        const newsArticle2 = new NewsArticle("Harmony Hub Community Event", "/assets/images/news2image.jpg", "John Smith", "February 20, 2024", "Join us for a day of community bonding and fun activities at Harmony Hub! We'll have " +
            "workshops, games, and delicious food. Don't miss out on this exciting event.", "https://example.com/news2");
        // Append them to the array.
        newsArticle1.pushObjectToArray();
        newsArticle2.pushObjectToArray();
        //let NewsArticlesToRender = 10;
        // Loop through the array and add the items to our HTML structure in news.html.
        for (let i = 0; i < NewsArticle.NewsArticlesArray.length; i++) {
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
            $(document).on("click", "#feedbackFormBtn", function (event) {
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
            $(document).on("click", "#feedbackFormCloseBtn", function () {
                CheckRating();
                // Reset the form's contents to default... Request from original file.
                $.get("/feedback_form", function (html_data) {
                    $("#feedbackModal").html(html_data);
                });
            });
        });
        let map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        // Form constant
        const contactForm = document.getElementById("contactForm");
        // Constant for the first modal popup body which is the one that shows the form inputs
        const modalBody = document.getElementById("modal-body");
        // First modal pop up confirm button
        const looksGoodButton = document.getElementById("contactUsModalButton");
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
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission
            // Check if the form inputs are valid
            if (!contactForm.checkValidity()) {
                // If the form is not valid, add was-validated class to show Bootstrap's validation feedback
                contactForm.classList.add('was-validated');
            }
            else {
                // If the form is valid, process the form data
                console.log("Form is valid. Submitting...");
                const userNameElement = document.getElementById("userName");
                const userName = userNameElement.value;
                const emailElement = document.getElementById("email");
                const email = emailElement.value;
                const subjectElement = document.getElementById("subject");
                const subject = subjectElement.value;
                const messageElement = document.getElementById("message");
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
            const countdownElement = document.getElementById('countdown');
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
    function DisplayLoginPage() {
        console.log("DisplayLoginPage() called...");
        // Define the message area div for validation messages.
        let messageArea = $("#messageArea");
        // Handle if a successful registration occured
        if (window.location.href.includes("registerSuccess")) {
            messageArea.addClass("alert alert-success").text("Successful Registration");
        }
        // Fetch button with jquery
        $("#login-button").on("click", function () {
            const usernameInput = $("#username").val();
            const passwordInput = $("#password").val();
            // If fields are empty, don't waste compute power.
            if (usernameInput !== "" && passwordInput !== "") {
                let success = false;
                let newUser = new User();
                // Reset message area.
                messageArea.removeClass("").text("");
                fetch('/authUserDB', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userName: usernameInput, password: passwordInput }),
                })
                    .then(response => response.json())
                    .then(data => {
                    if (data.message === 'Authentication successful') {
                        console.log('Authenticated successfully.');
                        const user = data.user;
                        const firstName = user.firstName; // Assuming firstName is the property containing the first name
                        sessionStorage.setItem("user", JSON.stringify(user)); // Store entire user object
                        sessionStorage.setItem("firstName", firstName); // Store first name separately
                        location.href = "/home#loginSuccess";
                    }
                    else {
                        console.error('Failed to authenticate user.');
                        messageArea.addClass("alert alert-danger").text("Error: Invalid Credentials");
                    }
                })
                    .catch(error => {
                    console.error('Error updating event:', error);
                });
            }
            // No credentials provided
            else {
                messageArea.addClass("alert alert-danger").text("Error: Please provide credentials.");
            }
        });
    }
    /**
     *  This function validates the registration form using regex patterns that match the patterns stipulated
     *  by the html registration page. Returns true if all fields are valid, false otherwise.
     * @return {boolean}
     */
    function validateRegisterForm() {
        // Defining regex patterns to match the ones in HTML input fields
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,30}$/;
        const firstName = $("#firstName").val().trim();
        const lastName = $("#lastName").val().trim();
        const username = $("#username").val().trim();
        const email = $("#email").val().trim();
        const phone = $("#phone").val().trim();
        const password = $("#password").val().trim();
        const registerForm = $("#register-form");
        if (!firstName) {
            registerForm.addClass('was-validated');
            return false;
        }
        if (!lastName) {
            registerForm.addClass('was-validated');
            return false;
        }
        if (username.length < 5) {
            registerForm.addClass('was-validated');
            return false;
        }
        if (!emailPattern.test(email)) {
            registerForm.addClass('was-validated');
            return false;
        }
        if (!phonePattern.test(phone)) {
            registerForm.addClass('was-validated');
            return false;
        }
        if (!passwordPattern.test(password)) {
            registerForm.addClass('was-validated');
            return false;
        }
        // All validations passed, return true
        return true;
    }
    /**
     * This function will be called when the title matches the register page.
     *
     */
    function DisplayRegisterPage() {
        console.log("DisplayRegisterPage() called...");
        let registerForm = $("#register-form");
        $("#register-button").on("click", function (event) {
            event.preventDefault(); // Prevent the default form submission behavior
            // Invalid form
            if (!validateRegisterForm()) {
                registerForm.addClass('was-validated');
                console.log("Invalid data....");
                // Valid
            }
            else {
                console.log("Valid data....");
                // Fetch the valid data from form
                let firstname = ($("#firstName").val() ?? "").trim();
                let lastname = ($("#lastName").val() ?? "").trim();
                let username = ($("#username").val() ?? "").trim();
                let email = ($("#email").val() ?? "").trim();
                let phone = ($("#phone").val() ?? "").trim();
                let password = ($("#password").val() ?? "").trim();
                // Fetch route endpoint and pass in valid data
                fetch('/registerUserDB', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userName: username,
                        lastName: lastname,
                        firstName: firstname,
                        Email: email,
                        Phone: phone,
                        Password: password }),
                })
                    .then(response => {
                    if (response.ok) {
                        console.log('User registered successfully');
                        // Redirect login page with register in url
                        location.href = "/login#registerSuccess";
                    }
                    else {
                        console.error('Failed to register user');
                    }
                })
                    .catch(error => {
                    console.error('Error registering user:', error);
                });
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
            // For each event item in the json create an event card with the data
            events.forEach((item) => {
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
     * This function will be called when the title matches the gallery page.
     *
     */
    function DisplayGalleryPage() {
        fetch('/data/gallery.json')
            .then(response => response.json())
            .then(data => {
            const container = document.querySelector('#dynamic-gallery-container');
            data.gallery.forEach((item, index) => {
                // Use Bootstrap's grid system to allocate 4 columns per item for medium devices and up
                const col = document.createElement('div');
                col.className = 'col-12 col-md-4 mb-4';
                col.innerHTML = `
                <a class="gallery-item"
                 data-index="${index}" data-image="${item.image}" data-caption="${item.title}">
                    <img src="${item.image}" class="img-fluid" alt="${item.title}">
                </a>
            `;
                if (container != null) {
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
    function setupLightboxModal(galleryItems) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const index = parseInt(this.getAttribute('data-index'));
                updateCarousel(index, galleryItems);
                $('#lightbox-modal').modal('show');
            });
        });
        // Fullscreen toggle buttons
        const enlargeBtn = document.querySelector('.btn-fullscreen-enlarge');
        const exitBtn = document.querySelector('.btn-fullscreen-exit');
        const modalDialog = document.querySelector('#lightbox-modal .modal-dialog');
        enlargeBtn.addEventListener('click', function () {
            modalDialog.classList.add('modal-fullscreen');
            enlargeBtn.classList.add('d-none');
            exitBtn.classList.remove('d-none');
        });
        exitBtn.addEventListener('click', function () {
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
    function updateCarousel(selectedIndex, galleryItems) {
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
     * This function handles editing calendar events clicked from the calendar.
     * Consolidates event data, fetches JSON, and updates that event in the JSON.
     * @param event the clicked event from the calendar
     * @param events the events from the db fetch (all calendar events in json format)
     *
     */
    function EditEventButton(event, events) {
        let editModal = document.getElementById('editEventModal');
        let modal = document.getElementById('viewEventModal');
        const editButton = modal.querySelector('.edit-event-button');
        let user = new User;
        let userKey = sessionStorage.getItem("user");
        let username = ""; // Initialize username
        if (userKey !== null) {
            const userData = JSON.parse(userKey);
            username = userData.firstName;
        }
        let feedbackMessageArea = modal.querySelector('#feedbackMessage');
        editButton.onclick = function () {
            console.log("Event owner: " + event.owner);
            console.log("Username from session " + username);
            // User owns event
            if (event.owner == username) {
                let editEventTitle = editModal.querySelector('.editEventTitle');
                let editEventStart = editModal.querySelector('.editEventStart');
                let editEventEnd = editModal.querySelector('.editEventEnd');
                // Populate form fields with event data
                editEventTitle.value = event.title;
                const startDate = new Date(event.start);
                const year = startDate.getFullYear();
                const month = String(startDate.getMonth() + 1).padStart(2, '0');
                const day = String(startDate.getDate()).padStart(2, '0');
                const hours = String(startDate.getHours()).padStart(2, '0');
                const minutes = String(startDate.getMinutes()).padStart(2, '0');
                const startDateString = `${year}-${month}-${day}T${hours}:${minutes}`;
                editEventStart.value = startDateString;
                editEventEnd.value = event.end;
                let modalInstance = new bootstrap.Modal(editModal);
                modalInstance.show();
                // Add event listener for form submission
                let deleteButton = editModal.querySelector('.saveChangesButton');
                deleteButton.onclick = function () {
                    // Extract values from input fields
                    const newTitle = editEventTitle.value;
                    const newStart = editEventStart.value;
                    const newEnd = editEventEnd.value;
                    // fetch the deleteEvent endpoint
                    fetch('/updateEventDB', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        // pass the clicked event's id, as well as all the new data from the user's form to the route
                        body: JSON.stringify({ eventId: event.id,
                            eventsFromDb: events,
                            newStart: newStart,
                            newTitle: newTitle,
                            newEnd: newEnd }),
                    })
                        .then(response => {
                        if (response.ok) {
                            console.log('Event updated successfully');
                            location.href = "/event_planning";
                        }
                        else {
                            console.error('Failed to update event');
                        }
                    })
                        .catch(error => {
                        console.error('Error updating event:', error);
                    });
                };
            }
            // User doesn't own event
            else {
                feedbackMessageArea.classList.add("modalAlertMessage");
                feedbackMessageArea.classList.add("alert");
                feedbackMessageArea.classList.add("alert-danger");
                feedbackMessageArea.textContent = "You don't own this event!";
                feedbackMessageArea.style.display = "block"; // Show the message
                setTimeout(function () {
                    feedbackMessageArea.style.display = "none";
                }, 3000);
            }
        };
    }
    /**
     * This function handles attending calendar events clicked from the calendar.
     * Consolidates event data, fetches JSON, and updates that event in the JSON.
     * @param event the clicked event from the calendar.
     *
     */
    function AttendEventButton(event) {
        const modal = document.getElementById('viewEventModal');
        const attendButton = modal.querySelector('.attend-event-button');
        let user = new User();
        const userKey = sessionStorage.getItem("user");
        if (userKey != null) {
            user.deserialize(userKey);
        }
        const username = user.firstName;
        attendButton.onclick = function () {
            // Fetch the current list of all events
            fetch('/data/calendarEvent.json')
                .then(response => response.json())
                .then((allEvents) => {
                // Find the event being updated in the array of all events
                const eventIndex = allEvents.findIndex(e => e.id === event.id);
                if (eventIndex !== -1) {
                    // Determine if the user is already attending the event
                    const isAttending = allEvents[eventIndex].attendees.includes(username);
                    // Update the attendance status
                    if (!isAttending) {
                        allEvents[eventIndex].attendees.push(username); // Add to attendees
                    }
                    else {
                        const attendeeIndex = allEvents[eventIndex].attendees.indexOf(username);
                        allEvents[eventIndex].attendees.splice(attendeeIndex, 1); // Remove from attendees
                    }
                    // Update the JSON file with the modified list of events
                    return fetch('/updateEvents', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(allEvents), // Send the updated array of events
                    });
                }
                else {
                    throw new Error('Event not found in the list');
                }
            })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update event');
                }
                console.log('Event attendance updated successfully');
                // Provide feedback to the user
                if (!event.attendees.includes(username)) {
                    console.log('User added to attendees successfully');
                    $('#successModal').modal('show');
                }
                else {
                    console.log('User removed from attendees successfully');
                    $('#unattendSuccessModal').modal('show');
                }
            })
                .catch(error => {
                console.error('Error updating events:', error);
            });
        };
    }
    /**
     * This function handles deleting calendar events clicked from the calendar.
     * Consolidates event data, fetches JSON, and updates that event in the JSON.
     * @param event the clicked event from the calendar.
     *
     */
    function DeleteEventButton(event) {
        let modal = document.getElementById('viewEventModal');
        let deleteButton = modal.querySelector('.delete-event-button');
        let feedbackMessageArea = modal.querySelector('#feedbackMessage');
        let user = new User;
        let userKey = sessionStorage.getItem("user");
        let username = ""; // Initialize username
        if (userKey !== null) {
            const userData = JSON.parse(userKey);
            username = userData.firstName;
        }
        // Add event listener to delete button
        deleteButton.onclick = function () {
            // Only proceed if the logged-in username matches the event's owner
            if (event.owner == username) {
                // fetch the deleteEvent endpoint
                fetch('/deleteEventDB', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // pass the clicked event's id in the body of this request
                    body: JSON.stringify({ eventId: event.id })
                })
                    .then(response => {
                    if (response.ok) {
                        console.log('Event deleted successfully');
                        location.href = "/event_planning";
                    }
                    else {
                        console.error('Failed to delete event');
                    }
                })
                    .catch(error => {
                    console.error('Error deleting event:', error);
                });
            }
            // THe user clicking the event is NOT the owner
            else {
                feedbackMessageArea.classList.add("modalAlertMessage");
                feedbackMessageArea.classList.add("alert");
                feedbackMessageArea.classList.add("alert-danger");
                feedbackMessageArea.textContent = "You don't own this event!";
                feedbackMessageArea.style.display = "block"; // Show the message
                setTimeout(function () {
                    feedbackMessageArea.style.display = "none";
                }, 3000);
            }
        };
    }
    /**
     * This function displays the clicked event from the calendar in a modal with further options.
     * @param event The clicked event from the calendar.
     * @param events the events from the db fetch. (all calendar events in JSON format)
     */
    function displayEventModal(event, events) {
        // Get the modal element
        let modal = document.getElementById('viewEventModal');
        // Check if the modal exists
        if (modal != null) {
            let eventTitle = modal.querySelector('.modal-title');
            let eventID = modal.querySelector('.modal-id');
            let eventOwner = modal.querySelector('.modal-owner');
            let eventAttendees = modal.querySelector('.modal-attendees');
            let eventDate = modal.querySelector('.modal-date');
            let attendButton = modal.querySelector('.attend-event-button');
            const feedbackMessageArea = modal.querySelector('#feedbackMessage');
            // Our time is stored in ISO 8601 format. Must convert to local time
            const inputTimeISO = event.start;
            // Convert the input string to a Date object
            const inputTime = new Date(inputTimeISO);
            // Convert the time to Eastern Daylight Time (EDT)
            const convertedTime = inputTime.toLocaleString('en-US', { timeZone: 'America/New_York' });
            // Get the username of user interacting with the form
            let user = new User;
            let userKey = sessionStorage.getItem("user");
            if (userKey != null) {
                user.deserialize(userKey);
            }
            let username = user["firstName"];
            const isUserAttending = event.attendees.includes(username);
            if (isUserAttending) {
                attendButton.textContent = "Unattend";
            }
            else {
                attendButton.textContent = "Attend";
            }
            // Set the title and other information in the modal
            eventTitle.textContent = event.title;
            eventID.textContent = event.id;
            eventOwner.textContent = event.owner;
            eventDate.textContent = convertedTime;
            eventAttendees.textContent = event.attendees.length.toString();
            DeleteEventButton(event);
            AttendEventButton(event);
            EditEventButton(event, events);
            // Show the modal
            // @ts-ignore
            let modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
        }
        else {
            console.error('Modal element not found.');
        }
    }
    /**
     * Async function that calls the route to fetch all calendar events from the db.
     *  Will await the response
     *  For calling in the switch when the route event_planning page is called
     *      Eg. event_planning url requested
     *          call this async function to fetch all calendar events from db
     *          pass the response data to the DisplayEventPlanningPage
     *          Use that data (which is JSON formatted calendar events), to the FullCalendar initialization.
     *
     */
    async function GetEventsFromDB() {
        // Use the route to do a calendar.find() to fetch all calendar events from the db.
        const res = await fetch("/populate_events");
        // Return the response from the json
        return await res.json();
    }
    /**
     * This is a function called on request of the event planning page.
     *
     */
    function DisplayEventPlanningPage(events) {
        console.log("DisplayEventPlanning() called...");
        let calendarEl = document.getElementById('calendar');
        let calendar = null;
        console.log(events);
        // @ts-ignore
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            initialDate: Date.now(),
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            // pulling the event info from the json
            events: events,
            // This is the clickable action on click of events
            eventClick: function (info) {
                // Fetch the JSON data associated with the events
                // Find the event data with matching ID
                let clickedEventData = events.find((event) => event.id == info.event.id);
                // Actions to occur if a record has been found matching the clicked event's ID
                if (clickedEventData) {
                    // Render the modal with event information
                    console.log(clickedEventData.owner);
                    console.log(clickedEventData.id);
                    console.log(clickedEventData.attendees);
                    // info.event holds the event object
                    // Pass the clicked event data, as well as the events that have all been fetched from the DB
                    displayEventModal(clickedEventData, events);
                }
                else {
                    console.log("No records found.");
                }
            }
        });
        calendar.render();
        // Handle form submission
        $('#addEventForm').on("submit", function (event) {
            event.preventDefault(); // Prevent the form from submitting normally
            // Get the username of user interacting with the form
            let user = new User;
            let userKey = sessionStorage.getItem("user");
            let username = ""; // Initialize username
            if (userKey !== null) {
                const userData = JSON.parse(userKey);
                username = userData.firstName;
            }
            // Extract data from form
            let title = $('#eventTitle').val();
            let owner = username;
            // Assuming the date strings are in 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:MM' format
            let startInput = $('#eventStart').val();
            let endInput = $('#eventEnd').val();
            // Convert string to Date objects
            let start = new Date(startInput);
            let end = new Date(endInput);
            // Convert dates to ISO 8601 format
            /*let isoStart: string = start.toISOString();
            let isoEnd: string = end.toISOString();*/
            let description = "Event Description";
            console.log("owner client-side" + username);
            // Format the data
            const eventData = {
                title: title,
                owner: username,
                eventStart: start,
                eventEnd: end,
                eventDescription: description
            };
            // Make a POST request using fetch to the addEvent endpoint (will contact db)
            fetch('/addEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add event');
                }
                // Handle successful response
                console.log('Event added successfully');
            })
                .catch(error => {
                console.error('Error adding event:', error);
            });
            // Close the modal
            $('#addEventModal').modal('hide');
            let addEventForm = $('#addEventForm')[0];
            // Clear form fields
            addEventForm.reset();
            // refresh the page for calendar re-render
            location.href = "/event_planning";
        });
        calendar.render();
    }
    /**
     * Scripts specific to the stats page
     */
    function DisplayStatsPage() {
        /**
         * Fetches an array of numbered data from a json file to be used to update a chart.js chart object
         * @param jsonPath the path of the json file to be fetched
         * @param arrayName the name of the array in the json to be accessed
         * @returns Data an array of numbers returned from the json file
         */
        async function fetchDataGeneric(jsonPath, arrayName) {
            try {
                // AWAIT (pause) the function until data is fetched from the json
                const response = await fetch(jsonPath);
                const data = await response.json();
                const targetArray = data[arrayName];
                // If our data traffic data is not empty and is of type array, set the array of data values
                // for the chart equal to the array of data values in the JSON.
                if (Array.isArray(targetArray) && targetArray.length > 0) {
                    const fromJSONData = targetArray[0];
                    const Data = Object.values(fromJSONData);
                    return Data;
                }
                else {
                    throw new Error('Invalid data format');
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
                return []; // Return empty array as fallback
            }
        }
        /**
         * Updates a chart.js Chart object by calling fetchDataGeneric(), which fetches data from a json file,
         * and uses it to update the chart's data values.
         * @param jsonPath the path to the json resource to fetch
         * @param arrayName the name of the array you are accessing from the json
         * @param chartToUpdate the chart.js Chart object to update with the json Data
         */
        async function updateChart(jsonPath, arrayName, chartToUpdate) {
            const data = await fetchDataGeneric(jsonPath, arrayName);
            if (data.length > 0 && chartToUpdate.data && chartToUpdate.data.datasets) {
                chartToUpdate.data.datasets[0].data = data;
                chartToUpdate.update();
            }
        }
        const ctx = document.getElementById('myChart');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                        label: 'Monthly Website Traffic',
                        data: [],
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
        const ctx2 = document.getElementById('myChart2');
        const chart2 = new Chart(ctx2, {
            type: 'polarArea',
            data: {
                labels: ['Gym Sports', 'Arts/Crafts', 'Outdoor Sports', 'Classes', 'Meeting Space', 'Clubs'],
                datasets: [{
                        label: 'User Usage Distribution',
                        data: [],
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
        /**
         * Asynchronously fetches data from a json file to update BOTH the chart labels and the values.
         * Utilizes map which differentiates it from the generic fetchDataGeneric().
         * @param chart the chart.js chart to update
         */
        async function fetchAndUpdateChart(chart) {
            try {
                const response = await fetch('/data/events.json');
                const jsonData = await response.json();
                const labels = jsonData.events.map((event) => event.title);
                const data = jsonData.events.map((event) => event.signUps);
                if (chart.data.datasets && chart.data.datasets.length > 0) {
                    chart.data.labels = labels;
                    chart.data.datasets.forEach((dataset) => {
                        dataset.data = data;
                    });
                    chart.update();
                }
                else {
                    console.error('Dataset is undefined or empty.');
                }
            }
            catch (error) {
                console.error('Error fetching or updating chart data:', error);
            }
        }
        const ctx3 = document.getElementById('myChart3');
        const chart3 = new Chart(ctx3, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                        label: 'Event Sign-Ups',
                        data: [],
                        fill: false,
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
     * The display update page is primarily for validating the form, and then updating the user's information
     * in the database. Will also refresh the
     *
     */
    function DisplayUpdatePage() {
        console.log("DisplayUpdatePage called... ");
        let updateForm = $("#update-form");
        const userData = sessionStorage.getItem('user');
        if (userData) {
            // Parse user data from JSON
            const user = JSON.parse(userData);
            // Populate form fields with user data
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.LastName;
            document.getElementById('username').value = user.Username;
            document.getElementById('email').value = user.EmailAddress;
            document.getElementById('phone').value = user.PhoneNumber;
        }
        $("#update-info-button").on("click", function (event) {
            event.preventDefault(); // Prevent the default form submission behavior
            // Invalid form
            // @ts-ignore
            if (!validateRegisterForm()) {
                updateForm.addClass('was-validated');
                console.log("Invalid data....");
                // Valid
            }
            else {
                console.log("Valid data....");
                // Fetch the valid data from form
                let firstname = ($("#firstName").val() ?? "").trim();
                let lastname = ($("#lastName").val() ?? "").trim();
                let username = ($("#username").val() ?? "").trim();
                let email = ($("#email").val() ?? "").trim();
                let phone = ($("#phone").val() ?? "").trim();
                let password = ($("#password").val() ?? "").trim();
                const userKey = sessionStorage.getItem("user");
                let _id = null; // Initialize _id as null or with default value
                if (userKey !== null) {
                    const user = JSON.parse(userKey);
                    _id = user._id;
                }
                // Fetch route endpoint and pass in valid data
                fetch('/updateUserDB', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userName: username,
                        userId: _id,
                        lastName: lastname,
                        firstName: firstname,
                        Email: email,
                        Phone: phone,
                        Password: password }),
                })
                    .then(response => {
                    if (response.ok) {
                        console.log('User updated successfully');
                        // Refresh the session with updated user data.
                        sessionStorage.removeItem('user');
                        const updatedUserData = {
                            firstName: firstname,
                            LastName: lastname,
                            Username: username,
                            EmailAddress: email,
                            PhoneNumber: phone,
                            Password: password,
                            _id: _id
                        };
                        sessionStorage.setItem('user', JSON.stringify(updatedUserData));
                        // Redirect login page with register in url
                        location.href = "/home#updatedSuccess";
                    }
                    else {
                        console.error('Failed to register user');
                    }
                })
                    .catch(error => {
                    console.error('Error registering user:', error);
                });
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
        /**
         * This is the section for the search function. This fires whenever an input is entered in the search bar.
         * It will loop through the content element of the contentIndex.Json for matching words and populate the
         * search drop down with the pages that have matching words.
         */
        $("#search-input").on("input", function () {
            const query = $(this).val()?.toString().toLowerCase() || '';
            const resultsContainer = $("#search-dropdown");
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
                    }
                    else {
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
        switch (page_id) {
            case "home":
                DisplayHomepage();
                break;
            case "ourEvents":
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
                AuthGuard();
                DisplayStatsPage();
                break;
            case "event_planning":
                AuthGuard();
                GetEventsFromDB().then(data => {
                    DisplayEventPlanningPage(data);
                });
                break;
            case "update_user":
                AuthGuard();
                DisplayUpdatePage();
                break;
        }
    }
    window.addEventListener("load", Start);
})();
