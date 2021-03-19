package com.airquality.commons.airqualitypersistanceservice.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class JWTWebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtUnAuthorizedResponseAuthenticationEntryPoint jwtUnAuthorizedResponseAuthenticationEntryPoint;

    @Autowired
    private JwtTokenAuthorizationOncePerRequestFilter jwtAuthenticationTokenFilter;

    @Value("${jwt.get.token.uri}")
    private String authenticationPath;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                //Disable Cross-Site Request Forgery
                //Because we dont need for stateless web applications
                //
                .csrf().disable()
                //Handle unauthorized request
                .exceptionHandling().authenticationEntryPoint(jwtUnAuthorizedResponseAuthenticationEntryPoint).and()
                //We have a stateless web application, we dont need to save cliend data generated
                //in one session for use in next session, because we generate JWT token for auth request
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                //Config authorization requests => all request must be authenticated
                //We ignoring below some url, in WebSecurity configure
                .authorizeRequests()
                .anyRequest().authenticated();


        //Filter that validate tokens at every request made by user
        httpSecurity
                .addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity webSecurity) throws Exception {
        webSecurity
                .ignoring()
                .antMatchers(
                        HttpMethod.POST,
                        authenticationPath
                )//let user to authenticate and get JWT Token
                .antMatchers(HttpMethod.OPTIONS, "/**") //let all http.options request, that is used for identifying allowed request method
                .and()
                .ignoring()
                .antMatchers(
                        "/contact/**" //let all user to request contact without authorization
                )
                .and()
                .ignoring().antMatchers("/users/signup", "/users/socialsignup") //let guest users to signup with local and social accounts
                .and()
                .ignoring().antMatchers("/users/forgotpassword", "/users/resetpassword","/users/isTokenExpired"); //let user change password without JWT Token

    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService) //injecting our implementation of UserDetailsService interface which loads user details from elasticsearch index
                .passwordEncoder(encoder());            //we enabling password encoding
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}

