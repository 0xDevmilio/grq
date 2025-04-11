import { GRQUSDPOOLID, HONEYTOKEN, USDCTOKEN } from "./constants";
import { approve } from "./lib/erc20/erc20Write";
import { account } from "./account";
import { balanceOf, decimals } from "./lib/erc20/erc20Read";
import { GRQGENESIS } from "./abi/grqGenesis";
import { claimAll, deposit, withdraw } from "./lib/grq/grpGenesisWrite";
import { getUserOperation } from "viem/account-abstraction";
import { getUserPools, pendingRewards } from "./lib/grq/grpGenesisRead";
import { publicClient } from "./client";

const decimal = await decimals(USDCTOKEN);
console.log("Decimals", decimal);
const balance = await balanceOf(account.address, USDCTOKEN);
console.log("Balance", balance);

const { maxFeePerGas, maxPriorityFeePerGas } =
  await publicClient.estimateFeesPerGas();

// const tx = await approve(
//   account,
//   USDCTOKEN,
//   GRQGENESIS.address,
//   1_000n,
//   maxFeePerGas,
//   maxPriorityFeePerGas
// );
// console.log("Tx", tx);

// const grqDeposit = await deposit(
//   account,
//   balance,
//   GRQUSDPOOLID,
//   maxFeePerGas,
//   maxPriorityFeePerGas
// );
// console.log("Deposit Tx", grqDeposit);

// const grqBalance = await getUserPools(account, GRQGENESIS.address);
// console.log("Pool and Balance", grqBalance);
// const grqWithdraw = await withdraw(
//   account,
//   grqBalance[1] as unknown as bigint,
//   grqBalance[0] as unknown as bigint,
//   maxFeePerGas,
//   maxPriorityFeePerGas
// );
// console.log("Withdraw", grqWithdraw);

// const claim = await claimAll(account, maxFeePerGas, maxPriorityFeePerGas);
// console.log("claim", claim);

// const rewards = await pendingRewards(account, GRQGENESIS.address, 5n);
// console.log("Rewards", rewards);
