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
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// 检查用户是否已经登录的函数，并在未登录时跳转到登录界面
function checkLoginAndRedirect() {
    const isLoggedIn = getCookie('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    } else {
        window.location.href = 'courseware.html'; // 如果已登录，跳转到课程页面
    }
}

// 登录表单提交处理
function handleLoginSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 检查账号是否注册过以及密码是否匹配
    if (registeredUsers.hasOwnProperty(username) && registeredUsers[username] === password) {
        setCookie('isLoggedIn', 'true', 7); // 设置登录状态的cookie
        setCookie('username', username, 7); // 设置账号cookie
        window.location.href = 'courseware.html'; // 跳转到课程页面
    } else if (!registeredUsers.hasOwnProperty(username)) {
        // 如果账号未注册，显示提示，并提供“去注册”选项
        const result = confirm('当前账号未注册。点击“确定”去注册。');
        if (result) {
            window.location.href = 'register.html'; // 点击“确定”后，跳转到注册界面
        }
    } else {
        alert('密码错误'); // 显示密码错误的提示
    }
}

// 注册表单提交处理
function handleRegisterSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 检查账号是否已经注册
    if (registeredUsers.hasOwnProperty(username)) {
        alert('您已经注册过该账号。');
        window.location.href = 'login.html'; // 如果已注册，跳转到登录界面
    } else {
        registeredUsers[username] = password; // 模拟将新用户名和密码添加到已注册列表
        alert('注册成功，请登录。');
        window.location.href = 'login.html'; // 注册成功后跳转到登录界面
    }
}

// 绑定点击事件到“Courseware”链接
document.addEventListener('DOMContentLoaded', function() {
    const coursewareLink = document.querySelector('.nav-link[href="javascript:void(0)"]');
    if (coursewareLink) {
        coursewareLink.addEventListener('click', function(event) {
            event.preventDefault();
            checkLoginAndRedirect();
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