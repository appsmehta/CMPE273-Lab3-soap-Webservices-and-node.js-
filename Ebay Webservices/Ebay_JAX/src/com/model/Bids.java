package com.model;

import java.sql.Date;

public class Bids {
	
	double bid_id,auction_id,bid_amount;
	String bidder,bid_status;
	Date  bid_time;
	public double getBid_id() {
		return bid_id;
	}
	public void setBid_id(double bid_id) {
		this.bid_id = bid_id;
	}
	public double getAuction_id() {
		return auction_id;
	}
	public void setAuction_id(double auction_id) {
		this.auction_id = auction_id;
	}
	public double getBid_amount() {
		return bid_amount;
	}
	public void setBid_amount(double bid_amount) {
		this.bid_amount = bid_amount;
	}
	public String getBidder() {
		return bidder;
	}
	public void setBidder(String bidder) {
		this.bidder = bidder;
	}
	public String getBid_status() {
		return bid_status;
	}
	public void setBid_status(String bid_status) {
		this.bid_status = bid_status;
	}
	public Date getBid_time() {
		return bid_time;
	}
	public void setBid_time(Date bid_time) {
		this.bid_time = bid_time;
	}
	
	

}
