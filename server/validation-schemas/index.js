import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .min(6)
        .max(10)
        .required()
})

export const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
        .required()
        .email(),
    password: Yup.string()
        .min(6)
        .max(10)
        .required()
})

export const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required()
})

export const EmailConfirmationSchema = Yup.object().shape({
    token: Yup.string().required()
})

export const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .min(6)
        .max(10)
        .required(),
    token: Yup.string().required()
})
