import {Input} from "@/components/ui/input";
import * as React from "react";
import {Button} from "@/components/ui/button";

export default function Profile() {
    return (
        <div className="flex flex-col justify-between w-full max-w-[500px] lg:max-w-[50%] mx-auto py-16 px-4 lg:px-0 items-start min-h-[90%]">
            <div className="w-full">
                <h1 className="text-3xl font-bold mb-3.5 text-blue-950 text-left block lg:hidden">
                    Profile
                </h1>

                <img className="pb-2 w-auto" src="/images/avatar_camera.svg" alt="Avatar" />

                <Input
                    id="fullName"
                    className="h-14 rounded-[12px] border-none bg-accent-100 placeholder:text-[#B9C0D4] shadow-none focus:ring-0 mt-3 outline-none w-full"
                    placeholder="Full Name"
                />
                <Input
                    id="username"
                    className="h-14 rounded-[12px] border-none bg-accent-100 placeholder:text-[#B9C0D4] shadow-none focus:ring-0 mt-3 outline-none w-full"
                    placeholder="wager.strk/"
                />
            </div>
            <div className="flex justify-start w-full  lg:pt-8 lg:-mt-6">
                <Button className="w-full max-w-[384px] text-lg font-medium tracking-[-0.36px]">
                    Update Changes
                </Button>
            </div>
        </div>

    )
}