package com.model;

import java.sql.Date;

public class Orders {
	
	double ad_id,order_id,cost,qty;
	String item_name,seller_name,buyer;
	public double getAd_id() {
		return ad_id;
	}
	public void setAd_id(double ad_id) {
		this.ad_id = ad_id;
	}
	public double getOrder_id() {
		return order_id;
	}
	public void setOrder_id(double order_id) {
		this.order_id = order_id;
	}
	public double getCost() {
		return cost;
	}
	public void setCost(double cost) {
		this.cost = cost;
	}
	public double getQty() {
		return qty;
	}
	public void setQty(double qty) {
		this.qty = qty;
	}
	public String getItem_name() {
		return item_name;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public String getSeller_name() {
		return seller_name;
	}
	public void setSeller_name(String seller_name) {
		this.seller_name = seller_name;
	}
	public String getBuyer() {
		return buyer;
	}
	public void setBuyer(String buyer) {
		this.buyer = buyer;
	}
	
	

}
