package com.example.doctor.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.doctor.model.Content;
import com.example.doctor.model.DoctorContentMapping;
import com.example.doctor.model.DoctorModel;
import com.example.doctor.repository.DoctorRepository;

@Service
public class DoctorService {

	   @Autowired(required = true)
	   private DoctorRepository doctorRepo;
		
		public DoctorModel saveUser(DoctorModel doctor) {
			return doctorRepo.save(doctor);
		}
		
		public DoctorModel getbyUserByName(String userName) {

			Optional<DoctorModel> user = doctorRepo.findById(userName);
			if(user.get()!=null) {
				if(user.get().getUserName().equalsIgnoreCase(userName)) {
					return user.get();
				}
			}
			return null;
		}
		
		public List<DoctorModel> findAllUsers() {
			List<DoctorModel> users = doctorRepo.findAll();
			 DoctorModel  result = new DoctorModel();

			Map<String, Object> map = new HashMap<>();
			if(!users.isEmpty()) {
					return users;
			}
			return null;
		}
		
		public List<DoctorContentMapping> findContent(String content){
		
	try {
			List<DoctorModel> doctor = doctorRepo.findAll();
			List<DoctorContentMapping> result = new ArrayList<>();
			if(!doctor.isEmpty()) {
			doctor.stream().forEach(val->{	 
                if(val.getContent()!=null) {
                	 for(Content c : val.getContent()) {
                		 DoctorContentMapping query = new DoctorContentMapping();
                		 if(c.getDoctorContent().contains(content)) {
                			 query.setContent(c.getDoctorContent());
                			 query.setUserId(val.getId());
                			 query.setUserName(val.getUserName());
                			 query.setDoctorName(val.getDoctorName());
                			 result.add(query);
                		 }
                	 }
                }
			});
			}
			return result;
 	}catch(Exception e) {
		e.printStackTrace();
	}
	return null;
}
		
		public DoctorModel updateUser(DoctorModel doctor) {
			System.err.println("doctor" +  doctor.getId() + doctor.getContent());
			DoctorModel update= doctorRepo.findById(doctor.getId()).get();
			if(update!=null) {
					update.setContent(doctor.getContent());
			}
			return doctorRepo.save(update);
		}

		public DoctorModel convertDicom(MultipartFile dicom) {
 		return null;	 
		}
		
//	    public ImageFileReader getDcmImageFileReader(String imagePath) {
//	        ImageFileReader imageFileReader = new ImageFileReader();
//	        imageFileReader.setImageIO("GDCMImageIO");
//	        imageFileReader.setFileName(imagePath);
//	        return imageFileReader;
//	    }
}
