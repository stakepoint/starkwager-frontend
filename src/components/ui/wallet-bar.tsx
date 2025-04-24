import { useAccount } from "@starknet-react/core";
import UserBar from "./user-bar";
import ConnectWalletBtn from "./connect-wallet-btn";

const WalletBar = ({
  isWeb,
  userBarclass,
}: {
  isWeb: boolean;
  userBarclass?: string;
}) => {
  const { address } = useAccount();

  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        {!address ? (
          <ConnectWalletBtn />
        ) : (
          <UserBar variation={isWeb ? "web" : "app"} className={userBarclass} />
        )}
      </div>
    </>
  );
};

export default WalletBar;
