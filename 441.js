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

    // 检查输入的账号密码是否正确
    if (registeredUsers.hasOwnProperty(username)) {
        if (registeredUsers[username] === password) {
            // 如果账号密码正确，设置cookie并跳转到courseware.html
            setCookie('isLoggedIn', 'true', 7);
            setCookie('username', username, 7);
            alert('登录成功');
            window.location.href = 'courseware.html';
        } else {
            // 如果账号已注册但密码错误，提示错误
            alert('密码错误');
        }
    } else {
        // 如果账号未注册，提示并提供注册选项
        const result = confirm('当前账号未注册。点击“确定”去注册。');
        if (result) {
            window.location.href = 'register.html';
        }
    }
}

// 注册表单提交处理
function handleRegisterSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    // 检查账号是否已经注册
    if (registeredUsers.hasOwnProperty(username)) {
        alert('您已经注册过该账号。');
    } else {
        registeredUsers[username] = password; // 模拟将新用户名和密码添加到已注册列表
        setCookie('isLoggedIn', 'true', 7);
        setCookie('username', username, 7);
        setCookie('password', password, 7); // 注意：实际应用中不应存储明文密码
        alert('注册成功，请登录。');
        window.location.href = 'login.html'; // 注册成功后跳转到登录界面
    }
}

// 绑定点击事件到“Courseware”链接
document.addEventListener('DOMContentLoaded', function() {
    const coursewareLink = document.querySelector('.nav-link[href="javascript:void(0)"]'); // 确保选择器与实际HTML匹配
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

// 绑定登录和注册表单的提交事件
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
});
