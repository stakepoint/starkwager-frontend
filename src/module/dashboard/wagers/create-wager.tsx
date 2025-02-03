"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getSvgById } from "@/svgs";
import { FormWrapper } from "@/components/ui/form/formwrapper";
import * as Yup from "yup";
import { useField } from "formik";

export default function CreateWager() {
  // Initial form values
  const initialValues = {
    title: "",
    terms: "",
    stake: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    terms: Yup.string().required("Terms are required"),
    stake: Yup.string().required("Stake is required"),
  });

  // Form submission handler
  const handleSubmit = (values: Record<string, any>) => {
    console.log("Submitted values:", values);
  };

  return (
    <div className="w-full max-w-xl py-[4rem] mx-auto">
      <FormWrapper
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        inputs={
          <>
            <div className="grid gap-3 grid-cols-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="border-none text-blue-950">
                  <SelectItem value="category1">Category 1</SelectItem>
                  <SelectItem value="category2">Category 2</SelectItem>
                  <SelectItem value="category3">Category 3</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-shrink-0 absolute right-1 ml-2">
                {getSvgById("arrowDown", {
                  className: "w-4 h-4",
                })}
              </div>

              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Add Hashtags" className="flex-grow" />
                </SelectTrigger>
                <SelectContent className="border-none text-blue-950">
                  <SelectItem value="tag1">Tag 1</SelectItem>
                  <SelectItem value="tag2">Tag 2</SelectItem>
                  <SelectItem value="tag3">Tag 3</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-shrink-0 absolute right-1 ml-2">
                {getSvgById("arrowDown", {
                  className: "w-4 h-4",
                })}
              </div>
            </div>

            {/* Title of wager field */}
            <div>
              <div className="mt-3">
                <label
                  htmlFor="title"
                  className="text-sm tracking-tight text-blue-950"
                >
                  Title of your wager
                </label>
                <InputField
                  name="title"
                  id="title"
                  placeholder="wager.strk/"
                  className="h-14 rounded-[12px] border-none bg-accent-100 placeholder:text-[#B9C0D4] shadow-none focus:ring-0 mt-1 outline-none"
                />
              </div>
              <span className="flex justify-end text-sm py-2 text-gray-400">
                0/50
              </span>
            </div>

            {/* Description of wager field */}
            <div>
              <div>
                <label
                  htmlFor="terms"
                  className="text-sm tracking-tight text-blue-950"
                >
                  Terms or Wager Description
                </label>
                <InputField
                  name="terms"
                  id="terms"
                  placeholder="wager.strk/"
                  className="h-14 rounded-[12px] border-none bg-accent-100 placeholder:text-[#B9C0D4] shadow-none focus:ring-0 mt-1 outline-none"
                />
              </div>
              <span className="flex justify-end text-sm py-2 text-gray-400">
                0/1000
              </span>
            </div>

            {/* Strk field */}
            <div>
              <div>
                <label
                  htmlFor="stake"
                  className="text-sm tracking-tight text-blue-950"
                >
                  Stake
                </label>
                <InputField
                  name="stake"
                  id="stake"
                  placeholder="0 Strk"
                  className="h-14 rounded-[12px] border-none bg-accent-100 placeholder:text-[#B9C0D4] shadow-none focus:ring-0 mt-1 outline-none"
                />
              </div>
              <span className="flex justify-end text-sm py-2 text-gray-400">
                You have 50.00 Strk
              </span>
            </div>
          </>
        }
        button={
          <div className="flex justify-center pt-5">
            <Button className="w-full">Continue</Button>
          </div>
        }
      />
    </div>
  );
}

const InputField = ({ name, ...props }: { name: string; [key: string]: any }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <Input {...field} {...props} />
      {meta.touched && meta.error && (
        <span className="text-sm text-red-500">{meta.error}</span>
      )}
    </div>
  );
};