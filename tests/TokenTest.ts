import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { MyERC20Token } from "../typechain-types";

describe("Basic tests for understanding ERC20", async () => {
  let MyERC20Contract: MyERC20Token;
  let accounts: SignerWithAddress[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const MyERC20ContractFactory = await ethers.getContractFactory(
      "MyERC20Token"
    );
    MyERC20Contract = await MyERC20ContractFactory.deploy();
    await MyERC20Contract.deployed();
  });

  it("should have zero total supply at deployment", async () => {
    const totalSupplyBN = await MyERC20Contract.totalSupply();
    const decimals = await MyERC20Contract.decimals();
    const totalSupply = parseFloat(
      ethers.utils.formatUnits(totalSupplyBN, decimals)
    );
    expect(totalSupply).to.eq(0);
  });

  it("should have more than zero total supply after minting", async () => {
    const mintTx = await MyERC20Contract.mint(accounts[0].address, 2);
    await mintTx.wait();
    const totalSupplyBN = await MyERC20Contract.totalSupply();
    const decimals = await MyERC20Contract.decimals();
    const totalSupply = parseFloat(
      ethers.utils.formatUnits(totalSupplyBN, decimals)
    );
    expect(totalSupply).to.gt(0);
  });

  it("triggers the Transfer event with the address of the sender when sending transactions", async function () {
    const mintTx = await MyERC20Contract.mint(accounts[0].address, 2);
    await mintTx.wait();
    const targetAddress = accounts[1].address;
    await expect(MyERC20Contract.transfer(targetAddress, 1))
      .to.emit(MyERC20Contract, "Transfer")
      .withArgs(accounts[0].address, targetAddress, 1);
  });
});
