const validators = {
    auth: values => {
        const errors = {} as { email: string, password: string};
      
        if (!values.email) {
          errors.email = 'Field is mandatory';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email';
        }
        if (values.password.length < 6) {
          errors.password = 'Password must have at least 6 letters';
        }
      
        return errors;
      },
};

export default validators;