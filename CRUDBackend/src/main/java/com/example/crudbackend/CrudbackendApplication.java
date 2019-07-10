package com.example.crudbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EntityScan("com.example.crudbackend.*")
@ComponentScan(basePackages = "com.example.crudbackend.*")
@EnableJpaRepositories("com.example.crudbackend.Repositories")
public class CrudbackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrudbackendApplication.class, args);
    }

}
