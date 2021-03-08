package com.airquality.commons.airqualitypersistanceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

@Data
//Data is a shortcut for ToString EqualsAndHasCode, Getter, Setter
//and RequiredArgsConstructor annotation!
@Document(indexName = "test-user")
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    @Id
    @ReadOnlyProperty
    private Long id;

    // @Field(name = "username")
    //private String username;

    @Field(name = "email")
    private String username;

    @Field(name = "password")
    private String password;
    private String role;
}
