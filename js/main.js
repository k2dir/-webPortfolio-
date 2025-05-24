/*stuff for login/logout button*/
window.addEventListener('load', function() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    var navLink = document.getElementById('login-logout-link');
    if (isLoggedIn === 'true') {
        navLink.textContent = 'Logout';
        navLink.href = 'logout.html';
    } else {
        navLink.textContent = 'Login';
        navLink.href = 'login.html';
    }
    navLink.style.display = 'block';
});

/*stuff for clicking on images*/
var modal = document.getElementById("modal");
var modalImage = document.getElementById("modal-image");
var closeButton = document.querySelector('.close-button');

document.querySelectorAll('img[data-modal-target]').forEach(img => {
    img.onclick = function(event) {
        modal.style.display = "block";
        modalImage.src = this.src;

        var rect = modalImage.getBoundingClientRect();
        closeButton.style.top = (rect.top - closeButton.offsetHeight) + 'px'; 
        closeButton.style.left = (rect.left - closeButton.offsetWidth) + 'px'; 
    }
});

closeButton.onclick = function() {
    modal.style.display = "none";
}