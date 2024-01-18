package com.example.demo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class PlayerAssignerApplication implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(playerAssignerHandler(), "/assignPlayer")
			.setAllowedOrigins("*");
	}
	
	@Bean
	public PlayerAssignerHandler playerAssignerHandler() {
		return new PlayerAssignerHandler();
	}
	public static void main(String[] args) {
		SpringApplication.run(PlayerAssignerHandler.class, args);
	}

}