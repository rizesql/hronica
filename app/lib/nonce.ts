import React from "react";

export const NonceContext = React.createContext<string>("");

export function useNonce() {
	return React.useContext(NonceContext);
}
