import Image from 'next/image';
import Link from 'next/link';

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-[#0D0E12] text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <p className="text-[18px] md:text-xl font-general-sans-medium">
              Our team saw a broken system and built StrkWgr, a <br /> decentralized wagering platform that eliminates <br />
              middlemen, ensures fair payouts, and makes betting fun <br /> again.
            </p>
            <Link 
              href="#how-it-works"
              className="inline-flex items-center justify-center w-[167px] h-[55px] bg-[#E0FE10] text-black rounded-[16px] text-[18px] font-medium hover:bg-opacity-90 transition-all shadow-lg font-general-sans"
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
              <p className="text-[#EFF8FF] font-general-sans text-[16px]">
                <span>*Fun fact:</span> &ldquo;StrkWgr&rdquo; combines <strong>StarkNet</strong> (for <br />scalability) and <strong>Wager</strong> (for betting), making it the first <br />
                trustless betting platform of its kind.
              </p>
            </div>
          </div>
          <div className="flex justify-start">
            <Image
              src="/images/image.svg"
              alt="Friends celebrating"
              width={340}
              height={340}
              className="rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/images/letsmakew.png"
              alt="LET'S MAKE WAGERING TRUSTLESS & TRANSPARENT"
              width={400}
              height={350}
              className="inline-block"
            />
          </div>
          <div>
            {[
              {
                step: '1',
                title: [
                  <div key="1-0" className="font-comedik text-[32px] text-[#6C737F]">STEP 1</div>,
                  <div key="1-1" className="font-general-sans font-bold text-[16px] text-[#6C737F]">CONNECT YOUR</div>,
                  <div key="1-2" className="font-general-sans font-bold text-[16px] text-[#6C737F]">STARKNET WALLET</div>
                ],
                icon: '/icons/Plugs.svg',
              },
              {
                step: '2',
                title: [
                  <div key="2-0" className="font-comedik text-[32px] text-[#6C737F]">STEP 2</div>,
                  <div key="2-1" className="font-general-sans font-bold text-[16px] text-[#6C737F]">PLACE OR JOIN A</div>,
                  <div key="2-2" className="font-general-sans font-bold text-[16px] text-[#6C737F]">WAGER</div>
                ],
                icon: '/icons/GamblingStreamlineFlex.svg',
              },
              {
                step: '3',
                title: [
                  <div key="3-0" className="font-comedik text-[32px] text-[#E0FE10]">STEP 3</div>,
                  <div key="3-1" className="font-general-sans font-bold text-[16px] text-[#EFF8FF]">CLAIM WINNINGS,</div>,
                  <div key="3-2" className="font-general-sans font-bold text-[16px] text-[#EFF8FF]">INSTANTLY</div>
                ],
                icon: '/icons/GamblingStreamlineFlex2.svg',
                highlight: true
              }
            ].map((item, index) => (
              <div key={index} className={`grid grid-cols-1 md:grid-cols-2 ${item || ''} py-4`}>
                <div className={`flex flex-col items-start gap-8 ${item || ''}`}>
                  <div>
                    <div className={`text-[32px] ${item.step === '3' ? 'text-[#E0FE10]' : 'text-[#6C737F]'} mb-2`}>
                      {item.title.map((text, idx) => (
                        <div key={idx} className={`${idx === 0 ? 'font-comedik' : 'font-general-sans'} text-[32px] ${item.step === '3' ? 'text-[#E0FE10]' : 'text-[#6C737F]'}`}>{text}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <Image
                    src={item.icon}
                    alt={item.title.join(' ')}
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