package com.airquality.commons.airqualitypersistanceservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class AirqualityPersistanceServiceApplication extends SpringBootServletInitializer {

	//
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder){
		return builder.sources(AirqualityPersistanceServiceApplication.class);
	}
	public static void main(String[] args) {
		SpringApplication.run(AirqualityPersistanceServiceApplication.class, args);
	}

}
