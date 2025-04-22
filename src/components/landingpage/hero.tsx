"use client";
import Image from "next/image";
import WalletBar from "../ui/wallet-bar";

const Hero = () => {
  return (
    <div className="text-white w-full relative overflow-hidden min-h-[700px] md:min-h-[900px]">
      {/* Opening wager placed text */}
      <div className="absolute top-20 left-8 md:left-24 font-comedik text-[#6C737F] font-semibold hidden rotate-[-5deg] md:block">
        <div className="text-lg md:text-xl lg:text-[28px]">OPENING</div>
        <div className="text-lg md:text-xl lg:text-[28px]">WAGER PLACED</div>
      </div>

      {/* Connect wallet button */}
      <div className="absolute bottom-0 md:top-10 right-8 md:right-24 z-10 max-sm:mb-4">
        <WalletBar isWeb={true} />
      </div>

      {/* Main Content */}
      <div className="absolute left-8 md:left-24 top-20 md:top-64 lg:top-48 flex flex-col md:flex-row items-start">
        {/* The "300" with image */}
        <div className="relative">
          <div className="text-white font-schabo tracking-wide text-[200px] md:text-[250px] lg:text-[346px] leading-none">
            300
          </div>
          <div className="absolute -bottom-20 md:-bottom-24 lg:-bottom-16  -right-[6rem] md:-left-[5rem] lg:-left-[6rem]">
            <Image
              src="/images/hero/heroimage.png"
              alt="Person with smartphone"
              width={273}
              height={219}
              className="w-48 md:w-64 lg:w-[273px] lg:h-[219px]"
              priority
            />
          </div>
        </div>

        {/* Wagers text */}
        <div className="mt-0 md:mt-0 md:ml-8 lg:ml-12">
          <div className="text-white font-schabo text-[60px] md:text-[80px] lg:text-[100px] leading-[0.9] tracking-normal lg:w-[20rem] max-sm:w-[19rem] md:w-[16rem]">
            WAGERS HAVE BEEN PLACED
          </div>
        </div>
      </div>

      {/* Bottom message */}
      <div className="absolute bottom-40 md:bottom-48 lg:bottom-[17rem] left-8 md:left-[15rem] lg:left-[25rem] text-[#E0FE10] font-comedik font-semibold rotate-[-4deg] text-[20px] md:text-[25px] lg:text-[36px] max-w-[90%] md:max-w-[80%] lg:max-w-[70%]">
        BUT BEFORE THE NEXT MAJOR EVENT,
        <br />
        LET&apos;S MAKE SURE YOUR WAGERS ARE
        <br />
        PLACED TRANSPARENTLY,
      </div>

      <div className="absolute bottom-24 md:bottom-28 lg:bottom-[12rem] left-[7rem] md:left-[18rem] lg:left-[30rem] text-[#E0FE10] font-comedik font-semibold rotate-[1deg] text-[20px] md:text-[25px] lg:text-[36px]">
        FAIRLY, AND WITHOUT A MIDDLEMAN.
      </div>

      {/* Right side elements */}
      <div className="absolute right-8 md:right-16 md: top-[10rem] lg:top-0 h-full flex flex-col items-center justify-center">
        {/* Scroll text */}
        <div className="text-[#6C737F] transform rotate-90 whitespace-nowrap flex flex-col text-sm md:text-base max-sm:hidden font-generalSans absolute">
          Scroll to see more...
        </div>
      </div>
      {/* Arrow */}
      <div className="absolute top-[30rem] right-[6rem] max-sm:top-[27rem] max-sm:right-[3rem]">
        <Image
          src="/images/hero/Arrow_04.png"
          alt="arrow"
          width={192}
          height={192}
          className="size-[4rem] md:size-[8rem] lg:size-[12rem]"
        />
      </div>
      {/* Dice graphics */}
      <div className="absolute bottom-8 hidden md:block md:bottom-16 lg:bottom-24 right-8 md:right-[2rem] gap-4 md:gap-8">
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

      {/* mobile view */}
      <Image
        src="/images/hero/Group 1.png"
        alt="dice1"
        width={64}
        height={64}
        className="w-16 md:w-auto absolute right-[19rem] bottom-[5rem] md:hidden"
      />
      <Image
        src="/images/hero/Group 2.png"
        alt="dice2"
        width={64}
        height={64}
        className="w-16 md:w-auto absolute top-[5rem] right-[1rem] md:hidden"
      />
    </div>
  );
};

export default Hero;
