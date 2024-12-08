//John Huang Zhenyu 223190612//

document.addEventListener('DOMContentLoaded', function() {
    const courses = document.querySelectorAll('.course-item');
    const totalPriceDisplay = document.getElementById('totalPrice');

    courses.forEach(course => {
        const increaseButton = course.querySelector('[data-action="increase"]');
        const decreaseButton = course.querySelector('[data-action="decrease"]');
        const quantityDisplay = course.querySelector('.quantity');
        const priceDisplay = course.querySelector('.course-price');

        increaseButton.addEventListener('click', function() {
            let currentQuantity = parseInt(quantityDisplay.textContent);
            quantityDisplay.textContent = currentQuantity + 1;
        });

        decreaseButton.addEventListener('click', function() {
            let currentQuantity = parseInt(quantityDisplay.textContent);
            if (currentQuantity > 0) {
                quantityDisplay.textContent = currentQuantity - 1;
            }
        });
    });

    document.getElementById('calculateTotal').addEventListener('click', function() {
        let total = 0;
        document.querySelectorAll('.course-item').forEach(course => {
            const quantity = parseInt(course.querySelector('.quantity').textContent);
            const price = parseFloat(course.querySelector('.course-price').textContent.replace('$', ''));
            total += quantity * price;
        });
        totalPriceDisplay.textContent = '$' + total.toFixed(2);
    });

    document.getElementById('clearSelection').addEventListener('click', function() {
        document.querySelectorAll('.quantity').forEach(quantity => {
            quantity.textContent = 0;
        });
        totalPriceDisplay.textContent = '$0.00'; // Reset total price
    });
});




















function checkLoginAndRedirect() {
    var isLoggedIn = getCookie('isLoggedIn');

    if (isLoggedIn === 'true') {

        window.location.href = 'courseware.html';
    } else {
   
        window.location.href = 'login.html';
    }
}


function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


function handleLogin(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var storedUsername = getCookie('storedUsername');
    var storedPassword = getCookie('storedPassword');

    if (username === storedUsername && password === storedPassword) {

        window.location.href = 'courseware.html';
    } else if (username === storedUsername && password !== storedPassword) {

        alert('Password is incorrect.');
    } else {

        document.getElementById('unregisteredMessage').style.display = 'block';
    }
}


function handleRegister(event) {
    event.preventDefault();

    var registerUsername = document.getElementById('registerUsername').value;
    var registerPassword = document.getElementById('registerPassword').value;


    setCookie('storedUsername', registerUsername, 7);
    setCookie('storedPassword', registerPassword, 7);


    window.location.href = 'login.html';
}


document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    var registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }


    var coursewareLink = document.querySelector('a.nav-link[href="javascript:void(0)"]');
    if (coursewareLink) {
        coursewareLink.setAttribute('href', 'javascript:void(0);'); 
        coursewareLink.addEventListener('click', checkLoginAndRedirect);
    }
});
