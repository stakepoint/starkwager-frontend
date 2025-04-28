"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { HashtagSelector } from "@/components/ui/modals/HashtagSelector";
import CategoryDropdown from "@/components/ui/CategoryDropdown";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { useCreateWager } from "@/hooks/wager/useWager";

// Assuming userBalance is available in the component scope (i.e from the starknet provider)
// Replace 50.00 with the actual balance variable
const userBalance = 50.0;

// Simplified schema: stake is always a number
const wagerSchema = z.object({
  category: z.string().min(1, "Category is required"),
  hashtags: z.array(z.string()).min(1, "At least one hashtag is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title cannot exceed 50 characters"),
  terms: z
    .string()
    .min(1, "Terms are required")
    .max(1000, "Terms cannot exceed 1000 characters"),
  stake: z
    .number()
    .int("Stake must be a whole number")
    .positive("Stake must be a positive number")
    .max(
      userBalance,
      `Stake cannot exceed your balance of ${userBalance} Strk`
    ),
});

// Only one type needed now (stake is number)
type WagerFormData = z.infer<typeof wagerSchema>;

export default function CreateWager() {
  const [openHashtagSelector, setOpenHashtagSelector] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<WagerFormData>({
    resolver: zodResolver(wagerSchema),
    defaultValues: {
      category: "",
      hashtags: [],
      title: "",
      terms: "",
      stake: undefined,
    },
  });

  // const { createWager } = useCreateWager();

  const title = watch("title");
  const terms = watch("terms");
  const selectedTags = watch("hashtags");

  const onSubmit: SubmitHandler<WagerFormData> = async (data) => {
    console.log(data);

    setIsSubmitting(true);
    setError(null);

    try {
      // const result = await createWager({
      //   category: data.category,
      //   title: data.title,
      //   terms: data.terms,
      //   stake: data.stake.toString(),
      //   mode: "0",
      //   claim: "0",
      //   resolutionTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      // });

      // console.log("Transaction result:", result);

      setIsSubmitting(false);
      // TODO: Add success feedback (e.g., toast notification)
      // TODO: Consider resetting the form: reset();
    } catch (error) {
      setIsSubmitting(false);
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(message);
      console.error("Submission Error:", error);
    }
  };

  return (
    <div className="w-full max-w-xl py-[4rem] mx-auto ">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex gap-3">
          <div>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <CategoryDropdown
                  onSelect={(category) => field.onChange(category)}
                />
              )}
            />
            {errors.category && (
              <span className="text-red-500 text-sm">
                {errors.category.message}
              </span>
            )}
          </div>

          <div className="flex-grow">
            <Select onValueChange={(value) => console.log(value)}>
              <SelectTrigger
                className="dark:bg-dark-input-bg dark:text-white h-[72px]"
                onClick={() => setOpenHashtagSelector(true)}
              >
                <SelectValue placeholder="Add Hashtags" className="flex-grow" />
              </SelectTrigger>
            </Select>

            <HashtagSelector
              open={openHashtagSelector}
              onOpenChange={setOpenHashtagSelector}
              selectedTags={selectedTags}
              onTagsChange={(tags) =>
                setValue("hashtags", tags, { shouldValidate: true })
              }
            />
            {errors.hashtags && (
              <span className="text-red-500 text-sm">
                {errors.hashtags.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <div className="mt-3">
            <label
              htmlFor="title"
              className="text-sm tracking-tight text-blue-1 dark:text-white font-medium mb-3"
            >
              Title of your wager
            </label>
            <Input
              id="title"
              {...register("title")}
              maxLength={50}
              className="h-14 rounded-[12px] border-none bg-accent-100 placeholder:text-[#B9C0D4] dark:placeholder:text-[#6C737F] shadow-none focus:ring-0 mt-3 outline-none dark:bg-dark-input-bg"
              placeholder="wager.strk/"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <span className="flex justify-end text-sm py-2 text-gray-400 dark:text-[#B9C0D4]">
            {title?.length || 0}/50
          </span>
        </div>

        <div>
          <div>
            <label
              htmlFor="terms"
              className="text-sm tracking-tight text-blue-1 dark:text-white font-medium"
            >
              Terms or Wager Description
            </label>
            <Input
              id="terms"
              {...register("terms")}
              maxLength={1000}
              className="h-14 rounded-[12px] border-none bg-accent-100 placeholder:text-[#B9C0D4] dark:placeholder:text-[#6C737F] shadow-none focus:ring-0 mt-1 outline-none dark:bg-dark-input-bg"
              placeholder="wager.strk/"
            />
            {errors.terms && (
              <span className="text-red-500 text-sm">
                {errors.terms.message}
              </span>
            )}
          </div>
          <span className="flex justify-end text-sm py-2 text-gray-400 dark:text-[#B9C0D4]">
            {terms?.length || 0}/1000
          </span>
        </div>

        <div>
          <div>
            <label
              htmlFor="stake"
              className="text-sm tracking-tight text-blue-1 dark:text-white font-medium"
            >
              Stake
            </label>
            <Input
              id="stake"
              type="number"
              {...register("stake", { valueAsNumber: true })}
              className="h-14 rounded-[12px] border-none bg-accent-100 placeholder:text-[#B9C0D4] dark:placeholder:text-[#6C737F] shadow-none focus:ring-0 mt-1 outline-none dark:bg-dark-input-bg"
              placeholder="0 Strk"
              min="0"
              step="1"
            />
            {errors.stake && (
              <span className="text-red-500 text-sm">
                {errors.stake.message}
              </span>
            )}
          </div>
          <span className="flex justify-end text-sm py-2 text-gray-400 dark:text-[#B9C0D4]">
            You have {userBalance.toFixed(2)} Strk
          </span>
        </div>

        <div className="flex justify-center pt-5">
          <Button
            type="submit"
            className="w-full max-w-[384px] text-lg font-medium tracking-[-0.36px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
