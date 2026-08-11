# Blockchain Digital Identity Management System

A decentralized identity verification application built with Solidity, Hardhat, Ethers.js, and modern HTML/CSS/JS. The system enables authorized issuers to register document SHA-256 hashes on-chain, revoke credentials, and allow public verification without exposing raw sensitive document data.

---

## 🚀 Features

- **Privacy-Preserving:** Documents are hashed locally using SHA-256 via CryptoJS before reaching the blockchain—zero PII (Personally Identifiable Information) stored on-chain.
- **Smart Contract Security:** Written in Solidity (`IdentityRegistry.sol`) with role-based access control (`onlyAdmin`).
- **Complete Credential Lifecycle:** Supports Credential Issuance, Revocation, and Verification.
- **Modern Responsive UI:** Tabbed dashboard interface with real-time feedback and dynamic file upload states.

---

## 🛠️ Tech Stack

- **Smart Contract:** Solidity (`^0.8.20`), Hardhat
- **Frontend:** JavaScript (ES6+), Ethers.js v5, CryptoJS, HTML5, CSS3
- **Local Network:** Hardhat EVM Node (`http://127.0.0.1:8545`)

---

## 📂 Directory & File Structure

blockchain-identity-management/
├── contracts/
│   └── IdentityRegistry.sol    # Smart contract containing core logic (issue, revoke, verify)
├── scripts/
│   └── deploy.js               # Deployment script to publish smart contract to local node
├── .gitignore                  # Prevents node_modules, cache, and build files from being tracked
├── app.js                      # Web3 frontend logic (Ethers.js provider, SHA-256 hashing, contract calls)
├── hardhat.config.js           # Hardhat configuration (Solidity compiler version, network settings)
├── index.html                  # Responsive Web UI (Tabs, custom dropzone, dynamic feedback)
├── package.json                # Project metadata and dependencies
└── package-lock.json           # Exact dependency tree lockfile

💻 Installation & Local Setup
1. Clone the Repository
git clone [https://github.com/Akhilkumawat005/blockchain-identity-management.git](https://github.com/Akhilkumawat005/blockchain-identity-management.git)
cd blockchain-identity-management

2. Install Dependencies
npm install

3. Start Local Hardhat Node
Open Terminal 1:

npx hardhat node

4. Deploy Smart Contract
Open Terminal 2:

npx hardhat run scripts/deploy.js --network localhost

5. Run the Application
Open index.html using Live Server in VS Code or open it directly in your web browser.