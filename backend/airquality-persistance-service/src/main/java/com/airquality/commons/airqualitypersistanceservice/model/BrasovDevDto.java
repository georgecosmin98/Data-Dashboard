package com.airquality.commons.airqualitypersistanceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

import java.time.ZonedDateTime;
import java.util.Date;

@Data
//Data is a shortcut for ToString EqualsAndHasCode, Getter, Setter
//and RequiredArgsConstructor annotation!
@Document(indexName = "brasov-dev")
@AllArgsConstructor
@NoArgsConstructor
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
    @Field(name = "TimeStamp", format = DateFormat.epoch_millis)
    private long timestamp;
    @Field(name = "Measurement")
    private String measurement;

}
