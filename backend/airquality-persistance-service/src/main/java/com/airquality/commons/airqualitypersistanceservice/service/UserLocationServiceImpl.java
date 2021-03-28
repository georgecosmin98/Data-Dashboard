package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.UserLocationDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.List;

@Service
public class UserLocationServiceImpl {

    @Autowired
    UserLocationRepository userLocationRepository;


    public void save(UserLocationDto userLocationDto) {
        userLocationRepository.save(userLocationDto);
    }

    public List<UserLocationDto> findUserLocationDtoByTimestampAfter(Date data) {
        return userLocationRepository.findUserLocationDtoByTimestampAfter(data.getTime());
    }

    public List<UserLocationDto> findUserLocationDtoByTimestampBetween(Date fromDate, Date toDate) {
        return userLocationRepository.findUserLocationDtoByTimestampBetween(fromDate.getTime(), toDate.getTime());
    }

    public List<UserLocationDto> findUserLocationDtoByTimestampAfterAndUsername(Date data, String username){
        return userLocationRepository.findUserLocationDtoByTimestampAfterAndUsername(data.getTime(),username);
    }
}
