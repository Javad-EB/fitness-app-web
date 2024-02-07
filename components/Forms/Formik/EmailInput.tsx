import { FormikValues } from "formik"
import FormikErrors from "./FormikErrors"
import { Input } from "@/components/Input"
import { getFormikFieldErrors } from "@/utils/getFormikFieldErrors"

export default function EmailInput({
    formik,
    fieldName,
}: {
    formik: FormikValues
    fieldName: string
}) {
    return (
        <div className="b-5">
            <Input
                label="email"
                type="email"
                placeholder="Email Address"
                className={
                    getFormikFieldErrors({ formik, fieldName }) ? "input-error" : ""
                }
                autoComplete="email"
                {...formik.getFieldProps(fieldName)}
            />
            <FormikErrors fieldName={fieldName} formik={formik} />
        </div>
    )
}