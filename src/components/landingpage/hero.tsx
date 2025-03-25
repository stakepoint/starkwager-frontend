import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="text-white w-full h-screen relative overflow-hidden">
      {/* Opening wager placed text */}
      <div className="absolute top-20 md:top-36 left-8 md:left-24 font-comedik text-[#6C737F] font-semibold hidden rotate-[-5deg] md:block">
        <div className="text-lg md:text-xl">OPENING</div>
        <div className="text-lg md:text-xl">WAGER PLACED</div>
      </div>
      
      {/* Main Content */}
      <div className="absolute left-8 md:left-24 top-5 md:top-64 flex flex-col md:flex-row items-start md:items-center">
        {/* The "300" with image */}
        <div>
          <div className="text-white font-schabo tracking-wider text-[200px] md:text-[200px]">
          300
          </div>
          <div className="absolute bottom-[1rem] md:-bottom-[5rem] -right-[5rem] md:-left-[7rem]">
            <Image 
              src="/images/hero/heroimage.png" 
              alt="Person with smartphone" 
              width={300}
              height={300}
              className="w-48 md:w-auto"
              priority
            />
          </div>
        </div>
        
        {/* Wagers text */}
        <div className="-mt-8 md:ml-2 leading-[3rem]">
          <div className="text-white font-schabo text-[45px] max-sm:text-[50px] max-sm:tracking-wider">
            WAGERS
            <br />
            HAVE BEEN
            <br />
            PLACED
          </div>
        </div>
      </div>
      
      {/* Bottom message */}
      <div className="absolute max-sm:bottom-[7rem] font-comedik md:bottom-[10rem] lg:bottom-[7rem] max-sm:left-8 md:left-[10rem] lg:left-[25rem] text-[#E0FE10] font-semibold rotate-[-4deg] text-[20px] md:text-[25px]">
          BUT BEFORE THE NEXT MAJOR EVENT,
          <br />
          LET&apos;S MAKE SURE YOUR WAGERS ARE 
          <br />
          PLACED TRANSPARENTLY,
          <br /><br />
       </div>
          <div className="absolute max-sm:bottom-[6rem] font-comedik md:bottom-[8rem] lg:bottom-[5.6rem] max-sm:left-14 md:left-[12rem] lg:left-[30rem] text-[#E0FE10] font-semibold rotate-[1deg] text-[20px] md:text-[25px]">
            <p>FAIRLY, AND WITHOUT A MIDDLEMAN.</p>
        </div>

      {/* Connect wallet button */}
      <div className="absolute max-sm:bottom-[2rem] max-sm:inset-x-0 max-sm:px-4 md:top-36 right-8 md:right-24">
        <button className="bg-[#E0FE10] text-[#6C737F] font-semibold px-6 py-2 md:px-8 md:py-3 rounded-lg flex items-center justify-center text-sm md:text-base max-sm:w-full">
          Connect Wallet
          <Image 
            src='/images/hero/Frame.png' 
            alt='wallet' 
            width={20}
            height={20}
            className="ml-2"
          />
        </button>
      </div>
      
      {/* Right side elements */}
      <div className="absolute right-4 md:right-12 h-full flex flex-col items-center justify-center">
        
        {/* Scroll text */}
        <div className="text-[#6C737F] transform rotate-90 whitespace-nowrap flex flex-col text-sm md:text-base max-sm:hidden max-md:block font-generalSans">
         Scroll to see more...
        </div>
        
        {/* Arrow */}
        <div className="absolute lg:-left-[13rem] max-sm:-left-[6rem] max-sm:top-[29rem] top-[15rem] md:top-[30rem] md:-left-[8rem] lg:top-[25rem]">
          <Image 
            src='/images/hero/Arrow_04.png'
            alt='arrow'
            width={192}
            height={192}
            className='size-[4rem] md:size-[12rem]'
          />
        </div>
        
        {/* Dice graphics */}
        <div className="flex flex-col gap-4 md:gap-[4rem] items-end absolute -left-[1rem] lg:-left-[2rem] bottom-4 lg:bottom-10 md:bottom-[12rem] max-sm:hidden md:block">
          <Image 
            src="/images/hero/Group 1.png" 
            alt="dice1" 
            width={64}
            height={64}
            className="w-16 md:w-auto" 
          />
          <Image 
            src="/images/hero/Group 2.png" 
            alt="dice2" 
            width={64}
            height={64}
            className="w-16 md:w-auto" 
          />
        </div>
      </div>
      
      {/* mobile view */}
      <Image 
        src="/images/hero/Group 1.png" 
        alt="dice1" 
        width={64}
        height={64}
        className="w-16 md:w-auto absolute right-[20rem] bottom-[5rem] md:hidden" 
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