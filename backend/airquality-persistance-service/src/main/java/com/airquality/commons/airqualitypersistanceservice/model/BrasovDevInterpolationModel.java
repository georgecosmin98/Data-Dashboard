package com.airquality.commons.airqualitypersistanceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BrasovDevInterpolationModel {

    private String sensor;
    private int value;
    private double locationLat;
    private double locationLong;
    private double minDistance;

}
