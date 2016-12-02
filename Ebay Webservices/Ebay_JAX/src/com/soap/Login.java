package com.soap;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.jws.WebService;
import com.model.Users;

import com.conn.DbConn;
import com.mysql.jdbc.Driver;


@WebService
public class Login {

	public Users login(String username, String password) {

		Connection conn = null;
		PreparedStatement stmt = null;
		Users loggedInUser = new Users();
		Double userId = null;

		try {
			
			System.out.println("Connecting to database...");
			conn = DbConn.getConnection();

			System.out.println("connection " + conn);

			// STEP 4: Execute a query
			System.out.println("Creating statement...");
			String sql;
			sql = "SELECT * FROM users WHERE email = ?" ;
			System.out.println(username);
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, username);
			System.out.println("query " + sql);
			System.out.println(stmt);
			ResultSet rs = stmt.executeQuery();

			System.out.println("Before rs " + rs);

			while (rs.next()) {
				// Retrieve by column name
				String userName = rs.getString("email");
				String passWord = rs.getString("password");

				System.out.println("username " + userName);
				System.out.println("password " + passWord);

				if (userName.equals(username) && passWord.equals(password)) {
					System.out.println("true");
					
					
					loggedInUser.setLast_logged_in(rs.getDate("last_logged_in"));
					loggedInUser.setEmail(username);
					
					
					
					// loginTrue = true;
				}

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

	public String register(String email, String password, String firstName, String lastName)
	{
		Users newUser = new Users();
		
		newUser.setEmail(email);
		newUser.setPassword(password);
		newUser.setFirstName(firstName);
		newUser.setLastName(lastName);
		
		
		Connection conn = null;
		PreparedStatement stmt = null;
		Double userId = null;

		try {
			
			System.out.println("Connecting to database...");
			conn = DbConn.getConnection();

			System.out.println("connection " + conn);

			// STEP 4: Execute a query
			System.out.println("Creating statement...");
			String sql;
			sql = "Insert into users(email,password,firstName,lastName) values (?,?,?,?)" ;
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, newUser.getEmail());
			stmt.setString(2,newUser.getPassword());
			stmt.setString(3, newUser.getFirstName());
			stmt.setString(4, newUser.getLastName());
			System.out.println("query " + sql);
			System.out.println(stmt);
			int rows = stmt.executeUpdate();

			System.out.println("Affected rows " + rows);

			
					
					
					// loginTrue = true;
				

			
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
		
		
		
		return "User Registered";
	}
}