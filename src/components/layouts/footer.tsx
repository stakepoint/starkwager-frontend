import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex-1 flex flex-col justify-between max-w-4xl mx-auto w-full px-6 py-8">
        <section className="flex flex-row justify-between items-center my-8 md:my-16 gap-4 md:gap-8">
            <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-2">CONTACT</h2>
                <p className="text-blue-900 text-xs md:text-sm font-medium leading-relaxed mb-4 md:mb-8 max-w-xs">
                    StrkWgr uses smart contracts to hold wagered funds securely. No intermediaries. No delays. Just
                    instant, trustless transactions.
                </p>
                <div className="hidden md:flex items-center gap-2 md:gap-3">
                    <div className="flex">
                    <Image 
                        src="/images/strkwgr_mail_svg.svg" 
                        alt="starkwager mail icon"
                        width={40}
                        height={30}
                        className="md:w-[55px] md:h-[40px]"
                    />
                    </div>
                    <a href="mailto:admin@starkwager.xyz" className="text-blue-900 text-sm md:text-base font-bold">
                    admin@starkwager.xyz
                    </a>
                </div>
            </div>
            <div className="flex-shrink-0">
                <div className="relative w-[30vw] h-[30vw] md:w-64 md:h-64 rounded-lg overflow-hidden">
                    <Image 
                    src="/images/footer_lady.png" 
                    alt="Support Representative" 
                    layout="fill" 
                    objectFit="cover"
                    className="rounded-lg"
                    />
                </div>
            </div>
        </section>

        <div className="flex md:hidden items-center gap-2 mb-4">
            <div className="flex">
            <Image 
                src="/images/strkwgr_mail_svg.svg" 
                alt="starkwager mail icon"
                width={55}
                height={40}
            />
            </div>
            <a href="mailto:admin@starkwager.xyz" className="text-blue-900 text-sm font-bold">
            admin@starkwager.xyz
            </a>
        </div>

        {/* Did You Know Section */}
        <section className="flex flex-col md:flex-row items-start md:items-center my-6 md:my-2 gap-2 md:gap-4">
            <div className="text-blue-900 text-xl md:text-2xl font-bold whitespace-nowrap">
            DID YOU KNOW?
            </div>
            <div className="text-blue-900 font-medium text-xs md:text-sm leading-relaxed max-w-sm">
            This page was designed in a day by 2 people, the whole layout sef was copy and paste from another website 😭
            </div>
        </section>

        <section className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8 md:mt-16 pt-8 gap-4">
            <div>
            <Image 
                src="/images/starkwager_footer_logo.svg" 
                alt="starkwager logo"
                width={100}
                height={38}
                className="md:w-[120px] md:h-[46px]"
                />
            </div>
            <div className="flex justify-between w-full md:w-auto md:gap-8">
                <div className="text-blue-900 text-xs md:text-sm">
                    Design by <span className="font-bold text-sm md:text-base">NOYI</span>
                </div>
                <div className="text-blue-900 text-xs md:text-sm">
                    Code by <span className="font-bold text-sm md:text-base">BABYKEEM</span>
                </div>
            </div>
        </section>
    </footer>
  );
}