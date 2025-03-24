import Image from 'next/image';
import Link from 'next/link';

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-[#0D0E12] text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
          <p className="text-[18px] md:text-xl">
                Our team saw a broken system and built StrkWgr, 
                a <br /> decentralized wagering platform that eliminates <br />
                middlemen, ensures fair payouts, and makes betting fun <br /> again.
              </p>
            
            <Link 
              href="#how-it-works"
              className="inline-flex items-center justify-center w-[167px] h-[55px] bg-[#E0FE10] text-black rounded-[16px] text-[18px] font-medium hover:bg-opacity-90 transition-all shadow-lg"
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
              <p className="text-sm text-[#EFF8FF] max-w-md">
                <span className="font-bold">*Fun fact:</span> &ldquo;StrkWgr&rdquo; combines <strong>StarkNet</strong> (for <br />scalability) and <strong>Wager</strong> (for betting), making it the first <br />
                trustless betting platform of its kind.
              </p>
            </div>
          </div>

          <div className="flex justify-start">
            <Image
              src="/images/image.svg"
              alt="Friends celebrating"
              width={240}
              height={240}
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
                  <div key="1-1">CONNECT YOUR</div>,
                  <div key="1-2">STARKNET WALLET</div>
                ],
                icon: '/icons/Plugs.svg',
                image: '/images/Step1.svg'
              },
              {
                step: '2',
                title: [
                  <div key="2-1">PLACE OR JOIN A</div>,
                  <div key="2-2">WAGER</div>
                ],
                icon: '/icons/GamblingStreamlineFlex.svg',
                image: '/images/Step2.svg'

              },
              {
                step: '3',
                title: [
                  <div key="3-1">CLAIM WINNINGS,</div>,
                  <div key="3-2">INSTANTLY</div>
                ],
                icon: '/icons/GamblingStreamlineFlex2.svg',
                image: '/images/Step3.svg',
                highlight: true
              }
            ].map((item, index) => (
              <div key={index} className={`grid grid-cols-1 md:grid-cols-2 ${item || ''} py-4`}>
                <div className={`flex flex-col items-start gap-8 ${item || ''}`}>
                  <div>
                    <div className={`text-[32px] ${item.step === '3' ? 'text-[#E0FE10]' : 'text-[#6C737F]'} mb-2`}>
                      <Image
                        src={item.image}
                        alt={item.title.join(' ')}
                        width={120}
                        height={32}
                      />
                    </div>
                    
                    <div>
                      {item.title.map((text, idx) => (
                        <div key={idx} className={`text-[16px] font-bold ${item.step === '3' ? 'text-white' : 'text-[#6C737F]'}`}>{text}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <Image
                    src={item.icon}
                    alt={item.title.join(' ')}
                    width={58}
                    height={58}
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
