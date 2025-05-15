import React, { createContext, useState, useContext, ReactNode } from "react";

export interface WagerDataState {
  category: string;
  hashtags: string[];
  title: string;
  terms: string;
  stake: number | undefined;
  mode: string;
  claim: string;
  resolutionTime: Date | string | number;
}

// Define the shape of the context value
interface CreateWagerContextType {
  wagerData: WagerDataState | null;
  setWagerData: (data: WagerDataState) => void;
  clearWagerData: () => void;
}

export const CreateWagerContext = createContext<CreateWagerContextType>({
  wagerData: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setWagerData: (x: WagerDataState) => {},
  clearWagerData: () => {},
});

interface CreateWagerProviderProps {
  children: ReactNode;
}

export const CreateWagerProvider = ({ children }: CreateWagerProviderProps) => {
  const [wagerData, setWagerDataState] = useState<WagerDataState | null>(null);

  const setWagerData = (data: WagerDataState) => {
    setWagerDataState(data);
  };

  const clearWagerData = () => {
    setWagerDataState(null);
  };

  return (
    <CreateWagerContext.Provider
      value={{ wagerData, setWagerData, clearWagerData }}
    >
      {children}
    </CreateWagerContext.Provider>
  );
};

// Custom hook for easy context consumption
export const useCreateWagerContext = () => {
  const context = useContext(CreateWagerContext);
  if (context === undefined) {
    throw new Error(
      "useCreateWagerContext must be used within a CreateWagerProvider"
    );
  }
  return context;
};
