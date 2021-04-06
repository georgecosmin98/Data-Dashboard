package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.repository.BrasovDevRepository;
import com.airquality.commons.airqualitypersistanceservice.service.api.BrasovDevService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.rest.RestStatus;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.histogram.DateHistogramAggregationBuilder;
import org.elasticsearch.search.aggregations.bucket.histogram.DateHistogramInterval;
import org.elasticsearch.search.aggregations.bucket.histogram.Histogram;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class BrasovDevServiceImpl implements BrasovDevService {

    @Autowired
    private BrasovDevRepository brasovDevRepository;
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

    public void findUniqueLatitudeAndLongitudeValue() throws IOException {
        // we limit it to one index, wildcard patterns are working
        SearchRequest searchRequest = new SearchRequest("brasov-dev");

        // Use a builder to construct the search query
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        // Set terms aggregation and subaggregations
        TermsAggregationBuilder aggregation = AggregationBuilders.terms("LocationLat").field("LocationLat");
        aggregation.subAggregation(AggregationBuilders.terms("LocationLong").field("LocationLong"));

        //Set aggregations to search source builder
        searchSourceBuilder.aggregation(aggregation);

        // assign search query to search request
        searchRequest.source(searchSourceBuilder);
        RequestOptions request;

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
                    System.out.println(firstAggregationBucket.getKey() + " -> " + secondAggregationBucket.getKey());
                }
            }
        }
    }
}