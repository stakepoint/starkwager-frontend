import Image from 'next/image'
import Link from 'next/link'

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-[#0D0E12] text-white font-general-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <h1 className="text-[32px] md:text-[40px] font-medium leading-tight">
              Our team saw a broken system and built StrkWgr, a decentralized wagering platform that eliminates middlemen, ensures fair payouts, and makes betting fun again.
            </h1>
            
            <Link 
              href="#how-it-works"
              className="inline-flex items-center justify-center w-[167px] h-[55px] bg-[#E0FE10] text-black rounded-[16px] text-[18px] font-medium hover:bg-opacity-90 transition-all"
            >
              See how it works
            </Link>

            <div className="bg-[#E2FF3E]/10 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-[64px] h-[64px] bg-[#E2FF3E] rounded-[12px] flex items-center justify-center shrink-0">
                  <Image
                    src="/icons/coin.svg"
                    alt="Coin icon"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="text-[16px] leading-relaxed">
                  <span className="text-[#E2FF3E]">*Fun fact:</span> "StrkWgr" combines{' '}
                  <span className="font-bold">StarkNet</span> (for scalability) and{' '}
                  <span className="font-bold">Wager</span> (for betting), making it the first trustless betting platform of its kind.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/how-it-works-hero.jpg"
              alt="Friends celebrating"
              width={600}
              height={600}
              className="rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto mb-20">
          <Image
            src="/images/title-how-it-works.png"
            alt="LET'S MAKE WAGERING TRUSTLESS & TRANSPARENT"
            width={1200}
            height={200}
            className="w-full"
            priority
          />
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: '1',
                title: 'CONNECT YOUR STARKNET WALLET',
                icon: '/icons/wallet-connect.svg'
              },
              {
                step: '2',
                title: 'PLACE OR JOIN A WAGER',
                icon: '/icons/place-bet.svg'
              },
              {
                step: '3',
                title: 'CLAIM WINNINGS, INSTANTLY',
                icon: '/icons/claim-prize.svg',
                highlight: true
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className={`font-comedik text-[32px] mb-6 ${item.highlight ? 'text-[#E0FE10]' : 'text-gray-500'}`}>
                  STEP #{item.step}
                </div>
                <div className="mb-6">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={48}
                    height={48}
                    className={item.highlight ? 'text-[#E0FE10]' : 'text-gray-500'}
                  />
                </div>
                <h3 className={`text-[20px] font-medium leading-tight ${item.highlight ? 'text-[#E0FE10]' : ''}`}>
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 