import React from "react";
import {Formik, Form, Field, FormikValues, FormikBag, FormikHelpers} from "formik";
import {Button, LinearProgress} from '@material-ui/core';
import {TextField} from "formik-material-ui";
import * as Yup from 'yup';

import * as expenceTypes from "./ExpenceTypes";


export class ExpencesAdd extends React.Component<any, any> {
    private validationSchema: Yup.ObjectSchema<{ name: string; amount: number; description: string | undefined } | undefined>;
    private initialValues: expenceTypes.iState;


    constructor(props: any) {
        super(props);

        this.validationSchema = Yup.object({
            name: Yup.string()
                .max(15, 'Название не более 15 символов')
                .required('Required'),
            description: Yup.string()
                .max(200, 'Must be 200 characters or less'),
            amount: Yup.number()
                .required('Required'),
        });

        this.initialValues = {name: "", description: "", amount: 0};

    }

    subfmitForm = (values: expenceTypes.iState, formikHelpers: FormikHelpers<expenceTypes.iState>) => {
        console.log(values);

        // https://stackoverflow.com/questions/35192841/fetch-post-with-multipart-form-data
        // Per this article make sure not to set the Content-Type header. The browser will set it for you, including the boundary parameter.

        const formData = new FormData();
        for (let v in values) {
            // @ts-ignore
            formData.append(v, values[v]);
        }
        fetch('/api/expenses/', {
            method: 'POST',
            body: formData
        }).then((response) => {
            return response.json();
        }).then((data) => {
            // после создания вернет тот же объект
            console.log('Запись создана');
            console.log(data);
            formikHelpers.setSubmitting(false);
        });

    }

    render() {
        return (
            <Formik initialValues={this.initialValues}
                    validationSchema={this.validationSchema}
                    onSubmit={this.subfmitForm}
            >
                {({submitForm, isSubmitting}) => (
                    <Form>
                        <Field
                            component={TextField}
                            name="name"
                            type="text"
                            label="Name"
                        />
                        <Field
                            component={TextField}
                            name="description"
                            type="text"
                            label="Description"
                        />
                        <Field
                            component={TextField}
                            name="amount"
                            type="number"
                            label="Amount"
                        />
                        {isSubmitting && <LinearProgress/>}
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        );
    }
}