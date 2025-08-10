const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, element) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    element.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

const sideMenu = document.getElementById("sideMenu");

function openMenu() {
    sideMenu.style.right = "0";
}

function closeMenu() {
    sideMenu.style.right = "-200px";
}

// Form submission to Google Sheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbwxTWJQJnlzF5lppnTzwuasrb7WUQ3ujnDHRnk5CJYriaRokJdvn_WdZvq6XpzfA8uNwg/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Show a loading message and disable the button
    msg.innerHTML = "Sending...";
    submitButton.disabled = true;

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        console.log('Success!', response);
        msg.innerHTML = "Message sent successfully!";
        
        // Reset message and form after 3 seconds
        setTimeout(function() {
            msg.innerHTML = "";
        }, 3000);
        form.reset(); 
    })
    .catch(error => {
        console.error('Error!', error.message);
        msg.innerHTML = "Oops! Something went wrong.";
    })
    .finally(() => {
        // Re-enable the submit button regardless of success or failure
        submitButton.disabled = false;
    });
});

document.querySelector('.fa-bars').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') openMenu();
});
document.querySelector('.fa-circle-xmark').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') closeMenu();
});