package com.conn;

import java.sql.Connection;
import com.mysql.jdbc.Driver;
import java.sql.DriverManager;
import java.sql.Statement;

public class DbConn {

	static final String jdbc_driver = "com.mysql.jdbc.Driver";
	
	static final String db_url = "jdbc:mysql://localhost:3306/ebay_schema";

	static final String db_username = "apoorv";

	static final String db_password = "root1234";
	
	
	public static Connection getConnection(){
		
		Connection conn = null;

		try{
			java.sql.Driver d=new com.mysql.jdbc.Driver();
			System.out.println(d);
			//STEP 2: Register JDBC driver
			Class.forName(jdbc_driver).newInstance();

			//STEP 3: Open a connection
			System.out.println("Connecting to the database...");
			conn = DriverManager.getConnection(db_url,db_username,db_password);
			System.out.println("Got Connected"+conn);
		}
		catch(Exception e){
			System.out.println("Exception");
			e.printStackTrace();
		}
		return conn;
	}
}
