package com.airquality.commons.airqualitypersistanceservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
//Data is a shortcut for ToString EqualsAndHasCode, Getter, Setter
//and RequiredArgsConstructor annotation!
@Document(indexName = "test-user")
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    @Id
    @ReadOnlyProperty
    private String id;

    @Field(name = "name")
    private String name;

    @Field(name = "email")
    private String email;

    @Field(name = "imageUrl")
    private String imageUrl;

    @Field(name = "password")
    private String password;

}
