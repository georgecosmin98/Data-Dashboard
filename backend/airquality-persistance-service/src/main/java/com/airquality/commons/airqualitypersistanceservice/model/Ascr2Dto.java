package com.airquality.commons.airqualitypersistanceservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
//Data is a shortcut for ToString EqualsAndHasCode, Getter, Setter
//and RequiredArgsConstructor annotation!
public class Ascr2Dto {
    private String name;
    private Date timestamp;
    @JsonProperty("temperature[*C]")
    private float temperature;
    @JsonProperty("humidity[%]")
    private float humidity;
    @JsonProperty("atmospheric_pressure[hPa]")
    private float atmospheric_pressure;
    @JsonProperty("eCO2_BME")
    private float eCO2_bme;
    @JsonProperty("IAQ")
    private float IAQ;
    @JsonProperty("Resistance_CCS[ohm]")
    private long resistance_CCS;
    @JsonProperty("eCO2_CCS[ppm]")
    private long eCO2_CCS;
    @JsonProperty("Resistance_BME[ohm]")
    private float resistance_BME;
    @JsonProperty("Vo[mV]")
    private float Vo;
    @JsonProperty("dust_density[ug/m3]")
    private float dust_density;
}
