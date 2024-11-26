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




















// 模拟的已注册用户名和密码存储
const registeredUsers = {
    'user1': 'password1',
    'user2': 'password2',
    'user3': 'password3'
};

// 获取cookie的函数
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

// 设置cookie的函数
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

// 登录表单提交处理
function handleLoginSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 检查cookie中是否有账号记录
    const storedUsername = getCookie('username');
    const storedPassword = getCookie('password');

    if (storedUsername && storedPassword) {
        // 如果账号和密码与cookie中的记录一致
        if (username === storedUsername && password === storedPassword) {
            alert('Login successful');
            window.location.href = 'courseware.html';
        } else {
            // 如果账号存在但密码不一致
            alert('Password is incorrect');
        }
    } else {
        // 如果账号在cookie里没有记录，检查用户名和密码是否与注册信息匹配
        if (registeredUsers.hasOwnProperty(username) && registeredUsers[username] === password) {
            setCookie('isLoggedIn', 'true', 7);
            setCookie('username', username, 7);
            setCookie('password', password, 7); // 注意：实际应用中不应存储明文密码
            alert('Login successful');
            window.location.href = 'courseware.html';
        } else {
            // 如果账号未注册，提示并提供注册选项
            const result = confirm('The account is not registered. Click "OK" to register.');
            if (result) {
                window.location.href = 'register.html';
            } else {
                // 如果用户取消，不进行任何操作
            }
        }
    }
}

// 绑定登录表单的提交事件
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
});
