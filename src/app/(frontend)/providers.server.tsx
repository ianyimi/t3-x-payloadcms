import { type PropsWithChildren } from "react";

import { BetterAuthProvider } from "~/auth/context";
import { getContextProps } from "~/auth/utils";
import { TRPCReactProvider } from "~/trpc/client";

export default function ServerProviders({ children }: PropsWithChildren) {
	return (
		<TRPCReactProvider>
			{/* @ts-expect-error todo: fix mismatch collection type causing lsp errors from better auth plugin */}
			<BetterAuthProvider {...getContextProps()}>
				{children}
			</BetterAuthProvider>
		</TRPCReactProvider>
	)
}
