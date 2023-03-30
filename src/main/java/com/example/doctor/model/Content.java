package com.example.doctor.model;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class Content{
	private String doctorContent;
	private String positionX;
	private String positionY;
}