package com.airquality.commons.airqualitypersistanceservice.util;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.model.UserLocationDto;

import java.util.ArrayList;
import java.util.List;

public class InverseDistanceWeightingUtil {

    public static List<BrasovDevDto> calculator(List<BrasovDevDto> sensorData, double latitude, double longitude) {
        List<BrasovDevDto> processedList = new ArrayList<>();
        double value = 0;
        double weight = 0;
        double distance = 0;
        for (int i = 0; i < sensorData.size(); i++) {
            long nextTime = 0;
            long time = timestampProcessor(sensorData.get(i).getTimestamp());
            if (i < sensorData.size() - 1)
                nextTime = timestampProcessor(sensorData.get(i + 1).getTimestamp());

            distance = HaversinUtil.distanceCalculator(sensorData.get(i).getLocationLat(), sensorData.get(i).getLocationLong(),
                    latitude, longitude);
            if (time != -1 && distance < 1.5) {
                weight = weight + (1 / distance);
                value = value + (sensorData.get(i).getValue() * (1 / distance));
                if (distance < 0.1) {
                    BrasovDevDto brasovDevDto = sensorData.get(i);
                    if (time == -1 && !processedList.isEmpty())
                        brasovDevDto.setTimestamp(processedList.get(processedList.size() - 1).getTimestamp() + 3600000);
                    else if (processedList.isEmpty() && time == -1)
                        brasovDevDto.setTimestamp(sensorData.get(i).getTimestamp() - (sensorData.get(i).getTimestamp() % 3600000));
                    else
                        brasovDevDto.setTimestamp(time);
                    brasovDevDto.setSensor(sensorData.get(i).getSensor());
                    brasovDevDto.setMeasurement(sensorData.get(i).getMeasurement());
                    brasovDevDto.setLocationLat(latitude);
                    brasovDevDto.setLocationLong(longitude);
                    brasovDevDto.setValue(sensorData.get(i).getValue());
                    processedList.add(brasovDevDto);
                    weight = 0;
                    value = 0;
                }
            }
            if (time != nextTime && weight != 0) {
                BrasovDevDto brasovDevDto = sensorData.get(i);
                if (time == -1 && !processedList.isEmpty())
                    brasovDevDto.setTimestamp(processedList.get(processedList.size() - 1).getTimestamp() + 3600000);
                else if (processedList.isEmpty() && time == -1)
                    brasovDevDto.setTimestamp(sensorData.get(i).getTimestamp() - (sensorData.get(i).getTimestamp() % 3600000));
                else
                    brasovDevDto.setTimestamp(time);
                brasovDevDto.setSensor(sensorData.get(i).getSensor());
                brasovDevDto.setMeasurement(sensorData.get(i).getMeasurement());
                brasovDevDto.setLocationLat(latitude);
                brasovDevDto.setLocationLong(longitude);
                brasovDevDto.setValue((int) Math.round(value / weight));
                processedList.add(brasovDevDto);
                weight = 0;
                value = 0;
            }
            if (weight != 0 && i == sensorData.size() - 1) {
                BrasovDevDto brasovDevDto = sensorData.get(i);
                if (time == -1)
                    System.out.println("Hey");
                if (time == -1 && !processedList.isEmpty())
                    brasovDevDto.setTimestamp(processedList.get(processedList.size() - 1).getTimestamp() + 3600000);
                else if (processedList.isEmpty() && time == -1)
                    brasovDevDto.setTimestamp(sensorData.get(i).getTimestamp() - (sensorData.get(i).getTimestamp() % 3600000));
                else
                    brasovDevDto.setTimestamp(time);
                brasovDevDto.setSensor(sensorData.get(i).getSensor());
                brasovDevDto.setMeasurement(sensorData.get(i).getMeasurement());
                brasovDevDto.setLocationLat(latitude);
                brasovDevDto.setLocationLong(longitude);
                brasovDevDto.setValue((int) Math.round(value / weight));
                processedList.add(brasovDevDto);
                weight = 0;
                value = 0;
            }
        }
        return processedList;
    }

    public static List<BrasovDevDto> testingArea(List<BrasovDevDto> sensorData, double latitude, double longitude) {
        List<BrasovDevDto> processedList = new ArrayList<>();
        double value = 0;
        double weight = 0;
        double distance = 0;
        for (int i = 0; i < sensorData.size(); i++) {
            long nextTime = 0;
            long time = timestampProcessor(sensorData.get(i).getTimestamp());
            distance = HaversinUtil.distanceCalculator(sensorData.get(i).getLocationLat(), sensorData.get(i).getLocationLong(),
                    latitude, longitude);
            if (i < sensorData.size() - 1) {
                nextTime = timestampProcessor(sensorData.get(i + 1).getTimestamp());
                if (sensorData.get(i).getLocationLat() == sensorData.get(i + 1).getLocationLat() &&
                        sensorData.get(i).getLocationLong() == sensorData.get(i + 1).getLocationLong())
                    distance = Integer.MAX_VALUE;
            }
            if(distance == 0) {
                System.out.println("Timestamp: " + time + "     ----->     " + "Value: " + sensorData.get(i));
            }
            if (time != -1 && distance < 1.5 && distance != 0 && !sensorData.get(i).getSource().equals("Waqi")) {
//                weight = weight + Math.pow((1 / distance),2);
//                value = value + (sensorData.get(i).getValue() *  Math.pow((1 / distance),2));
                weight = weight + (1 / distance);
                value = value + (sensorData.get(i).getValue() * (1 / distance));
                if (distance < 0.1) {
                    BrasovDevDto brasovDevDto = new BrasovDevDto();
                    if (time == -1 && !processedList.isEmpty())
                        brasovDevDto.setTimestamp(processedList.get(processedList.size() - 1).getTimestamp() + 3600000);
                    else if (processedList.isEmpty() && time == -1)
                        brasovDevDto.setTimestamp(sensorData.get(i).getTimestamp() - (sensorData.get(i).getTimestamp() % 3600000));
                    else
                        brasovDevDto.setTimestamp(time);
                    brasovDevDto.setLocationLat(latitude);
                    brasovDevDto.setLocationLong(longitude);
                    brasovDevDto.setValue(sensorData.get(i).getValue());
                    processedList.add(brasovDevDto);
                    weight = 0;
                    value = 0;
                }
            }
            if (time != nextTime && weight != 0) {
                BrasovDevDto brasovDevDto = new BrasovDevDto();
                if (time == -1 && !processedList.isEmpty())
                    brasovDevDto.setTimestamp(processedList.get(processedList.size() - 1).getTimestamp() + 3600000);
                else if (processedList.isEmpty() && time == -1)
                    brasovDevDto.setTimestamp(sensorData.get(i).getTimestamp() - (sensorData.get(i).getTimestamp() % 3600000));
                else
                    brasovDevDto.setTimestamp(time);
                brasovDevDto.setLocationLat(latitude);
                brasovDevDto.setLocationLong(longitude);
                brasovDevDto.setValue((int) Math.round(value / weight));
                processedList.add(brasovDevDto);
                weight = 0;
                value = 0;
            }
            if (weight != 0 && i == sensorData.size() - 1) {
                BrasovDevDto brasovDevDto = new BrasovDevDto();
                if (time == -1)
                    System.out.println("Hey");
                if (time == -1 && !processedList.isEmpty())
                    brasovDevDto.setTimestamp(processedList.get(processedList.size() - 1).getTimestamp() + 3600000);
                else if (processedList.isEmpty() && time == -1)
                    brasovDevDto.setTimestamp(sensorData.get(i).getTimestamp() - (sensorData.get(i).getTimestamp() % 3600000));
                else
                    brasovDevDto.setTimestamp(time);
                brasovDevDto.setLocationLat(latitude);
                brasovDevDto.setLocationLong(longitude);
                brasovDevDto.setValue((int) Math.round(value / weight));
                processedList.add(brasovDevDto);
                weight = 0;
                value = 0;
            }
        }
        return processedList;
    }


    public static List<BrasovDevDto> calculatorForUserLocation(List<BrasovDevDto> sensorData, List<UserLocationDto> userLocations) {
        List<BrasovDevDto> processedList = new ArrayList<>();
        double value = 0;
        double weight = 0;
        long sensorDataProcessedTimestamp = 0;
        long userLocationProcessedTimestamp = 0;
        double distance = 0;
        for (int i = 0; i < userLocations.size(); i++)
            for (int j = 0; j < sensorData.size(); j++) {
                if (i < userLocations.size() - 1)
                    if (userLocations.get(i + 1).getTimestamp() - userLocations.get(i).getTimestamp() < 60000)
                        break;
                if (sensorData.get(j).getTimestamp() % (3600 * 1000) > 1800000)
                    sensorDataProcessedTimestamp = sensorData.get(j).getTimestamp() + (3600000 - sensorData.get(j).getTimestamp() % (3600 * 1000));
                else
                    sensorDataProcessedTimestamp = sensorData.get(j).getTimestamp() - sensorData.get(j).getTimestamp() % (3600 * 1000);
                if (userLocations.get(i).getTimestamp() % (3600 * 1000) > 1800000)
                    userLocationProcessedTimestamp = userLocations.get(i).getTimestamp() + (3600000 - userLocations.get(i).getTimestamp() % (3600 * 1000));
                else
                    userLocationProcessedTimestamp = userLocations.get(i).getTimestamp() - userLocations.get(i).getTimestamp() % (3600 * 1000);
                distance = HaversinUtil.distanceCalculator(sensorData.get(j).getLocationLat(), sensorData.get(j).getLocationLong(),
                        userLocations.get(i).getLatitude(), userLocations.get(i).getLongitude());
                if (sensorDataProcessedTimestamp == userLocationProcessedTimestamp && distance < 1.5) {
                    weight = weight + (1 / distance);
                    value = value + (sensorData.get(j).getValue() * (1 / distance));
                    System.out.println("Min distance: " + distance);
                    System.out.println("Value: " + sensorData.get(j).getValue());
                    System.out.println(weight);
                    if (distance < 0.1) {
                        BrasovDevDto brasovDevDto = new BrasovDevDto();
                        brasovDevDto.setSensor(sensorData.get(j).getSensor());
                        brasovDevDto.setTimestamp(userLocations.get(i).getTimestamp());
                        brasovDevDto.setLocationLat(userLocations.get(i).getLatitude());
                        brasovDevDto.setLocationLong(userLocations.get(i).getLongitude());
                        brasovDevDto.setValue(sensorData.get(j).getValue());
                        processedList.add(brasovDevDto);
                        weight = 0;
                        value = 0;
                        break;
                    }
                } else if (sensorDataProcessedTimestamp != userLocationProcessedTimestamp && weight != 0) {
                    BrasovDevDto brasovDevDto = new BrasovDevDto();
                    brasovDevDto.setSensor(sensorData.get(j).getSensor());
                    brasovDevDto.setTimestamp(userLocations.get(i).getTimestamp());
                    brasovDevDto.setLocationLat(userLocations.get(i).getLatitude());
                    brasovDevDto.setLocationLong(userLocations.get(i).getLongitude());
                    brasovDevDto.setValue((int) Math.round(value / weight));
                    processedList.add(brasovDevDto);
                    weight = 0;
                    value = 0;
                    break;
                }
                if (i == userLocations.size() - 1 && weight != 0 && value != 0 && j == sensorData.size() - 1) {
                    BrasovDevDto brasovDevDto = new BrasovDevDto();
                    brasovDevDto.setSensor(sensorData.get(j).getSensor());
                    brasovDevDto.setTimestamp(userLocations.get(i).getTimestamp());
                    brasovDevDto.setValue((int) Math.round(value / weight));
                    processedList.add(brasovDevDto);
                    weight = 0;
                    value = 0;
                }
            }
        return processedList;
    }

    private static long timestampProcessor(long timestamp) {
        long time = (timestamp / 1000) % 3600;
        if (time <= 600)
            time = timestamp - time * 1000;
        else if (time >= 3000)
            time = timestamp + (3600 - time) * 1000;
        if (time > 600 && time < 3000) {
            time = -1;
        }
        return time;
    }
}
