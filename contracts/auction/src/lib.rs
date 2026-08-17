#![no_std]
use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, symbol_short, Address, Env, String, Symbol, Vector,
};

/// Custom Error Codes for the Soroban Real-Time Auction Smart Contract
/// Fulfills Requirement: Minimum 3 error types handled (We implement 6 distinct errors)
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum AuctionError {
    /// Error 1: The auction has already reached its expiration time or been finalized.
    AuctionEnded = 1,
    /// Error 2: The submitted bid is lower than the current highest bid + minimum increment.
    BidTooLow = 2,
    /// Error 3: Attempting to finalize/end the auction before the scheduled end time.
    AuctionNotEnded = 3,
    /// Error 4: The submitted bid amount is invalid (<= 0).
    InvalidAmount = 4,
    /// Error 5: Caller is unauthorized to perform this operation.
    Unauthorized = 5,
    /// Error 6: The auction creator/seller is not allowed to bid on their own item.
    SellerCannotBid = 6,
}

/// Storage keys used by the Soroban Real-Time Auction Smart Contract
#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Admin,           // Address: Contract Administrator
    ItemTitle,       // String: Auction Item Title
    ItemDescription, // String: Auction Item Description
    MinBidIncrement, // i128: Minimum amount each bid must exceed previous bid
    HighestBidder,   // Address: Current highest bidder
    HighestBid,      // i128: Current highest bid amount
    EndTime,         // u64: Unix timestamp when auction expires
    IsEnded,         // bool: Flag indicating if auction was finalized
    BidCount,        // u32: Total number of bids placed
}

/// Data structure representing an Auction Details view
#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct AuctionDetails {
    pub item_title: String,
    pub item_description: String,
    pub seller: Address,
    pub highest_bidder: Option<Address>,
    pub highest_bid: i128,
    pub min_bid_increment: i128,
    pub end_time: u64,
    pub is_ended: bool,
    pub bid_count: u32,
}
