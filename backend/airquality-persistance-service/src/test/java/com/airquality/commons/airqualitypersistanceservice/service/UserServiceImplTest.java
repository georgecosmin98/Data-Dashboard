package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import java.util.Date;
import java.util.Optional;

import static org.mockito.Mockito.*;

public class UserServiceImplTest {

    private UserDto firstUser;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserServiceImpl userService;

    @Rule
    //Initialize mock, validate usage
    public MockitoRule rule = MockitoJUnit.rule();

    @Before
    public void setUp() {
        firstUser = new UserDto(1L, "First User Name", "First User Username", "First User Password", "First User Reset Token", new Date());
     }

    @Test
    public void shouldReturnCorrectCreatedUser(){
        //Call method we want to test
        userService.createUser(firstUser);

        //Verify number of invocations method
        verify(userRepository,times(1)).save(firstUser);
    }

    @Test
    public void shouldReturnCorrectUserByUsername() {
        //Return all mocked result set on find
        when(userRepository.findByUsername(firstUser.getUsername())).thenReturn(Optional.of(firstUser));

        //Call method findUserByUsername we want to test
        //and store properties into Optional <UserDto> object
        Optional<UserDto> userToTest = userService.findUserByUsername(firstUser.getUsername());

        //Verify if the method was called
        verify(userRepository).findByUsername(firstUser.getUsername());

        //Verify if the method return correct user
        Assert.assertEquals(firstUser, userToTest.get());
    }

    @Test
    public void shouldReturnCorrectLoadedUserByUsername() {
        //Return all mocked result set on find
        when(userRepository.findByUsername(firstUser.getUsername())).thenReturn(Optional.of(firstUser));

        //Call method loadUserByUsername we want to test
        //and store properties into UserDto object
        UserDto userToTest = userService.loadUserByUsername(firstUser.getUsername());

        //Verify if the method was called
        verify(userRepository).findByUsername(firstUser.getUsername());

        //Verify if the method return correct user
        Assert.assertEquals(firstUser, userToTest);
    }

    @Test
    public void shouldReturnCorrectUserByResetToken() {
        //Return all mocked result set on find
        when(userRepository.findByResetToken(firstUser.getResetToken())).thenReturn(Optional.of(firstUser));

        //Call method loadUserByResetToken we want to test
        //and store properties into UserDto object
        Optional <UserDto> userToTest = userService.findUserByResetToken(firstUser.getResetToken());

        //Verify if the method was called
        verify(userRepository).findByResetToken(firstUser.getResetToken());

        //Verify if the method return correct user
        Assert.assertEquals(firstUser, userToTest.get());
    }

    @Test
    public void shouldReturnCorrectLoadedUserByResetToken() {
        //Return all mocked result set on find
        when(userRepository.findByResetToken(firstUser.getResetToken())).thenReturn(Optional.of(firstUser));

        //Call method loadUserByResetToken we want to test
        //and store properties into UserDto object
        UserDto userToTest = userService.loadUserByResetToken(firstUser.getResetToken());

        //Verify if the method was called
        verify(userRepository).findByResetToken(firstUser.getResetToken());

        //Verify if the method return correct user
        Assert.assertEquals(firstUser, userToTest);
    }
}
