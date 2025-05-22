"use client";
import React from "react";
// import { useStarknetkitConnectModal } from "starknetkit";
import { useConnect } from "@starknet-react/core";
import { ARGENT_X_INSTALL_URL, BRAAVOS_INSTALL_URL } from "@/constants";
import { getSvgById } from "@/svgs";
import { useWalletStore } from "@/store/persistStore";
import { useAccount } from "@starknet-react/core";

export default function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { address } = useAccount();
  const { setAddress, address: persistedAddress } = useWalletStore();

  // Persist address in zustand store when it changes
  React.useEffect(() => {
    if (address && address !== persistedAddress) {
      setAddress(address);
    }
  }, [address, setAddress, persistedAddress]);

  // Attempt to auto-connect if address is persisted but not in useAccount
  React.useEffect(() => {
    if (!address && persistedAddress && connectors.length > 0) {
      // Try to reconnect with the first available connector (or customize as needed)
      // This logic may need to be adapted based on your wallet provider's API
      // connect({ connector: connectors[0] });
      // Optionally, show a UI prompt to reconnect
    }
  }, [address, persistedAddress, connectors]);

  return (
    <div>
      {/* connect wallet */}
      <section className="grid gap-2">
        {connectors.map((connector) => {
          return (
            <button
              type="button"
              className="bg-white shadow-xl shadow-slate-50 dark:shadow-none   border border-gray-50 dark:border-grey-8 rounded-xl p-3 dark:bg-grey-8 "
              key={connector.id}
              onClick={() => {
                if (
                  (connector.id === "argentX" || connector.id === "braavos") &&
                  // @ts-expect-error lib not inferring types
                  !globalThis[`starknet_${connector.id}`]
                ) {
                  if (connector.id === "argentX")
                    window.open(ARGENT_X_INSTALL_URL);
                  if (connector.id === "braavos")
                    window.open(BRAAVOS_INSTALL_URL);

                  return;
                }
                connect({ connector });
              }}
            >
              <div className="flex text-blue-950 dark:text-white font-medium items-center gap-2">
                {/* @ts-expect-error lib not inferring types  */}
                {getSvgById(connector.id, { className: "" })}
                <p className="text-sm tracking-tight">{connector.name}</p>
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}
