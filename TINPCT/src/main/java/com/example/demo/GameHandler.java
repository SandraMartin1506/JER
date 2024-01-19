package com.example.demo;
import java.io.IOException;

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
	String weapon;
	//Jugadores preparados:
	boolean p1Ready = false;
	boolean p2Ready = false;
	
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
		}
	}
	
	private void AssignPlayer(WebSocketSession session) throws IOException 
	{
		String msg;
		counter++;
		if(counter%2 == 0) {
			msg = "Player2";
		}
		else {
			msg = "Player1";
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
}
