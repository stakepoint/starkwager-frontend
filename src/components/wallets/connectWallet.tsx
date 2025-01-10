"use client";
import React from "react";
// import { useStarknetkitConnectModal } from "starknetkit";
import { useConnect } from "@starknet-react/core";
import { ARGENT_X_INSTALL_URL, BRAAVOS_INSTALL_URL } from "@/constants";
import { getSvgById } from "@/svgs";

export default function ConnectWallet() {
  const { connect, connectors } = useConnect();
  //   const { starknetkitConnectModal } = useStarknetkitConnectModal({
  //     connectors: connectors as any,
  //   });
  //   async function connectWallet() {
  //     const { connector } = await starknetkitConnectModal();
  //     if (!connector) {
  //       return;
  //     }

  //     await connect({ connector });
  //   }

  return (
    <div>
      {/* connect wallet */}
      <section className="grid gap-1">
        {connectors.map((connector) => {
          return (
            <button
              type="button"
              className="bg-white shadow-xl shadow-slate-50   border border-gray-50 rounded-xl p-3"
              key={connector.id}
              onClick={() => {
                if (
                  (connector.id === "argentX" || connector.id === "braavos") &&
                  !(globalThis as any)[`starknet_${connector.id}`]
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
              <div className="flex text-blue-950 font-medium items-center gap-1">
                {getSvgById(connector.id)}
                <p className="text-sm tracking-tight">{connector.name}</p>
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}
