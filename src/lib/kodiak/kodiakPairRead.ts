import type { Account, Address } from "viem";
import { publicClient } from "../../client";
import { UNIV2PAIR } from "../../abi/uniV2Pair";

export async function getReserves(account: Account, address: Address) {
  const reserves = await publicClient.readContract({
    abi: UNIV2PAIR,
    account,
    address,
    functionName: "getReserves",
  });
  return reserves;
}
