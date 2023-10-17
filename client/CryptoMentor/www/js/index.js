const baseURL = 'http://localhost:';
const externalApiUrl = "https://api.coingecko.com/api/v3";
let emailAddress;
//const baseURL = '192.128.50.93:';
const port ="3000";
//  page ready
$(document).ready(function () {



    $("#educationalResource").on("click", function () {
        $("body").pagecontainer("change", "#resourcePage", {transition:"slide"});
        const resources = [
            {
                title: "CoinMarketCap",
                description: "A popular platform for tracking cryptocurrency prices, market capitalization, and other market data.",
                link: "https://coinmarketcap.com/"
            },
            {
                title: "CoinGecko",
                description: "Another platform that provides comprehensive cryptocurrency market data, including prices, charts, and market trends..",
                link: "https://www.coingecko.com/"
            },
            {
                title: "Binance Academy",
                description: "An educational platform by Binance that offers a wide range of cryptocurrency and blockchain-related articles, videos, and courses.",
                link: "https://academy.binance.com/en"
            },
            {
                title: "Ethereum.org",
                description: "The official website for Ethereum, a blockchain platform that enables the creation of smart contracts and decentralized applications (dApps).",
                link: "https://ethereum.org/en/"
            },
            {
                title: "CryptoCompare",
                description: "A platform that provides real-time and historical cryptocurrency data, including prices, charts, and market analysis.",
                link: "https://www.cryptocompare.com/"
            }
        ];

        // Generate the HTML for each resource
        const resourcesList = document.getElementById("resources-list");

        resources.forEach(resource => {
            const listItem = document.createElement("li");
            listItem.classList.add("resource");

            const titleElement = document.createElement("h2");
            titleElement.textContent = resource.title;
            listItem.appendChild(titleElement);

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = resource.description;
            listItem.appendChild(descriptionElement);

            const linkElement = document.createElement("p");
            const anchorElement = document.createElement("a");
            anchorElement.href = resource.link;
            anchorElement.textContent = "View Resource";
            linkElement.appendChild(anchorElement);
            listItem.appendChild(linkElement);

            resourcesList.appendChild(listItem);
        });


    });


    $("#realTimeData").on("click", function () {
        $("body").pagecontainer("change", "#cryptoPage", {transition:"slide"});

        loadCoinList()

    });
    $("#portfolio").on("click", function () {
        $("body").pagecontainer("change", "#portfolioPage", {transition:"slide"});


    });

    $("#investmentAdvice").on("click", function () {
        $("body").pagecontainer("change", "#investmentAdvicePage", {transition:"slide"});


    });
    $("#homeLink").on("click", function () {
        let login = localStorage.getItem('isAuthenticated') === 'true';
        if (login) {
        $("body").pagecontainer("change", "#profilePage", {transition: "slide"});
            if (localStorage !=null) {
                console.log(localStorage.getItem("user"));
                let userDetail=JSON.parse(localStorage.getItem("user"));
                document.getElementById('user').value = userDetail.fName+" "+userDetail.lName;
                document.getElementById('editEmail').value = userDetail.email;
                document.getElementById('editAge').value = userDetail.age;
                let stateValue = userDetail.state;

// Get the select element by its ID
                let select = $("#editState");

// Change the selected option using jQuery Mobile methods
                select.val(stateValue).selectmenu('refresh');

// Get the select element by its ID

            }
    }

    });


    // validate signUpForm
    $("form[name='updatePassForm']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute of an input field. Validation rules are defined
            // on the right side

            updatePass: {
                required: true,
                strongPassword: true,

            }, confirmUpdatePass: {
                required: true,
                equalTo: "#updatePass",
            },
        },
        // Specify validation error messages
        messages: {
            updatePass: {
                required: "Password is required",
                strongPassword: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one special character, and one digit.",

            },
            confirmUpdatePass: {
                required: "Confirm password is required",
                equalTo: "Passwords do not match.",

            },


        },

        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
// // Submit the form when it's valid
        submitHandler: function(form1) {
            if ($(form1).valid()) {
                // Submit the form only if it's valid
                form1.submit();
            }

        }
    });


    // validate forgot password Form
    $("form[name='forgotForm']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute of an input field. Validation rules are defined
            // on the right side
            emailForgotPassword: {
                required: true,
                email: true
            },
        },
        // Specify validation error messages
        messages: {

            emailForgotPassword: {
                required: "Email is required",
                email: "Please enter a valid email address"
            },
        },

// // Submit the form when it's valid
        submitHandler: function(form) {
            // Submit the form only if it's valid
            if ($(form).valid()) {
                // Submit the form only if it's valid
                form.submit();
            }


        }
    });

    $("form[name='subscribeNews']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute of an input field. Validation rules are defined
            // on the right side
            emailAddress: {
                required: true,
                email: true
            },
        },
        // Specify validation error messages
        messages: {

            emailAddress: {
                required: "Email is required",
                email: "Please enter a valid email address"
            },
        },

// // Submit the form when it's valid
        submitHandler: function(form) {
            // Submit the form only if it's valid
            if ($(form).valid()) {
                // Submit the form only if it's valid
                form.submit();
            }


        }
    });
    // validate login Form
    $("form[name='loginForm']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute of an input field. Validation rules are defined
            // on the right side
            emailLogin: {
                required: true,
                email: true
            },
            loginPassword: {
                required: true,
                strongPassword: true,
            }
        },
        // Specify validation error messages
        messages: {

            emailLogin: {
                required: "Email is required",
                email: "Please enter a valid email address"
            },
            loginPassword: {
                required: "Password is required",
                strongPassword: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one special character, and one digit.",

            },
        },

// Submit the form when it's valid
        submitHandler: function(form) {
                // Submit the form only if it's valid
            if ($(form).valid()) {
                // Submit the form only if it's valid
                form.submit();
            }


        }
    });

    // validate signUpForm
    $("form[name='profileForm']").validate({
        // Specify validation rules
        rules: {

            editAge: {
                required: true,
                range: [1 , 80],
                digits:true
            },
            editState: {
                required: true
            },
        },
        // Specify validation error messages
        messages: {
            editAge: {
                required: "Must include age",
                range: "Ages must be greater than 0 and less than 80",
                digits: "Must be a number"
            },
            editState: {
                required: "Must select state",
            },

        },

        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
// // Submit the form when it's valid
        submitHandler: function(form) {
            form.submit();

        }
    });

// validate signUpForm
    $("form[name='signUpFom']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute of an input field. Validation rules are defined
            // on the right side
            fName: {
                required: true,
                minlength: 3, // Minimum length requirement
                maxlength: 20
            },
            lName: {
                required: true,
                minlength: 3, // Minimum length requirement
                maxlength: 20
            },
            age: {
                required: true,
                range: [1 , 80],
                digits:true
            },
            state: {
                required: true
            },
            email: {
                required: true,
                email: true
                },
                password: {
                    required: true,
                    strongPassword: true,

                }, confirmPassword: {
                    required: true,
                   equalTo: "#password",
            },
        },
        // Specify validation error messages
        messages: {
            fName: {
                required: "Please enter your firstname",
                minlength: "Minimum length is 3 characters.",
                maxlength: "Maximum length is 20 characters."
            },
            lName: {
                required: "Please enter your lastname",
                minlength: "Minimum length is 3 characters.",
                maxlength: "Maximum length is 20 characters."
            },
            age: {
                required: "Must include age",
                range: "Ages must be greater than 0 and less than 80",
                digits: "Must be a number"
            },
            state: {
                required: "Must select state",
            },
            email: {
                required: "Email is required",
                email: "Please enter a valid email address"
                },
            password: {
                required: "Password is required",
                strongPassword: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one special character, and one digit.",

            },
            confirmPassword: {
                required: "Confirm password is required",
                equalTo: "Passwords do not match.",

            },


        },

        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
// // Submit the form when it's valid
        submitHandler: function(form) {
            form.submit();

        }
    });
    //book appointment
    $("form[name='appointmentForm']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute of an input field. Validation rules are defined
            // on the right side
            bookingName: {
                required: true,
                minlength: 3, // Minimum length requirement
                maxlength: 20,
            },
            bookingEmail: {
                required: true,
                email: true
            },
            date: {
                required: true,
            },
            time: {
                required: true,
            },
            bookingMessage: {
                required: true,
                maxlength: 500,
            },
            // Specify validation error messages
            messages: {
                bookingName: {
                    required: "Please enter your name",
                    minlength: "Minimum length is 3 characters.",
                    maxlength: "Maximum length is 20 characters.",

                },
                date: {
                    required: "Select booking date",
                },
                time: {
                    required: "Select booking time",

                },

                bookingEmail: {
                    required: "Email is required",
                    email: "Please enter a valid email address"
                },
                bookingMessage: {
                    required: "Message is required",
                    maxlength: "Maximum length is 500 characters."
                },
            },
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
// // Submit the form when it's valid
        submitHandler: function(myForm) {
            if ($(myForm).valid()) {
                myForm.submit();
            }
        }
    });

    // contact Us
    $("form[name='sendMessageForm']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute of an input field. Validation rules are defined
            // on the right side
            name: {
                required: true,
                minlength: 3, // Minimum length requirement
                maxlength: 20
            },
            contactEmail: {
                required: true,
                email: true
            },
            message: {
                required: true,
                maxlength: 500,
            },
            // Specify validation error messages
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Minimum length is 3 characters.",
                    maxlength: "Maximum length is 20 characters."
                },

                contactEmail: {
                    required: "Email is required",
                    email: "Please enter a valid email address"
                },
                message: {
                    required: "Message is required",
                    maxlength: "Maximum length is 500 characters."
                },
            },
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
// // Submit the form when it's valid
        submitHandler: function(sendForm) {
            if ($(sendForm).valid()) {
                sendForm.submit();
            }
        }
    });

    // strong password
    $.validator.addMethod("strongPassword", function (value, element) {
        // Use a regular expression to check if the password meets the criteria.
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/.test(value);
    }, "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one special character, and one digit.");


    // Handle click event for confirming the action from dialog
    $("#confirm").on("click", async function () {
        $("#customDialog").popup("close");
        deleteLocalData("user");

    });
    $("#decline").on("click", function () {
        // Close the confirmation dialog
        $("#customDialog").popup("close");
        history.back();
    });

});
// submit password
function processValidUpdatePassForm(data) {

    let dataObj =  Object();
// store the record
    dataObj.password = data.updatePass.value;
    dataObj.email=emailAddress;
    console.log(dataObj);

    $.ajax({
        method: "POST",
        contentType: "application/json; charset=utf-8", // important
        dataType : "json",
        url:  baseURL+ port +"/updatePassword",
        data: JSON.stringify(dataObj)
    }).done(function(data, statusText, xhrObj)  {
        if (xhrObj.status===200) {
            try {
                console.log(JSON.stringify(xhrObj));
                const responseText = JSON.parse(xhrObj.responseText);
                const message = responseText.message;
                alert("Status Text is : " + statusText + "\nStatus Code: " + xhrObj.status + " \n" +  message);
                    history.back();
            } catch (error) {
                console.error("Error parsing the response:", error);
                alert("Status Code: " + xhrObj.status + "\nError: " + JSON.stringify(xhrObj));

            }
        }


    }).error (function(xhr) {
        try {
            const parsedResponse = JSON.parse(xhr.responseText);
            const message = parsedResponse.message;
            console.log(message);
            alert("Status Code: " + xhr.status+ "\nMessage: " + message );

        } catch (error) {
            console.error("Error parsing the response:", error);
            alert("Status Code: " + xhr.status+ "\nError: " + JSON.stringify(xhr) );

        }
    }) // end ajax

}

// submit email for news
function processValidForm(data) {
     data.emailAddress.value;
    alert(`The form was sent successfully for ${data.emailAddress.value}.`);

}


// submit email form
function processValidForgotPassForm(data) {

    let dataObj =  Object();
// store the record
    dataObj.email = data.emailForgotPassword.value;

    console.log(dataObj);

    $.ajax({
        method: "POST",
        contentType: "application/json; charset=utf-8", // important
        dataType : "json",
        url:  baseURL+ port +"/forgotPassword",
        data: JSON.stringify(dataObj)
    }).done(function(data, statusText, xhrObj)  {
        if (xhrObj.status===200) {
            try {
                console.log(JSON.stringify(xhrObj));
                const responseText = JSON.parse(xhrObj.responseText);
                const message = responseText.message;
                const user=responseText.user;
                emailAddress=user.email;
                $("body").pagecontainer("change", "#updatePasswordPage", {reloadPage: false, changeHash: false, transition: 'slide',});
                alert("Status Text is : " + statusText + "\nStatus Code: " + xhrObj.status + " \n" +  message);

            } catch (error) {
                console.error("Error parsing the response:", error);
                alert("Status Code: " + xhrObj.status + "\nError: " + JSON.stringify(xhrObj));

            }
        }


    }).error (function(xhr) {
        try {
            const parsedResponse = JSON.parse(xhr.responseText);
            const message = parsedResponse.message;
            console.log(message);
            alert("Status Code: " + xhr.status+ "\nMessage: " + message );

        } catch (error) {
            console.error("Error parsing the response:", error);
            alert("Status Code: " + xhr.status+ "\nError: " + JSON.stringify(xhr) );

        }
    }) // end ajax

}


function processValidLoginForm(data) {

    let dataObj =  Object();
// store the record
    dataObj.email = data.emailLogin.value;
    dataObj.password = data.loginPassword.value;

    console.log(dataObj)

    $.ajax({
        method: "POST",
        contentType: "application/json; charset=utf-8", // important
        dataType : "json",
        url:  baseURL+ port +"/login",
        data: JSON.stringify(dataObj)
    }).done(function(data, statusText, xhrObj)  {
        // alert("Status Text is : " + statusText + "\nStatus Code: " + xhrObj.status + " \n" +  JSON.stringify(xhrObj)+"\n\n"+xhrObj);

        if (xhrObj.status===200) {
            try {
                console.log(JSON.stringify(xhrObj));
                const responseText = JSON.parse(xhrObj.responseText);
                const message = responseText.message;
                const user = responseText.user;
                alert("Status Text is : " + statusText + "\nStatus Code: " + xhrObj.status + " \n" +  message);
                localStorage.setItem("user",JSON.stringify(user));
                localStorage.setItem('isAuthenticated', 'true');
                // Update the UI
                toggleButtons(true);
                $('#loginForm').trigger("reset");
                history.back();
            } catch (error) {
                console.error("Error parsing the response:", error);
                alert("Status Code: " + xhrObj.status + "\nError: " + JSON.stringify(xhrObj));

            }
        }


    }).error (function(xhr) {
        try {
            const parsedResponse = JSON.parse(xhr.responseText);
            const message = parsedResponse.message;
            console.log(message);
            alert("Status Code: " + xhr.status+ "\nMessage: " + message );

        } catch (error) {
            console.error("Error parsing the response:", error);
            alert("Status Code: " + xhr.status+ "\nError: " + JSON.stringify(xhr) );

        }
    }) // end ajax

}

function processValidSignUpForm(data) {

    let dataObj =  Object();
// store the record
    dataObj.fName = data.fName.value;
    dataObj.lName = data.lName.value;
    dataObj.age = data.age.value;
    dataObj.state = data.state.value;
    dataObj.email = data.email.value;
    dataObj.password= data.password.value;
    console.log(JSON.stringify(dataObj));

    $.ajax({
        method: "POST",
        contentType: "application/json; charset=utf-8", // important
        dataType : "json",
        url:  baseURL+ port +"/register",
        data: JSON.stringify(dataObj)
    }).done(function( data, statusText, xhrObj) {

        if (xhrObj.status===200) {
            try {
                const parsedResponse = JSON.parse(xhrObj.responseText);
                const message = parsedResponse.message;
                console.log(message);
                alert("Status Text is : " + statusText + "\nStatus Code: " + xhrObj.status + " \n" + message);
                $('#signUpFom').trigger("reset");
            } catch (error) {
                console.error("Error parsing the response:", error);
                alert("Status Code: " + xhrObj.status + "\nError: " + JSON.stringify(xhrObj));

            }
        }
        history.back();

    }).error (function( xhrObj ) {
        try {
            const parsedResponse = JSON.parse(xhrObj.responseText);
            const message = parsedResponse.message;
            console.log(message);
            alert("Status Code: " + xhrObj.status+ "\nMessage: " + message );

        } catch (error) {
            console.error("Error parsing the response:", error);
            alert("Status Code: " + xhrObj.status+ "\nError: " + JSON.stringify(xhrObj) );

        }
    }) // end ajax

}
// registration form
function processValidEditForm(data) {

    let dataObj =  Object();
// store the record
    dataObj.age = data.editAge.value;
    dataObj.state = data.editState.value;
    dataObj.email = data.email.value;

    console.log(JSON.stringify(dataObj));

    $.ajax({
        method: "PUT",
        contentType: "application/json; charset=utf-8", // important
        dataType : "json",
        url:  baseURL+ port +"/editProfile",
        data: JSON.stringify(dataObj)
    }).done(function( data, statusText, xhrObj) {

        if (xhrObj.status===200) {
            try {
                const responseText = JSON.parse(xhrObj.responseText);
                const message = responseText.message;
                const user = responseText.user;
                alert("Status Text is : " + statusText + "\nStatus Code: " + xhrObj.status + " \n" +  message);
                localStorage.setItem("user",JSON.stringify(user));
                localStorage.setItem('isAuthenticated', 'true');
                // Update the UI
                toggleButtons(true);
            } catch (error) {
                console.error("Error parsing the response:", error);
                alert("Status Code: " + xhrObj.status + "\nError: " + JSON.stringify(xhrObj));

            }
        }
history.back();

    }).error (function( xhrObj ) {
        try {
            const parsedResponse = JSON.parse(xhrObj.responseText);
            const message = parsedResponse.message;
            console.log(message);
            alert("Status Code: " + xhrObj.status+ "\nMessage: " + message );

        } catch (error) {
            console.error("Error parsing the response:", error);
            alert("Status Code: " + xhrObj.status+ "\nError: " + JSON.stringify(xhrObj) );

        }
    }) // end ajax

}

//book appointment
function processValidAppointment(data) {

    let dataObj =  Object();
// store the record
    dataObj.name = data.bookingName.value;
    dataObj.email = data.bookingEmail.value;
    dataObj.date = data.date.value;
    dataObj.time = data.time.value;
    dataObj.message= data.bookingMessage.value;
    console.log(JSON.stringify(dataObj));

    $.ajax({
        method: "POST",
        contentType: "application/json; charset=utf-8", // important
        dataType : "json",
        url:  baseURL+ port +"/bookAppointment",
        data: JSON.stringify(dataObj)
    }).done(function( data, statusText, xhrObj) {

        if (xhrObj.status===200) {
            try {
                const parsedResponse = JSON.parse(xhrObj.responseText);
                const message = parsedResponse.message;
                console.log(message);
                alert("Status Text is : " + statusText + "\nStatus Code: " + xhrObj.status + " \n" + message);
                $('#appointmentForm').trigger("reset");
                history.back();
            } catch (error) {
                console.error("Error parsing the response:", error);
                alert("Status Code: " + xhrObj.status + "\nError: " + JSON.stringify(xhrObj));

            }
        }


    }).error (function( xhrObj ) {
        try {
            const parsedResponse = JSON.parse(xhrObj.responseText);
            const message = parsedResponse.message;
            console.log(message);
            alert("Status Code: " + xhrObj.status+ "\nMessage: " + message );

        } catch (error) {
            console.error("Error parsing the response:", error);
            alert("Status Code: " + xhrObj.status+ "\nError: " + JSON.stringify(xhrObj) );

        }
    }) // end ajax

}


//contact us
function processValidMessageForm(data) {

    let dataObj =  Object();
// store the record
    dataObj.name = data.name.value;
    dataObj.email = data.contactEmail.value;
    dataObj.message= data.message.value;
    console.log(JSON.stringify(dataObj));

    $.ajax({
        method: "POST",
        contentType: "application/json; charset=utf-8", // important
        dataType : "json",
        url:  baseURL+ port +"/message",
        data: JSON.stringify(dataObj)
    }).done(function( data, statusText, xhrObj) {

        if (xhrObj.status===200) {
            try {
                const parsedResponse = JSON.parse(xhrObj.responseText);
                const message = parsedResponse.message;
                console.log(message);
                alert("Status Text is : " + statusText + "\nStatus Code: " + xhrObj.status + " \n" + message);

            } catch (error) {
                console.error("Error parsing the response:", error);
                alert("Status Code: " + xhrObj.status + "\nError: " + JSON.stringify(xhrObj));

            }
        }


    }).error (function( xhrObj ) {
        try {
            const parsedResponse = JSON.parse(xhrObj.responseText);
            const message = parsedResponse.message;
            console.log(message);
            alert("Status Code: " + xhrObj.status+ "\nMessage: " + message );

        } catch (error) {
            console.error("Error parsing the response:", error);
            alert("Status Code: " + xhrObj.status+ "\nError: " + JSON.stringify(xhrObj) );

        }
    }) // end ajax

}
function clearForm(){
    $('#signUpFom').trigger("reset");
    alert("Clear the form data...");
}

$( document ).on( "pagecreate", "#investmentAdvicePage", function() {
    try {
        if (localStorage != null) {
            console.log(localStorage.getItem("user"));
            let userDetail = JSON.parse(localStorage.getItem("user"));
            let data= Object();
            data.email=userDetail.email;
            if (userDetail.email != null) {
                $.ajax({
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data:  JSON.stringify(data),
                    url: baseURL + port + "/loadAppointment",
                }).done(function (data, statusText, xhrObj) {
                    console.log(JSON.stringify(xhrObj));
                    $('#upComing').text("UpComing Appointment");
                    const responseText = JSON.parse(xhrObj.responseText);
                    const detail=responseText.details;

                    $("#upComingDesc").html(`<strong>Date:</strong> ${detail.date}<br><strong>Time:</strong> ${detail.time}`);

                }).error(function (xhr) {

                    // alert("Error: " + JSON.stringify(xhr));
                }) // end ajax
            } else {
                $('#upComing').text("");
                $("#upComingDesc").text("");
            }
        } else {
            $('#upComing').text("");
            $("#upComingDesc").text("");
        }
    }catch (e){
        console.log(e);
    }
});


// Load graph
$( document ).on( "pagecreate", "#portfolioPage", function() {

// pie chart for portfolio


// Function to generate a random number within a range
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

// Function to generate random data for the portfolio
    const generateRandomPortfolioData = () => {
        const symbols = ['BTC', 'ETH', 'LTC'];
        const names = ['Bitcoin', 'Ethereum', 'Litecoin'];
        const colors = ['#ee6043', '#36a2eb', '#ffce56'];
        const portfolioData = [];

        for (let i = 0; i < symbols.length; i++) {
            const symbol = symbols[i];
            const name = names[i];
            const quantity = getRandomNumber(1, 100);
            const price = getRandomNumber(10, 1000);
            const color = colors[i];
            portfolioData.push({ symbol, name, quantity, price, color });
        }

        return portfolioData;
    };

// Function to calculate the total value of holdings
    const calculateTotalValue = (portfolioData) => {
        let totalValue = 0;
        for (const holding of portfolioData) {
            totalValue += holding.quantity * holding.price;
        }
        return totalValue;
    };

// Function to render the portfolio overview
    const renderPortfolioOverview = () => {
        const chartCanvas = document.getElementById('chart');
        const holdingsDiv = document.getElementById('holdings');

        // Generate random portfolio data
        const portfolioData = generateRandomPortfolioData();

        // Calculate the data for the pie chart
        const chartData = portfolioData.map(holding => {
            return {
                label: holding.symbol,
                data: holding.quantity * holding.price,
                backgroundColor: holding.color
            };
        });

        // Create the pie chart
        new Chart(chartCanvas, {
            type: 'pie',
            data: {
                labels: chartData.map(data => data.label),
                datasets: [{
                    data: chartData.map(data => data.data),
                    backgroundColor: chartData.map(data => data.backgroundColor)
                }]
            }
        });

        // Create the holdings table
        const table = document.createElement('table');
        table.setAttribute('data-toggle', 'columntoggle');
        table.style.alignItems='center'
        table.style.alignContent='center'
        // Set the table to be a block element and center it horizontally
        table.style.display = 'block';
        table.style.margin = '10px auto';// Center horizontal
        table.style.width = '100%'
        // table.style.border = '2px solid #ee6043'; // Sets a red border with a thickness of 2px

        const tableHeader = '<tr><th>Symbol </th><th>Name</th><th>Quantity </th><th>Price </th><th>Value </th></tr>';
        let tableRows = '';
        for (const holding of portfolioData) {
            const value = holding.quantity * holding.price;
            tableRows += `<tr><td>${holding.symbol} </td><td>${holding.name} </td><td>${holding.quantity}</td><td>${holding.price}</td><td>${value}</td></tr>`;
        }
        table.innerHTML = tableHeader + tableRows;
        holdingsDiv.appendChild(table);

        // Display the total portfolio value
        const totalValue = calculateTotalValue(portfolioData);
        holdingsDiv.innerHTML +=`<br><p><b> Total Value: ${totalValue}</b></p></br>`;
    };

// Call the render function
    renderPortfolioOverview();

});


$( document ).on( "pagecreate", "#graphPage", function() {
    let coinId = 'bitcoin';

    $("#cryptoList li").on("click", function () {
        // Retrieve the data-cryptoid attribute of the clicked list item
        let cryptoId = $(this).data("cryptoid");
        if (cryptoId !== null && cryptoId !== undefined && cryptoId !== "") {
            coinId=cryptoId;
            console.log(cryptoId);

        }



    // Replace 'bitcoin' with the coin ID you want to fetch
    const currency = 'usd';
    const days = 7;
    // Make an API request to fetch coin details
    $.get(`${externalApiUrl}/coins/${coinId}`, function (data) {
        const coinDetails = data;
        // Update the jQuery Mobile elements with the fetched data
        $('#coin-name').text(coinDetails.name);
        $('#coin-description').html(coinDetails.description["en"]);
        $('#coin-price').text(`Price: $${coinDetails.market_data.current_price.usd}`);
        $('#coin-market-cap').text(`Market Cap: $${coinDetails.market_data.market_cap.usd}`);
        console.log(coinDetails);
    });

    $.get(`${externalApiUrl}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`, function (data) {
        const prices = data.prices.map(item => item[1]); // Extract prices
            const graphCanvas = document.getElementById('coin-graph');

        new Chart(graphCanvas, {
                type: 'line',
                data: {
                    labels: Array.from(Array(prices.length), (_, i) => i.toString()),
                    datasets: [
                        {
                            label: 'Price',
                            data: prices,
                            borderColor: '#ee6043',
                            pointBackgroundColor: '#f39a88', // Data point color (red)
                            backgroundColor: '#f39a88', // Fill c
                            fill: true,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            display: false, // Hide the x-axis labels
                        },
                    },
                    responsive: true,

                },
            });

    });
});
});

// load map view
$( document ).on( "pagecreate", "#contactUsPage", function() {
    plugin.google.maps.environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAHSbWQQWUFcdsVxAW7KVl19MVaZZKRqYM',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAHSbWQQWUFcdsVxAW7KVl19MVaZZKRqYM'
    });
    const defaultLat = -33.8657009; // Default latlong when no geolocation support
    const defaultLng = 151.2040335; // Default latlong when no geolocation support

    // var defaultLatLng =  plugin.google.maps.LatLng(-33.8657009,151.2040335); // Default latlong when no geolocation support

    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            let latitude = pos.coords.latitude;
            let longitude = pos.coords.longitude;
            drawMap(latitude, longitude);

        }
        function fail() {
            drawMap(defaultLat, defaultLng); // Failed to find location, show default map
        }

        // Find the users current position Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});

    } else {
        drawMap(defaultLat, defaultLng); // No geolocation support, show default map
    }
    function drawMap(latitude, longitude) {
        let myCameraOptions = {
            target: {lat: latitude, lng: longitude},
            zoom: 19,
            mapTypeId: plugin.google.maps.MapTypeId.NORMAL
        };


        let mapView = plugin.google.maps.Map.getMap(document.getElementById("map-canvas"), myCameraOptions);



        // Add an overlay to the map of current lat/lng
        mapView.one(plugin.google.maps.event.MAP_READY, function() {

            mapView.addMarker({
                position: {lat: -33.8657009, lng: 151.2040335},
                map: mapView,

                title: "CryptoMentor"
            });


            let cameraOptions = {

                target: {lat: latitude, lng: longitude},
                zoom: 15,
            };
            let currentLocation = {
                lat: latitude,
                lng: longitude
            };
            // destination
            let destination = {
                lat: defaultLat,
                lng: defaultLng
            };

            mapView.animateCamera(cameraOptions);
            let polylineOptions = {
                points: [currentLocation, destination],
                'color': '#ee6043',
                'width': 5
            };

            // draw polyline
            mapView.addPolyline(polylineOptions);


            let mapsURL = "https://www.google.com/maps/dir/?api=1&destination=" +
                defaultLat + "," + defaultLng;
            // get direction
            let getDirectionsButton = document.getElementById("getDirectionsButton");

            // Add a click event listener to the button
            getDirectionsButton.addEventListener("click", function () {
                // Open the link in the default browser
                cordova.InAppBrowser.open(mapsURL, "_system");
            });


        });
    }


});

// login and logout functions


function logout() {
    // Perform user logout logic here
    $( "#menuPanel" ).panel( "close" );
        // Open the dialog
        $("#customDialog").popup("open", {positionTo: "window"});

    // After successful logout, set isAuthenticated to false in local storage

}
window.addEventListener('beforeunload', function (event) {
    // Optionally display a confirmation message to the user
    // event.returnValue = 'Are you sure you want to leave this page?';

    // Close the menu panel
    $( "#menuPanel" ).panel( "close" );
});
$(document).on('pagecreate', '#home', function () {

        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        toggleButtons(isAuthenticated);
    //Initialize the panel
        $("#menuPanel").panel();

        $(".menu").click(function() {
                $("#menuPanel").panel("open");
            }
        );


        const dateInput = $("#date");

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const year = tomorrow.getFullYear();
        const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0");
        const day = tomorrow.getDate().toString().padStart(2, "0");

        const minDate = `${year}-${month}-${day}`;

        dateInput.attr("min", minDate);


        //display and hide swipe menu panel
        $(document).on("swipeleft swiperight", function( e ) {

                if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
                    if ( e.type === "swiperight"  ) {
                        $( "#menuPanel" ).panel( "open" );
                    }
                }
            }
        );

        // Page transaction
        $(".content").click(function () {
            // change a page with animation
            $("body").pagecontainer("change", "#home", {reloadPage: false, changeHash: false, transition: 'slide'});

        });


    }
)
$(document).one("mobileinit", function () {
    $.mobile.pageContainer.pagecontainer("change", "#home", {transition: "none"});
});

$(document).on('pagecontainerbeforeload', function (event, data) {
    if (typeof data.toPage === 'string' && data.toPage === 'index.html') {
        $.mobile.pageContainer = data.toPage;
    }
});

$(document).on("pagebeforechange", function (event, data) {
    if (typeof data.toPage === "string" && data.toPage === "#menuPanel") {
        // The back button was pressed while the menu panel is open
        // Close the menu panel programmatically
        $("#menuPanel").panel("close");
    }
});
/// Function to delete data from local storage
function deleteLocalData(keyValue) {
    if (keyValue) {
        localStorage.key(keyValue);
        localStorage.clear();
        localStorage.removeItem(keyValue);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("img");
        alert("Logout Successfully.");
        toggleButtons(false)
    }
}


//  Camera functionality
function cameraTakePicture(){
    window.navigator.camera.getPicture(onSuccess, onFail,{
        quality:80,
        destinationType:Camera.DestinationType.DATA_URL
    });
    function onSuccess(imageData) {
        let image = document.getElementById('myProfile');
        image.src = "data:image/jpeg;base64,"+ imageData ;
        let profilePic = document.getElementById('profilePic');
        profilePic.src = "data:image/jpeg;base64,"+ imageData ;
        localStorage.setItem("img",imageData );

    }

    function onFail(message){
        console.log("Nav object " + navigator.camera);
        alert("Failed because .." + message);
    }
}// end cameraTakePicture



function loadCoinList(){
    const params = new URLSearchParams({
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 20,
        page: 1,
        sparkline: false,
    });
    fetch(`${externalApiUrl}/coins/markets?${params}`)
        .then((response) => response.json())
        .then((data) => {
            // Process the list of coins here
            populateList(data);
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
}

// Function to populate the listview with CoinGecko API data
function populateList(data) {
    let cryptoList = $("#cryptoList");
    cryptoList.empty();
    console.log(data)
    data.forEach(crypto => {
            const listItem = `
      <li data-cryptoid="${crypto.id}">
        <a href="#graphPage" >
          <img src="${crypto.image}" alt="${crypto.name}" class="ui-grid-a" style="height: 15em; width: 15em" />
          <div>
            <h2>${crypto.name} (${crypto.symbol})</h2>
            <p>Price: $${crypto.current_price}</p>
            <p>Market Cap: $${crypto.market_cap}</p>
           
          </div>
        </a>
      </li> `;
            cryptoList.append(listItem); // Append the list item to the list view
        });

        cryptoList.listview("refresh"); // Refresh the listview to apply jQuery Mobile styles


}



// Function to toggle login/logout based on authentication status
function toggleButtons(isAuthenticated) {
    const authenticatedButtons = $('.authenticated');
    const unauthenticatedButtons = $('.unauthenticated');

    if (isAuthenticated) {
        authenticatedButtons.show();
        unauthenticatedButtons.hide();
        if (localStorage !=null) {
            console.log(localStorage.getItem("user"));
            let userDetail=JSON.parse(localStorage.getItem("user"));
             $('#userName').text(userDetail.fName+" "+userDetail.lName);
            $('#userEmail').text(userDetail.email);
            console.log(localStorage.getItem("img"));
            let image = document.getElementById('myProfile');
            image.src = "data:image/jpeg;base64,"+ localStorage.getItem("img") ;
            let profilePic = document.getElementById('profilePic');
            profilePic.src = "data:image/jpeg;base64,"+ localStorage.getItem("img") ;

        }
    } else {
        authenticatedButtons.hide();
        unauthenticatedButtons.show();
        $('#userName').text("Guest");
        $('#userEmail').text("guest@gmail.com");
    }
}
function onResume() {
    // This function will be called when the app resumes from the background
    console.log("App resumed");
}

let app = {

    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // device ready Event Handler
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
        document.addEventListener("resume", onResume, false);
        let clearBtn = document.getElementById("clearForm");

        let cameraButton = document.getElementById("edit-icon");

        cameraButton.addEventListener("click", cameraTakePicture);
        clearBtn.addEventListener("click", clearForm);
        let logoutButton = document.getElementById("logout");
        let btnLogout = document.getElementById("btnLogout");
        logoutButton.addEventListener("click", logout);
        btnLogout.addEventListener("click", logout);

    },


    // Update DOM on a Received Event
    receivedEvent: function (id) {
        let myDeviceData = document.getElementById("deviceData");
        console.log('Received Event: ' + id + "=====" + myDeviceData);
    }

};

app.initialize();