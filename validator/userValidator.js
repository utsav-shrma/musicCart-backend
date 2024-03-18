const yup = require("yup");

const phoneRegExp = /^[0-9]{10}$/;

const userValidatorSchema = yup.object({
    body: yup.object({
        name: yup.string().min(2).max(32).required(),
        password: yup.string().min(8).max(255).required(),
        email: yup.string().email().required(),
        phone: yup.string()
            .min(10)
            .max(10)
            .required()
            .matches(phoneRegExp, "Phone number is not valid"),
    }),
    //   params: yup.object({
    //     id: yup.number().required(),
    //   }),
});



const validateEmail = (email) => {
  return yup.string().email().isValidSync(email);
};

const validatePhone = (phone) => {
  return yup.string()
    .matches(phoneRegExp)
    .isValidSync(phone);
};

const loginValidatorSchema = yup.object({
    body: yup.object({
        password: yup.string().min(8).max(255).required(),
        emailOrPhone: yup.string().test("emailOrPhone", "Email / Phone is invalid", (value) => {
            if (/^\d$/.test(value[0])) {
              return validatePhone(value);
            } else {
              return validateEmail(value);
            }
          }),
    }),
});

module.exports = { userValidatorSchema, loginValidatorSchema };
