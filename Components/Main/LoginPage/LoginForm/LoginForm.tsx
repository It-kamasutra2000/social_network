import React from "react";
import { Input, Form, Button, Image } from "antd";
import { Form as FormikForm, Field, FormikHelpers, FieldProps } from "formik";
import { Formik, ErrorMessage } from 'formik';
import s from './LoginForm.module.scss';
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../Redux/auth-Reducer";
import {selectCaptchaUrl, selectErrorMessage} from '../../../../Redux/selectors/auth-selector';
import { emailValidator,  reqAndMaxLValCreator } from "../../../../validators/validators";
import formStyle from '../../../Common/formsControl/formsControl.module.scss';

const FormItem = Form.Item;


type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type FormActionsType = FormikHelpers<LoginFormValuesType>

export const LoginForm: React.FC = React.memo(() => {

    const dispatch = useDispatch()
    const captchaUrl = useSelector(selectCaptchaUrl)
    const error = useSelector(selectErrorMessage)
  

    const submit = (values: LoginFormValuesType, actions: FormActionsType,) => {
        setTimeout(() => {
            const {email, password, rememberMe, captcha} = values;
            dispatch(login(email, password, rememberMe, captcha ))
            actions.setSubmitting(false);
        }, 400);
    }


    return (
        <Formik
            initialValues={{ email: '', password: '', rememberMe: false, captcha: '', }}
            validate={(value) => {
            
            }}
            onSubmit={submit}
        >
            {({ isSubmitting, values, errors}) => (
                <FormikForm className={s.form}>
                    <FormItem label={'email'}>
                        <Field name="email"
                            validate={emailValidator}
                            render={({ field }: FieldProps) => <Input {...field}  type="email" placeholder="email" />} />
                        <ErrorMessage name="email" component={()=><div className={formStyle.fieldError}>{errors.email}</div>} />
                    </FormItem>
                    <FormItem label={'password'} >
                        <Field name="password"
                            validate={reqAndMaxLValCreator(40)}
                            render={({ field }: FieldProps) => <Input.Password {...field}  type="password" placeholder="password"/>} />
                        <ErrorMessage name="password" component={()=> <div className={formStyle.fieldError}>{errors.password}</div>} />
                    </FormItem>
                    <FormItem>
                        <Field name="rememberMe"
                            render={({ field }: FieldProps) =>   
                            <Checkbox
                            {...field}
                            checked={values.rememberMe}
                          >
                            rememberMe
                          </Checkbox>}/>
                    </FormItem>
                    {error && <div className={formStyle.formError}>{error}</div>}
                   {captchaUrl && <div className={s.captcha}>
                       <div className={s.captchaImg}> 
                            <Image src={captchaUrl}/>
                       </div>
                    <FormItem label={'captcha'}>
                        <Field name="captcha"
                            validate={reqAndMaxLValCreator(20)}
                            render={({ field }: FieldProps) => <Input {...field}  placeholder="captcha" autoFocus={true}/>} />
                        <ErrorMessage name="captcha" component={()=> <div className={formStyle.fieldError}>{errors.captcha}</div>} />
                    </FormItem>
                       </div>}
                    <Button className={s.SendButton} type={"primary"} htmlType={"submit"} disabled={isSubmitting}>
                        login
                    </Button>
                </FormikForm>
            )}
        </Formik>
    )
});
