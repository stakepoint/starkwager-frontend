import Image from "next/image";
import Link from "next/link";

export default function HowItWorksSection() {
  return (
    <main className="min-h-screen text-white w-full mx-auto  md:max-w-xl xl:max-w-4xl 2xl:max-w-6xl">
      {/* Hero Section */}{" "}
      <section className="hidden md:flex py-16 md:py-24 px-4">
        <div className="flex gap-12 items-center justify-between w-full">
          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <p className="text-[18px] md:text-xl font-general-sans-medium">
                Our team saw a broken system and built StrkWgr, a <br />{" "}
                decentralized wagering platform that eliminates <br />
                middlemen, ensures fair payouts, and makes betting fun <br />{" "}
                again.
              </p>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center w-full md:w-[167px] h-[55px] bg-[#E0FE10] text-black rounded-[16px] text-[18px] font-medium hover:bg-opacity-90 transition-all shadow-lg font-general-sans"
              >
                See how it works
              </Link>
              <div className="flex items-start gap-4">
                <div className="w-[64px] h-[64px] bg-[#E2FF3E] rounded-[12px] flex items-center justify-center shrink-0">
                  <Image
                    src="/icons/handcoin.svg"
                    alt="Coin icon"
                    width={32}
                    height={32}
                  />
                </div>
                <p className="text-[#EFF8FF] font-general-sans text-sm md:text-base">
                  <span>*Fun fact:</span> &ldquo;StrkWgr&rdquo; combines{" "}
                  <strong>StarkNet</strong> (for <br />
                  scalability) and <strong>Wager</strong> (for betting), making
                  it the first <br />
                  trustless betting platform of its kind.
                </p>
              </div>{" "}
            </div>
          </div>
          <div className="flex justify-start">
            <Image
              src="/images/image.svg"
              alt="Friends celebrating"
              width={300}
              height={150}
              className="rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </section>
      {/* Mobile Hero Section*/}
      <section className="flex md:hidden py-16 md:py-24 px-4">
        <div className="flex gap-12 items-center justify-between w-full">
          <div className="space-y-8">
            <div className="flex gap-2">
              <p className="text-[18px] md:text-xl font-general-sans-medium">
                Our team saw a broken system and built StrkWgr, a <br />{" "}
                decentralized wagering platform that eliminates <br />
                middlemen, ensures fair payouts, and makes betting fun <br />{" "}
                again.
              </p>
              <div className="flex justify-start">
                <Image
                  src="/images/image.svg"
                  alt="Friends celebrating"
                  width={200}
                  height={200}
                  className="rounded-3xl shadow-lg"
                />
              </div>
            </div>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center w-full md:w-[167px] h-[55px] bg-[#E0FE10] text-black rounded-[16px] text-[18px] font-medium hover:bg-opacity-90 transition-all shadow-lg font-general-sans"
            >
              See how it works
            </Link>
            <div className="flex items-start gap-4">
              <div className="w-[64px] h-[64px] bg-[#E2FF3E] rounded-[12px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons/handcoin.svg"
                  alt="Coin icon"
                  width={32}
                  height={32}
                />
              </div>
              <p className="text-[#EFF8FF] font-general-sans text-sm md:text-base">
                <span>*Fun fact:</span> &ldquo;StrkWgr&rdquo; combines{" "}
                <strong>StarkNet</strong> (for <br />
                scalability) and <strong>Wager</strong> (for betting), making it
                the first <br />
                trustless betting platform of its kind.
              </p>
            </div>{" "}
          </div>
        </div>
      </section>
      {/* Steps Section */}
      <section id="how-it-works" className="container mx-auto pb-16 pr-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <Image
              src="/images/letsmakew.png"
              alt="LET'S MAKE WAGERING TRUSTLESS & TRANSPARENT"
              width={350}
              height={300}
              className="inline-block"
            />
          </div>
          <div className="flex md:flex-col gap-2">
            {[
              {
                step: "1",
                title: [
                  <div
                    key="1-0"
                    className="font-comedik text-[32px] text-center md:text-left text-[#6C737F]"
                  >
                    STEP 1
                  </div>,
                  <div
                    key="1-1"
                    className="font-general-sans text-center md:text-left font-bold text-sm md:text-base text-[#6C737F]"
                  >
                    CONNECT YOUR
                  </div>,
                  <div
                    key="1-2"
                    className="font-general-san text-center md:text-left font-bold text-sm md:text-base text-[#6C737F]"
                  >
                    STARKNET WALLET
                  </div>,
                ],
                icon: "/icons/Plugs.svg",
              },
              {
                step: "2",
                title: [
                  <div
                    key="2-0"
                    className="font-comedik text-center md:text-left text-[32px] text-[#6C737F]"
                  >
                    STEP 2
                  </div>,
                  <div
                    key="2-1"
                    className="font-general-sans text-center md:text-left font-bold text-sm md:text-base text-[#6C737F]"
                  >
                    PLACE OR JOIN A
                  </div>,
                  <div
                    key="2-2"
                    className="font-general-sans text-center md:text-left font-bold text-sm md:text-base text-[#6C737F]"
                  >
                    WAGER
                  </div>,
                ],
                icon: "/icons/GamblingStreamlineFlex.svg",
              },
              {
                step: "3",
                title: [
                  <div
                    key="3-0"
                    className="font-comedik text-center md:text-left text-[32px] text-[#E0FE10]"
                  >
                    STEP 3
                  </div>,
                  <div
                    key="3-1"
                    className="font-general-sans text-center md:text-left font-bold text-sm md:text-base text-[#EFF8FF]"
                  >
                    CLAIM WINNINGS,
                  </div>,
                  <div
                    key="3-2"
                    className="font-general-sans text-center md:text-left font-bold text-sm md:text-base text-[#EFF8FF]"
                  >
                    INSTANTLY
                  </div>,
                ],
                icon: "/icons/GamblingStreamlineFlex2.svg",
                highlight: true,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col-reverse md:flex-row md:gap-10 justify-between w-full  ${
                  item || ""
                } py-4`}
              >
                <div
                  className={`flex flex-col items-start gap-8 ${item || ""}`}
                >
                  <div>
                    <div
                      className={`text-[32px] ${
                        item.step === "3" ? "text-[#E0FE10]" : "text-[#6C737F]"
                      } mb-2`}
                    >
                      {item.title.map((text, idx) => (
                        <div
                          key={idx}
                          className={`${
                            idx === 0 ? "font-comedik" : "font-general-sans"
                          } text-[32px] ${
                            item.step === "3"
                              ? "text-[#E0FE10]"
                              : "text-[#6C737F]"
                          }`}
                        >
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <Image
                    src={item.icon}
                    alt={item.title.join(" ")}
                    width={64}
                    height={64}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
