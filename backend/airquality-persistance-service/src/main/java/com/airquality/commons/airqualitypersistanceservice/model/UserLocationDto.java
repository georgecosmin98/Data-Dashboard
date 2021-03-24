package com.airquality.commons.airqualitypersistanceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

import java.util.Date;

@Data
//Data is a shortcut for ToString EqualsAndHasCode, Getter, Setter
//and RequiredArgsConstructor annotation!
@Document(indexName = "userlocation")
@AllArgsConstructor
@NoArgsConstructor
public class UserLocationDto {

    @Id
    @ReadOnlyProperty
    private String id;

    @Field(name = "email")
    private String username;

    @Field(name = "latitude")
    private double latitude;

    @Field(name = "longitude")
    private double longitude;

    @Field(name = "timestamp", format = DateFormat.epoch_millis)
    private Date timestamp;

}
