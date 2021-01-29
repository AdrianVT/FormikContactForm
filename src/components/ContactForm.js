import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"


export default function ContactForm() {

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
      }

    const initialValues = {
        name: "",
        email: "",
        message: ""
    }

    const validate = values => {
        let errors = {}

        if(!values.name) {
            errors.name = "Please type your name"
        }

        if(!values.email) {
            errors.email = "Please type your email"
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Please type a valid email"
        }
        

        return errors
    }

    const onSubmit = (values, submitProps) => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", ...values })
          })
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.status)
                } else if(response.ok) {
                    alert("Success!")
                    submitProps.resetForm()
                } else {
                    alert("Something went wrong!")
                }

                return response
            })
            .catch(error => alert(error));
    }


    return (
        <div className="md:w-1/2 h-screen bg-green-700 px-12 flex ">
            <div className="m-auto flex-grow max-w-lg">
            <h1 className="text-4xl font-bold text-gray-800 text-center bg-green-300 rounded py-4 mb-8">Contact</h1>
            <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
            >
                <Form className="flex flex-col text-lg">
                <input type="hidden" name="form-name" value="contact" />
                    <div className="flex flex-col text-green-100 ">
                    <label>Name:</label>
                    <Field type="name" id="name" name="name" placeholder="Name" className="pl-2 rounded py-2 bg-green-50 text-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-700"/>
                    <div className="bg-red-300 text-gray-800 ml-1 px-1 max-w-max"> <ErrorMessage name="name"/></div>
                    </div>

                     <div className="flex flex-col text-green-100 mt-4">
                    <label>Email Address:</label>
                    <Field type="email" id="email" name="email" placeholder="Email Address" className="pl-2 py-2 bg-green-50 rounded text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-700" />
                    <div className="bg-red-300 text-gray-800 ml-1 px-1 max-w-max"><ErrorMessage name="email"/></div>
                    </div>


                    <div className="flex flex-col text-green-100 mt-4">
                    <label>Message:</label>
                    <Field as="textarea" id="message" name="message" placeholder="Message" className="pl-2 py-2 bg-green-50 text-gray-800 rounded focus:outline-none focus:ring-4 focus:ring-gray-700"/>
                    <ErrorMessage name="message"/>
                    </div>

                <button className="bg-green-300 text-gray-800 rounded-xl mx-8 text-center py-4 text-2xl mt-8 transistion-all hover:bg-green-400 " type="submit">Submit</button>
                </Form> 
            </Formik>
            </div>
        </div>
    )
}
