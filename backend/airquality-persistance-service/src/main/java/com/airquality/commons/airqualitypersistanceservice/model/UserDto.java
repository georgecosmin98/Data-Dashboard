package com.airquality.commons.airqualitypersistanceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

import java.util.Date;

@Data
//Data is a shortcut for ToString EqualsAndHasCode, Getter, Setter
//and RequiredArgsConstructor annotation!
@Document(indexName = "test-user123")
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    @Id
    @ReadOnlyProperty
    private Long id;

    @Field(name = "name")
    private String name;

    @Field(name = "email")
    private String username;

    @Field(name = "password")
    private String password;

    @Field(name = "reset_token")
    private String resetToken;

    @Field(name = "expiration_date")
    private Date expirationDate;
}
