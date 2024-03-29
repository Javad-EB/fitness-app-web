import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import PasswordInput from "@/components/Forms/Formik/PasswordInput";
import Page from "@/components/Page";
import { resetPasswordSchema } from "@/constants";
import { resetPassword } from "@/services/auth";
export default function ResetPassword() {
    const router = useRouter()
    const token = router.query?.token
    const formik = useFormik({
        initialValues: {
            password: "",
            passwordRepeat: "",
        },
        validationSchema: resetPasswordSchema,
        onSubmit: async ({ password, passwordRepeat }) => {
            if (!token || typeof token !== "string")
                return toast.error(
                    "Unable to reset your password. Please try click to email link again or going through the forgot password process.",
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    }
                )
            const passwordReset = await resetPassword({
                password,
                passwordRepeat,
                token,
            });
            if (passwordReset) {
                toast.success("Your password has been reset.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return router.push("/auth/login");
            }
        }
    })
    return (
        <Page title="Reset Password" content="Reset Password">
            <section className="flex justify-center items-center">
                <div className="flex flex-col items-center sm:w-96 w-full">
                    <div className="py-16 px-4 rounded-lg w-full">
                        <h2 className="font-semibold text-3xl text-center pb-10">
                            Reset Password
                        </h2>

                        <form onSubmit={formik.handleSubmit}>
                            <PasswordInput formik={formik} fieldName="password" />
                            <PasswordInput
                                formik={formik}
                                fieldName="passwordRepeat"
                                label="Repeat Password"
                                placeholder="Repeat Password"
                            />

                            <button type="submit" className="btn btn-block">
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </Page>
    )
}