import Image from "next/image";

const countWithText = [
  { count: "50", text: "contributors on onlydust" },
  { count: "10,000", text: "wagers placed onchain" },
  { count: "5,000", text: "strk tokens distributed fairly" },
];

const Impact = () => {
  return (
    <div className="flex flex-col max-w-3xl mx-auto gap-5 text-left ">
      <p className=" text-[#E0FE10] text-xl sm:text-2xl -rotate-2 px-2 font-comedik">
        the impact so far;
      </p>
      <div className="flex flex-col md:flex-row justify gap-4 -between px-2 my-4">
        {countWithText.map(({ count, text }) => (
          <div
            key={text}
            className="flex flex-col justify-between mr-10 text-left"
          >
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold font-schabo">
              {count}+
            </span>
            <span className="flex flex-wrap text-ellipsis w-3/4 font-semibold uppercase  text-sm">
              {text}
            </span>
          </div>
        ))}
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
      <p className="text-2xl sm:text-3xl md:text-4xl uppercase text-[#E0FE10] -rotate-2 px-2  text-ellipsis max-w-sm font-comedik">
        you&apos;ve made it this far, so here&apos;s the tl;dr:
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
      <div className="absolute bottom-[27%] transform  left-[24%] hidden md:block  ">
        <Image
          src="/images/left-arrow.png"
          width={100}
          height={150}
          alt="strkwager tldr"
          className="object-contain "
        />
      </div>
      {/* eft-0 top-0 transform -translate-x-10 -translate-y-10 */}
      <div className="flex px-2 md:flex-row w-full gap-10 mr-10 py-5 text-left uppercase">
        <div className="max-w-5xl text-white font-schabo">
          <p className="text-3xl md:text-6xl font-bold">ready to</p>
          <p className="text-2xl md:text-6xl font-bold">place your</p>
          <p className="text-2xl md:text-6xl font-bold">first wager?</p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-[#E0FE10] text-xl w-1/2 -rotate-2 font-comedik leading-none">
            were open to contributors and players alike
          </p>
          <p className="text-[#E0FE10] text-4xl font-comedik">lets connect!</p>
        </div>
      </div>
    </div>
  );
};

export default Impact;
