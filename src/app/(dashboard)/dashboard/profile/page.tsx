import {Input} from "@/components/ui/input";
import * as React from "react";
import {Button} from "@/components/ui/button";

export default function Profile() {
    return (
        <div className="flex justify-between flex-col w-[50%] mx-auto py-[6em] ">
            <div>
                <img className='pb-2' src='/images/avatar_camera.svg' alt="Avatar" />
                <Input
                    id="title"
                    className=" h-14 rounded-[12px]  border-none bg-accent-100 placeholder:text-[#B9C0D4] shadow-none focus:ring-0  mt-3 outline-none"
                    placeholder="Full Name"
                />
                <Input
                    id="title"
                    className=" h-14 rounded-[12px]  border-none bg-accent-100 placeholder:text-[#B9C0D4] shadow-none focus:ring-0  mt-3 outline-none"
                    placeholder="wager.strk/"
                />
            </div>
            <div className="flex justify-center pt-[8rem]">
                <Button className="w-full max-w-[384px] text-lg font-medium tracking-[-0.36px]">Update Changes</Button>
            </div>
        </div>
    )
}