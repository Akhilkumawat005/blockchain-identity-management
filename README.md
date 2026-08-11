# Blockchain Digital Identity Management System

A decentralized identity verification application built with Solidity, Hardhat, Ethers.js, and modern HTML/CSS/JS. The system enables authorized issuers to register document SHA-256 hashes on-chain, revoke credentials, and allows public verification without exposing raw sensitive document data.

## 🚀 Features
- **Privacy-Preserving:** Documents are hashed locally using SHA-256 via CryptoJS before reaching the blockchain—zero PII stored on-chain.
- **Smart Contract Security:** Written in Solidity (`IdentityRegistry.sol`) with role-based access control (`onlyAdmin`).
- **Complete Credential Lifecycle:** Supports Credential Issuance, Revocation, and Verification.
- **Modern Responsive UI:** Tabbed dashboard interface with real-time feedback and dynamic file upload states.

## 🛠️ Tech Stack
- **Smart Contract:** Solidity (^0.8.20), Hardhat
- **Frontend:** JavaScript (ES6+), Ethers.js v5, CryptoJS, HTML5, CSS3
- **Local Network:** Hardhat EVM Node (`http://127.0.0.1:8545`)

## 💻 Installation & Setup

1. **Clone the repository:**
   git clone [https://github.com/Akhilkumawat005/blockchain-identity-management.git](https://github.com/Akhilkumawat005/blockchain-identity-management.git)
   cd blockchain-identity-management

1. Install dependencies:
npm install

2. Start local Hardhat node:
npx hardhat node

3. Deploy smart contract (in a second terminal):
npx hardhat run scripts/deploy.js --network localhost

4. Run the application:
Open index.html using Live Server or open it directly in your web browser.

📂 Directory & File Structure
Plaintext
blockchain-identity-management/
├── contracts/
│   └── IdentityRegistry.sol    # Smart contract containing core logic (issue, revoke, verify)
├── scripts/
│   └── deploy.js               # Deployment script to publish smart contract to local node
├── .gitignore                  # Prevents node_modules, cache, and sensitive files from being tracked
├── app.js                      # Web3 frontend logic (Ethers.js provider, SHA-256 hashing, contract calls)
├── hardhat.config.js           # Hardhat configuration (Solidity compiler version, network settings)
├── index.html                  # Responsive Web UI (Tabs, custom file upload dropzone, dynamic feedback)
├── package.json                # Project metadata and dependencies (Hardhat, Ethers, etc.)
└── package-lock.json           # Exact dependency tree lockfile