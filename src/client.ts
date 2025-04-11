import { createPublicClient, createWalletClient, http } from "viem";
import { berachain } from "viem/chains";
import dotenv from "dotenv";

dotenv.config();

export const publicClient = createPublicClient({
  chain: berachain,
  transport: http("https://rpc.berachain.com/"),
});

export const walletClient = createWalletClient({
  chain: berachain,
  transport: http("https://rpc.berachain.com/"),
});
