package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.Ascr2Dto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
public class Ascr2Service {


    private RestHighLevelClient client;


    private ObjectMapper objectMapper;

    @Autowired
    public Ascr2Service(@Qualifier("restClient") RestHighLevelClient client, ObjectMapper objectMapper) {
        this.client = client;
        this.objectMapper = objectMapper;
    }


    public Ascr2Dto findById(String id) throws Exception {

        GetRequest getRequest = new GetRequest("ascr.2", "_doc", id);

        GetResponse getResponse = client.get(getRequest, RequestOptions.DEFAULT);
        Map<String,Object> resultMap =getResponse.getSource();

        return convertMapToAscr2Dto(resultMap);
    }

    private Ascr2Dto convertMapToAscr2Dto(Map<String,Object> map){
        return objectMapper.convertValue(map,Ascr2Dto.class);
    }
}
