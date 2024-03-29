import { object, string, ref, number } from 'yup';

export const baseURL = "http://localhost:4000/api/v1"
export const tokenExpiration = 60 * 60 * 24
export const apiEndpoints = {
    me: baseURL + "/me",
    tokenPair: baseURL + "/token",
    oauthLogin: baseURL + "/oauth/login",
    forgotPassword: baseURL + "/forgotpassword",
    resetPassword: baseURL + "/resetpassword",
    login: baseURL + "/login",
    register: baseURL + "/register",
}
const emailSchema = string().email().max(256).required("An email is required")
const passwordSchema = string().min(8).max(128).required("A password is required")

export const registerValidationAuthSchema = object({
    email: emailSchema,
    password: passwordSchema.matches(
        /(?=.*[a-z])(?=.*[A-Z])((?=.*\d)|(?=.*[@#$%^&-+=()!? "])).{8,128}$/,
        "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character or 1 number."
    )
})
export const loginValidationAuthSchema = object({
    email: emailSchema,
    password: passwordSchema
})

export const forgotUserPasswordSchema = object({
    email: emailSchema,
})

export const resetPasswordSchema = object({
    password: passwordSchema,
    passwordRepeat: string().oneOf([ref("password"), undefined], "Password does not match").required("A repeat of the password is required")
})

export const calorieCalculatorSchema = object({
    sex: string().required(),
    age: string().required("Please enter your age"),
    height: string().required("Please enter your height"),
    weight: number().required("Please enter your weight"),
    units: string().required(),
    activityLevel: string().required(),
});