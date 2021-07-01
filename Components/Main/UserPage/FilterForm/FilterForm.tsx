import React from "react";
import { Input, Form, Select, Button } from "antd";
import { Form as FormikForm, Field, FormikHelpers, FieldProps } from "formik";
import { Formik, ErrorMessage } from 'formik';
import { FilterType } from "../../../../Redux/User-Reducer";
import s from './FilterForm.module.scss';
import { useSelector } from "react-redux";
import { selectFilter } from "../../../../Redux/selectors/user-selector";
import { maxLengthCreator } from "../../../../validators/validators";
import formStyle from '../../../Common/formsControl/formsControl.module.scss';


const Option = Select.Option
const FormItem = Form.Item;
const maxLength = maxLengthCreator(30)

type PropsType = {
    onFilterHandler: (filter: FilterType) => void
}
type FilterFormValuesType = {
    term: string
    friend: string
}

export const FilterForm: React.FC<PropsType> = React.memo(({onFilterHandler}) => {

    const filter = useSelector(selectFilter)

    const submit = (values: FilterFormValuesType, actions: FormikHelpers<FilterFormValuesType>) => {
        setTimeout(() => {
            const filter: FilterType = {
                term: values.term,
                friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
            }
            onFilterHandler(filter)
            actions.setSubmitting(false);
        }, 400);
    }


    return (
        <Formik
            enableReinitialize
            initialValues={{ term: filter.term,  friend: String(filter.friend)}}
            validate={(value) => { }}
            onSubmit={submit} 
        >
            {({ isSubmitting, values, setFieldValue, errors}) => (
                <FormikForm className={s.form}>
                    <FormItem>
                        <Field name="term"
                            validate={maxLength}
                            render={({ field }: FieldProps) => <Input {...field} placeholder="userName" autoFocus={true} />} />
                        <ErrorMessage name="term" component={()=><div className={formStyle.fieldError}>{errors.term}</div>} />
                    </FormItem>
                        <FormItem>
                        <Field  name={'friend'}
                            placeholder={"HELLO"}
                            render={({ field }: FieldProps) => 
                             <Select 
                                className={s.select}
                                {...field}
                                onChange={value => setFieldValue("friend", value)}
                                value={values.friend}
                            >
                                <Option value="null">all</Option>
                                <Option value="true">follow</Option>
                                <Option value="false">unFollow</Option>
                            </Select>
                            } />
                        </FormItem>
                    <Button className={s.SendButton} type={"primary"} htmlType={"submit"} disabled={isSubmitting}>
                        find
                    </Button>
                </FormikForm>
            )}
        </Formik>
    )
});
