import type { Account } from "viem";
import { GRQGENESIS } from "../../abi/grqGenesis";
import { walletClient } from "../../client";
import { writeContract } from "viem/actions";

export async function deposit(
  account: Account,
  amount: bigint,
  poolid: bigint,
  maxFeePerGas: bigint,
  maxPriorityFeePerGas: bigint
) {
  const deposit = await walletClient.writeContract({
    abi: GRQGENESIS.abi,
    account,
    address: GRQGENESIS.address,
    functionName: "deposit",
    args: [poolid, amount],
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  return deposit;
}

export async function withdraw(
  account: Account,
  amount: bigint,
  poolid: bigint,
  maxFeePerGas: bigint,
  maxPriorityFeePerGas: bigint
) {
  const withdraw = await walletClient.writeContract({
    abi: GRQGENESIS.abi,
    account,
    address: GRQGENESIS.address,
    functionName: "withdraw",
    args: [poolid, amount],
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  return withdraw;
}

export async function claimAll(
  account: Account,
  maxFeePerGas: bigint,
  maxPriorityFeePerGas: bigint
) {
  const claim = await walletClient.writeContract({
    abi: GRQGENESIS.abi,
    account,
    address: GRQGENESIS.address,
    functionName: "claimAll",
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  return claim;
}
