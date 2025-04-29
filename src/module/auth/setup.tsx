"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import multiavatar from "@multiavatar/multiavatar";
import parse from "html-react-parser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { useAccount } from "@starknet-react/core";
import { userService } from "@/services/api";

// Generate 30 random avatars
const mockAvatars = Array.from({ length: 30 }, (_, i) => {
  const randomString = Math.random().toString(36).substring(7);
  return {
    id: i + 1,
    string: randomString,
    svgCode: multiavatar(randomString),
  };
});

interface Avatar {
  id: number;
  string: string;
  svgCode: string;
}

export default function SetupPage() {
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [tempSelectedAvatar, setTempSelectedAvatar] = useState<Avatar | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const router = useRouter();
  const { login, tokens, isLoading } = useAuth();

  // Check username validity based on length, characters, etc.
  useEffect(() => {
    if (username.length === 0) {
      setIsUsernameValid(null);
      return;
    }

    // Simple validation: username must be at least 3 characters and only contain alphanumeric characters
    const isValid = username.length >= 4 && /^[a-z0-9_]+$/i.test(username);
    setIsUsernameValid(isValid);
  }, [username]);

  const handleSubmit = async () => {
    if (!username || !selectedAvatar || !isUsernameValid) return;
    console.log("Submitting form...");
    setError(null);

    try {
      if (!tokens?.accessToken) {
        // If no token exists, use login flow first
        const response = await login({
          address: address,
          username,
          picture: JSON.stringify(selectedAvatar.svgCode),
        });

        if (response.message?.includes("Registered")) {
          toast.success("User created successfully");
        } else {
          toast.success("Logged in successfully");
        }

        // Store user profile data in localStorage
        if (response.user) {
          localStorage.setItem("userProfile", JSON.stringify(response.user));
        }

        router.push("/dashboard");
        return;
      }

      // If token exists, update the user profile
      const updatedUser = await userService.updateUser({
        username,
        picture: JSON.stringify(selectedAvatar.svgCode),
      });

      // Store updated user profile in localStorage
      if (updatedUser) {
        localStorage.setItem("userProfile", JSON.stringify(updatedUser));
      }

      toast.success("Profile updated successfully");
      router.push("/dashboard");
    } catch (err: any) {
      console.log(err.message || err);
      const errorMessage = err?.message || String(err);
      if (
        errorMessage.toLowerCase().includes("username") ||
        errorMessage.toLowerCase().includes("exists")
      ) {
        setError("This username is already taken. Please try another one.");
        console.error(error);
        toast.error("This username is already taken. Please try another one.");
      } else {
        setError(err instanceof Error ? err.message : "Failed to update user");
        toast.error(
          err instanceof Error ? err.message : "Failed to update user"
        );
      }
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="flex flex-col w-full pt-[5rem] items-center justify-center px-4 md:px-0">
      <div className="text-primary w-full max-w-md flex flex-col gap-6">
        <div className="">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-blue-950 dark:text-white">
            SET UP YOUR PROFILE
          </h1>
          <p className="mt-2 text-blue-1 dark:text-white tracking-tighter">
            Choose your picture and a unique username other users can use to
            invite you to wagers
          </p>
        </div>
        <div className="w-full h-[1px] bg-gray-100 my-2"></div>

        <div
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center bg-secondary rounded-full w-20 h-20 relative cursor-pointer hover:opacity-90 transition-opacity overflow-hidden"
        >
          {selectedAvatar ? (
            <div className="w-full h-full">{parse(selectedAvatar.svgCode)}</div>
          ) : (
            <p className="text-4xl text-white dark:text-blue-950 font-medium">
              N
            </p>
          )}
          <div className="absolute bottom-0 right-0 rounded-full p-2 bg-white">
            <Camera size="16" className="text-blue-950" />
          </div>
        </div>

        <div className="flex flex-col w-full gap-1">
          <div className="flex items-center bg-[#EFF1F5] dark:bg-[#1F2A37] rounded-lg px-[18px] py-6 h-[72px]">
            <div className="">
              <span className="text-[#B9C0D4] w-24 text-base tracking-tighter">
                wager.strk/{" "}
              </span>
              <span className="dark:text-white text-[#102A56] w-24 text-base tracking-tighter">
                @
              </span>
            </div>
            <div className="flex flex-grow">
              <Input
                type="text"
                value={username}
                placeholder="username"
                className="flex flex-grow dark:text-white text-[#102A56] py-8 bg-transparent transition-colors rounded-none text-base tracking-tighter outline-none border border-transparent px-0 dark:placeholder-[#B9C0D4] placeholder-white"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          {username && (
            <div className="text-right text-sm font-normal">
              {isUsernameValid === true ? (
                <span className="text-success">Username format is valid</span>
              ) : isUsernameValid === false ? (
                <span className="text-error">
                  Username must be at least 3 characters and contain only
                  letters, numbers, and underscores
                </span>
              ) : null}
            </div>
          )}
        </div>

        <Button
          variant="default"
          disabled={
            !username || isLoading || !isUsernameValid || !selectedAvatar
          }
          onClick={handleSubmit}
          className="font-medium text-xl tracking-[-2%] h-14 rounded-2xl disabled:cursor-not-allowed disabled:opacity-[0.32] dark:bg-secondary"
        >
          {isLoading ? "Loading..." : "Continue"}
        </Button>
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          href="/dashboard"
        >
          Demo Skip
        </Link>
      </div>

      {/* Avatar Selection Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0  bg-black/40 z-40 backdrop-blur-sm" />

          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:w-full w-[90%] max-w-[640px] bg-white dark:bg-grey-8 rounded-3xl p-6 md:px-16 z-50 animate-modal-enter flex flex-col">
            <div className="relative text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:bg-[#1F2A37] rounded-full transition-colors absolute top-4 right-0"
              >
                <X size={20} className="text-gray-500 dark:text-white" />
              </button>
              <div className="flex flex-col justify-between items-center mb-4 mt-4">
                <h2 className="text-2xl font-semibold text-blue-950 dark:text-white">
                  Change Avatar
                </h2>
                <p className="text-gray-600 text-center mt-3 mb-4 max-w-xs dark:text-white">
                  Select a new avatar from our list of specially curated avatars
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-5 grid-cols-4 gap-4 max-h-[300px] overflow-y-auto mb-6 p-2">
              {mockAvatars.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setTempSelectedAvatar(avatar)}
                  className={`aspect-square rounded-full overflow-hidden transition-all duration-200 hover:scale-105 
                  ${
                    tempSelectedAvatar?.id === avatar.id
                      ? "ring-2 ring-white p-2"
                      : ""
                  }
                  `}
                >
                  <div className="w-full h-full"> {parse(avatar.svgCode)}</div>
                </button>
              ))}
            </div>

            <Button
              onClick={() => {
                setSelectedAvatar(tempSelectedAvatar);
                setIsModalOpen(false);
              }}
              disabled={!tempSelectedAvatar}
              className="w-full py-4 bg-secondary hover:bg-secondary text-blue-950 rounded-2xl text-lg font-medium"
            >
              Choose
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
