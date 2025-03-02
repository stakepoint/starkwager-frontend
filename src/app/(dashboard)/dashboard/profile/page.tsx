"use client"

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Copy} from "lucide-react";


export default function Profile() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-3.5 mt-10 text-blue-950 text-left block lg:hidden">
                ACCOUNT SETTINGS
            </h1>

            <Image width={24} height={24} className="pb-2 w-auto lg:hidden" src="/images/avatar_camera.svg" alt="Avatar"/>
            <div className="flex items-center gap-2 mb-10 bg-white p-1 px-2 rounded-[8px] w-fit lg:hidden">
              <span className="text-sm text-blue-950 font-medium">
                @noyi24_7
              </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-1 text-blue-950 h-4 w-4"
                >
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
            <hr className="border-t border-gray-300 my-4 lg:hidden" />

            <div className="flex justify-between items-center mt-20 h-[72px] sm:h-[78px] w-full max-w-[696px] mx-auto bg-white rounded-[16px] p-3">

                <div className="flex items-center justify-center">

                    <div className="w-[48px] h-[48px] bg-[#EFF1F5] p-3 mr-4 rounded-[16px]">
                        <Image width={20} height={20} src="/images/user_lock.svg" alt="User Lock"/>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-medium text-sm">Account Settings</p>
                        <p className="text-[#4A5578] font-normal text-xs">
                            Change your profile picture, username, and other important information.
                        </p>
                    </div>
                </div>

                <Link href="/dashboard/profile/setting">
                    <Image className="cursor-pointer" width={20} height={20} src="/images/play.svg" alt="Play"/>
                </Link>
            </div>
        </div>


    )
}