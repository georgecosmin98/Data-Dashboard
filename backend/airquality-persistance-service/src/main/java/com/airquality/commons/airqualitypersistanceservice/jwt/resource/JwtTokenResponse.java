package com.airquality.commons.airqualitypersistanceservice.jwt.resource;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class JwtTokenResponse{

  private final String token;

}