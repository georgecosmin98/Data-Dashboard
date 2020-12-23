package com.airquality.commons.airqualitypersistanceservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

@Data
//Data is a shortcut for ToString EqualsAndHasCode, Getter, Setter
//and RequiredArgsConstructor annotation!
@Document(indexName = "ascr.2")
public class Ascr2Dto{

    @Id
    @ReadOnlyProperty
    private String id;
    private String name;
    private String timestamp;
    @Field(name="temperature[*C]")
    private float temperature;
    @Field(name="humidity[%]")
    private float humidity;
    @Field(name="atmospheric_pressure[hPa]")
    private float atmospheric_pressure;
    @Field(name="eCO2_BME")
    private float eCO2_BME;
    @Field(name="IAQ")
    private float IAQ;
    @Field(name="Resistance_CCS[ohm]")
    private long resistance_CCS;
    @Field(name="eCO2_CCS[ppm]")
    private long eCO2_CCS;
    @Field(name="Resistance_BME[ohm]")
    private float resistance_BME;
    @Field(name="Vo[mV]")
    private float Vo;
    @Field(name="dust_density[ug/m3]")
    private float dust_density;
}
