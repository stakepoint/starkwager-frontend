import {
  ArgentMobileConnector,
  isInArgentMobileAppBrowser,
} from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { mainnet, sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  publicProvider,
  useInjectedConnectors,
} from "@starknet-react/core";
import { WC_URI } from "@/constants";

export default function StarknetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const recommended = [argent(), braavos()];
  const chains = [mainnet, sepolia];

  const { connectors: injected } = useInjectedConnectors({
    recommended,
    includeRecommended: "always",
    order: "alphabetical",
    // Randomize the order of the connectors.
    // order: "alphabetical",
  });
  const connectorInjected = injected;

  const connectors = isInArgentMobileAppBrowser()
    ? [
        ArgentMobileConnector.init({
          options: {
            dappName: "Starkwager",
            projectId: WC_URI,
            url: typeof window !== "undefined" ? window.location.href : "",
          },
          inAppBrowserOptions: {},
        }),
      ]
    : [
        ...connectorInjected,
        ArgentMobileConnector.init({
          options: {
            url: typeof window !== "undefined" ? window.location.href : "",
            dappName: "Starkwager",
            projectId: WC_URI,
          },
        }),
        new WebWalletConnector({ url: "https://web.argent.xyz" }),
      ];
  return (
    <StarknetConfig
      chains={chains}
      provider={publicProvider()}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
}
