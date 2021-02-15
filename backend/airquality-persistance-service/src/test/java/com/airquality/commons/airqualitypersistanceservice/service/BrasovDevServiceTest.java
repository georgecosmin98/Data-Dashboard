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
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

public class BrasovDevServiceTest {

    private BrasovDevDto brasovDevDto;
    private List listOfSensorData;
    @Mock
    BrasovDevRepository brasovDevRepository;

    @InjectMocks
    BrasovDevService brasovDevService;

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
        when(brasovDevRepository.findBySensor("testSensor")).thenReturn(listOfSensorData);

        brasovDevService.findBySensor("testSensor");

        verify(brasovDevRepository).findBySensor("testSensor");

    }

}
