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

const loginValidatorSchema = yup.object({
    body: yup.object({
        password: yup.string().min(8).max(255).required(),
        email: yup.string().email().required(),
    }),
});

module.exports = { userValidatorSchema, loginValidatorSchema };
