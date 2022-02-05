import FormItem from "antd/lib/form/FormItem"
import { ErrorMessage, Field, FieldProps } from "formik"
import formError from '../../Common/formsControl/formsControl.module.scss'

interface ICreateFiled {
    label?: string
    fieldName?: string
    validate?: (value?: any) => string | undefined
    isCheckbox?: boolean
    checkboxText?: string
    properties?: {[key: string]: any}
    fieldError?: string
    Component?: any
    key?: string 
    className?: string
}

export function createField<T extends string> ({label, fieldName, validate, properties, fieldError, Component, key,className}: ICreateFiled) {
    return <FormItem className={className || ''} label={label} key={key}>
        <Field name={fieldName as T}
            validate={validate}
            render={({ field }: FieldProps) => <Component {...field} {...properties} />} />
        <ErrorMessage name={fieldName || ''} component={() => <div className={formError.fieldError}>{fieldError}</div>} />
    </FormItem>
} 