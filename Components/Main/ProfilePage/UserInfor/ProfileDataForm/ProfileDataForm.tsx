import React from "react";
import { Input, Form, Button } from "antd";
import { Form as FormikForm, FormikHelpers } from "formik";
import { Formik } from 'formik';
import Checkbox from "antd/lib/checkbox/Checkbox";
import TextArea from "antd/lib/input/TextArea";
import { Modal } from 'antd';
import { useDispatch, useSelector } from "react-redux";

import { maxLengthCreator, reqAndMaxLValCreator } from "../../../../../validators/validators";
import s from './ProfileDataForm.module.scss';
import { selectUpdateProfileStatus } from "../../../../../Redux/selectors/profile-selector";
import { ProfileType } from "../../../../../types/types";
import { updateProfile } from "../../../../../Redux/Profile-Reducer";
import { Preloader } from "../../../../Common/Preloader/Preloader";
import { createField } from "../../../../Common/formsControl/formControls";


const FormItem = Form.Item;
const maxLength = maxLengthCreator(30);

export const ProfileDataForm: React.FC<ProfileDataFormPropsType> = React.memo(({ deActivateEditMode, editMode, profile }) => {

    const dispatch = useDispatch()
    const updateProfileStatus = useSelector(selectUpdateProfileStatus)

    const submit = (values: ProfileType, actions: FormikHelpers<ProfileType>) => {
        setTimeout(() => {
            actions.setSubmitting(false);
        }, 400);
    }

    const contactsFormCreator = (errors: Partial<any>) => {
        return Object.keys(profile.contacts).map((key) => {
           return  createField({
                label: key,
                className: `${s[key]}`,
                fieldName: `contacts.${key}`,
                fieldError: errors.contacts?.[key],
                Component: Input,
                validate: maxLength,
                properties: { 'data-testid': 'contact_input', placeholder: key }

            })
        })
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{ ...profile }}
            validate={() => { }}
            onSubmit={submit}
        >
            {({ values, errors, setErrors, resetForm, setSubmitting }) => (
                <Modal centered title={'Edit your profile'} visible={editMode} onCancel={deActivateEditMode} footer={[
                    <Button data-testid='button_submit' htmlType={"submit"} type={'primary'} onClick={() => {
                        if (Object.keys(errors).length === 0 && errors.constructor === Object) {
                            dispatch(updateProfile(values, setErrors))
                            if (!(updateProfileStatus === 'error' || updateProfileStatus === 'pending')) {
                                resetForm({})
                                deActivateEditMode()
                                setSubmitting(false)
                            }
                        }
                    }}>
                        save
                    </Button>,
                    <Button data-testid='cancel_button' onClick={() => {
                        deActivateEditMode()
                    }}>
                        cancel
                    </Button>
                ]}>
                    <FormikForm data-testid='form' className={s.form}>
                        <div className={s.pre}>
                            {updateProfileStatus === 'pending' && <div><Preloader styles={'updProfPre'} /></div>}
                        </div>
                        <Input.Group>
                            {createField<'fullName'>({
                                label: 'name',
                                fieldName: 'fullName',
                                className: s.formItem,
                                fieldError: errors.fullName,
                                Component: Input,
                                validate: reqAndMaxLValCreator(20),
                                properties: { autoFocus: true, placeholder: "fullName" }

                            })}
                            {createField({
                                label: 'aboutMe',
                                fieldName: 'aboutMe',
                                fieldError: errors.aboutMe,
                                className: s.formItem,
                                Component: TextArea,
                                validate: reqAndMaxLValCreator(50),
                                properties: {placeholder: "aboutMe" }

                            })}
                             {createField({
                                fieldName: 'lookingForAJob',
                                fieldError: errors.lookingForAJob as string,
                                properties: { checked: values.lookingForAJob },
                                className: s.formItem,
                                Component: Checkbox,
                            })}
                            {createField({
                                label: 'lookingForAJobDescription',
                                fieldName: 'lookingForAJobDescription',
                                fieldError: errors.lookingForAJobDescription,
                                className: s.formItem,
                                Component: TextArea,
                                validate: reqAndMaxLValCreator(40),
                                properties: {placeholder: "lookingForAJobDescription" }

                            })}
                        </Input.Group>
                        <FormItem className={s.contacts}>
                            <div data-testid="contacts" className={s.contactsHeader}>
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

