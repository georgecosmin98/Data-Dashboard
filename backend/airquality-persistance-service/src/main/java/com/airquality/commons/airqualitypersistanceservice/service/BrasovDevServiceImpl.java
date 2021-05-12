package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevInterpolationModel;
import com.airquality.commons.airqualitypersistanceservice.model.UserLocationDto;
import com.airquality.commons.airqualitypersistanceservice.repository.BrasovDevRepository;
import com.airquality.commons.airqualitypersistanceservice.repository.UserLocationRepository;
import com.airquality.commons.airqualitypersistanceservice.service.api.BrasovDevService;
import com.airquality.commons.airqualitypersistanceservice.util.HaversinUtil;
import com.airquality.commons.airqualitypersistanceservice.util.InverseDistanceWeightingUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.catalina.User;
import org.elasticsearch.action.search.*;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.*;
import org.elasticsearch.rest.RestStatus;
import org.elasticsearch.search.Scroll;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.aggregations.metrics.Avg;
import org.elasticsearch.search.aggregations.metrics.AvgAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BrasovDevServiceImpl implements BrasovDevService {

    @Autowired
    private BrasovDevRepository brasovDevRepository;

    @Autowired
    private UserLocationRepository userLocationRepository;

    private RestHighLevelClient client;
    private ObjectMapper objectMapper;

    @Autowired
    public void BrasovDevService(@Qualifier("restClient") RestHighLevelClient client, ObjectMapper objectMapper) {
        this.client = client;
        this.objectMapper = objectMapper;
    }

    @Override
    public List<BrasovDevDto> findBySensor(String sensorName) {
        return brasovDevRepository.findBySensor(sensorName);
    }

//    public void pollutionDataBasedOnLocation(Date data, String sensor) throws IOException {
//        double nearestLatitude = 0;
//        double nearestLongitude = 0;
//        List<UserLocationDto> dataFromElasticsearch = userLocationRepository.findUserLocationDtoByTimestampAfterOrderByTimestampAsc(data.getTime());
//        Map<Double, Double> sensorData = findUniqueLatitudeAndLongitudeValueBySensorNameAndData(sensor, data);
//        List<BrasovDevDto> pollutionDataBasedOnLocation = new ArrayList<BrasovDevDto>();
//        List<UserLocationDto> minMax = userLocationRepository.findUserLocationDtoByTimestampAfterOrderByLatitudeAsc(data.getTime());
//        double minLat = minMax.get(0).getLatitude();
//        double maxLat = minMax.get(minMax.size() - 1).getLatitude();
//        minMax = userLocationRepository.findUserLocationDtoByTimestampAfterOrderByLongitudeAsc(data.getTime());
//        double minLong = minMax.get(0).getLongitude();
//        double maxLong = minMax.get(minMax.size() - 1).getLongitude();
//
//        List<BrasovDevDto> pollutionData = brasovDevRepository.findAllBySensorAndLocationLatBetweenAndLocationLongBetweenAndTimestampAfterOrderByTimestampAsc(
//                "pm10", minLat - 0.015, maxLat + 0.015,
//                minLong - 0.015, maxLong + 0.015, data.getTime());
//
////        for(UserLocationDto user : dataFromElasticsearch) {
////            for()
////        }
////        }
//
//    }

    //    public void pollutionDataBasedOnLocation(Date data) throws IOException {
//        double nearestLatitude = 0;
//        double nearestLongitude = 0;
//        List<UserLocationDto> dataFromElasticsearch = userLocationRepository.findUserLocationDtoByTimestampAfterOrderByTimestampAsc(data.getTime());
//        Map<Double, Double> sensorData = findUniqueLatitudeAndLongitudeValue();
//        List<BrasovDevDto> pollutionDataBasedOnLocation = new ArrayList<BrasovDevDto>();
//
//        //Iterate userLocationDto list and find min distance between our coordinates and near sensors
//        for (UserLocationDto userLocationDto : dataFromElasticsearch) {
//            //Key represent Latitude and Value represent Longitude
//            double minDistance = Double.MAX_VALUE;
//
//            for (Map.Entry<Double, Double> entry : sensorData.entrySet()) {
//                double distance = HaversinUtil.distanceCalculator(userLocationDto.getLatitude(), userLocationDto.getLongitude(),
//                        entry.getKey(), entry.getValue());
//                if (distance < minDistance) {
//                    minDistance = distance;
//                    nearestLatitude = entry.getKey();
//                    nearestLongitude = entry.getValue();
//                }
//            }
//            List<BrasovDevDto> result = brasovDevRepository.findByTimestampBetweenAndSensorAndLocationLatAndLocationLong(
//                    userLocationDto.getTimestamp().getTime(), userLocationDto.getTimestamp().getTime() + (3600 * 1000), "pm25", nearestLatitude, nearestLongitude);
//            if (!result.isEmpty())
//                pollutionDataBasedOnLocation.add(result.get(0));
//            System.out.println(nearestLatitude + "   =>    " + nearestLongitude + " distanta minima " + minDistance
//                    + "    coordonatele mele: " + userLocationDto.getLatitude() + "=>" + userLocationDto.getLongitude());
//        }
//    }

    public List<BrasovDevDto> pollutionDataBasedOnLocation(Date data, String sensor) throws IOException {
        double nearestLatitude = 0;
        double nearestLongitude = 0;
        double minLat = 45;
        double maxLat = 50;
        double minLong = 25;
        double maxLong = 26;
        Map<Double, Double> sensorData = findUniqueLatitudeAndLongitudeValueBySensorNameAndData(sensor, data);
        List<BrasovDevDto> test = new LinkedList<>();
        List<UserLocationDto> userLocation = userLocationRepository.findUserLocationDtoByTimestampAfter(1619808756000L);
//        List <BrasovDevInterpolationModel> values = retrieveData(sensorData,userLocation);
        List<BrasovDevDto> pollutionData = brasovDevRepository.findAllBySensorAndLocationLatBetweenAndLocationLongBetweenAndTimestampAfterOrderByTimestampAsc(
                "pm10", minLat - 0.015, maxLat + 0.015,
                minLong - 0.015, maxLong + 0.015, 1619808756000L);
        System.out.println(pollutionData.size());
        double minDistance = Double.MAX_VALUE;
        for (UserLocationDto userLocationDto : userLocation)
            for (BrasovDevDto brasovDevDto : pollutionData) {
                for (Map.Entry<Double, Double> entry : sensorData.entrySet()) {
                    double distance = HaversinUtil.distanceCalculator(userLocationDto.getLatitude(), userLocationDto.getLongitude(),
                            entry.getKey(), entry.getValue());
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestLatitude = entry.getKey();
                        nearestLongitude = entry.getValue();
                    }
                }
                if (minDistance < 1.5)
                    test.add(brasovDevDto);
            }
//        System.out.println(values.size());
        System.out.println(test.size());
        return test;

    }

//    private BrasovDevInterpolationModel takeGood(Map<Double, Double> sensorData,List<UserLocationDto> userLocation, BrasovDevInterpolationModel brasovDevDto){
//        double nearestLatitude = 0;
//        double nearestLongitude = 0;
//        double minDistance = Double.MAX_VALUE;
//        for(int )
//        for (Map.Entry<Double, Double> entry : sensorData.entrySet()) {
//                double distance = HaversinUtil.distanceCalculator(brasovDevDto.getLocationLat(), brasovDevDto.getLocationLong(),
//                        entry.getKey(), entry.getValue());
//                if (distance < minDistance) {
//                    minDistance = distance;
//                    nearestLatitude = entry.getKey();
//                    nearestLongitude = entry.getValue();
//                }
//            }
//            if(minDistance < 1.5)
//
//    }

    private List<BrasovDevInterpolationModel> retrieveData(Map<Double, Double> sensorData, List<UserLocationDto> userLocation) throws IOException {
        final Scroll scroll = new Scroll(TimeValue.timeValueMinutes(1L));
        SearchRequest searchRequest = new SearchRequest("brasov-dev");
        searchRequest.scroll(scroll);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.size(10000);
        MatchQueryBuilder matchQueryBuilder = new MatchQueryBuilder("Sensor", "pm25");
        RangeQueryBuilder rangeQueryBuilder = new RangeQueryBuilder("TimeStamp").gte(1619808756000L);
        BoolQueryBuilder boolQueryBuilder = new BoolQueryBuilder();
        boolQueryBuilder.must(matchQueryBuilder).must(rangeQueryBuilder);
        searchSourceBuilder.query(boolQueryBuilder);
        searchSourceBuilder.sort("TimeStamp", SortOrder.ASC).sort("LocationLat", SortOrder.ASC);
        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
        String scrollId = searchResponse.getScrollId();
        SearchHit[] searchHits = searchResponse.getHits().getHits();
        List<BrasovDevInterpolationModel> test = new ArrayList<>();
        BrasovDevDto test1 = new BrasovDevDto();
        for (SearchHit searchHit : searchHits) {

        }
        while (searchHits != null && searchHits.length > 0) {
            SearchScrollRequest scrollRequest = new SearchScrollRequest(scrollId);
            scrollRequest.scroll(scroll);
            searchResponse = client.scroll(scrollRequest, RequestOptions.DEFAULT);
            scrollId = searchResponse.getScrollId();
            searchHits = searchResponse.getHits().getHits();
            for (SearchHit searchHit : searchHits) {
            }
        }

        ClearScrollRequest clearScrollRequest = new ClearScrollRequest();
        clearScrollRequest.addScrollId(scrollId);
        ClearScrollResponse clearScrollResponse = client.clearScroll(clearScrollRequest, RequestOptions.DEFAULT);
        return test;
    }

    public List<BrasovDevDto> pollutionDataBasedOnAddressLocationAndData(double latitude, double longitude, Date data) throws IOException {
        double nearestLatitude = 0;
        double nearestLongitude = 0;
        Map<Double, Double> sensorData = findUniqueLatitudeAndLongitudeValueBySensorNameAndData("", data);

        //Iterate userLocationDto list and find min distance between our coordinates and near sensors
        double minDistance = Double.MAX_VALUE;
        for (Map.Entry<Double, Double> entry : sensorData.entrySet()) {
            double distance = HaversinUtil.distanceCalculator(latitude, longitude,
                    entry.getKey(), entry.getValue());
            if (distance < minDistance) {
                minDistance = distance;
                nearestLatitude = entry.getKey();
                nearestLongitude = entry.getValue();
            }
        }
        System.out.println(nearestLatitude + "   =>    " + nearestLongitude + " distanta minima " + minDistance
                + "    coordonatele mele: " + latitude + "=>" + longitude);
        if (minDistance < 1) {
            List<BrasovDevDto> result = brasovDevRepository.findAllByLocationLatAndLocationLongAndTimestampAfterOrderByTimestampDesc(nearestLatitude, nearestLongitude, data.getTime());
            return result;
        }
        return null;
    }

    public List<BrasovDevDto> pollutionDataBasedOnAddressLocation(Date data, String sensor, double latitude, double longitude) throws IOException {
        double nearestLatitude = 0;
        double nearestLongitude = 0;
        Map<Double, Double> sensorData = findUniqueLatitudeAndLongitudeValueBySensorNameAndData(sensor, data);
        //Iterate userLocationDto list and find min distance between our coordinates and near sensors
        double minDistance = Double.MAX_VALUE;
        for (Map.Entry<Double, Double> entry : sensorData.entrySet()) {
            double distance = HaversinUtil.distanceCalculator(latitude, longitude,
                    entry.getKey(), entry.getValue());
            if (distance < minDistance) {
                minDistance = distance;
                nearestLatitude = entry.getKey();
                nearestLongitude = entry.getValue();
            }
        }
        System.out.println(nearestLatitude + "   =>    " + nearestLongitude + " distanta minima " + minDistance
                + "    coordonatele mele: " + latitude + "=>" + longitude);
        if (minDistance < 2) {
            List<BrasovDevDto> result = brasovDevRepository.findByTimestampBetweenAndSensorAndLocationLatAndLocationLongOrderByTimestampAsc(
                    data.getTime(), new Date().getTime(), sensor, nearestLatitude, nearestLongitude);
            return result;
        }
        return null;
    }

    private Map<Double, Double> findUniqueLatitudeAndLongitudeValueBySensorNameAndData(String sensor, Date data) throws IOException {

        Map<Double, Double> sensorData = new HashMap<Double, Double>();
        // we limit it to one index, wildcard patterns are working
        SearchRequest searchRequest = new SearchRequest("brasov-dev");

        // Use a builder to construct the search query
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        MatchQueryBuilder matchQueryBuilder = new MatchQueryBuilder("Sensor", sensor);
        RangeQueryBuilder rangeQueryBuilder = new RangeQueryBuilder("TimeStamp").gte(data.getTime());
        BoolQueryBuilder boolQueryBuilder = new BoolQueryBuilder();
        if (sensor.isEmpty()) {
            // Bool query that contain match query and range query
            boolQueryBuilder.must(rangeQueryBuilder);
        } else {
            boolQueryBuilder.must(matchQueryBuilder).must(rangeQueryBuilder);
        }

        searchSourceBuilder.query(boolQueryBuilder);

        // Set terms aggregation and subaggregations
        TermsAggregationBuilder aggregation = AggregationBuilders.terms("LocationLat").field("LocationLat").size(10000);
        aggregation.subAggregation(AggregationBuilders.terms("LocationLong").field("LocationLong"));
        //Set aggregations to search source builder
        searchSourceBuilder.aggregation(aggregation);

        //assign search query to search request
        searchRequest.source(searchSourceBuilder);

        //Run search on elasticsearch
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        //Verify status of elasticsearch client request
        RestStatus status = searchResponse.status();

        //Verify if request was succesfully
        if (status == RestStatus.OK) {
            //Process first aggregations data received from elasticsearch
            Aggregations firstAggregations = searchResponse.getAggregations();
            Aggregation latitudeAggregation = firstAggregations.get("LocationLat");
            List<? extends Terms.Bucket> buckets = ((Terms) latitudeAggregation).getBuckets();
            for (Terms.Bucket firstAggregationBucket : buckets) {
                //Process second aggregations data received from elasticsearch
                Aggregations secondAggregations = firstAggregationBucket.getAggregations();
                Aggregation longitudeAggregation = secondAggregations.get("LocationLong");
                List<? extends Terms.Bucket> secondBuckets = ((Terms) longitudeAggregation).getBuckets();
                for (Terms.Bucket secondAggregationBucket : secondBuckets) {
                    //System.out.println(firstAggregationBucket.getKey() + " -> " + secondAggregationBucket.getKey());
                    sensorData.put((Double) firstAggregationBucket.getKey(), (Double) secondAggregationBucket.getKey());
                }
            }
        }
        return sensorData;
    }

    //    public Map<String, String> findUniqueSensorNameForALocation() throws IOException {
//
//        Map<String, String> sensorData = new HashMap<String, String>();
//        // we limit it to one index, wildcard patterns are working
//        SearchRequest searchRequest = new SearchRequest("brasov-dev");
//
//        // Use a builder to construct the search query
//        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
//
//        // Set terms aggregation and subaggregations
//        TermsAggregationBuilder cardinalityAggregationBuilder = AggregationBuilders.terms("Sensor").field("Sensor.keyword");
//        //Set aggregations to search source builder
//        searchSourceBuilder.aggregation(cardinalityAggregationBuilder);
//
//        //assign search query to search request
//        searchRequest.source(searchSourceBuilder);
//
//        //Run search on elasticsearch
//        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
//
//        //Verify status of elasticsearch client request
//        RestStatus status = searchResponse.status();
//
//        //Verify if request was succesfully
//        if (status == RestStatus.OK) {
//            //Process first aggregations data received from elasticsearch
//            Aggregations firstAggregations = searchResponse.getAggregations();
//            Aggregation latitudeAggregation = firstAggregations.get("Sensor");
//            List<? extends Terms.Bucket> buckets = ((Terms) latitudeAggregation).getBuckets();
//            for (Terms.Bucket firstAggregationBucket : buckets) {
//                sensorData.put("Sensor",(String) firstAggregationBucket.getKey());
//            }
//        }
//        return sensorData;
//    }
    public List<BrasovDevDto> test() throws IOException {
        final Scroll scroll = new Scroll(TimeValue.timeValueMinutes(1L));
        SearchRequest searchRequest = new SearchRequest("brasov-dev");
        searchRequest.scroll(scroll);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        QueryBuilder qb = QueryBuilders.termQuery("Sensor", "pm25");
        searchSourceBuilder.size(10000);
        MatchQueryBuilder matchQueryBuilder = new MatchQueryBuilder("Sensor", "pm25");
        RangeQueryBuilder rangeQueryBuilder = new RangeQueryBuilder("TimeStamp").gte(1617917568000L);
        BoolQueryBuilder boolQueryBuilder = new BoolQueryBuilder();
        boolQueryBuilder.must(matchQueryBuilder).must(rangeQueryBuilder);
        searchSourceBuilder.query(boolQueryBuilder);
        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
        String scrollId = searchResponse.getScrollId();
        SearchHit[] searchHits = searchResponse.getHits().getHits();
        List<BrasovDevDto> test = new LinkedList<>();
        BrasovDevDto test1 = new BrasovDevDto();
        for (SearchHit searchHit : searchHits) {
            test1.setLocationLat((double) searchHit.getSourceAsMap().get("LocationLat"));
            test1.setLocationLong((double) searchHit.getSourceAsMap().get("LocationLong"));
            test1.setSensor((String) searchHit.getSourceAsMap().get("Sensor"));
            test.add(test1);
        }
        while (searchHits != null && searchHits.length > 0) {
            SearchScrollRequest scrollRequest = new SearchScrollRequest(scrollId);
            scrollRequest.scroll(scroll);
            searchResponse = client.scroll(scrollRequest, RequestOptions.DEFAULT);
            scrollId = searchResponse.getScrollId();
            searchHits = searchResponse.getHits().getHits();
            for (SearchHit searchHit : searchHits) {
                test1.setLocationLat((double) searchHit.getSourceAsMap().get("LocationLat"));
                test1.setLocationLong((double) searchHit.getSourceAsMap().get("LocationLong"));
                test1.setSensor((String) searchHit.getSourceAsMap().get("Sensor"));
                test.add(test1);
            }
        }

        ClearScrollRequest clearScrollRequest = new ClearScrollRequest();
        clearScrollRequest.addScrollId(scrollId);
        ClearScrollResponse clearScrollResponse = client.clearScroll(clearScrollRequest, RequestOptions.DEFAULT);
        boolean succeeded = clearScrollResponse.isSucceeded();
        return test;

    }

    public List<BrasovDevInterpolationModel> findUniqueSensor(String sensor, Date date, double latitude, double longitude, double maxDistance) throws IOException {
        List<BrasovDevInterpolationModel> list = new LinkedList<>();
        Map<Double, Double> sensorData = findUniqueLatitudeAndLongitudeValueBySensorNameAndData(sensor, date);

        for (Map.Entry<Double, Double> entry : sensorData.entrySet()) {
            double distance = HaversinUtil.distanceCalculator(latitude, longitude,
                    entry.getKey(), entry.getValue());
            if (distance < maxDistance)
                list.add(new BrasovDevInterpolationModel("pm10", 1, entry.getKey(), entry.getValue(), distance));
        }
        return list;
    }

    public Double findAverageValue() throws IOException {

        Double average = 0D;

        // we limit it to one index, wildcard patterns are working
        SearchRequest searchRequest = new SearchRequest("brasov-dev");

        // Use a builder to construct the search query
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        // Match query by field name and value
        MatchQueryBuilder matchQueryBuilder = new MatchQueryBuilder("Sensor", "CO2");

        // Range query after a timestamp
        RangeQueryBuilder rangeQueryBuilder = new RangeQueryBuilder("TimeStamp").gte("161831459000");

        // Bool query that contain match query and range query
        BoolQueryBuilder boolQueryBuilder = new BoolQueryBuilder().must(matchQueryBuilder).must(rangeQueryBuilder);

        // Set query to searchSourceBuilder object
        searchSourceBuilder.query(boolQueryBuilder);

        // Create an aggregation for return average value of field with name "Value"
        AvgAggregationBuilder avgAggregationBuilder = AggregationBuilders.avg("avg").field("Value");

        // Set aggregation to searchSourceBuilder object
        searchSourceBuilder.aggregation(avgAggregationBuilder);

        // Assign search query to search request
        searchRequest.source(searchSourceBuilder);

        // Run search on elasticsearch
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        // Verify status of elasticsearch client request
        RestStatus status = searchResponse.status();

        Aggregations firstAggregations = searchResponse.getAggregations();

        if (status == RestStatus.OK)
            return ((Avg) firstAggregations.get("avg")).getValue();
        else
            return null;
    }

    public List<BrasovDevDto> findBySensorNameCoordinatesTimestampAndInterpolate(Date date, String sensor, double latitude, double longitude) throws IOException {
        List<BrasovDevInterpolationModel> brasovDevInterpolationModels = findUniqueSensor(sensor, date, latitude, longitude, 1.5);
        List<BrasovDevDto> sensorData = brasovDevRepository.findAllBySensorAndLocationLongBetweenAndLocationLatBetweenAndTimestampAfterOrderByTimestampAsc(sensor, longitude - 0.015, longitude + 0.015, latitude - 0.015, latitude + 0.015, date.getTime()).collect(Collectors.toList());
        System.out.println(sensorData.size());
        return InverseDistanceWeightingUtil.calculator2(brasovDevInterpolationModels, sensorData);
    }

    public List<BrasovDevDto> findByCoordinatesTimestampAndInterpolateAllValues(Date date, double latitude, double longitude) throws IOException {
        List<BrasovDevInterpolationModel> brasovDevInterpolationModels = findUniqueSensor("", date, latitude, longitude, 1.5);
        List<BrasovDevDto> sensorData = brasovDevRepository.findAllByLocationLongBetweenAndLocationLatBetweenAndTimestampAfterOrderByTimestampAsc(longitude - 0.015, longitude + 0.015, latitude - 0.015, latitude + 0.015, date.getTime()).collect(Collectors.toList());
        List<BrasovDevDto> pm25Data = new ArrayList<>();
        List<BrasovDevDto> pm10Data = new ArrayList<>();
        List<BrasovDevDto> o3Data = new ArrayList<>();
        List<BrasovDevDto> so2Data = new ArrayList<>();
        List<BrasovDevDto> no2Data = new ArrayList<>();
        List<BrasovDevDto> procesedList = new ArrayList<>();
        for (int i = 0; i < sensorData.size(); i++) {
            if (sensorData.get(i).getSensor().equals("pm25"))
                pm25Data.add(sensorData.get(i));
            if (sensorData.get(i).getSensor().equals("pm10"))
                pm10Data.add(sensorData.get(i));
            if (sensorData.get(i).getSensor().equals("o3"))
                o3Data.add(sensorData.get(i));
            if (sensorData.get(i).getSensor().equals("so2"))
                so2Data.add(sensorData.get(i));
            if (sensorData.get(i).getSensor().equals("no2"))
                no2Data.add(sensorData.get(i));
        }
        if (!pm25Data.isEmpty())
            procesedList.addAll(InverseDistanceWeightingUtil.calculator(brasovDevInterpolationModels, pm25Data));
        if (!pm10Data.isEmpty())
            procesedList.addAll(InverseDistanceWeightingUtil.calculator(brasovDevInterpolationModels, pm10Data));
        if (!o3Data.isEmpty())
            procesedList.addAll(InverseDistanceWeightingUtil.calculator(brasovDevInterpolationModels, o3Data));
        if (!so2Data.isEmpty())
            procesedList.addAll(InverseDistanceWeightingUtil.calculator(brasovDevInterpolationModels, so2Data));
        if (!no2Data.isEmpty())
            procesedList.addAll(InverseDistanceWeightingUtil.calculator(brasovDevInterpolationModels, no2Data));
        return procesedList;

    }

    public List<BrasovDevDto> findByCoordinatesTimestampAndReturnDailyAverageValues(Date date, String sensor, double latitude, double longitude) throws IOException {
        List<BrasovDevInterpolationModel> brasovDevInterpolationModels = findUniqueSensor(sensor, date, latitude, longitude, 1.5);
        List<BrasovDevDto> sensorData = brasovDevRepository.findAllBySensorAndLocationLongBetweenAndLocationLatBetweenAndTimestampAfterOrderByTimestampAsc(sensor, longitude - 0.015, longitude + 0.015, latitude - 0.015, latitude + 0.015, date.getTime()).collect(Collectors.toList());
        List<BrasovDevDto> interpolatedValues = InverseDistanceWeightingUtil.calculator2(brasovDevInterpolationModels, sensorData);
        List<BrasovDevDto> processedList = new ArrayList<>();
        double averageValue = 0;
        int index = 0;
        for (int i = 0; i < interpolatedValues.size() - 1; i++) {
            long currentTime = (interpolatedValues.get(i).getTimestamp() / 1000) % (3600 * 24);
            currentTime = interpolatedValues.get(i).getTimestamp() - currentTime * 1000;
            long nextTime = (interpolatedValues.get(i + 1).getTimestamp() / 1000) % (3600 * 24);
            nextTime = interpolatedValues.get(i + 1).getTimestamp() - nextTime * 1000;

            if (currentTime == nextTime) {
                averageValue = averageValue + interpolatedValues.get(i).getValue();
                index++;
            } else {
                BrasovDevDto brasovDevDto = interpolatedValues.get(i);
                brasovDevDto.setTimestamp(currentTime);
                brasovDevDto.setValue((int) Math.round(averageValue / index));
                processedList.add(brasovDevDto);
                averageValue = 0;
                index = 0;
            }

        }
        return processedList;
    }

    public List<BrasovDevDto> findByCoordinatesTimestampAndReturnDailyMaxValues(Date date, String sensor, double latitude, double longitude) throws IOException {
        List<BrasovDevInterpolationModel> brasovDevInterpolationModels = findUniqueSensor(sensor, date, latitude, longitude, 1.5);
        List<BrasovDevDto> sensorData = brasovDevRepository.findAllBySensorAndLocationLongBetweenAndLocationLatBetweenAndTimestampAfterOrderByTimestampAsc(sensor, longitude - 0.015, longitude + 0.015, latitude - 0.015, latitude + 0.015, date.getTime()).collect(Collectors.toList());
        List<BrasovDevDto> interpolatedValues = InverseDistanceWeightingUtil.calculator2(brasovDevInterpolationModels, sensorData);
        List<BrasovDevDto> processedList = new ArrayList<>();
        int maxValues = 0;
        for (int i = 0; i < interpolatedValues.size() - 1; i++) {
            long currentTime = (interpolatedValues.get(i).getTimestamp() / 1000) % (3600 * 24);
            currentTime = interpolatedValues.get(i).getTimestamp() - currentTime * 1000;
            long nextTime = (interpolatedValues.get(i + 1).getTimestamp() / 1000) % (3600 * 24);
            nextTime = interpolatedValues.get(i + 1).getTimestamp() - nextTime * 1000;

            if (currentTime == nextTime) {
                if (maxValues < interpolatedValues.get(i).getValue())
                    maxValues = interpolatedValues.get(i).getValue();
            } else {
                BrasovDevDto brasovDevDto = interpolatedValues.get(i);
                brasovDevDto.setTimestamp(currentTime);
                brasovDevDto.setValue(maxValues);
                processedList.add(brasovDevDto);
                maxValues = 0;
            }

        }
        return processedList;
    }

    public List<BrasovDevDto> findByCoordinatesTimestampAndReturnDailyMinValues(Date date, String sensor, double latitude, double longitude) throws IOException {
        List<BrasovDevInterpolationModel> brasovDevInterpolationModels = findUniqueSensor(sensor, date, latitude, longitude, 1.5);
        List<BrasovDevDto> sensorData = brasovDevRepository.findAllBySensorAndLocationLongBetweenAndLocationLatBetweenAndTimestampAfterOrderByTimestampAsc(sensor, longitude - 0.015, longitude + 0.015, latitude - 0.015, latitude + 0.015, date.getTime()).collect(Collectors.toList());
        List<BrasovDevDto> interpolatedValues = InverseDistanceWeightingUtil.calculator2(brasovDevInterpolationModels, sensorData);
        List<BrasovDevDto> processedList = new ArrayList<>();
        int minValues = 0;
        for (int i = 0; i < interpolatedValues.size() - 1; i++) {
            long currentTime = (interpolatedValues.get(i).getTimestamp() / 1000) % (3600 * 24);
            currentTime = interpolatedValues.get(i).getTimestamp() - currentTime * 1000;
            long nextTime = (interpolatedValues.get(i + 1).getTimestamp() / 1000) % (3600 * 24);
            nextTime = interpolatedValues.get(i + 1).getTimestamp() - nextTime * 1000;

            if (currentTime == nextTime) {
                if (minValues < interpolatedValues.get(i).getValue())
                    minValues = interpolatedValues.get(i).getValue();
            } else {
                BrasovDevDto brasovDevDto = interpolatedValues.get(i);
                brasovDevDto.setTimestamp(currentTime);
                brasovDevDto.setValue(minValues);
                processedList.add(brasovDevDto);
                minValues = 0;
            }

        }
        return processedList;
    }
}