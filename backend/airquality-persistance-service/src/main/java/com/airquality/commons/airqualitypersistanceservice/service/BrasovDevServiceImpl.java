package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.model.UserLocationDto;
import com.airquality.commons.airqualitypersistanceservice.repository.BrasovDevRepository;
import com.airquality.commons.airqualitypersistanceservice.repository.UserLocationRepository;
import com.airquality.commons.airqualitypersistanceservice.service.api.BrasovDevService;
import com.airquality.commons.airqualitypersistanceservice.util.HaversinUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.rest.RestStatus;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.aggregations.metrics.Avg;
import org.elasticsearch.search.aggregations.metrics.AvgAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

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

    public void pollutionDataBasedOnLocation(Date data,String sensor) throws IOException {
        double nearestLatitude = 0;
        double nearestLongitude = 0;
        List<UserLocationDto> dataFromElasticsearch = userLocationRepository.findUserLocationDtoByTimestampAfterOrderByTimestampAsc(data.getTime());
        Map<Double, Double> sensorData = findUniqueLatitudeAndLongitudeValueBySensorNameAndData(sensor,data);
        List<BrasovDevDto> pollutionDataBasedOnLocation = new ArrayList<BrasovDevDto>();
        List<UserLocationDto> minMax = userLocationRepository.findUserLocationDtoByTimestampAfterOrderByLatitudeAsc(data.getTime());
        double minLat = minMax.get(0).getLatitude();
        double maxLat = minMax.get(minMax.size() - 1).getLatitude();
        minMax = userLocationRepository.findUserLocationDtoByTimestampAfterOrderByLongitudeAsc(data.getTime());
        double minLong = minMax.get(0).getLongitude();
        double maxLong = minMax.get(minMax.size() - 1).getLongitude();

        List<BrasovDevDto> pollutionData = brasovDevRepository.findAllBySensorAndLocationLatBetweenAndLocationLongBetweenAndTimestampAfterOrderByTimestampAsc(
                "pm10", minLat - 0.015, maxLat + 0.015,
                minLong - 0.015, maxLong + 0.015, data.getTime());

//        for(UserLocationDto user : dataFromElasticsearch) {
//            for()
//        }
//        }

    }

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
public List<BrasovDevDto> pollutionDataBasedOnAddressLocationAndData(double latitude, double longitude, Date data) throws IOException {
    double nearestLatitude = 0;
    double nearestLongitude = 0;
    Map<Double, Double> sensorData = findUniqueLatitudeAndLongitudeValueBySensorNameAndData("",data);

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
    if(minDistance<1){
    List<BrasovDevDto> result = brasovDevRepository.findAllByLocationLatAndLocationLongAndTimestampAfterOrderByTimestampDesc(nearestLatitude,nearestLongitude, data.getTime());
    return result;}
    return null;
}

    public List<BrasovDevDto> pollutionDataBasedOnAddressLocation(Date data, String sensor, double latitude, double longitude) throws IOException {
        double nearestLatitude = 0;
        double nearestLongitude = 0;
        Map<Double, Double> sensorData = findUniqueLatitudeAndLongitudeValueBySensorNameAndData(sensor,data);
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
        if(minDistance<1.5){
        List<BrasovDevDto> result = brasovDevRepository.findByTimestampBetweenAndSensorAndLocationLatAndLocationLongOrderByTimestampAsc(
                data.getTime(), new Date().getTime(), sensor, nearestLatitude, nearestLongitude);
        return result;}
        return null;
    }

    private Map<Double, Double> findUniqueLatitudeAndLongitudeValueBySensorNameAndData(String sensor,Date data) throws IOException {

        Map<Double, Double> sensorData = new HashMap<Double, Double>();
        // we limit it to one index, wildcard patterns are working
        SearchRequest searchRequest = new SearchRequest("brasov-dev");

        // Use a builder to construct the search query
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        MatchQueryBuilder matchQueryBuilder = new MatchQueryBuilder("Sensor", sensor);
        RangeQueryBuilder rangeQueryBuilder = new RangeQueryBuilder("TimeStamp").gte(data.getTime());
        BoolQueryBuilder boolQueryBuilder = new BoolQueryBuilder();
        if(sensor.isEmpty()) {
            // Bool query that contain match query and range query
            boolQueryBuilder.must(rangeQueryBuilder);
        }else{
            boolQueryBuilder.must(matchQueryBuilder).must(rangeQueryBuilder);}

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

}