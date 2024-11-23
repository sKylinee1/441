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




















// 假设cookie中的登录状态键名为'isLoggedIn'
function checkLoginAndRedirect() {
    // 检查cookie中是否有'isLoggedIn'键
    var isLoggedIn = getCookie('isLoggedIn');
    
    if (isLoggedIn && isLoggedIn === 'true') {
        // 如果用户已登录，重定向到courseware.html
        window.location.href = 'courseware.html';
    } else {
        // 如果用户未登录，重定向到登录页面
        window.location.href = 'login.html';
    }
}

// 获取cookie的函数
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// 设置cookie的函数，可以存储多条信息
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 假设有一个函数用于处理用户登录，设置登录状态到cookie
function userLogin(username, password) {
    // 这里应该是登录逻辑，如果登录成功：
    setCookie('isLoggedIn', 'true', 7); // 假设登录状态有效期为7天
    // 可以设置更多的用户信息到cookie
    setCookie('username', username, 7);
    // 重定向到courseware页面
    window.location.href = 'courseware.html';
}

// 假设有一个函数用于处理用户登出，清除登录状态
function userLogout() {
    // 清除cookie中的登录状态
    setCookie('isLoggedIn', 'false', -1); // 设置过期时间为过去的时间，即删除cookie
    // 可以清除更多的用户信息
    setCookie('username', '', -1);
    // 重定向到登录页面或其他页面
    window.location.href = 'login.html';
}
