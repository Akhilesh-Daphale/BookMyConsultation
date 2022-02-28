package com.upgrad.bookmyconsultation.controller;

import com.upgrad.bookmyconsultation.entity.Appointment;
import com.upgrad.bookmyconsultation.entity.User;
import com.upgrad.bookmyconsultation.exception.ApplicationException;
import com.upgrad.bookmyconsultation.exception.InvalidInputException;
import com.upgrad.bookmyconsultation.provider.BearerAuthDecoder;
import com.upgrad.bookmyconsultation.service.AppointmentService;
import com.upgrad.bookmyconsultation.service.AuthTokenService;
import com.upgrad.bookmyconsultation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/users")
public class UserAdminController {

	@Autowired
	private UserService userService;

	@Autowired
	private AppointmentService appointmentService;

	@Autowired
	private AuthTokenService authTokenService;
	
	@GetMapping(path = "/{userId}")
	public ResponseEntity<User> getUser(@PathVariable("userId") final String userId) {
		final User user = userService.getUser(userId);

		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@GetMapping("/user")
	public ResponseEntity<User> getUserFromToken(@RequestHeader("authorization") String authorization) {
		final BearerAuthDecoder authDecoder = new BearerAuthDecoder(authorization);
		final User user = authTokenService.getUserFromToken(authDecoder.getAccessToken());

		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<User> createUser(@RequestBody final User user) throws InvalidInputException, ApplicationException {
		return new ResponseEntity<>(userService.register(user), HttpStatus.OK);
	}
	
	@GetMapping("/{userId}/appointments")
	public ResponseEntity<List<Appointment>> getAppointmentForUser(@PathVariable("userId") String userId) {
		return new ResponseEntity<>(appointmentService.getAppointmentsForUser(userId), HttpStatus.OK);
	}
}

//create a post method named createUser with return type as ResponseEntity
//define the method parameter user of type User. Set it final. Use @RequestBody for mapping.
//declare InvalidInputException using throws keyword
//register the user
//return http response with status set to OK
