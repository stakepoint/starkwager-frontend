import Image from "next/image";

const countWithText = [
  { count: "50", text: "contributors on onlydust" },
  { count: "10,000", text: "wagers placed onchain" },
  { count: "5,000", text: "strk tokens distributed fairly" },
];

const Impact = () => {
  return (
    <div>
      <div className=" flex flex-col max-w-xl xl:max-w-4xl 2xl:max-w-6xl mx-auto gap-5 text-left">
        <p className=" text-[#E0FE10] text-xl sm:text-2xl -rotate-2 px-2 font-comedik">
          the impact so far;
        </p>
        <div className="flex flex-col md:flex-row justify gap-4 justify-between px-2 my-4">
          {countWithText.map(({ count, text }) => (
            <div
              key={text}
              className="flex flex-col justify-between mr-10 text-left"
            >
              <span className="text-7xl sm:text-5xl md:text-6xl font-bold font-schabo">
                {count}+
              </span>
              <span className="flex flex-wrap text-ellipsis w-full md:w-3/4 font-semibold uppercase text-base  md:text-sm">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Image
          src="/images/STRIP.png"
          width={1000}
          height={200}
          alt="strkwager tldr"
          className="w-full h-full object-cover md:object-contain object-center mb-10 rounded-md"
        />
      </div>
      <div className="flex flex-col pr-4 md:max-w-xl xl:max-w-4xl 2xl:max-w-6xl mx-auto gap-5 text-left">
        <p className="text-2xl sm:text-3xl md:text-4xl uppercase text-[#E0FE10] -rotate-2 px-2  text-ellipsis max-w-sm font-comedik">
          you&apos;ve made it this far, so <br /> here&apos;s the tl;dr:
        </p>
        <p className="flex flex-wrap w-3/4 font-medium text-wrap px-2">
          StrkWager is here to make betting transparent, fun and trustless. No
          middleman, no hidden fees - just fair wagering for everyone.
        </p>
        {/* <Image
        src="/images/right-arrow.png"
        width={100}
        height={150}
        alt="strkwager tldr"
        className="object-contain md:hidden absolute top-3/4 right-0 transform -translate-x-7 translate-y-16"
      /> */}
        <div className="absolute  transform -translate-x-16 translate-y-32 hidden md:block  ">
          <Image
            src="/images/left-arrow.png"
            width={100}
            height={150}
            alt="strkwager tldr"
            className="object-contain "
          />
        </div>
        {/* eft-0 top-0 transform -translate-x-10 -translate-y-10 */}
        <div className="flex px-2 md:flex-row w-full justify-between gap-2 md:gap-10 mr-10 py-5 text-left uppercase">
          <div className="flex ">
            {" "}
            <p className="text-6xl max-w-64 font-bold text-white font-schabo">
              Ready to place your first wager?
            </p>{" "}
          </div>
          <div className="flex flex-col gap-5 justify-center flex-1 md:flex-auto">
            <p className="text-[#E0FE10] max-w-64 text-2xl  -rotate-2 font-comedik leading-none">
              were open to contributors and players alike
            </p>
            <p className="text-[#E0FE10] text-5xl font-comedik">
              lets connect!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
