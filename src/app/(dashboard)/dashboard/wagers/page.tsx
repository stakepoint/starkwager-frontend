import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WagerCards from "@/components/ui/WagerCards";

export default function Wagers() {
  return (
    <div className="w-full pt-20 flex justify-center items-center">
      <Tabs defaultValue="account" className="w-[650px]">
        <TabsList className="flex justify-center">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="complete">Complete</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <WagerCards
            question="Will Bitcoin Hit $100k Before January 31, 2025?"
            progress={true}
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
            question="Will Bitcoin Hit $100k Before January 31, 2025?"
            progress={true}
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
            question="Will Bitcoin Hit $100k Before January 31, 2025?"
            progress={false}
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
      </Tabs>
    </div>
  );
}
