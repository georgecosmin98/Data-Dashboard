package com.airquality.commons.airqualitypersistanceservice.util;

//Haversin formula is used to calculate distance between two
//geographic coordinates.
//a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
//c = 2 ⋅ atan2(√a, √(1−a))
//d = R ⋅ c
public class HaversinUtil {

    public static double distanceCalculator(double toLatitude, double toLongitude, double fromLatitude, double fromLongitude) {
        final int earthRadius = 6371;
        double latDistance = Math.toRadians(fromLatitude - toLatitude);
        double lonDistance = Math.toRadians(fromLongitude - toLongitude);
        double a = Math.pow(Math.sin(latDistance / 2), 2) +
                Math.cos(Math.toRadians(toLatitude)) * Math.cos(Math.toRadians(fromLatitude)) *
                        Math.pow(Math.sin(lonDistance / 2), 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadius * c;
    }
}
