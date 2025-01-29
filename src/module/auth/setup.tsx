import { Camera } from "lucide-react";
import { FormWrapper } from "@/components/ui/form/formwrapper";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import { useField } from "formik";
import { Button } from "@/components/ui/button";

export default function SetupPage() {
  // Initial form values
  const initialValues = {
    username: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(6, "Username must be at least 6 characters")
      .required("Username is required"),
  });

  // Form submission handler
  const handleSubmit = (values: Record<string, any>) => {
    console.log("Submitted values:", values);
  };

  return (
    <div className="flex flex-col w-full pt-[5rem] items-center justify-center">
      <div className="text-primary w-full max-w-sm flex flex-col gap-6">
        <div className="">
          <h1 className="text-3xl font-semibold tracking-tight text-blue-950">
            SET UP YOUR PROFILE
          </h1>
          <p className="mt-2 text-blue-950 tracking-tighter">
            Choose your picture and a unique username other users can use to
            invite you to wagers
          </p>
        </div>
        <div className="w-full h-[1px] bg-gray-100 my-2"></div>
        <div className="flex items-center justify-center bg-blue-950 rounded-3xl bg-primary w-20 h-20 relative">
          <p className="text-4xl text-white font-medium">N</p>
          <div className="absolute bottom-0 right-0 rounded-full p-2 bg-white">
            <Camera size="16" className="text-blue-950" />
          </div>
        </div>
        <FormWrapper
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          inputs={
            <div className="flex flex-col space-y-2">
              <UsernameField name="username" />
            </div>
          }
          button={
            <Button
              type="submit"
              variant="default"
              className="font-medium text-xl tracking-[-2%] h-14 rounded-2xl mt-6"
            >
              Continue
            </Button>
          }
        />
      </div>
    </div>
  );
}

const UsernameField = ({ name }: { name: string }) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center bg-[#EFF1F5] rounded-lg px-4 py-6 h-20">
        <div className="h-5">
          <span className="text-[#B9C0D4] w-24 text-base tracking-tighter">wager.strk/ </span>
          <span className="text-[#102A56] w-24 text-base tracking-tighter">@</span>
        </div>
        <div className="h-5 overflow-hidden">
          <Input
            {...field}
            type="text"
            className="flex flex-grow h-18 bg-[#EFF1F5] py-2 text-[#102A56] shadow-sm transition-colors rounded-none text-base tracking-tighter outline-none border-none"
          />
        </div>
      </div>
      {meta.touched && meta.error && (
        <span className="text-sm text-red-500">{meta.error}</span>
      )}
    </div>
  );
};