package com.example.demo;

public class User 
{	
	private String name;
	private String password;
	private int victoryP1;
	private int victoryP2;
	//Constructor:
	public User(String n, String p)
	{
		name = n;
		password = p;
		victoryP1 = 0;
		victoryP2 = 0;
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
	public void SetVictoryP1(int v)
	{
		victoryP1 = v;
	}
	
	public void SetVictoryP2(int v)
	{
		victoryP2 = v;
	}
}
