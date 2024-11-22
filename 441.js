document.addEventListener('DOMContentLoaded', function() {
    // 商品数量和总价的计算逻辑
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

















    
    // 用户登录和注册的处理逻辑
    const registeredUsers = {
        'user1': 'password1',
        'user2': 'password2',
        'user3': 'password3'
    };

    function getCookie(name) {
        let cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return '';
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    }

    function handleLoginSubmit(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (registeredUsers.hasOwnProperty(username) && registeredUsers[username] === password) {
            setCookie('isLoggedIn', 'true', 7);
            setCookie('username', username, 7);
            setCookie('password', password, 7); // 注意：实际应用中不应存储明文密码
            alert('登录成功');
            window.location.href = 'courseware.html';
        } else if (!registeredUsers.hasOwnProperty(username)) {
            const result = confirm('当前账号未注册。点击“确定”去注册。');
            if (result) {
                window.location.href = 'register.html';
            }
        } else {
            alert('密码错误');
        }
    }

    function handleRegisterSubmit(event) {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        if (registeredUsers.hasOwnProperty(username)) {
            alert('您已经注册过该账号。');
        } else {
            registeredUsers[username] = password;
            setCookie('isLoggedIn', 'true', 7);
            setCookie('username', username, 7);
            setCookie('password', password, 7); // 注意：实际应用中不应存储明文密码
            alert('注册成功，请登录。');
            window.location.href = 'login.html';
        }
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }

    const coursewareLink = document.querySelector('.nav-link[href="javascript:void(0)"]'); 
    if (coursewareLink) {
        coursewareLink.addEventListener('click', function(event) {
            event.preventDefault();
            const isLoggedIn = getCookie('isLoggedIn');
            if (isLoggedIn) {
                window.location.href = 'courseware.html';
            } else {
                window.location.href = 'login.html';
            }
        });
    }
});
