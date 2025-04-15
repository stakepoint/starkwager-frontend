"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const sectionImage = "/images/SecondSectionImage.svg";

export default function SecondSection() {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const centeredRefs = useRef([]);

  useEffect(() => {
    const currentElement = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const observers = centeredRefs.current
      .filter((ref) => ref)
      .map((ref) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              ref.classList.add("text-red-700");
            } else {
              ref.classList.remove("text-red-700");
            }
          },
          {
            root: null,
            rootMargin: "0px",
            threshold: 1,
          }
        );
        observer.observe(ref);
        return observer;
      });

    return () => {
      observers.forEach((observer, i) => {
        if (observer && centeredRefs.current[i]) {
          observer.unobserve(centeredRefs.current[i]);
          observer.disconnect();
        }
      });
    };
  }, []);


  return (
    <section className="w-full flex flex-col items-center gap-20 justify-center py-2 px-2 ">
      <section className="flex flex-col md:flex-row items-center justify-center gap-2">
        <div className="w-full max-w-[520px] ">
          <div className="flex items-center justify-center  mb-3 " >
            <h1 className="text-[#EFF8FF] font-normal text-[64px] leading-[60px] md:text-8xl font-schabo">
              MILLIONS OF <br /> WAGERER GET <br /> SHORTCHANGED
            </h1>
            <h3 className="text-[#E0FE10] text-lg leading-[30px] font-normal  md:text-[32px] ml-[-4%] mt-[-5%] transform rotate-[-2deg] whitespace-nowrap font-comedik">
              Every <br /> <span className=" text-[28px] md:text-[40px] " >Single Day</span>
            </h3>
          </div>

          <p className="text-[#EFF8FF] text-base font-medium font-generalSans ">
            Beyond high fees and rigged odds, traditional wagering platforms
            control the outcome and the funds—leaving you with nothing but
            frustration.
          </p>
        </div>

        <div className="w-full max-w-[391.5px] flex flex-col justify-center items-start">
          <Image
            src={sectionImage}
            width={100}
            height={100}
            alt="Wagering illustration"
            className="object-cover w-[343px] h-[228px] md:w-[391.5px] md:h-[261px] "
          />

          <div className="h-[145px] mt-3 ml-5 flex items-end justify-end">
            <svg
              ref={elementRef}
              className="transition-all duration-500 ease-in-out"
              width="143"
              height={isVisible ? "143" : "0"}
              viewBox="0 0 143 143"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_38223_15751)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.6307 137.99C78.628 123.28 102.962 65.8568 104.23 8.21822C104.254 7.22828 105.075 6.4396 106.065 6.46326C107.055 6.48691 107.844 7.30809 107.82 8.29802C106.519 67.5509 81.1615 126.356 19.483 141.476C18.5226 141.714 17.5514 141.124 17.3134 140.159C17.0759 139.199 17.6658 138.227 18.6307 137.99Z"
                  fill="#E0FE10"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M106.002 9.34008C104.391 12.0521 102.407 15.4781 102.17 15.8603C95.7601 26.2181 88.0868 35.0264 78.8606 43.0183C78.1126 43.6678 76.9759 43.5853 76.3263 42.8373C75.6767 42.0893 75.7593 40.9527 76.5073 40.3031C85.4565 32.5562 92.9005 24.0157 99.1172 13.9676C99.4799 13.3822 103.936 5.67801 104.954 4.18788C105.369 3.57473 105.794 3.35667 105.899 3.31475C106.45 3.07096 106.907 3.14098 107.246 3.26327C107.628 3.40422 108.203 3.79069 108.554 4.61273C108.919 5.4745 109.234 7.43799 109.354 7.92722C111.179 15.3036 112.573 23.6952 115.438 31.1815C118.169 38.3211 122.242 44.6448 129.537 48.2528C130.425 48.6912 130.788 49.7716 130.35 50.6601C129.911 51.5486 128.831 51.9115 127.942 51.4731C119.787 47.4376 115.136 40.4452 112.083 32.4671C109.237 25.0246 107.796 16.7149 106.002 9.34008Z"
                  fill="#E0FE10"
                />
              </g>
              <defs>
                <clipPath id="clip0_38223_15751">
                  <rect
                    width="130"
                    height="130"
                    fill="white"
                    transform="matrix(0.0952119 0.995457 0.995457 -0.0952119 0.822266 13.2002)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      <section className="w-full h-[435px] md:h-[435px] relative  flex items-center justify-center   " >
        <div className="absolute top-[6%] md:top-0 left-[40%] md:left-[34%] translate-x-[-50%] flex flex-col gap-5   " >
          <h3 className="text-[#E0FE10] leading-[30px] font-normal max-w-[243.4px]  text-2xl md:text-[32px] transform rotate-[-2deg]   font-comedik">
            <span className="relative  after:content-[''] after:absolute after:left-0 after:top-[50%] transform translate-x-[-50%] after:w-full after:h-[4px] after:bg-[#6C737F] after:rounded-full " >Isn&rsquo;t Wagering just </span><br/>
            <span  className="relative  after:content-[''] after:absolute after:left-0 after:top-[50%] transform translate-x-[-50%] after:w-full after:h-[4px] after:bg-[#6C737F] after:rounded-full " >about taking risks?</span>
          </h3>

          <div className="flex justify-start gap-4 items-end"  >
            <span className="font-comedik text-[#6C737F] text-base font-normal  transform rotate-[-2deg]  " >
              “Red <br />
              card”
            </span>

            <h3 className="text-[#E0FE10] leading-[30px] font-normal max-w-[243.4px]  text-2xl md:text-[32px] transform rotate-[-2deg]   font-comedik">
              NO.WAY.
            </h3>
          </div>
        </div>

        <div className="text-changer font-schabo font-normal items-center flex pb-[10px]    gap-2 md:gap-5   box-content overflow-hidden   h-[100px] text-[56px] leading-[70px]  md:h-[90px] md:text-[96px]  lg:h-[300px]  lg:text-[120px] md:leading-[150px] ">
        <h1  className="intro-text mt-[-2px] text-[#fafafa]  " >IT&rsquo;S ABOUT</h1>
        <div className="roles-container relative overflow-hidden   flex flex-col   ">
          {
            ["FAIRNESS", "TRUST", "WINNING", "TRUST", "FAIRNESS",  "WINNING", "TRUST", "FAIRNESS", "WINNING", "TRUST", "FAIRNESS"    ].map((word, index)  => (
              <span key={index}  ref={(el) => (centeredRefs.current[5] = el)}  className={`role   h-full pl-[6px]  `}> {word} </span>
            ))
          }
        </div>
    </div>


        <div className="text-[#E0FE10] z-0 font-comedik flex md:flex-col items-center justify-center right-[30%] md:right-[5%] translate-x-[-30%]  bottom-[25%] md:bottom-[25%] font-normal text-xl md:text-2xl transform rotate-[-4deg] md:rotate-[-26deg] absolute ">
          <span>AND THAT’S WHY WE</span>
          <div className="flex items-center justify-center gap-1" >
            <span> LOVE &rsquo;EM </span>
            <Image src="/images/Smiley-In-Love--Streamline-Core-Remix.svg" alt="smiley-icon" height={26} width={26} />
          </div>
        </div>
      </section>



    </section>
  );
}