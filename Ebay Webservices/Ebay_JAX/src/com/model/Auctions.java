package com.model;

import java.sql.Date;

public class Auctions {
	
	double auction_id,item_price;
	String item_name,item_descripton,seller_name,status;
	Date posted_at,expires;
	public double getAuction_id() {
		return auction_id;
	}
	public void setAuction_id(double auction_id) {
		this.auction_id = auction_id;
	}
	public double getItem_price() {
		return item_price;
	}
	public void setItem_price(double item_price) {
		this.item_price = item_price;
	}
	public String getItem_name() {
		return item_name;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public String getItem_descripton() {
		return item_descripton;
	}
	public void setItem_descripton(String item_descripton) {
		this.item_descripton = item_descripton;
	}
	public String getSeller_name() {
		return seller_name;
	}
	public void setSeller_name(String seller_name) {
		this.seller_name = seller_name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getPosted_at() {
		return posted_at;
	}
	public void setPosted_at(Date posted_at) {
		this.posted_at = posted_at;
	}
	public Date getExpires() {
		return expires;
	}
	public void setExpires(Date expires) {
		this.expires = expires;
	}
	
	
	

}
