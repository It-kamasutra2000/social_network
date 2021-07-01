import React from "react"
import s from './ChatForm.module.scss';
import { Form, Button, Row, Col } from "antd";
import { Form as FormikForm, Field, FormikHelpers, FieldProps } from "formik";
import { Formik, ErrorMessage } from 'formik';
import { maxLengthCreator } from "../../../../validators/validators";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../../Redux/Chat-Reducer";
import { selectWsStatus } from "../../../../Redux/selectors/chat-selector";
import formStyle from '../../../Common/formsControl/formsControl.module.scss';

const FormItem = Form.Item;


type ChatFormValuesType = {
    messageText: string
}

export const ChatForm: React.FC = React.memo(() => {

    const dispatch = useDispatch();
    const wsStatus = useSelector(selectWsStatus);

    const submit = (values: ChatFormValuesType, actions: FormikHelpers<ChatFormValuesType>) => {
        setTimeout(() => {
            dispatch(sendMessage(values.messageText));
            actions.setSubmitting(false);
            actions.resetForm({});
        }, 400);
    }


    return (
        <Formik
            initialValues={{ messageText: '' }}
            validate={(value) => { }}
            onSubmit={submit}
        >
            {({ isSubmitting, errors, values }) => (
                <FormikForm className={s.form}>
                            <FormItem className={s.formItem}>
                                <Field name="messageText"
                                    validate={maxLengthCreator(100)}>
                                    {({ field }: FieldProps) => <TextArea showCount {...field} placeholder="message body" autoFocus={true} />}
                                </Field>
                                <ErrorMessage name="messageText" component={() => <div className={formStyle.fieldError}>{errors.messageText}</div>} />
                            </FormItem>
                    <Button className={s.SendButton}  type={"primary"} htmlType={"submit"} disabled={ isSubmitting || wsStatus === 'close' || !values.messageText }>
                        add
                    </Button>
                </FormikForm>
            )}
        </Formik>
    )
});
