
import { ethers } from "hardhat";
import { MyERC20Token__factory } from "../typechain-types";

async function main() {
    const [deployer, acc1, acc2] = await ethers.getSigners()
    const contractfactory = new MyERC20Token__factory(deployer)
    const deploytx = await contractfactory.deploy()
    const deployreciept = await deploytx.deployTransaction.wait()
    console.log(`Contract is deployed at block number ${deployreciept.blockNumber} and at an address ${deploytx.address}`)
    const minterRoletx= await deploytx.MINTER_ROLE()
    const tx=await deploytx.grantRole(minterRoletx,acc1.address)
    const rolercpt= await tx.wait()
    console.log(`Minter role for account 1 at block number ${rolercpt.blockNumber}`)
    const mintx = await deploytx.connect(acc1).mint(acc2.address, 100)
    const mintrcpt= await mintx.wait()
    console.log(`${mintx.value} is minted from account 1 to account 2`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
