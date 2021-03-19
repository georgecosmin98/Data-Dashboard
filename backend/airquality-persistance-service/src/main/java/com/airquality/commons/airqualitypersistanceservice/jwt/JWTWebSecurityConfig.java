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
                    .csrf().disable()
                    .exceptionHandling().authenticationEntryPoint(jwtUnAuthorizedResponseAuthenticationEntryPoint).and()
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                    .authorizeRequests()
                    .anyRequest().authenticated();

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
                    )
                    .antMatchers(HttpMethod.OPTIONS, "/**")
                    .and()
                    .ignoring()
                    .antMatchers(
                            "/contact/**" //let all user to request contact
                    )
                    .and()
                    .ignoring().antMatchers("/users/signup","/users/socialsignup") //let guest users to signup
                    .and()
                    .ignoring().antMatchers("/users/forgotpassword","/users/resetpassword","/users/isTokenExpired"); //let user change password without JWT Token

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

