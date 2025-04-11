import type { Account, Address } from "viem";
import { GRQGENESIS } from "../../abi/grqGenesis";
import { publicClient } from "../../client";

export async function getUserPools(account: Account, address: Address) {
  const getUserPools = await publicClient.readContract({
    abi: GRQGENESIS.abi,
    account,
    address,
    functionName: "getUserPools",
    args: [account.address],
  });
  return getUserPools;
}

export async function pendingRewards(
  account: Account,
  address: Address,
  poolid: bigint
) {
  const rewards = await publicClient.readContract({
    abi: GRQGENESIS.abi,
    account,
    address,
    functionName: "pendingRewards",
    args: [poolid, account.address],
  });
  return rewards;
}
