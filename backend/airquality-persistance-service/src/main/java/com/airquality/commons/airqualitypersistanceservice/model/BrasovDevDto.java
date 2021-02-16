package com.airquality.commons.airqualitypersistanceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

@Data
//Data is a shortcut for ToString EqualsAndHasCode, Getter, Setter
//and RequiredArgsConstructor annotation!
@Document(indexName = "brasov-dev")
@AllArgsConstructor
public class BrasovDevDto {
    @Id
    @ReadOnlyProperty
    private String id;
    @Field(name = "Source")
    private String source;
    @Field(name = "Sensor")
    private String sensor;
    @Field(name = "Value")
    private int value;
    @Field(name = "LocationLat")
    private double locationLat;
    @Field(name = "LocationLong")
    private double locationLong;
    @Field(name = "TimeStamp")
    private int timestamp;
    @Field(name = "Measurement")
    private String measurement;

}
