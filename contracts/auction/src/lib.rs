#![no_std]
use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, symbol_short, Address, Env, String, Symbol, Vector,
};

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
