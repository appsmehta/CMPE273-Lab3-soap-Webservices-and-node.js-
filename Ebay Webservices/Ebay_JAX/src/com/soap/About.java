package com.soap;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.jws.WebService;

import com.model.Bids;
import com.model.Orders;
import com.model.Users;

import com.conn.DbConn;
import com.mysql.jdbc.Driver;

@WebService
public class About {
	
	public Users getProfile (String email){
		
		Connection conn = null;
		PreparedStatement stmt = null;
		Users loggedInUser = new Users();
try {
			
			System.out.println("Connecting to database...");
			conn = DbConn.getConnection();

			System.out.println("connection " + conn);

			// STEP 4: Execute a query
			System.out.println("Creating statement...");
			String sql;
			sql = "SELECT * FROM users WHERE email = ?" ;
			System.out.println(email);
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, email);
			System.out.println("query " + sql);
			System.out.println(stmt);
			ResultSet rs = stmt.executeQuery();

			System.out.println("Before rs " + rs);

			while (rs.next()) {
				// Retrieve by column name
				loggedInUser.setEmail(rs.getString("email"));
				loggedInUser.setBirthday (rs.getDate("birthday"));
				loggedInUser.setFirstName(rs.getString("firstName"));
				loggedInUser.setLastName(rs.getString("lastname"));
				loggedInUser.setHandle(rs.getString("handle"));
				loggedInUser.setLocation(rs.getString("location"));

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

		
		
		return loggedInUser;
		
	}

	public String updateProfile (String firstName, String lastName, String handle, String contactinfo, String location, String email)
	{
		
		String emailId = email;
		Connection conn = null;
		PreparedStatement stmt = null;
		//Users loggedInUser = new Users();
try {
			
			System.out.println("Connecting to database...");
			conn = DbConn.getConnection();

			System.out.println("connection " + conn);

			// STEP 4: Execute a query
			System.out.println("Creating statement...");
			String sql;
			sql = "Update users * set firstName = ?, lastName = ?, handle = ?, contactinfo = ?, location = ? where email = ?"   ;
			System.out.println(email);
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, firstName);
			stmt.setString(2, lastName);
			stmt.setString(3, handle);
			stmt.setString(4, contactinfo);
			stmt.setString(5, location);
			stmt.setString(6, emailId);
			System.out.println("query " + sql);
			System.out.println(stmt);
			ResultSet rs = stmt.executeQuery();
			
			if(rs.next()){
				return "User Updated";
			}
			else
				return "User not Updated";
		
	}	catch (SQLException se) {
		// Handle errors for JDBC

		System.out.println("inside sql exception");

		se.printStackTrace();
	} catch (Exception e) {
		// Handle errors for Class.forName

		System.out.println("inside sql exception");
		e.printStackTrace();
	}
	return "User Updated";

	}	

	public Orders[] getBoughtItems (String email)
	{
		
		Connection conn = null;
		PreparedStatement stmt = null;
		Orders[] myBoughtItems = null;
		try {
			
			System.out.println("Connecting to database...");
			conn = DbConn.getConnection();

			System.out.println("connection " + conn);

			// STEP 4: Execute a query
			System.out.println("Creating statement...");
			String sql;
			sql = "SELECT * FROM orders WHERE buyer = ?" ;
			System.out.println(email);
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, email);
			System.out.println("query " + sql);
			System.out.println(stmt);
			ResultSet rs = stmt.executeQuery();

			System.out.println("Before rs " + rs);
			int i=0;
			while (rs.next()) {
				
				
				Orders myOrder = new Orders();
				
				myOrder.setAd_id(rs.getDouble("ad_id"));
				myOrder.setBuyer(rs.getString("buyer"));
				myOrder.setCost(rs.getDouble("cost"));
				myOrder.setItem_name(rs.getString("Item_name"));
				myOrder.setOrder_id(rs.getDouble("Order_id"));
				myOrder.setQty(rs.getDouble("Qty"));
				myOrder.setSeller_name(rs.getString("Seller_name"));
				
				myBoughtItems[i] = myOrder;
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

		return myBoughtItems;
		
	}
	
	public Orders[] getSoldItems (String email )

	
	{
		Connection conn = null;
		PreparedStatement stmt = null;
		Orders[] mySoldItems = null;
		try {
			
			System.out.println("Connecting to database...");
			conn = DbConn.getConnection();

			System.out.println("connection " + conn);

			// STEP 4: Execute a query
			System.out.println("Creating statement...");
			String sql;
			sql = "SELECT * FROM orders WHERE seller_name = ?" ;
			System.out.println(email);
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, email);
			System.out.println("query " + sql);
			System.out.println(stmt);
			ResultSet rs = stmt.executeQuery();

			System.out.println("Before rs " + rs);
			int i=0;
			while (rs.next()) {
				
				
				Orders myOrder = new Orders();
				
				myOrder.setAd_id(rs.getDouble("ad_id"));
				myOrder.setBuyer(rs.getString("buyer"));
				myOrder.setCost(rs.getDouble("cost"));
				myOrder.setItem_name(rs.getString("Item_name"));
				myOrder.setOrder_id(rs.getDouble("Order_id"));
				myOrder.setQty(rs.getDouble("Qty"));
				myOrder.setSeller_name(rs.getString("Seller_name"));
				
				mySoldItems[i] = myOrder;
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

		return mySoldItems;
		
	}

	public Bids[] getBidResults (String bidder)
	{
		
		Connection conn = null;
		PreparedStatement stmt = null;
		Bids[] myBidResults = null;
		try {
			
			System.out.println("Connecting to database...");
			conn = DbConn.getConnection();

			System.out.println("connection " + conn);

			// STEP 4: Execute a query
			System.out.println("Creating statement...");
			String sql;
			sql = "SELECT * FROM Bids WHERE bidder = ?" ;
			System.out.println(bidder);
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, bidder);
			System.out.println("query " + sql);
			System.out.println(stmt);
			ResultSet rs = stmt.executeQuery();

			System.out.println("Before rs " + rs);
			int i=0;
			while (rs.next()) {
				
				
				Bids myBid = new Bids();
				
				myBid.setAuction_id(rs.getDouble("auction_id"));
				myBid.setBid_amount(rs.getDouble("auction_amount"));
				myBid.setBid_id(rs.getDouble("bid_id"));
				myBid.setBid_status(rs.getString("bid_status"));
				myBid.setBid_time(rs.getDate("Bid_time"));
				myBid.setBidder(rs.getString("bidder"));
				
				myBidResults[i] = myBid;
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

		return myBidResults;
		
	}
}

