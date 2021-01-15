package com.airquality.commons.airqualitypersistanceservice;

import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@Log4j2
public class AirqualityPersistanceServiceApplication extends SpringBootServletInitializer {


	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder){
		return builder.sources(AirqualityPersistanceServiceApplication.class);
	}
	public static void main(String[] args) {
		SpringApplication.run(AirqualityPersistanceServiceApplication.class, args);
	}

}
