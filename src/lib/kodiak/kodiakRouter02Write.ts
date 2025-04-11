import type { Account, Address } from "viem";
import { writeContract } from "viem/actions";
import { KODIAKROUTER02 } from "../../abi/kodiakRouter02";
import { walletClient } from "../../client";
import { NATIVETOKEN, NULLADDRESS } from "../../constants";

export async function swapExactTokensForTokens(
  account: Account,
  address: Address,
  amount: bigint,
  minAmountOut: bigint,
  maxFeePerGas: bigint,
  maxPriorityFeePerGas: bigint,
  tokenIn: Address,
  tokenOut: Address
) {
  const swap = await walletClient.writeContract({
    abi: KODIAKROUTER02.abi,
    account,
    address,
    functionName: "swapExactTokensForTokens",
    args: [amount, minAmountOut, [tokenIn, tokenOut], account.address],
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  return swap;
}

export async function exactInput(
  account: Account,
  address: Address,
  amount: bigint,
  minAmountOut: bigint,
  maxFeePerGas: bigint,
  maxPriorityFeePerGas: bigint,
  tokenIn: Address,
  tokenMiddle: Address,
  tokenOut: Address
) {
  // Remove '0x' prefix from all addresses
  const tokenInClean = tokenIn.slice(2);
  const tokenMiddleClean = tokenMiddle.slice(2);
  const tokenOutClean = tokenOut.slice(2);

  // Format: token1 + fee1 + token2 + fee2 + token3
  const fee1 = "000bb8"; // 0.3%
  const fee2 = "000064"; // 0.3%

  const encodedPath =
    `0x${tokenInClean}${fee1}${tokenMiddleClean}${fee2}${tokenOutClean}` as Address;
  const swap = await walletClient.writeContract({
    abi: KODIAKROUTER02.abi,
    account,
    address,
    functionName: "exactInput",
    args: [
      {
        path: encodedPath,
        recipient: account.address,
        amountIn: amount,
        amountOutMinimum: minAmountOut,
      },
    ],
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  return swap;
}
