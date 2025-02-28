import { Timer } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";

const ClaimWager = () => {
    const leftUser = {
        icon: '/images/leftWagercardUserOneIcon.svg',
        username: '@noyi24_7'
    }
    const rightUser = {
        icon: '/images/RightWagercardUserOneIcon.svg',
        username: '@babykeem'
    }
  return (
    <div className="bg-[#EFF1F5] p-4 md:p-6 rounded-3xl">
        <h2 className="text-blue-1  font-medium text-xl tracking-[-2%] mb-2">Claimed Wagers</h2>
        <div className="bg-white border border-[#EFF1F5] rounded-2xl px-2 py-5">
            {/* stake */}
            <div className="text-center px-2 md:px-0">
                <div className="flex justify-center gap-2.5 items-center">
                    <div className="rounded-full w-2 h-2 bg-[#17B26A]"></div>
                    <p className="tracking-[-2%] md:text-base text-sm text-[#4A5578] leading-[20.8px]">In Progress</p>
                </div>
                <p className="text-blue-1  tracking-[-2%] md:text-lg font-medium my-2.5 leading-[23.4px]">Will Bitcoin Hit $100k Before January 31, 2025?</p>
                <div className="flex justify-center mb-8">
                    <div className="bg-[#EFF1F5] rounded-full px-2 py-2 flex items-center gap-2">
                        <Image
                        src="/images/StrkLogo.svg"
                        alt="STRK"
                        className="w-4 h-4"
                        width={30}
                        height={30}
                        />
                        <span className="text-blue-1 font-medium text-sm md:text-base leading-[20.8px]">
                        5 Strk each
                        </span>
                    </div>
                </div>
            </div>
            {/* Users */}
           <div className="flex justify-between items-center gap-4 md:gap-8 px-6 md:px-10 lg:px-14">
                {/* Left User */}
                <div className="text-center">
                    <Image
                    src={leftUser.icon}
                    alt={leftUser.username}
                    width={56}
                    height={56}
                    className="w-14 h-14 md:w-20 md:h-20 rounded-lg mb-1"
                    />
                    <span className="text-blue-1 font-medium text-[12px] md:text-sm">
                    {leftUser.username}
                    </span>
                </div>
        
                {/* VS Text */}
                <div className="flex flex-col gap-1.5 items-center">
                    <span className="text-[#4A5578] text-[12px] md:text-sm">
                    One-on-One
                    </span>
                    <span className="text-blue-1 text-2xl md:text-3xl lg:text-4xl font-bold italic">
                    VS
                    </span>
                    <span className="text-[#F04438] text-[12px] lg:text-sm"><Timer className="inline w-4 h-4 align-top" /> {' '}15:59</span>
                </div>
        
                {/* Right User */}
                <div className="text-center">
                    <Image
                    src={rightUser.icon}
                    alt={rightUser.username}
                    width={56}
                    height={56}
                    className="w-14 h-14 md:w-20 md:h-20 rounded-lg mb-1"
                    />
                    <span className="text-blue-1 font-medium text-[12px] md:text-sm">
                    {rightUser.username}
                    </span>
                </div>
            </div>

            <div className="px-4 py-5">
                {/* divider */}
                <div className="w-full border-b-2 border-dashed border-[#E2E5EB] my-2.5"></div>
                <div className="flex justify-center mt-7 mb-2">
                    <div className="bg-[#EFF1F5] rounded-full px-3 py-2 flex items-center gap-2">
                        <p className=" text-sm md:text-base leading-[20.8px]">
                            <span className="text-blue-1 font-medium">@babykeem</span> claimed this wager 🏅
                        </p>
                    </div>
                </div>
                {/* button */}
                <div className="flex gap-3 mt-5">
                    <Button className="w-full bg-[#102A56] flex items-center md:text-lg text-white font-medium">
                        Disagree
                    </Button>
                    <Button className="w-full flex items-center md:text-lg font-medium">
                        Agree
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ClaimWager