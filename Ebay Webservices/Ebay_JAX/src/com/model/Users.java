package com.model;
import java.sql.Date;

import javax.print.attribute.standard.DateTimeAtCompleted;

public class Users {

	String email,password,firstName,lastName,handle,location;
	Date birthday,last_logged_in;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getHandle() {
		return handle;
	}
	public void setHandle(String handle) {
		this.handle = handle;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public Date getLast_logged_in() {
		return last_logged_in;
	}
	public void setLast_logged_in(Date last_logged_in) {
		this.last_logged_in = last_logged_in;
	}
	
	
	
	
}
