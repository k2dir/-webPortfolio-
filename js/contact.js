function submitWithJS() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;

    var formData = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };

    localStorage.setItem('formDataJS', JSON.stringify(formData));

    window.location.href = 'form-data.html';
}

new Vue({
    el: '#app',
    data: {
        name: '',
        email: '',
        phone: '',
        message: ''
    },
    methods: {
        validateEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        validatePhone: function(phone) {
            var re = /^\+?[\d\s-]{10,}$/;
            return re.test(phone);
        },
        submitForm: function(event) {
            if (!this.name || !this.email || !this.phone || !this.message) {
                alert('All fields are required.');
                return;
            }

            if (!this.validateEmail(this.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (!this.validatePhone(this.phone)) {
                alert('Please enter a valid phone number.');
                return;
            }

            localStorage.setItem('formDataVueJS', JSON.stringify({ 
                name: this.name, 
                email: this.email, 
                phone: this.phone, 
                message: this.message 
            }));
            window.location.href = 'form-data-vuejs.html';
        },
        resetForm: function() {
            this.name = '';
            this.email = '';
            this.phone = '';
            this.message = '';
        }
    }
});