package com.example.doctor.repository;

 
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.doctor.model.DoctorModel;

@Repository
public interface DoctorRepository extends MongoRepository<DoctorModel, String>{

 
}
