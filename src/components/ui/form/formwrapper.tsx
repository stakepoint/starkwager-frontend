import { Formik, Form } from "formik";
import * as Yup from "yup";

interface FormWrapperProps {
  onSubmit: (values: Record<string, any>) => void;
  inputs: React.ReactNode; // Form fields (inputs) as children
  button: React.ReactNode; // Custom button component
  initialValues: Record<string, any>; // Form's initial values
  validationSchema: Yup.ObjectSchema<any>; // Form validation schema
  formClassName?: string; // Optional class name for styling the form
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  onSubmit,
  inputs,
  button,
  initialValues,
  validationSchema,
  formClassName = "flex flex-col gap-6", // Default styling
}) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {() => (
        <Form className={formClassName}>
          {inputs}
          {button}
        </Form>
      )}
    </Formik>
  );
};