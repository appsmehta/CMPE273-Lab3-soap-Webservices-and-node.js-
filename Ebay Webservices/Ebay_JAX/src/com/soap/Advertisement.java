package com.soap;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.jws.WebService;

import com.model.Advertisements;
import com.model.Bids;
import com.model.Orders;
import com.model.Users;

import com.conn.DbConn;
import com.mysql.jdbc.Driver;

@WebService
public class Advertisement {
	
public Advertisements[] getAds (){
		
		Connection conn = null;
		PreparedStatement stmt = null;
		Advertisements[] ads = null;
try {
			
			System.out.println("Connecting to database...");
			conn = DbConn.getConnection();

			System.out.println("connection " + conn);

			// STEP 4: Execute a query
			System.out.println("Creating statement...");
			String sql;
			sql = "SELECT * FROM advertisements" ;
			stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();

			System.out.println("Before rs " + rs);
			int i =0;
			while (rs.next()) {
				// Retrieve by column name
				Advertisements myAd = new Advertisements();
				myAd.setAdv_id(rs.getDouble("adv_id"));
				myAd.setItem_description(rs.getString("Item_description"));
				myAd.setItem_name(rs.getString("Item_name"));
				myAd.setItem_price(rs.getDouble("Item_price"));
				myAd.setItem_qty(rs.getInt("Item_qty"));
				myAd.setSeller_name(rs.getString("seller_name"));
				
				ads[i] = myAd;
				i++;
			}

			
			
			// STEP 6: Clean-up environment
			rs.close();
			stmt.close();
			conn.close();
		} catch (SQLException se) {
			// Handle errors for JDBC

			System.out.println("inside sql exception");

			se.printStackTrace();
		} catch (Exception e) {
			// Handle errors for Class.forName

			System.out.println("inside sql exception");
			e.printStackTrace();
		}

		
return ads;
}
}
