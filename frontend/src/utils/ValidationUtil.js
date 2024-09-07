class ValidationUtil {
    static validatePassword = (password) => {
        let errors = '';
        if (!password) {
            errors = 'Password is required.';
        } else if (password.length < 8) {
            errors = 'Password must be at least 8 characters long.';
        } else if (!/[A-Z]/.test(password)) {
            errors = 'Password must contain at least one uppercase letter.';
        } else if (!/[a-z]/.test(password)) {
            errors = 'Password must contain at least one lowercase letter.';
        } else if (!/\d/.test(password)) {
            errors = 'Password must contain at least one digit.';
        }
        return errors;
    }

    static validateEmail = (email) => {
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let errors = '';
    
        if (email === "") {
            errors = "Email should not be empty"
        } else if (!email_pattern.test(email)){
            errors = "Invalid email format"
        }
    
        return errors;
    }

    static validateMobile = (number) => {
        let errors = '';
        const contact_number_pattern = /^\+?\d{0,3}\s?\(?\d{0,3}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}$/;
        
        if (number === "") {
            errors = "Contact Number should not be empty";
        } else if (!contact_number_pattern.test(number)) {
            errors = "Invalid contact number format";
        }
    
        return errors;
    }

}

export default ValidationUtil;  