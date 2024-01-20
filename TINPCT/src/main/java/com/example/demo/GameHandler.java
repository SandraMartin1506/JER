package com.example.demo;
import java.io.IOException;
import java.util.Random;

import org.json.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class GameHandler extends TextWebSocketHandler {
	int counter = 0;
	//Inicialización de jugadores:
	int mission;
	int hat;
	int top;
	int bot;
	String hint;
	float initialX;
	float initialY;
	String weapon;
	//Jugadores preparados:
	boolean p1Ready = false;
	boolean p2Ready = false;
	//Input de P1:
	String inputP1;
	String inputType;
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
		JSONObject json = new JSONObject(message.getPayload());
		String requestType = "";
		if(json.has("type")) { requestType = json.getString("type");}
		switch (requestType) 
		{
			case "assignPlayer":
				AssignPlayer(session);
				break;
			case "InitializeP1":
				InitializeP1(json);
				break;
			case "InitializeP2":
				InitializeP2(json);
				break;
			case "PlayersReady":
				StartGame(session);
				break;
			case "GetP1Info":
				GetP1Info(session);
				break;
			case "GetP2Info":
				GetP2Info(session);
				break;
			case "MoveP1":
				MoveP1(session, json);
				break;
			case "ObtainP1Input":
				ObtainP1Input(session);
				break;
		}
	}
	
	private void AssignPlayer(WebSocketSession session) throws IOException 
	{
		String msg = "";
		counter++;
		if(counter == 1) {
			msg = "Player1";
		}
		else if (counter == 2){
			msg = "Player2";
		}
		session.sendMessage(new TextMessage(msg));
	}
	
	private void InitializeP1(JSONObject json)
	{
		mission = json.getInt("mission");
		hat = json.getInt("hat");
		top = json.getInt("top");
		bot = json.getInt("bot");
		hint = json.getString("hint");
		Random rand = new Random();
		initialX = rand.nextInt(1550) + 50;
		initialY = rand.nextInt(850) + 50;
		p1Ready = true;
	}
	
	private void InitializeP2(JSONObject json)
	{
		weapon = json.getString("weapon");
		p2Ready = true;
	}
	
	private void StartGame(WebSocketSession session) throws IOException
	{
		String msg = "false";
		if(p1Ready && p2Ready) 
		{
			msg = "true";
		}
		session.sendMessage(new TextMessage(msg));
	}
	
	private void GetP1Info(WebSocketSession session) throws IOException
	{
		String msg = "p1;" + mission + ";" + hat + ";" + top + ";" + bot + ";" + initialX + ";" + initialY + ";" + hint;
		session.sendMessage(new TextMessage(msg));
	}
	
	private void GetP2Info(WebSocketSession session) throws IOException
	{
		String msg = "p2;" + weapon + ";" + hint;
		session.sendMessage(new TextMessage(msg));
	}
	
	private void MoveP1(WebSocketSession session, JSONObject json) throws IOException
	{
		inputP1 = json.getString("key");
		inputType = json.getString("inputType");
	}
	
	private void ObtainP1Input(WebSocketSession session) throws IOException
	{
		System.out.println("Datos enviados");
		String msg = "movePlayer;" + this.inputP1 + ";" + this.inputType;
		if(this.inputP1 != null) session.sendMessage(new TextMessage(msg));
	}
}
