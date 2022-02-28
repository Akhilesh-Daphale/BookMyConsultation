package com.upgrad.bookmyconsultation.controller;

import com.upgrad.bookmyconsultation.entity.Doctor;
import com.upgrad.bookmyconsultation.enums.Speciality;
import com.upgrad.bookmyconsultation.exception.InvalidInputException;
import com.upgrad.bookmyconsultation.model.TimeSlot;
import com.upgrad.bookmyconsultation.service.DoctorService;
import com.upgrad.bookmyconsultation.util.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

	@Autowired
	private DoctorService service;

	@GetMapping("/{id}")
	public ResponseEntity<Doctor> getDoctorDetails(@PathVariable String id) {
		return new ResponseEntity<>(service.getDoctor(id), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<Doctor>> getAllDoctors(@RequestParam(value = "speciality", required = false) String speciality) {
		return new ResponseEntity<>(service.getAllDoctorsWithFilters(speciality), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Doctor> registerDoctor(@RequestBody Doctor doctor) throws InvalidInputException {
		return new ResponseEntity<>(service.register(doctor), HttpStatus.OK);
	}

	@GetMapping("/speciality")
	public ResponseEntity<List<String>> getSpeciality() {
		List<String> speciality = Stream.of(Speciality.values())
				.map(Enum::name)
				.collect(Collectors.toList());

		return new ResponseEntity<>(speciality, HttpStatus.OK);
	}

	@GetMapping("/{doctorId}/timeSlots")
	public ResponseEntity<TimeSlot> getTimeSlots(@RequestParam(value = "date", required = false) String date,
	                                             @PathVariable String doctorId) {
		if (!ValidationUtils.isValid(date))
			throw new InvalidParameterException("Not a valid date");
		if (service.getDoctor(doctorId) == null)
			throw new InvalidParameterException("Not a valid doctor id");

		return new ResponseEntity<>(service.getTimeSlots(doctorId, date), HttpStatus.OK);
	}
}