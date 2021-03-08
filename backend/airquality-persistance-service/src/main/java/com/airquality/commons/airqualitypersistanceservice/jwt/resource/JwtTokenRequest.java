package com.airquality.commons.airqualitypersistanceservice.jwt.resource;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class  JwtTokenRequest{
    private String username;
    private String password;
}
