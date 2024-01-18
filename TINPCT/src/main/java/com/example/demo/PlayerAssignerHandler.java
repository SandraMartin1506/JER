package com.example.demo;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class PlayerAssignerHandler extends TextWebSocketHandler {
	int counter = 0;
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
		String msg;
		counter++;
		if(counter%2 == 0) {
			msg = "Player1";
		}
		else {
			msg = "Player2";
		}
		session.sendMessage(new TextMessage(msg));
	}
}