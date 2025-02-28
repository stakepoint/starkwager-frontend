"use client"

import * as React from "react";
import Image from "next/image";
import Link from "next/link";


export default function Profile() {
    return (
        <div
            className="flex justify-between items-center mt-20 h-[72px] w-[696px] mx-auto  bg-white rounded-[16px] p-3">
            <div className="flex items-center justify-center">

                <div className="w-[48] h-[48] bg-[#EFF1F5] p-3 mr-4 rounded-[16px] ">
                    <Image width={20} height={20} src="/images/user_lock.svg" alt="User Lock"/>
                </div>

                <div className="flex flex-col">
                    <p className="font-medium text-sm">Account Settings</p>
                    <p className="text-[#4A5578] font-normal text-xs">Change your profile picture, username, and other
                        important information.</p>
                </div>
            </div>

            <Link href="/dashboard/profile/setting">
                <Image  className="cursor-pointer" width={20} height={20} src="/images/play.svg"
                        alt="Play"/>
            </Link>


        </div>

    )
}