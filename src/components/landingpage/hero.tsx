import React from 'react';

const Hero = () => {
  return (
    <div className="text-white w-full h-screen relative overflow-hidden">
      {/* Opening wager placed text */}
      <div className="absolute top-20 md:top-36 left-8 md:left-24 text-[#6C737F] font-semibold opacity-80 hidden md:block">
        <div className="text-lg md:text-xl">OPENING</div>
        <div className="text-lg md:text-xl">WAGER PLACED</div>
      </div>
      
      {/* Main Content */}
      <div className="absolute left-8 md:left-24 top-5 md:top-64 flex flex-col md:flex-row items-start md:items-center">
        {/* The "300" with image */}
        <div>
          <div className="text-white font-bold text-[150px] md:text-[160px]" >
          300
          </div>
          <div className="absolute bottom-[1rem] md:-bottom-[7rem] -right-[5rem] md:-left-10 ">
            <img 
              src="/images/hero/heroimage.png" 
              alt="Person with smartphone" 
              className="w-48 md:w-auto"
            />
          </div>
        </div>
        
        {/* Wagers text */}
        <div className="md:mt-4 -mt-8 md:ml-4">
          <div className="text-white font-bold text-4xl">
            WAGERS
            <br />
            HAVE BEEN
            <br />
            PLACED
          </div>
        </div>
      </div>
      
      {/* Bottom message */}
      <div className="absolute max-sm:bottom-[14rem] md:bottom-[14rem] lg:bottom-[9rem] max-sm:left-8 md:left-[10rem] lg:left-[25rem] text-[#E0FE10] font-semibold rotate-[-4deg] text-sm md:text-base">
          BUT BEFORE THE NEXT MAJOR EVENT,
          <br />
          LET'S MAKE SURE YOUR WAGERS ARE 
          <br />
          PLACED TRANSPARENTLY,
          <br /><br />
       </div>
          <div className="absolute max-sm:bottom-[12rem] md:bottom-[11rem] lg:bottom-[6.5rem] max-sm:left-14 md:left-[12rem] lg:left-[30rem] text-[#E0FE10] font-semibold rotate-[1deg] text-sm md:text-base">
            <p>FAIRLY, AND WITHOUT A MIDDLEMAN.</p>
        </div>

      {/* Connect wallet button */}
      <div className="absolute max-sm:bottom-[5rem] max-sm:inset-x-0 max-sm:px-4 md:top-36 right-8 md:right-24">
        <button className="bg-[#E0FE10] text-[#6C737F] font-semibold px-6 py-2 md:px-8 md:py-3 rounded-lg flex items-center justify-center text-sm md:text-base max-sm:w-full">
          Connect Wallet
          <img src='/images/hero/Frame.png' alt='wallet' className="ml-2"/>
        </button>
      </div>
      
      {/* Right side elements */}
      <div className="absolute right-4 md:right-12 h-full flex flex-col items-center justify-center">
        
        {/* Scroll text */}
        <div className="text-[#6C737F] transform rotate-90 whitespace-nowrap flex flex-col text-sm md:text-base max-sm:hidden max-md:block ">
         Scroll to see more...
        </div>
        
        {/* Arrow */}
        <div className="absolute  lg:-left-[13rem] max-sm:-left-[4rem] max-sm:top-[25rem] top-[15rem] md:top-[30rem] md:-left-[9rem] lg:top-[25rem]">
          <img 
          src='/images/hero/Arrow_04.png'
          alt='arrow'
          className='size-[4rem] md:size-[12rem]'
          />
        </div>
        
        {/* Dice graphics */}
        <div className="flex flex-col gap-4 md:gap-8 items-end absolute -left-[1rem] lg:-left-[2rem] bottom-4 lg:bottom-10 md:bottom-[6rem] max-sm:hidden md:block">
          <img src="/images/hero/Group 1.png" alt="dice1" className="w-16 md:w-auto" />
          <img src="/images/hero/Group 2.png" alt="dice2" className="w-16 md:w-auto" />
        </div>

      </div>
        {/* mobile view */}
        <img src="/images/hero/Group 1.png" alt="dice1" className="w-16 md:w-auto absolute right-[19rem] bottom-[9rem] md:hidden" />
        <img src="/images/hero/Group 2.png" alt="dice2" className="w-16 md:w-auto absolute top-[5rem] right-[1rem] md:hidden" />
    </div>
  );
};

export default Hero;