package com.example.doctor.controller;

import java.io.IOException;
import java.util.List;

import com.pixelmed.dicom.AttributeList;
import com.pixelmed.dicom.DicomException;
import com.pixelmed.dicom.TagFromName;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.example.doctor.model.DoctorContentMapping;
import com.example.doctor.model.DoctorModel;
import com.example.doctor.service.DoctorService;

@RestController
@CrossOrigin(origins = "*")
public class DoctorController {

	
	@Autowired()
	private DoctorService doctorservice;
	
	
	@PostMapping("/saveUser")
	public com.example.doctor.model.DoctorModel saveUser(@RequestBody DoctorModel doctor) {
		return doctorservice.saveUser(doctor);
	}
	
	@GetMapping("/getUser/{name}")
	public DoctorModel getUserByName(@PathVariable String name) {
		return doctorservice.getbyUserByName(name);
	}
	
	@GetMapping("/findContent/{content}")
	public List<DoctorContentMapping> findDoctorContent(@PathVariable String content) {
		return doctorservice.findContent(content);
	}
	
	@GetMapping("/findAll")
	public List<DoctorModel> findAll() throws DicomException, IOException {
		AttributeList attributeList = new AttributeList();
		attributeList.read("jjhg");
 		return doctorservice.findAllUsers();
	}
	
	@PostMapping("/updateDicom")
	public DoctorModel convertDicomViewer(@RequestPart  MultipartFile dicom) {
		return doctorservice.convertDicom(dicom);
	}
	
	
	@PostMapping("/updateContent")
	public DoctorModel updateContent(@RequestBody DoctorModel doctor) {
		System.err.println("doctor" +  doctor.getId() + doctor.getContent());

		return doctorservice.updateUser(doctor);
	}
	
	
	
}