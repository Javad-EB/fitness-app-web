import { ComponentPropsWithoutRef } from "react";
import { FormikValues } from "formik";
import FormikErrors from "./Forms/Formik/FormikErrors";
import { getFormikFieldErrors } from "@/utils/getFormikFieldErrors";
interface InputProps extends ComponentPropsWithoutRef<"input"> {
    label?: string;
    inputClassName?: string;
    fieldName?: string;
    formik?: FormikValues;
}

export const Input = ({
    type,
    placeholder,
    label,
    className,
    inputClassName,
    fieldName,
    formik,
    ...rest
}: InputProps) => {
    return (
        <div className={`form-control ${className}`}>
            {label && <label className="label">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                className={`input input-bordered w-full px-4 py-2 ${inputClassName}
                ${formik && fieldName && getFormikFieldErrors({ formik, fieldName }) ? "input-error" : ""}
                `}
                {...rest}
            />
            {formik && fieldName && (
                <FormikErrors formik={formik} fieldName={fieldName} />
            )}
        </div>
    )
}