"use client";
import Image from "next/image";
import WalletBar from "../ui/wallet-bar";
import ConnectWalletBtn from "../ui/connect-wallet-btn";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div>
      <div className="hidden md:flex mx-auto px-4 md:max-w-2xl xl:max-w-5xl  2xl:max-w-7xl justify-center items-center  md:pt-32 relative">
        <div className=" text-white w-full relative overflow-hidden min-h-[700px] md:min-h-[700px] ">
          <div className="hidden md:flex justify-between w-full">
            {" "}
            <h1 className="font-comedik text-[#6C737F] font-semibold hidden  md:block text-lg md:text-xl lg:text-[28px]">
              OPENING <br /> WAGER PLACED
            </h1>
            {/* Connect wallet button */}
            <div className=" z-10 max-sm:mb-4">
              {isMobile ? <ConnectWalletBtn /> : <WalletBar isWeb={true} />}
            </div>
          </div>

          {/* Main Content */}
          <div className=" flex flex-col  ">
            {/* The "300" with image */}
            <div className="relative flex  items-center md:ml-[73px]">
              <div className="text-white font-schabo tracking-wide text-[200px] md:text-[250px] lg:text-[320px] leading-none">
                300
              </div>

              <div className=" text-white font-schabo tracking-wide h-full text-[60px] md:text-[80px] lg:text-[80px] leading-[0.9]  lg:w-[20rem] max-sm:w-[19rem] md:w-[16rem]">
                WAGERS HAVE BEEN PLACED
              </div>
              <div className="absolute b md:-bottom-24 lg:-bottom-16  -right-[6rem] md:-left-[5rem] lg:-left-[6rem]">
                <div className="flex">
                  <Image
                    src="/images/hero/heroimage.png"
                    alt="Person with smartphone"
                    width={273}
                    height={219}
                    className="w-48 md:w-64 lg:w-[273px] lg:h-[219px]"
                    priority
                  />
                  <div className="space-y-6 relative top-36 left-10 text-[#E0FE10] font-comedik font-semibold  text-[20px] md:text-[25px] lg:text-3xl max-w-[90%] md:max-w-[80%] lg:max-w-[70%]">
                    <div className="flex relative">
                      {" "}
                      <div className="rotate-[-2deg]">
                        BUT BEFORE THE NEXT MAJOR EVENT,
                        <br />
                        LET&apos;S MAKE SURE YOUR WAGERS ARE
                        <br />
                        PLACED TRANSPARENTLY,
                      </div>
                      {/* Bottom message */}
                      <div
                        className="absolute bottom-16 -right-10
                    "
                      >
                        <Image
                          src="/images/hero/Arrow_04.png"
                          alt="arrow"
                          width={192}
                          height={192}
                          className="size-[4rem] md:size-[8rem] lg:size-[12rem]"
                        />
                      </div>
                    </div>
                    <div className="relative flex">
                      {" "}
                      <div className="ml-24  rotate-[2deg] text-[20px] md:text-[25px] lg:text-[36px]">
                        FAIRLY, AND WITHOUT A MIDDLEMAN.
                      </div>
                      {/* Right side elements */}
                      {/* Arrow */}
                      {/* Dice graphics */}
                      <div className=" hidden md:block absolute -right-28 bottom-0  gap-4 md:gap-8">
                        <Image
                          src="/images/hero/Group 1.png"
                          alt="dice1"
                          width={64}
                          height={64}
                          className="w-12 md:w-16 lg:w-20"
                        />
                        <Image
                          src="/images/hero/Group 2.png"
                          alt="dice2"
                          width={64}
                          height={64}
                          className="w-12 md:w-16 lg:w-20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll text */}
            <div className="absolute top-[35%] -translate-y-1/2 -right-20 h-fit text-[#6C737F] rotate-90 whitespace-nowrap flex flex-col text-sm md:text-lg max-sm:hidden font-generalSans">
              <div className="flex gap-3">
                {" "}
                <Image
                  src="/images/hero/bottom-arrow.svg"
                  alt="arrow"
                  width={25}
                  height={25}
                  className="-rotate-90 "
                />{" "}
                <span> Scroll to see more...</span>
              </div>
            </div>

            {/* Wagers text */}
          </div>
        </div>
      </div>
      <div className="px-4 flex md:hidden flex-col pt-16">
        <div className="flex relative">
          {" "}
          <div className=" flex flex-col flex-1">
            <div className="text-white font-schabo tracking-wide text-[200px] md:text-[250px] lg:text-[320px] leading-none">
              300
            </div>

            <div className=" text-white font-schabo tracking-wide h-full text-[60px] md:text-[80px] lg:text-[80px] leading-[0.9]  lg:w-[20rem] max-sm:w-[19rem] md:w-[16rem]">
              WAGERS HAVE BEEN PLACED
            </div>
          </div>{" "}
          <Image
            src="/images/hero/Group 2.png"
            alt="dice1"
            width={64}
            height={64}
            className="w-12 absolute top-[30%] right-[20%]"
          />
          <Image
            src="/images/hero/heroimage.png"
            alt="Person with smartphone"
            width={273}
            height={219}
            className="w-48 absolute bottom-0 right-0"
            priority
          />
        </div>
        <div>
          {" "}
          <div className="relative text-[#E0FE10] font-comedik font-semibold  text-xl pt-4 ">
            <div className="rotate-[-2deg]">
              BUT BEFORE THE NEXT MAJOR EVENT,
              <br />
              LET&apos;S MAKE SURE YOUR WAGERS ARE
              <br />
              PLACED TRANSPARENTLY,
            </div>

            <div className="ml-24 mt-4  rotate-[2deg] text-2xl ">
              FAIRLY, AND WITHOUT A MIDDLEMAN.
            </div>
            <Image
              src="/images/hero/Arrow_04.png"
              alt="arrow"
              width={192}
              height={192}
              className="size-[4rem] absolute top-[20%] right-[10%]"
            />
            <Image
              src="/images/hero/Group 1.png"
              alt="dice1"
              width={64}
              height={64}
              className="w-20 absolute -bottom-[15%] left-[0%]"
            />
          </div>
        </div>
        <div className=" z-10 flex justify-center pt-8 w-full">
          {isMobile ? <ConnectWalletBtn /> : <WalletBar isWeb={true} />}
        </div>
      </div>
    </div>
  );
};

export default Hero;
