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




















// 假设我们有一个函数来设置cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 假设我们有一个函数来获取cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 假设我们有一个函数来删除cookie
function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// 检查登录状态并执行相应操作的函数
function checkLogin(username, password) {
    var storedUsername = getCookie('username');
    var storedPassword = getCookie('password'); // 假设密码也存储在cookie中，实际应用中不推荐这样做

    if (storedUsername && storedPassword) {
        if (username === storedUsername && password === storedPassword) {
            alert('Login successful. Redirecting to Courseware...');
            window.location.href = 'courseware.html';
        } else {
            alert('Password incorrect. Please try again.');
        }
    } else {
        alert('Account not registered. Click "Register" to sign up.');
    }
}

// 注册按钮点击事件
function registerUser() {
    window.location.href = 'register.html';
}

// 页面加载完成后添加事件监听器
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    var unregisteredMessage = document.getElementById('unregisteredMessage');
    var registerButton = document.getElementById('registerButton');

    // 登录表单提交事件
    loginForm.onsubmit = function(event) {
        event.preventDefault(); // 阻止表单默认提交行为
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        checkLogin(username, password);
    };

    // 注册按钮点击事件
    registerButton.onclick = function(event) {
        event.preventDefault(); // 阻止链接默认行为
        registerUser();
    };
});
