package com.airquality.commons.airqualitypersistanceservice.util;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevInterpolationModel;
import com.airquality.commons.airqualitypersistanceservice.model.UserLocationDto;

import java.util.ArrayList;
import java.util.List;

public class InverseDistanceWeightingUtil {

    public static List<BrasovDevDto> calculator(List<BrasovDevInterpolationModel> brasovDevInterpolationModel, List<BrasovDevDto> sensorData) {
        List<BrasovDevDto> processedList = new ArrayList<>();
        double value = 0;
        double weight = 0;
        int pasi = 0;
        boolean isDistance0 = false;
        boolean dataFromOneSensor = true;
        double latitudeDistance0 = 0;
        double longitudeDistance0 = 0;
        System.out.println(brasovDevInterpolationModel.size());
        System.out.println(sensorData.size());
        if (brasovDevInterpolationModel.size() > 1) {
            sensorData.add(new BrasovDevDto("", "", "", 0, 0, 0, 0, ""));
            for (int i = 0; i < sensorData.size() - 1; i++) {
                if ((sensorData.get(i + 1).getTimestamp() - sensorData.get(i).getTimestamp()) < 600 * 1000) {
                    if (!isDistance0) {
                        for (int j = 0; j < brasovDevInterpolationModel.size(); j++) {
                            pasi++;
                            if (brasovDevInterpolationModel.get(j).getMinDistance() == 0) {
                                isDistance0 = true;
                                latitudeDistance0 = brasovDevInterpolationModel.get(j).getLocationLat();
                                longitudeDistance0 = brasovDevInterpolationModel.get(j).getLocationLong();
                            }
                            if (brasovDevInterpolationModel.get(j).getLocationLat() == sensorData.get(i).getLocationLat() &&
                                    brasovDevInterpolationModel.get(j).getLocationLong() == sensorData.get(i).getLocationLong()) {
                                weight = weight + (1 / brasovDevInterpolationModel.get(j).getMinDistance());
                                value = value + (sensorData.get(i).getValue() * (1 / brasovDevInterpolationModel.get(j).getMinDistance()));
                                break;
                            }
                        }
                    } else if (latitudeDistance0 == sensorData.get(i).getLocationLat() && longitudeDistance0 == sensorData.get(i).getLocationLong() && isDistance0) {
                        processedList.add(sensorData.get(i));
                    }

                } else {
                    if (!isDistance0 && weight != 0 && value != 0) {
                        BrasovDevDto brasovDevDto = sensorData.get(i);
                        brasovDevDto.setValue((int) Math.round(value / weight));
                        processedList.add(brasovDevDto);
                        weight = 0;
                        value = 0;
                    }
                }
                //Treat last element case
                if (i == sensorData.size() - 2 && weight != 0 && value != 0 && !isDistance0) {
                    BrasovDevDto brasovDevDto = sensorData.get(i);
                    brasovDevDto.setValue((int) Math.round(value / weight));
                    processedList.add(brasovDevDto);
                    weight = 0;
                    value = 0;
                }
                //If sensorData have values from just one sensor
                if (i != sensorData.size() - 2 && ((sensorData.get(i + 1).getLocationLong() != sensorData.get(i).getLocationLong()) ||
                        (sensorData.get(i + 1).getLocationLat() != sensorData.get(i).getLocationLat()))) {
                    dataFromOneSensor = false;
                }
            }
            System.out.println(pasi);
            if (dataFromOneSensor)
                return sensorData.subList(0, sensorData.size() - 2);
            else
                return processedList;
        } else
            return sensorData;
    }

    public static List<BrasovDevDto> calculator2(List<BrasovDevInterpolationModel> brasovDevInterpolationModel, List<BrasovDevDto> sensorData) {
        List<BrasovDevDto> processedList = new ArrayList<>();
        double value = 0;
        double weight = 0;
        int pasi = 0;
        boolean isSensorNear = false;
        boolean dataFromOneSensor = true;
        double latitudeDistance0 = 0;
        double longitudeDistance0 = 0;
        System.out.println(brasovDevInterpolationModel.size());
        System.out.println(sensorData.size());
        if (brasovDevInterpolationModel.size() > 1) {
            for (int i = 0; i < sensorData.size(); i++) {
                long lastTime = 0;
                long time = timestampProcessor(sensorData.get(i).getTimestamp());
                if (i > 1)
                    lastTime = timestampProcessor(sensorData.get(i - 1).getTimestamp());
                else
                    lastTime = time;

                if (!isSensorNear && weight != 0 && value != 0 && time != -1 && time != lastTime) {
                    BrasovDevDto brasovDevDto = new BrasovDevDto();
                    if (lastTime != -1)
                        brasovDevDto.setTimestamp(lastTime);
                    else
                        brasovDevDto.setTimestamp(time - 3600000);
                    brasovDevDto.setSensor(sensorData.get(i).getSensor());
                    brasovDevDto.setValue((int) Math.round(value / weight));
                    processedList.add(brasovDevDto);
                    weight = 0;
                    value = 0;
                }

                if (time != -1) {
                    if (!isSensorNear) {
                        for (int j = 0; j < brasovDevInterpolationModel.size(); j++) {
                            pasi++;
                            //If distance between our address and sensor is less than 100 meters, we took values from that sensor
                            if (brasovDevInterpolationModel.get(j).getMinDistance() < 0.1) {
                                isSensorNear = true;
                                latitudeDistance0 = brasovDevInterpolationModel.get(j).getLocationLat();
                                longitudeDistance0 = brasovDevInterpolationModel.get(j).getLocationLong();
                            }
                            if (brasovDevInterpolationModel.get(j).getLocationLat() == sensorData.get(i).getLocationLat() &&
                                    brasovDevInterpolationModel.get(j).getLocationLong() == sensorData.get(i).getLocationLong()) {
                                weight = weight + (1 / brasovDevInterpolationModel.get(j).getMinDistance());
                                value = value + (sensorData.get(i).getValue() * (1 / brasovDevInterpolationModel.get(j).getMinDistance()));
                                break;
                            }
                        }
                    } else if (latitudeDistance0 == sensorData.get(i).getLocationLat() && longitudeDistance0 == sensorData.get(i).getLocationLong() && isSensorNear) {
                        processedList.add(sensorData.get(i));
                    }
                }
                //Treat last element case
                if (i == sensorData.size() - 1 && weight != 0 && value != 0 && !isSensorNear && time != -1) {
                    BrasovDevDto brasovDevDto = sensorData.get(i);
                    brasovDevDto.setTimestamp(time);
                    brasovDevDto.setValue((int) Math.round(value / weight));
                    processedList.add(brasovDevDto);
                    weight = 0;
                    value = 0;
                }
                //If sensorData have values from just one sensor
                if (i < sensorData.size() - 2)
                    if (((sensorData.get(i + 1).getLocationLong() != sensorData.get(i).getLocationLong()) ||
                            (sensorData.get(i + 1).getLocationLat() != sensorData.get(i).getLocationLat()))) {
                        dataFromOneSensor = false;
                    }
            }
            System.out.println(pasi);
            if (dataFromOneSensor)
                return sensorData;
            else
                return processedList;
        } else
            return sensorData;
    }


    public static List<BrasovDevDto> calculatorForUserLocation(List<BrasovDevDto> sensorData, List<UserLocationDto> userLocations) {
        List<BrasovDevDto> processedList = new ArrayList<>();
        double value = 0;
        double weight = 0;
        long sensorDataProcessedTimestamp = 0;
        long userLocationProcessedTimestamp = 0;
        long previousTimestamp = 0;
        double distance = 0;
        for (int i = 0; i < userLocations.size() - 1; i++)
            for (int j = 0; j < sensorData.size() - 1; j++) {
                if (sensorData.get(j).getTimestamp() % (3600 * 1000) > 3000000)
                    sensorDataProcessedTimestamp = sensorData.get(j).getTimestamp() + (3600000 - sensorData.get(j).getTimestamp() % (3600 * 1000));
                else
                    sensorDataProcessedTimestamp = sensorData.get(j).getTimestamp() - sensorData.get(j).getTimestamp() % (3600 * 1000);
                if (userLocations.get(i).getTimestamp() % (3600 * 1000) > 3000000)
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
                    if (distance == 0) {
                        BrasovDevDto brasovDevDto = sensorData.get(j);
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
                    BrasovDevDto brasovDevDto = sensorData.get(j);
                    brasovDevDto.setTimestamp(userLocations.get(i).getTimestamp());
                    brasovDevDto.setLocationLat(userLocations.get(i).getLatitude());
                    brasovDevDto.setLocationLong(userLocations.get(i).getLongitude());
                    brasovDevDto.setValue((int) Math.round(value / weight));
                    processedList.add(brasovDevDto);
                    weight = 0;
                    value = 0;
                    break;
                }
            }
        return processedList;
    }

    private static long timestampProcessor(long timestamp) {
        long time = (timestamp / 1000) % 3600;
        if (time < 600)
            time = timestamp - time * 1000;
        else if (time > 3000)
            time = timestamp + (3600 - time) * 1000;
        if (time > 600 && time < 3600) {
            time = -1;
        }
        return time;
    }
}
