import React from "react";
import {  Input, Form } from "antd";
import { Form as FormikForm, Field, FormikHelpers, FieldProps } from "formik";
import { Formik, ErrorMessage } from 'formik';
import { useSelector } from "react-redux";
import { selectStatus } from "../../../../../../../Redux/selectors/profile-selector";
import { maxLengthCreator } from "../../../../../../../validators/validators";
import formStyle from '../../../../../../Common/formsControl/formsControl.module.scss';


const FormItem = Form.Item;
const maxLength = maxLengthCreator(30)

type PropsType = {
    deActivateEditMode: (statusText: string)=> void
}
type StatusFormValuesType = {
    statusText: string
}

export const StatusForm: React.FC<PropsType> = React.memo(({deActivateEditMode}) => {

    const status = useSelector(selectStatus);

    const submit = (values: StatusFormValuesType, actions: FormikHelpers<StatusFormValuesType>) => {
        setTimeout(() => {
            actions.setSubmitting(false);
        }, 400);
    }

    return (
        <Formik
            initialValues={{ statusText: status } as StatusFormValuesType}
            validate={(value)=>{}}
            onSubmit={submit}
        >
            {({ values, errors}) => (
                <FormikForm onBlur={()=> {
                    if(!(values.statusText.length > 30)){
                        deActivateEditMode(values.statusText)
                    }
                }} >
                    <FormItem>
                        <Field name="statusText"
                        validate={maxLength}
                         render={({ field }: FieldProps) => <Input {...field}  placeholder="status" autoFocus={true} />} />
                        <ErrorMessage name="statusText" component={() => <div className={formStyle.fieldError}> {errors.statusText} </div>} />
                    </FormItem>
                </FormikForm>
            )}
        </Formik>
    )
});
