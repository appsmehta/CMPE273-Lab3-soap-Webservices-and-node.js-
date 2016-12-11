package com.soap;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.jws.WebService;

import com.model.Orders;
import com.model.Users;

import com.conn.DbConn;
import com.mysql.jdbc.Driver;

@WebService
public class Checkout {
	
public String processCheckout (String ad_id,String item_name,String seller_name,String buyer,Double cost,Double qty){
		
		Connection conn = null;
		PreparedStatement stmt = null;
		Orders newOrder = new Orders();
		String response = "";
try {
			
			System.out.println("Connecting to database...");
			conn = DbConn.getConnection();

			System.out.println("connection " + conn);

			// STEP 4: Execute a query
			System.out.println("Creating statement...");
			String sql;
			sql = "Insert into orders (ad_id,item_name,seller_name,buyer,cost,qty) values (?,?,?,?,?,?)" ;
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, ad_id);
			stmt.setString(3,seller_name);
			stmt.setString(2,item_name);
			stmt.setString(4, buyer);
			stmt.setDouble(5, cost);
			stmt.setDouble(6, qty);
			
			System.out.println("query " + sql);
			System.out.println(stmt);
			int rows = stmt.executeUpdate();

			if(rows>0)
			{
				response = "order processed";
					
			}
			else
				 response = "failure";

			
			// STEP 6: Clean-up environment
	
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

		
		
		return response;
}
	
	

}
