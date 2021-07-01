import React from "react";
import { Input, Form, Button, Row, Col } from "antd";
import { Form as FormikForm, Field, FormikHelpers, FieldProps } from "formik";
import { Formik, ErrorMessage } from 'formik';
import { maxLengthCreator, reqAndMaxLValCreator } from "../../../../../validators/validators";
import s from './ProfileDataForm.module.scss';
import Checkbox from "antd/lib/checkbox/Checkbox";
import TextArea from "antd/lib/input/TextArea";
import { selectProfile, selectUpdateProfileStatus } from "../../../../../Redux/selectors/profile-selector";
import { useDispatch, useSelector } from "react-redux";
import { ProfileType } from "../../../../../types/types";
import { updateProfile } from "../../../../../Redux/Profile-Reducer";
import { Preloader } from "../../../../Common/Preloader/Preloader";
import formError  from "../../../../Common/formsControl/formsControl.module.scss";
import { Modal } from 'antd';


const FormItem = Form.Item;
const maxLength = maxLengthCreator(30)

type PropsType = {
    deActivateEditMode: () => void
    editMode: boolean
}


export const ProfileDataForm: React.FC<PropsType> = React.memo(({deActivateEditMode, editMode}) => {

    const profile = useSelector(selectProfile) as ProfileType
    const dispatch = useDispatch()
    const updateProfileStatus = useSelector(selectUpdateProfileStatus)


    const submit = (values: ProfileType, actions: FormikHelpers<ProfileType>) => {
        setTimeout(() => {
            actions.setSubmitting(false);
        }, 400);
    }

    const contactsFormCreator = (errors: Partial<any>) => {
        return Object.keys(profile.contacts).map((key) => {
            return <FormItem label={key} className={`${s[key]} ${s.contact}`} key={key}>
                <Field name={`contacts.${key}`}
                    validate={maxLength}
                    render={({ field }: FieldProps) => <Input {...field} placeholder={key} />} />
                <ErrorMessage name={`contacts.${key}`} component={() => <div className={formError.fieldError}>{errors.contacts[key]}</div>} />
            </FormItem>
        })
    }


    return (
        <Formik
            enableReinitialize
            initialValues={{ ...profile }}
            validate={(value) => { }}
            onSubmit={submit}
        >
            {({ isSubmitting, values, errors, setErrors, resetForm, setSubmitting }) => (
                <Modal centered title={'Edit your profile'} visible={editMode} onCancel={deActivateEditMode} footer={[
                    <Button htmlType={"submit"} type={'primary'} onClick={() => {
                    
                            dispatch(updateProfile(values, setErrors))
                            if (!(updateProfileStatus === 'error' || updateProfileStatus === 'pending')) {
                                resetForm({})
                                deActivateEditMode()
                                setSubmitting(false)
                            }
                        
                    }}>
                        save
                    </Button>,
                    <Button onClick={() => {
                        deActivateEditMode()
                    }}>
                        cancel
                    </Button>
                ]}>
                <FormikForm className={s.form}>
                            <div className={s.pre}>
                                {updateProfileStatus === 'pending' && <div><Preloader styles={'updProfPre'}/></div>}
                            </div>
                            <Input.Group>
                                <FormItem className={s.formItem} label={'name'}>
                                    <Field name="fullName"
                                        validate={reqAndMaxLValCreator(20)}
                                        render={({ field }: FieldProps) => <Input {...field} placeholder="fullName" autoFocus={true} />} />
                                    <ErrorMessage name="fullName" component={() => <div className={formError.fieldError}>{errors.fullName}</div>} />
                                </FormItem>
                                <FormItem className={s.formItem} label={'about me'}>
                                    <Field name="aboutMe"
                                        validate={reqAndMaxLValCreator(50)}
                                        render={({ field }: FieldProps) => <TextArea {...field} placeholder="aboutMe" />} />
                                    <ErrorMessage name="aboutMe" component={() => <div className={formError.fieldError}>{errors.aboutMe}</div>} />
                                </FormItem>
                                <FormItem className={s.formItem}>
                                    <Field name="lookingForAJob"
                                        render={({ field }: FieldProps) => <Checkbox {...field} checked={values.lookingForAJob}>
                                            looking for a job
                                     </Checkbox>} />
                                    <ErrorMessage name="lookingForAJob" component={() => <div className={formError.fieldError}>{errors.lookingForAJob}</div>} />
                                </FormItem>
                                <FormItem className={s.formItem} label={'my professional skills'}>
                                    <Field name="lookingForAJobDescription"
                                        validate={reqAndMaxLValCreator(40)}
                                        render={({ field }: FieldProps) => <TextArea {...field} placeholder="lookingForAJobDescription" />} />
                                    <ErrorMessage name="lookingForAJobDescription"
                                        component={() => <div className={formError.fieldError}>{errors.lookingForAJobDescription}</div>} />
                                </FormItem>
                            </Input.Group>
                            <FormItem className={s.contacts}>
                                <div className={s.contactsHeader}>
                                    contacts
                                </div>
                                {contactsFormCreator(errors)}
                            </FormItem>                   
                </FormikForm>
                </Modal>
            )}
        </Formik>
    )
});


