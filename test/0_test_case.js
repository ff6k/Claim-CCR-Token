var VegasCoin = artifacts.require("TokenMintERC20MintableToken");

contract('vegascoin', function (accounts) {

    let vcoin
    const name = "VegasCoins.io"
    const symbol = 'VCoins'
    const decimals = 18
    const initialSupply = 3000000000000
    const feeReceiver = '0x753f1d496C84a12fddAD8B46C0Fea6846521E95d'
    const tokenOwnerAddress = '0x753f1d496C84a12fddAD8B46C0Fea6846521E95d'

    /*
    *   Contract initiation  
    *   
    */
    it("Create Vegas Coin Instance", async () => {
        vcoin = await VegasCoin.deployed(name, symbol, decimals, initialSupply, feeReceiver, tokenOwnerAddress);
        assert(vcoin !== undefined, 'No Vegas Coin instance');
    }).timeout(100000);

    /*
    * Verify contract identifier
    */
    it("Confirmed Token Identifier", async () => {
        vcoin = await VegasCoin.deployed(name, symbol, decimals, initialSupply, feeReceiver, tokenOwnerAddress);
        console.log(`${name} :: ${symbol} :: ${decimals} :: ${initialSupply} :: ${feeReceiver} :: ${tokenOwnerAddress}`)
    })

    //transferMinterRole(address newMinter)
    it("Contract Owner should be initial balance", async () => {
        vcoin = await VegasCoin.deployed(name, symbol, decimals, initialSupply, feeReceiver, tokenOwnerAddress);
        let balance = await vcoin.balanceOf(tokenOwnerAddress);
        console.log(`Initial Balance of Minter ${balance}`)
    })

    it("Must be able to burn certain amount", async () => {
        vcoin = await VegasCoin.deployed(name, symbol, decimals, initialSupply, feeReceiver, tokenOwnerAddress);
        await vcoin.burn(5000);
        let balance = await vcoin.balanceOf(tokenOwnerAddress);
        console.log(`Balance after burn ${balance}`)
    })

    //mint
    it("Must add to supply after minting", async () => {
        vcoin = await VegasCoin.deployed(name, symbol, decimals, initialSupply, feeReceiver, tokenOwnerAddress);
        await vcoin.mint(tokenOwnerAddress, 5000)
        let balance = await vcoin.balanceOf(tokenOwnerAddress);
        console.log(`Balance after minting ${balance}`)
    })

    //Step one random value
    it("Must have 3 random numbers", async () => {
        vcoin = await VegasCoin.deployed(name, symbol, decimals, initialSupply, feeReceiver, tokenOwnerAddress);
        let results = await vcoin.spinSlotMachine(decimals);
        console.log(`Slot Machine Random Numbers ${results[0]}::${results[1]}::${results[2]}`)
    })

    //Step two random value
    it("Must have random number", async () => {
        vcoin = await VegasCoin.deployed(name, symbol, decimals, initialSupply, feeReceiver, tokenOwnerAddress);
        let random = await vcoin.getRandom(decimals);
        console.log(`Get Random Number ${random}`)
    })

    //Step three air drop
    it("Must add token balance after airdrop", async () => {
        let recipients = ["0x5807c6ecb0AB413816f7C90f0e5C2974bDF89fc3", '0x3f223D8681eAf9b2EaAf0006E037d49D069B9277'];
        vcoin = await VegasCoin.deployed(name, symbol, decimals, initialSupply, feeReceiver, tokenOwnerAddress);
        await vcoin.transfer(vcoin.address, 50000);
        await vcoin.getAirdrop(recipients, 5000);
        for (let i = 0; i < recipients.length; i++) {
            let balance = await vcoin.balanceOf(recipients[i]);
            console.log(`Balance of ${recipients[i]} after airdrop ${balance}`);
        }
    })
});