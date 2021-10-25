package com.blazetest.blazeapi;

import java.util.List;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@EnableAutoConfiguration
@SpringBootApplication
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface PersonRepository extends MongoRepository<Person, String> {

    List<Person> findByFirstName(String firstName);
    List<Person> findByLastName(String lastName);
    List<Person> findByEmail(String email);
    List<Person> findByPhoneNumber(String phoneNumber);

}
