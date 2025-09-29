import { createContext, useContext, useState } from "react";
import { WalletSelectButton } from "../components/WalletSelectButton";

const WalletContext = createContext<{
    isWalletConnected: boolean,
    setIsWalletConnected: (isWalletConnected: boolean) => void,
} | null>(
    null
);

export function useWalletContext() {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("WalletContext not found");
    }
    return context;
}

export function WalletContextProvider({ children }: { children: React.ReactNode }) {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    return <WalletContext.Provider value={{ isWalletConnected, setIsWalletConnected }}>
        <WalletSelectButton setIsConnected={setIsWalletConnected} />
        {children}
    </WalletContext.Provider>;
}
