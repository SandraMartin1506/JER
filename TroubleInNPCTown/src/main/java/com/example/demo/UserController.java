package com.example.demo;
import java.util.*;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController 
{
	Collection<User> users = new ArrayList<>();
	@PostMapping("/Register")
	public User RegisterUser(@RequestParam String userName, @RequestParam String password)
	{
		for(User user : users)
		{
			if(user.GetUserName().equals(userName) && user.GetPassword().equals(password))
			{
				return user;
			}
		}
		return null;
	}
	
	@PostMapping("/CreateAccount")
	public void CreateAccount(@RequestParam String userName, @RequestParam String password)
	{
		User newUser = new User(userName, password);
		users.add(newUser);
	}
	
	@PostMapping("/UpdateVictoryP1")
	public void UpdateVictoryP1(@RequestParam User user)
	{
		user.AddVictoryP1();
	}
	
	@PostMapping("/UpdateVictoryP2")
	public void UpdateVictoryP2(@RequestParam User user)
	{
		user.AddVictoryP2();
	}
}
