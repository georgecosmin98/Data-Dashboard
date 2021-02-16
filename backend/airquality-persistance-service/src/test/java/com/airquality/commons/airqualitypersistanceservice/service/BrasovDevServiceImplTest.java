package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.repository.BrasovDevRepository;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

public class BrasovDevServiceImplTest {

    private BrasovDevDto brasovDevDto;
    private List listOfSensorData;

    @Mock
    BrasovDevRepository brasovDevRepository;

    @InjectMocks
    BrasovDevServiceImpl brasovDevServiceImpl;

    @Rule
    public MockitoRule rule = MockitoJUnit.rule();

    @Before
    public void setUp() {
        listOfSensorData = new ArrayList();

        brasovDevDto = new BrasovDevDto("testId", "testSource", "testSensor",
                1, 1, 1,
                1, "testMeasurement");

        listOfSensorData.add(brasovDevDto);
    }

    @Test
    public void shouldReturnCorrectBrasovDevDtoBySensorName() {
        //Return all mocked result set on find
        when(brasovDevRepository.findBySensor("testSensor")).thenReturn(listOfSensorData);

        //Call method we want to test
        brasovDevServiceImpl.findBySensor("testSensor");

        //Verify number of invocations method
        verify(brasovDevRepository).findBySensor("testSensor");

    }

}
