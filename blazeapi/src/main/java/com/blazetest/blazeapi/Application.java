package com.blazetest.blazeapi;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.SpringApplication;
import org.springframework.web.bind.annotation.*;

@RestController
@SpringBootApplication
@CrossOrigin
public class Application {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }

}
