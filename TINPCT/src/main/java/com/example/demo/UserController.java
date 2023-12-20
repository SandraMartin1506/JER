package com.example.demo;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	private Map<String, User> users = new ConcurrentHashMap<>();
	
	@PostMapping(value = "/Login")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<User> Login(@RequestBody User userToLogin)
	{
		 User login = users.get(userToLogin.getUserName());
		 if(login != null && login.getPassword().equals(userToLogin.getPassword())) {
			 return new ResponseEntity<>(login, HttpStatus.OK);
		 }
		 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping(value = "/CreateAccount")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<User> newUser(@RequestBody User user)
	{
		if(users.get(user.getUserName()) == null) {
			users.put(user.getUserName(), user);
			return new ResponseEntity<>(user, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.FORBIDDEN);
	}
	
	@GetMapping(value = "/NumGames/{userName}")
	public ResponseEntity<Integer> TotalGames(@PathVariable String userName)
	{
		User user = users.get(userName);
		if(user != null) return new ResponseEntity<>(user.getTotalVictories(), HttpStatus.OK);
		else return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/DeleteAccount/{userName}")
	public ResponseEntity<User> DeleteAccount(@PathVariable String userName)
	{
		User user = users.get(userName);
		if(user != null) {
			users.remove(user.getUserName());
			return new ResponseEntity<>(user, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
