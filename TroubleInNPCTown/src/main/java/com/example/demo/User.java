package com.example.demo;

public class User 
{	
	private String name;
	private String password;
	private int victoryP1;
	private int victoryP2;
	private int totalVictories;
	//Constructor:
	public User(String n, String p)
	{
		name = n;
		password = p;
		victoryP1 = 0;
		victoryP2 = 0;
		totalVictories = 0;
	}
	
	//Getters:
	public String GetUserName()
	{
		return name;
	}
	
	public String GetPassword()
	{
		return password;
	}
	
	public int GetVictoryP1()
	{
		return victoryP1;
	}
	
	public int GetVictoryP2()
	{
		return victoryP2;
	}
	
	//Setters:
	public void AddVictoryP1()
	{
		victoryP1++;
		totalVictories++;
	}
	
	public void AddVictoryP2()
	{
		victoryP2++;
		totalVictories++;
	}
}
