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




















// 检查登录状态并重定向的函数
function checkLoginAndRedirect() {
    var isLoggedIn = getCookie('isLoggedIn');

    if (isLoggedIn === 'true') {
        // 如果用户已登录，重定向到courseware.html
        window.location.href = 'courseware.html';
    } else {
        // 如果用户未登录，重定向到登录界面
        window.location.href = 'login.html';
    }
}

// 获取cookie的函数
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// 设置cookie的函数
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 处理登录表单提交的函数
function handleLogin(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var storedUsername = getCookie('storedUsername');
    var storedPassword = getCookie('storedPassword');

    if (username === storedUsername && password === storedPassword) {
        // 如果用户名和密码都匹配，跳转到courseware.html
        window.location.href = 'courseware.html';
    } else if (username === storedUsername && password !== storedPassword) {
        // 如果用户名匹配但密码不匹配，显示密码错误信息
        alert('Password is incorrect.');
    } else {
        // 如果用户名不匹配，显示账号未注册信息
        document.getElementById('unregisteredMessage').style.display = 'block';
    }
}

// 处理注册表单提交的函数
function handleRegister(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    var registerUsername = document.getElementById('registerUsername').value;
    var registerPassword = document.getElementById('registerPassword').value;

    // 存储用户名和密码到cookie，有效期7天
    setCookie('storedUsername', registerUsername, 7);
    setCookie('storedPassword', registerPassword, 7);

    // 跳转到登录页面
    window.location.href = 'login.html';
}

// 为登录和注册表单添加事件监听器
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    var registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // 为“Courseware”链接添加点击事件，检查登录状态
    var coursewareLink = document.querySelector('a.nav-link[href="javascript:void(0)"]');
    if (coursewareLink) {
        coursewareLink.setAttribute('href', 'javascript:void(0);'); // 确保链接不会默认跳转
        coursewareLink.addEventListener('click', checkLoginAndRedirect);
    }
});
