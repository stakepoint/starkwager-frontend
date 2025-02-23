import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WagerCards from "@/components/ui/WagerCards";

export default function Wagers() {
  return (
    <div className="w-full pt-10 pb-20 md:py-20 flex justify-center items-center ">
      <Tabs defaultValue="account" className="w-[650px]">
        <TabsList className="flex justify-center">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="complete">Complete</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <WagerCards
            wagerStatus="active"
            question="Will Bitcoin Hit $100k Before January 31, 2025?"
            stakeAmount={100}
            leftUser={{
              username: "@noyi24_7",
              icon: "/images/leftWagercardUserOneIcon.svg",
            }}
            rightUser={{
              username: "@babykeem",
              icon: "/images/rightWagercardUserOneIcon.svg",
            }}
          />
          <WagerCards
            wagerStatus="active"
            question="Will Bitcoin Hit $100k Before January 31, 2025?"
            stakeAmount={100}
            leftUser={{
              username: "@noyi24_7",
              icon: "/images/leftWagercardUserOneIcon.svg",
            }}
            rightUser={{
              username: "@babykeem",
              icon: "/images/rightWagercardUserOneIcon.svg",
            }}
          />
        </TabsContent>
        <TabsContent value="pending">
          <WagerCards
            wagerStatus="pending"
            question="Will Bitcoin Hit $100k Before January 31, 2025?"
            stakeAmount={100}
            leftUser={{
              username: "@noyi24_7",
              icon: "/images/leftWagercardUserOneIcon.svg",
            }}
            rightUser={{
              username: "Awaiting Opponent",
              icon: "/images/opponent.svg",
            }}
          />
        </TabsContent>
        <TabsContent value="complete">
          <WagerCards
            wagerStatus="completed"
            question="Will Bitcoin Hit $100k Before January 31, 2025?"
            stakeAmount={100}
            leftUser={{
              username: "@noyi24_7",
              icon: "/images/leftWagercardUserOneIcon.svg",
            }}
            rightUser={{
              username: "@babykeem",
              icon: "/images/rightWagercardUserOneIcon.svg",
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
