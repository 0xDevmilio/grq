import {
  GRQTOKEN,
  GRQUSDPOOLID,
  HONEYTOKEN,
  NATIVETOKEN,
  USDCTOKEN,
} from "./constants";
import { approve } from "./lib/erc20/erc20Write";
import { account } from "./account";
import { balanceOf, decimals } from "./lib/erc20/erc20Read";
import { GRQGENESIS } from "./abi/grqGenesis";
import { claimAll, deposit, withdraw } from "./lib/grq/grpGenesisWrite";
import { getUserOperation } from "viem/account-abstraction";
import { getUserPools, pendingRewards } from "./lib/grq/grpGenesisRead";
import { publicClient } from "./client";
import { KODIAKROUTER02 } from "./abi/kodiakRouter02";
import {
  exactInput,
  swapExactTokensForTokens,
} from "./lib/kodiak/kodiakRouter02Write";
import { sleep } from "bun";

setInterval(autocompounder, 120000);
async function autocompounder() {
  console.log("AUTOCOMPOUNDER IS STARTING");

  const { maxFeePerGas, maxPriorityFeePerGas } =
    await publicClient.estimateFeesPerGas();

  const maxFeePerGasX = maxFeePerGas * BigInt(10n);
  const maxPriorityFeePerGasX = maxPriorityFeePerGas * BigInt(10n);

  const claim = await claimAll(account, maxFeePerGasX, maxPriorityFeePerGasX);
  console.log("claim", claim);

  const waitClaim = await publicClient.waitForTransactionReceipt({
    hash: claim,
  });
  console.log("Claim has being Confirmed");

  await sleep(3000);

  const GRQBalance = await balanceOf(account.address, GRQTOKEN);
  console.log("GRQBALANCE:", GRQBalance);

  const swapGRQBERA = await swapExactTokensForTokens(
    account,
    KODIAKROUTER02.address,
    GRQBalance,
    0n,
    maxFeePerGasX,
    maxPriorityFeePerGasX,
    GRQTOKEN,
    NATIVETOKEN
  );
  console.log("Swap GRQ/BERA:", swapGRQBERA);

  const waitGRQBERA = await publicClient.waitForTransactionReceipt({
    hash: swapGRQBERA,
  });
  console.log("swap GRQ BERA Confirmed");

  await sleep(3000);

  const BERABalance = await balanceOf(account.address, NATIVETOKEN);
  console.log("BERABALANCE:", BERABalance);

  const swapBERAUSDC = await exactInput(
    account,
    KODIAKROUTER02.address,
    BERABalance,
    0n,
    maxFeePerGasX,
    maxPriorityFeePerGasX,
    NATIVETOKEN,
    HONEYTOKEN,
    USDCTOKEN
  );
  console.log("Swap BERA USDC", swapBERAUSDC);

  const waitBERAUSDC = await publicClient.waitForTransactionReceipt({
    hash: swapGRQBERA,
  });
  console.log("swap BERA USDC Confirmed");

  await sleep(1000);

  const balanceUSDC = await balanceOf(account.address, USDCTOKEN);
  console.log("Balance", balanceUSDC);

  const grqDeposit = await deposit(
    account,
    balanceUSDC,
    GRQUSDPOOLID,
    maxFeePerGasX,
    maxPriorityFeePerGasX
  );
  console.log("Deposit Tx", grqDeposit);

  const waitGRQDEPOSIT = await publicClient.waitForTransactionReceipt({
    hash: grqDeposit,
  });
  console.log("USDC DEPOSIT CONFIRMED");

  await sleep(1000);

  console.log("LOOOOP DONE GG");
}

// const decimal = await decimals(USDCTOKEN);
// console.log("Decimals", decimal);

// const tx = await approve(
//   account,
//   USDCTOKEN,
//   GRQGENESIS.address,
//   1_000n,
//   maxFeePerGasX,
//   maxPriorityFeePerGasX
// );
// console.log("Tx", tx);

// const grqDeposit = await deposit(
//   account,
//   balance,
//   GRQUSDPOOLID,
//   maxFeePerGasX,
//   maxPriorityFeePerGasX
// );
// console.log("Deposit Tx", grqDeposit);

// const grqBalance = await getUserPools(account, GRQGENESIS.address);
// console.log("Pool and Balance", grqBalance);
// const grqWithdraw = await withdraw(
//   account,
//   grqBalance[1] as unknown as bigint,
//   grqBalance[0] as unknown as bigint,
//   maxFeePerGasX,
//   maxPriorityFeePerGasX
// );
// console.log("Withdraw", grqWithdraw);

// const rewards = await pendingRewards(account, GRQGENESIS.address, 5n);
// console.log("Rewards", rewards);

// const swapApprove = await approve(
//   account,
//   GRQTOKEN,
//   account.address,
//   31454012623267590n,
//   maxFeePerGasX,
//   maxPriorityFeePerGasX
// );
// console.log("Swap Tokens Approved", swapApprove);

// const wait = await publicClient.waitForTransactionReceipt({
//   hash: swapApprove,
// });
// console.log("Approval Confirmed");
