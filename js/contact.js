function submitWithJS() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    var formData = {
        name: name,
        email: email,
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
        message: ''
    },
    methods: {
        validateEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        submitForm: function(event) {
            if (!this.name || !this.email || !this.message) {
                alert('All fields are required.');
                return;
            }

            if (!this.validateEmail(this.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            localStorage.setItem('formDataVueJS', JSON.stringify({ name: this.name, email: this.email, message: this.message }));
            window.location.href = 'form-data-vuejs.html';
        },
        resetForm: function() {
            this.name = '';
            this.email = '';
            this.message = '';
        }
    }
});