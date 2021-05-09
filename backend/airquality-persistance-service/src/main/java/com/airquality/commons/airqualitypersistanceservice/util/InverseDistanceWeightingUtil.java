package com.airquality.commons.airqualitypersistanceservice.util;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevInterpolationModel;

import java.util.ArrayList;
import java.util.List;

public class InverseDistanceWeightingUtil {

    public static List<BrasovDevDto> calculator(List<BrasovDevInterpolationModel> brasovDevInterpolationModel, List<BrasovDevDto> sensorData) {
        List<BrasovDevDto> processedList = new ArrayList<>();
        sensorData.add(new BrasovDevDto("", "", "", 0, 0, 0, 0, ""));
        double value = 0;
        double weight = 0;
        int pasi = 0;
        boolean isDistance0 = false;
        double latitudeDistance0 = 0;
        double longitudeDistance0 = 0;
        System.out.println(brasovDevInterpolationModel.size());
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
                }else if(latitudeDistance0 == sensorData.get(i).getLocationLat() && longitudeDistance0 == sensorData.get(i).getLocationLong() && isDistance0){
                    processedList.add(sensorData.get(i));
                }

            } else {
                if(!isDistance0){
                BrasovDevDto brasovDevDto = sensorData.get(i);
                brasovDevDto.setValue((int) Math.round(value / weight));
                processedList.add(brasovDevDto);
                weight = 0;
                value = 0;
            }}

            if (i == sensorData.size() - 2 && weight != 0 && value != 0 && !isDistance0) {
                BrasovDevDto brasovDevDto = sensorData.get(i);
                brasovDevDto.setValue((int) Math.round(value / weight));
                processedList.add(brasovDevDto);
                weight = 0;
                value = 0;
            }
        }
        System.out.println(pasi);
        return processedList;
    }
}
