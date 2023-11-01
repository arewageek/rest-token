# Rest Token (RST) - ERC20 Token Contract

The Rest Token (RST) is an ERC20-compliant token smart contract with additional features. It offers the standard ERC20 functions and extends the functionality to include features like a capped supply and the ability to reward miners.

## Contract Details

- **Name**: Rest Token
- **Symbol**: RST
- **Decimals**: 18
- **Capped Supply**: Yes
- **Miner Reward**: Yes

## Features

1. **ERC20 Compatibility**: The Rest Token is fully compatible with the ERC20 standard, making it interoperable with a wide range of wallets and platforms.

2. **Capped Supply**: The total supply of Rest Tokens is capped, ensuring that no more tokens can be minted beyond the defined cap.

3. **Miner Reward**: Miners are rewarded with Rest Tokens. When a transfer occurs, if the sender is not the zero address and the recipient is not the block's coinbase address, miners are rewarded with tokens.

4. **Owner Control**: The contract owner has the ability to set the block reward value and has exclusive access to certain functions.

## Usage

### Token Information

- **Name**: Rest Token
- **Symbol**: RST
- **Decimals**: 18

### Contract Initialization

The Rest Token contract is initialized with a capped supply and a block reward:

- The constructor sets the capped supply and block reward upon deployment.

### Functions

- `setBlockReward(uint256 reward)`: Allows the contract owner to set the block reward value. Only the owner can call this function.

### Modifiers

- `onlyOwner`: Ensures that a function can only be called by the contract owner.

## Security

As with any smart contract, it is important to be cautious when interacting with it. Verify the contract's source code, only use trusted libraries, and thoroughly test your interactions with the contract in a safe environment.

## License

This smart contract is released under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Author**: @arewageek

**License**: MIT

**GitHub Repository**: [Rest Token on GitHub](https://github.com/arewageek/rest-token)
**Sepolia Explorer**: [Contract Creation Trx](https://sepolia.etherscan.io/tx/0xf773afbe8d9496ffa4c573742c6f4940752d633fbbad8ae1c59b2748252c2c11)
