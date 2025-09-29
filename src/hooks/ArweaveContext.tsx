import { createContext, useContext } from "react";
import Arweave from "arweave";

const ArweaveContext = createContext<{
    arweave: Arweave;
} | null>(
    null
);

export function useArweaveContext() {
    const context = useContext(ArweaveContext);
    if (!context) {
        throw new Error("ArweaveContext not found");
    }
    return context;
}

export function ArweaveContextProvider({ children }: { children: React.ReactNode }) {
    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https'
    });
    return <ArweaveContext.Provider value={{ arweave }}>
        {children}
    </ArweaveContext.Provider>;
}
