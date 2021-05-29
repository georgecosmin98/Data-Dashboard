package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevInterpolationModel;
import com.airquality.commons.airqualitypersistanceservice.repository.BrasovDevRepository;
import com.airquality.commons.airqualitypersistanceservice.service.BrasovDevServiceImpl;
import com.airquality.commons.airqualitypersistanceservice.util.InverseDistanceWeightingUtil;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/brasovdev")
@CrossOrigin("*")
public class BrasovDevController {

    @Autowired
    private BrasovDevServiceImpl brasovDevServiceImpl;

    @Autowired
    private BrasovDevRepository brasovDevRepository;

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello world from brasov dev controller";
    }

    @GetMapping("/{sensorName}")
    public List<BrasovDevDto> findBySensorName(@PathVariable String sensorName) {
        return brasovDevServiceImpl.findBySensor(sensorName);
    }

    @GetMapping("/findAllAfter/{first}/{latitude}/{longitude}")
    public List<BrasovDevDto> findAllAfterDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date first, @PathVariable double latitude, @PathVariable double longitude) throws IOException {
//        return brasovDevServiceImpl.pollutionDataBasedOnAddressLocationAndData(latitude, longitude, first);
        return brasovDevServiceImpl.findByCoordinatesTimestampAndInterpolateAllValues(first,latitude,longitude);

    }

    @GetMapping("/unique/{date}")
    public void unique(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, String sensor) throws IOException {
        brasovDevServiceImpl.pollutionDataBasedOnLocation(date, sensor);
    }

    @GetMapping("/{sensorName}/{firstDate}/{lastDate}")
    public List<BrasovDevDto> findBySensorNameAndTimestamp(@PathVariable String sensorName, @PathVariable("firstDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date firstDate, @PathVariable("lastDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date lastDate) {
        return brasovDevRepository.findBySensorAndTimestampIsBetweenOrderByTimestampDesc(sensorName, firstDate.getTime(), lastDate.getTime());
    }

//    @GetMapping("/{date}/{sensor}/{latitude}/{longitude}")
//    public List<BrasovDevDto> findByDateSensorAndCoordinates(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
//                                                             @PathVariable String sensor, @PathVariable double latitude, @PathVariable double longitude) throws IOException {
//        return brasovDevServiceImpl.pollutionDataBasedOnAddressLocation(date, sensor, latitude, longitude);
//    }

    @GetMapping("/test1/{name}/{lat1}/{lat2}/{long1}/{long2}/{firstDate}")
    public List<BrasovDevDto> test(@PathVariable String name, @PathVariable double lat1, @PathVariable double lat2, @PathVariable double long1, @PathVariable double long2, @PathVariable("firstDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date firstDate) {
        return brasovDevRepository.findAllBySensorAndLocationLatBetweenAndLocationLongBetweenAndTimestampAfterOrderByTimestampAsc(name, lat1, lat2, long1, long2, firstDate.getTime());
    }

    @GetMapping("/testArea")
    public List<BrasovDevDto> test() throws IOException {
//       return brasovDevServiceImpl.pollutionDataBasedOnLocation(new Date("2021/04/24"), "PM10");
        double latitude = 45.651464;
        double longitude = 25.615426;
//        List<BrasovDevInterpolationModel> brasovDevInterpolationModels = brasovDevServiceImpl.findUniqueSensor("o3",new Date("2021/05/10"),latitude,longitude, 1.5);
//        List<BrasovDevDto> sensorData = brasovDevRepository.findAllBySensorAndLocationLongBetweenAndLocationLatBetweenAndTimestampAfterOrderByTimestampAsc("o3",longitude - 0.015, longitude + 0.015, latitude - 0.015, latitude + 0.015, new Date("2021/05/10").getTime()).collect(Collectors.toList());
//        return InverseDistanceWeightingUtil.calculatorForTest(brasovDevInterpolationModels,sensorData);
        return brasovDevServiceImpl.findUserLocationAndBrasovDev(latitude,longitude,"pm10",new Date("2021/04/27"));

//          List<BrasovDevDto> brasovDevDtos = brasovDevRepository.findBySensorMatchesAndTimestampAfter("pm10,pm25",1620598378144L).collect(Collectors.toList());
//        System.out.println(brasovDevDtos.size());
//          return brasovDevDtos;
    }

    @GetMapping("/test/{date}/{sensor}/{latitude}/{longitude}")
    public List<BrasovDevDto> retrieveUserPollutionData(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
                                                                                 @PathVariable String sensor, @PathVariable double latitude, @PathVariable double longitude) throws IOException {
        return brasovDevServiceImpl.findUserLocationAndBrasovDev(latitude,longitude,sensor,date);

    }

    @GetMapping("/{date}/{sensor}/{latitude}/{longitude}")
    public List<BrasovDevDto> findBySensorNameCoordinatesTimestampAndInterpolate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
                                                                                 @PathVariable String sensor, @PathVariable double latitude, @PathVariable double longitude) throws IOException {
//       return brasovDevServiceImpl.pollutionDataBasedOnLocation(new Date("2021/04/04"), "PM10");
//        brasovDevInterpolationModels.add(new BrasovDevInterpolationModel("pm10",1,45.6568,25.5917,1.228));
//        brasovDevInterpolationModels.add(new BrasovDevInterpolationModel("pm10",1,45.642198,25.588532,0.414));
//        brasovDevInterpolationModels.add(new BrasovDevInterpolationModel("pm10",1,45.645914,25.602642,1.029));
//        brasovDevInterpolationModels.add(new BrasovDevInterpolationModel("pm10",1,45.646976,25.595224,0.469));

//        List<BrasovDevDto> sensorData = new ArrayList<>();
//        sensorData.add(new BrasovDevDto("","","",13,45.6568,25.5917,251L,""));
//        sensorData.add(new BrasovDevDto("","","",9,45.642198,25.588532,252L,""));
//        sensorData.add(new BrasovDevDto("","","",11,45.645914,25.602642,253L,""));
//        sensorData.add(new BrasovDevDto("","","",9,45.646976,25.595224,254L,""));
//
//        sensorData.add(new BrasovDevDto("","","",15,45.6568,25.5917,3251L,""));
//        sensorData.add(new BrasovDevDto("","","",2,45.642198,25.588532,3252L,""));
//        sensorData.add(new BrasovDevDto("","","",1,45.645914,25.602642,3253L,""));
//        sensorData.add(new BrasovDevDto("","","",6,45.646976,25.595224,3254L,""));
          return brasovDevServiceImpl.findBySensorNameCoordinatesTimestampAndInterpolate(date,sensor,latitude,longitude);
//        return brasovDevServiceImpl.findByCoordinatesTimestampAndReturnDailyAverageValues(date,sensor,latitude,longitude);
    }

    @GetMapping("/averageDaily/{date}/{sensor}/{latitude}/{longitude}")
    public List<BrasovDevDto> returnAverageValuesPerDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
                                                    @PathVariable String sensor, @PathVariable double latitude, @PathVariable double longitude) throws IOException {
        return brasovDevServiceImpl.findByCoordinatesTimestampAndReturnDailyAverageValues(date,sensor,latitude,longitude);
    }
    @GetMapping("/maxDaily/{date}/{sensor}/{latitude}/{longitude}")
    public List<BrasovDevDto> returnMaxValuesPerDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
                                                                                 @PathVariable String sensor, @PathVariable double latitude, @PathVariable double longitude) throws IOException {
        return brasovDevServiceImpl.findByCoordinatesTimestampAndReturnDailyMaxValues(date,sensor,latitude,longitude);
    }
    @GetMapping("/minDaily/{date}/{sensor}/{latitude}/{longitude}")
    public List<BrasovDevDto> returnMinValuesPerDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
                                                    @PathVariable String sensor, @PathVariable double latitude, @PathVariable double longitude) throws IOException {
        return brasovDevServiceImpl.findByCoordinatesTimestampAndReturnDailyMinValues(date,sensor,latitude,longitude);
    }
}
