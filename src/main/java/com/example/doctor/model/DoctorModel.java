package com.example.doctor.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "doctor_table")
public class DoctorModel {

	@Id
	private String id;
	private String userName;
	private String doctorName;
	private List<Content> content;
}

