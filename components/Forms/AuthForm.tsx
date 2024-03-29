import { signIn } from "next-auth/react";
import Link from "next/link";
import { useFormik } from "formik";
import { GrGoogle } from "react-icons/gr"
import { loginValidationAuthSchema, registerValidationAuthSchema } from "@/constants";
import EmailInput from "./Formik/EmailInput";
import PasswordInput from "./Formik/PasswordInput";

export const AuthForm = ({
    type,
    className,
}: {
    type: "login" | "register";
    className?: string;
}) => {
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema:
            type === "register" ? registerValidationAuthSchema : loginValidationAuthSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await signIn("credentials", {
                callbackUrl: "/",
                email: values.email,
                password: values.password,
                type,
            })
            setSubmitting(false);
        }
    })
    return (
        <div
            style={{ height: "36rem" }}
            className={`w-96 flex flex-col border p-10 rounded justify-center items-center ${className}`}>
            <form onSubmit={formik.handleSubmit} >
                <EmailInput formik={formik} fieldName="email" />
                <PasswordInput formik={formik} fieldName="password" />
                <div className="text-sm w-full mb-10">
                    {type === "register" ? (
                        <Link className="hover:underline" href={"/auth/login"}>Already have an account?</Link>
                    ) : (
                        <div className="flex justify-between">
                            <Link className="hover:underline" href={"/auth/register"}>Need to sign up?</Link>
                            <Link className="hover:underline" href={"/auth/forgotpassword"}>Forgot password?</Link>
                        </div>
                    )}
                </div>
                <button className="btn w-full" type="submit" disabled={formik.isSubmitting}>
                    Submit
                </button>
            </form>
            <div className="flex justify-between items-center my-10 w-full">
                <div className="border-t w-32" />
                <p>OR</p>
                <div className="border-t w-32" />
            </div>
            <button
                className="btn gap-2 bg-slate-100 hover:bg-zinc-900 w-full"
                onClick={() =>
                    signIn("google", {
                        callbackUrl: "/",
                    })
                }>
                <GrGoogle />
                Continue With Google
            </button>
        </div >
    );
} 