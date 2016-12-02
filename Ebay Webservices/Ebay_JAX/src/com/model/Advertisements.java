package com.model;

import java.sql.Date;

public class Advertisements {
	
	double adv_id,item_price;
	String item_name,item_description,seller_name;
	int item_qty;
	
	
	public double getAdv_id() {
		return adv_id;
	}
	public void setAdv_id(double adv_id) {
		this.adv_id = adv_id;
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
	public String getItem_description() {
		return item_description;
	}
	public void setItem_description(String item_description) {
		this.item_description = item_description;
	}
	public String getSeller_name() {
		return seller_name;
	}
	public void setSeller_name(String seller_name) {
		this.seller_name = seller_name;
	}
	public int getItem_qty() {
		return item_qty;
	}
	public void setItem_qty(int item_qty) {
		this.item_qty = item_qty;
	}
	

}
