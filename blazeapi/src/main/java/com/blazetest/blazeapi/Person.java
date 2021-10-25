package com.blazetest.blazeapi;

import org.springframework.data.annotation.Id;

public class Person {

    @Id private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

}
