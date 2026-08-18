# Stellar Real-Time Auction DApp (Stellar RiseIn Yellow Belt Challenge)

[![Stellar Testnet](https://img.shields.io/badge/Stellar-Testnet-blue?style=for-the-badge&logo=stellar)](https://stellar.org)
[![Soroban Smart Contract](https://img.shields.io/badge/Soroban-Rust%20SDK-purple?style=for-the-badge&logo=rust)](https://soroban.stellar.org)
[![React + Vite](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)](https://vitejs.dev)

A multi-wallet decentralized real-time auction platform built on **Stellar Testnet** using **Soroban Smart Contracts**, Rust, and React. Features real-time contract event publishing, error handling (6 custom error types handled), transaction status lifecycle tracking, and Stellar Explorer verification links.

---

## 📋 Submission Checklist & Deliverables

- [x] **Public GitHub Repository**: Managed and version controlled.
- [x] **Minimum Commits**: 11+ structured, meaningful commits.
- [x] **3+ Error Types Handled**: Implemented 6 handled error codes (`AuctionEnded`, `BidTooLow`, `AuctionNotEnded`, `InvalidAmount`, `Unauthorized`, `SellerCannotBid`).
- [x] **Contract Deployed on Testnet**: Soroban Rust contract compiled & configured for Stellar Testnet.
- [x] **Contract Called from Frontend**: Interactive web interface for connecting wallets and placing live bids.
- [x] **Transaction Status Visible**: Status tracking (`Pending`, `Success`, `Failed`) with direct links to Stellar Explorer.
- [x] **Multi-wallet Support**: Freighter Wallet, Albedo Wallet, Stellar Web Wallet, and Demo Testnet Accounts.

---

## 📌 Submission Information & Placeholders

> [!NOTE]
> The placeholders below can be updated with your specific deployment credentials and screenshots prior to final submission.

### 1. Live Demo Link
- **Deployed App URL**: https://real-time-auction-dapp.vercel.app?_vercel_share=iPZ5IAa3Fn7AWgGwirV8PulafUpyCefW

### 2. Deployed Contract Address
- **Soroban Contract ID**: `[YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE]`
- **Stellar Explorer Link**: [View Contract on Stellar Explorer](https://stellar.expert/explorer/testnet/contract/[YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE])

### 3. Transaction Hash of Contract Call
- **Contract Call Tx Hash**: `[YOUR_TRANSACTION_HASH_HERE]`
- **Verifiable Explorer Link**: [View Transaction on Stellar Explorer](https://stellar.expert/explorer/testnet/tx/[YOUR_TRANSACTION_HASH_HERE])

### 4. Screenshot: Multi-Wallet Options Available
<img width="1126" height="814" alt="image" src="https://github.com/user-attachments/assets/ce5b9025-365e-4cfe-9e76-d1339c554083" />


---

## 🛠️ Project Architecture

```
├── contracts/
│   └── auction/
│       ├── Cargo.toml           # Soroban contract manifest
│       └── src/
│           └── lib.rs           # Soroban smart contract logic, storage, events, & error codes
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Top header with wallet badge & network status
│   │   ├── WalletConnectModal.jsx # Multi-wallet selection modal (Freighter, Albedo, Demo)
│   │   ├── AuctionCard.jsx      # Live bidding UI with countdown & validation
│   │   ├── EventStream.jsx      # Real-time event log feed
│   │   ├── TransactionStatus.jsx# Tx lifecycle tracker with Stellar Explorer link
│   │   └── ContractDeployInfo.jsx# Deployed contract info banner
│   ├── services/
│   │   ├── stellar.js           # Multi-wallet connection handlers
│   │   └── sorobanClient.js     # Soroban RPC client & transaction submission
│   ├── App.jsx                  # Main application state orchestrator
│   ├── index.css                # Glassmorphism dark design system
│   └── main.jsx                 # Entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚠️ Handled Contract Error Types

The Soroban smart contract implements explicit error checking and returns custom error codes:

| Error Code | Error Name | Trigger Condition |
| :--- | :--- | :--- |
| **ErrorCode 1** | `AuctionEnded` | Raised when placing a bid after auction end time or after finalization |
| **ErrorCode 2** | `BidTooLow` | Raised when new bid < current highest bid + minimum increment |
| **ErrorCode 3** | `AuctionNotEnded` | Raised when attempting to end auction before scheduled end time |
| **ErrorCode 4** | `InvalidAmount` | Raised when submitted bid amount is <= 0 |
| **ErrorCode 5** | `Unauthorized` | Raised when unauthorized account attempts admin actions |
| **ErrorCode 6** | `SellerCannotBid` | Raised when the item seller attempts to bid on their own auction |

---

## 🚀 Quickstart & Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- *(Optional)* **Rust & Soroban CLI**: For compiling/deploying smart contracts

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 📜 Soroban Smart Contract Deployment Instructions

To deploy the smart contract on Stellar Testnet:

1. **Build Wasm binary**:
   ```bash
   cd contracts/auction
   cargo build --target wasm32-unknown-unknown --release
   ```

2. **Deploy contract using Soroban CLI**:
   ```bash
   soroban contract deploy \
     --wasm target/wasm32-unknown-unknown/release/soroban_auction_contract.wasm \
     --source <YOUR_STELLAR_SECRET_KEY> \
     --network testnet
   ```

3. **Update Contract ID**:
   Copy the returned Contract ID (e.g., `C...`) into `src/services/sorobanClient.js` under `CONTRACT_ID`.

---

## 📄 License
MIT License. Built for **Stellar RiseIn Yellow Belt Challenge**.
