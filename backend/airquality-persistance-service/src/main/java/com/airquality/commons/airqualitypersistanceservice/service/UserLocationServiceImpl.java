package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.UserLocationDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<UserLocationDto> findDailyUserLocationDtoByTimestampAfterAndUsername(Date data, String username) {
        return userLocationRepository.findUserLocationDtoByTimestampBetweenAndUsername(data.getTime(), data.getTime() + 86400000, username).collect(Collectors.toList());
    }
}
