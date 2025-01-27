// Form component wrapper for Formik usage
import { Formik, Form } from "formik";
import * as Yup from "yup";

interface FormWrapperProps {
  onSubmit: (values: Record<string, any>) => void;
  inputs: React.ReactNode; // Accept Input components or other inputs as props
  button: React.ReactNode; // Accept a custom button as a prop
  initialValues: Record<string, any>; // Configurable initial values
  validationSchema: Yup.ObjectSchema<any>; // Configurable validation schema
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  onSubmit,
  inputs,
  button,
  initialValues,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          {inputs}
          {button}
        </Form>
      )}
    </Formik>
  );
};