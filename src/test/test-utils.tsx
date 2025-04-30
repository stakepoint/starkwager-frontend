import React from 'react';
import { render as rtlRender } from '@testing-library/react';

// Create mock components
const MockStarknetConfig = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// Mock modules
jest.mock('@starknet-react/core', () => ({
  StarknetConfig: MockStarknetConfig,
  useAccount: jest.fn(),
  InjectedConnector: jest.fn(),
}));

jest.mock('starknet', () => ({
  RpcProvider: jest.fn(),
}));

jest.mock('@starknet-react/chains', () => ({
  mainnet: { id: 'mainnet-alpha' },
}));

function render(ui: React.ReactElement, { ...renderOptions } = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MockStarknetConfig>
        {children}
      </MockStarknetConfig>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
export { render }; 