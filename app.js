// Force browser to ignore MetaMask completely
window.ethereum = undefined;

// Configuration
const RPC_URL = "http://127.0.0.1:8545";
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Your deployed contract address

// Hardhat Account #0 private key (Matches constructor msg.sender / issuerAdmin)
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// ABI matching IdentityRegistry.sol
const CONTRACT_ABI = [
  "function issueCredential(address _user, bytes32 _docHash) public",
  "function revokeCredential(address _user) public",
  "function verifyCredential(address _user, bytes32 _docHash) public view returns (bool)"
];

// Direct Ethers initialization
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

// Auto-connect node status on load
window.addEventListener("DOMContentLoaded", async () => {
  const statusElement = document.getElementById("walletAddress");
  try {
    const address = await wallet.getAddress();
    statusElement.innerText = `Connected Node: ${RPC_URL} | Issuer Admin: ${address}`;
  } catch (error) {
    console.error("Node Connection Error:", error);
    statusElement.style.color = "red";
    statusElement.innerText = "❌ Unable to connect to local Hardhat node. Make sure 'npx hardhat node' is running.";
  }
});

// Helper function: SHA-256 Hash Calculation properly formatted for bytes32
async function calculateHash(file) {
  const arrayBuffer = await file.arrayBuffer();
  const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
  const hashHex = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
  return "0x" + hashHex.padStart(64, "0");
}

// 1. Issue Identity Function
async function issueIdentity() {
  const userAddress = document.getElementById("issueUserAddress").value.trim();
  const fileInput = document.getElementById("issueDocFile");
  const statusMsg = document.getElementById("statusMessage");

  if (!userAddress || !fileInput.files[0]) {
    alert("Please enter a target wallet address and select a document.");
    return;
  }

  try {
    statusMsg.style.color = "#0056b3";
    statusMsg.innerText = "⏳ Registering credential on-chain via issueCredential()...";

    const fileHash = await calculateHash(fileInput.files[0]);
    console.log("Document SHA-256 Hash:", fileHash);

    const tx = await contract.issueCredential(userAddress, fileHash);
    console.log("Tx Hash:", tx.hash);

    await tx.wait(); // Wait for block confirmation

    statusMsg.style.color = "green";
    statusMsg.innerText = "✅ Credential Successfully Issued & Recorded On-Chain!";
  } catch (error) {
    console.error("Issue Error:", error);
    statusMsg.style.color = "red";
    statusMsg.innerText = "❌ Registration failed. Check console for details.";
  }
}

// 2. Revoke Identity Function
async function revokeIdentity() {
  const userAddress = document.getElementById("revokeUserAddress").value.trim();
  const statusMsg = document.getElementById("statusMessage");

  if (!userAddress) {
    alert("Please enter a target wallet address to revoke.");
    return;
  }

  try {
    statusMsg.style.color = "#d9534f";
    statusMsg.innerText = "⏳ Revoking credential on-chain via revokeCredential()...";

    const tx = await contract.revokeCredential(userAddress);
    console.log("Revoke Tx Hash:", tx.hash);

    await tx.wait();

    statusMsg.style.color = "red";
    statusMsg.innerText = "⛔ Credential Successfully Revoked On-Chain!";
  } catch (error) {
    console.error("Revoke Error:", error);
    statusMsg.style.color = "red";
    statusMsg.innerText = "❌ Revocation failed. Check console for details.";
  }
}

// 3. Verify Identity Function
async function verifyIdentity() {
  const userAddress = document.getElementById("verifyUserAddress").value.trim();
  const fileInput = document.getElementById("verifyDocFile");
  const statusMsg = document.getElementById("statusMessage");

  if (!userAddress || !fileInput.files[0]) {
    alert("Please enter a target wallet address and select a document.");
    return;
  }

  try {
    statusMsg.style.color = "#0056b3";
    statusMsg.innerText = "⏳ Checking hash on local blockchain...";

    const fileHash = await calculateHash(fileInput.files[0]);
    console.log("Verifying SHA-256 Hash:", fileHash);

    const isValid = await contract.verifyCredential(userAddress, fileHash);

    if (isValid) {
      statusMsg.style.color = "green";
      statusMsg.innerText = "✅ VERIFIED: Document matches on-chain record!";
    } else {
      statusMsg.style.color = "red";
      statusMsg.innerText = "❌ UNVERIFIED: Hash does not match or record missing/revoked.";
    }
  } catch (error) {
    console.error("Verification Error:", error);
    statusMsg.style.color = "red";
    statusMsg.innerText = "❌ Error verifying document.";
  }
}