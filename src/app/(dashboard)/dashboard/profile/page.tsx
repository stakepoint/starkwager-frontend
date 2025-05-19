"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { ModalView } from "@/components/ui/modals";
import LogoutModal from "@/components/wallets/logout-modal";

export default function Profile() {
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);
  return (
    <>
      <ModalView
        open={logoutModalIsOpen}
        setOpen={setLogoutModalIsOpen}
        className="max-w-[400px] p-6 rounded-2xl"
      >
        <LogoutModal onClose={() => setLogoutModalIsOpen(false)} />
      </ModalView>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-3.5 mt-10 text-blue-950 dark:text-white block lg:hidden">
          ACCOUNT SETTINGS
        </h1>

        <Image
          width={24}
          height={24}
          className="pb-2 w-auto lg:hidden"
          src="/images/avatar_camera.svg"
          alt="Avatar"
        />
        <div className="flex items-center gap-2 mb-10 bg-white dark:bg-grey-8 p-1 px-2 rounded-[8px] w-fit lg:hidden">
          <span className="text-sm text-blue-950 dark:text-white font-medium">
            @noyi24_7
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-1 text-blue-950 h-4 w-4"
          >
            <Copy className="h-4 w-4 dark:text-white" />
          </Button>
        </div>
        <hr className="border-t border-gray-300 my-4 lg:hidden" />

        <div className="flex justify-between items-center mt-2 lg:mt-20 h-[72px] sm:h-[78px] w-full max-w-[696px] mx-auto bg-white dark:bg-grey-8 rounded-[16px] p-3">
          <div className="flex items-center justify-center">
            <div className="w-[48px] h-[48px] bg-[#EFF1F5] dark:bg-grey-7 p-3 mr-4 rounded-[16px] flex items-center justify-center">
              <Image
                width={20}
                height={20}
                src="/images/user_lock.svg"
                alt="User Lock"
                className="cursor-pointer dark:hidden"
              />
              <Image
                width={20}
                height={20}
                src="/images/user_lock.svg"
                alt="User Lock"
                className="cursor-pointer dark:block hidden invert"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-medium text-sm dark:text-white">
                Account Settings
              </p>
              <p className="text-[#4A5578] font-normal text-xs dark:text-white">
                Change your profile picture, username, and other important
                information.
              </p>
            </div>
          </div>

          <Link href="/dashboard/profile/setting">
            <Image
              className="cursor-pointer dark:hidden"
              width={20}
              height={20}
              src="/images/play.svg"
              alt="Play"
            />
            <Image
              className="cursor-pointer dark:block hidden invert"
              width={20}
              height={20}
              src="/images/play.svg"
              alt="Play"
            />
          </Link>
        </div>

        <button
          className="bg-[#EFF1F5] dark:bg-[#30374F] p-4 mt-4 md:mt-[70px] text-[#102A56] dark:text-white font-medium text-base rounded-2xl w-[343px] mx-auto"
          onClick={() => setLogoutModalIsOpen(true)}
        >
          Logout
        </button>
      </div>
    </>
  );
}
