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
import {
  useCreateWagerContext,
  WagerDataState,
} from "@/contexts/createWager.context";
import { useRouter } from "next/navigation";
import { useWallet } from "@/contexts/WalletContext";
import { Spinner } from "@/components/ui/spinner";
import { Hash, X } from "lucide-react";

// Create a function that returns the schema with the current balance
const createWagerSchema = (userBalance: number) =>
  z.object({
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

export default function CreateWager() {
  const [openHashtagSelector, setOpenHashtagSelector] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { balance, isLoading: isBalanceLoading } = useWallet();
  const userBalance = parseFloat(balance || "0");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<WagerFormData>({
    resolver: zodResolver(createWagerSchema(userBalance)),
    defaultValues: {
      category: "",
      hashtags: [],
      title: "",
      terms: "",
      stake: undefined,
    },
  });

  const { setWagerData } = useCreateWagerContext();

  const title = watch("title");
  const terms = watch("terms");
  const selectedTags = watch("hashtags");

  const removeHashtag = (tagToRemove: string) => {
    const updatedTags = selectedTags.filter(tag => tag !== tagToRemove);
    setValue("hashtags", updatedTags, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<WagerFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      const result: WagerDataState = {
        category: data.category,
        hashtags: data.hashtags,
        title: data.title,
        terms: data.terms,
        stake: data.stake,
        mode: "HeadToHead",
        claim: "Yes",
        resolutionTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      };

      setWagerData(result);
      const formattedTitle = result.title.replace(/\s+/g, "-");
      router.push(`/dashboard/create-wager/${formattedTitle}`);
      // console.log("Wager data saved to context:", result);
    } catch (error) {
      console.error("Submission Errosr:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only one type needed now (stake is number)
  type WagerFormData = z.infer<ReturnType<typeof createWagerSchema>>;

  return (
    <div className="w-full max-w-xl py-[4rem] mx-auto ">
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

        {/* Selected Hashtags Pills */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-white dark:bg-grey-7 space-x-2 px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 transition-colors"
              >
                <span className="pr-1">
                  <Hash className="h-4 w-4 p-1 dark:bg-white dark:text-blue-1 bg-blue-1 text-white rounded" />
                </span>
                {tag}
                <button
                  type="button"
                  onClick={() => removeHashtag(tag)}
                  className="ml-1 rounded-full p-1 hover:bg-gray-300 dark:hover:bg-grey-6 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

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
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span>Processing...</span>
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
