import { Formwix } from "formwix";
import "formwix/dist/formwix.css";
import React from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const contactFormConfig = {
    fields: [
      {
        type: "text",
        name: "name",
        label: "Name",
        placeholder: "Your name",
        validation: {
          required: {
            value: true,
            message: "Name is required",
          },
        },
      },
      {
        type: "email",
        name: "email",
        label: "Email",
        placeholder: "Your email address",
        validation: {
          required: {
            value: true,
            message: "Email is required",
          },
        },
      },
      {
        type: "select",
        name: "subject",
        label: "Subject",
        options: [
          {
            label: "General Inquiry",
            value: "general",
          },
          {
            label: "Technical Support",
            value: "support",
          },
          {
            label: "Sales",
            value: "sales",
          },
          {
            label: "Feedback",
            value: "feedback",
          },
          {
            label: "Other",
            value: "other",
          },
        ],
        validation: {
          required: {
            value: true,
            message: "Please select a subject",
          },
        },
      },
      {
        type: "textarea",
        name: "message",
        label: "Message",
        placeholder: "Your message",
        rows: 6,
        validation: {
          required: {
            value: true,
            message: "Message is required",
          },
          minLength: {
            value: 10,
            message: "Please provide a more detailed message",
          },
        },
      },
      {
        type: "checkbox",
        name: "newsletter",
        placeholder: "Subscribe to our newsletter",
        label: "Subscribe to our newsletter",
      },
    ],
    onSubmit: async (data, { reset }) => {
      toast.success("Form submitted successfully!");
      reset();
    },
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 max-w-3xl mx-auto`}
    >
      <h1 className="mb-4 text-3xl font-bold text-green-600 md:text-4xl">
        Get in Touch
      </h1>
      <p className="max-w-xl mb-8 text-center">
        Whether you're a farmer, buyer, or just curious — we’re here to help!
        Fill out the form below and we’ll get back to you shortly.
      </p>
      <div className="w-full">
        <Formwix config={contactFormConfig} />
      </div>
    </div>
  );
};

export default Contact;
