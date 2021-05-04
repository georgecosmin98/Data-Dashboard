package com.airquality.commons.airqualitypersistanceservice.jwt;

import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.jsonwebtoken.*;
import io.jsonwebtoken.impl.DefaultClock;
import lombok.extern.log4j.Log4j2;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Log4j2
public class JwtTokenUtil {

    private Clock clock = DefaultClock.INSTANCE;

    @Value("${jwt.signing.key.secret}")
    private String secret;

    @Value("${jwt.token.expiration.in.seconds}")
    private Long expirationTime;

    @Value("${jwt.http.request.header}")
    private String tokenHeader;

    //Decode JWT Token to get email
    public String getEmailFromToken(String token) {
        DecodedJWT jwt = JWT.decode(token);
        return jwt.getSubject();
    }

    //Decode JWT Token to get expiration date from token
    public Date getExpirationDateFromToken(String token) {
        DecodedJWT jwt = JWT.decode(token);
        return jwt.getExpiresAt();
    }

    //Get all information from token
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    //Verify if a token is expired
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(clock.now());
    }

    //Generate token
    public String generateToken(UserDto userDetails) {
        Map<String, Object> claims = new HashMap<>();
        final Date createdDate = clock.now();
        final Date expirationDate = calculateExpirationDate(createdDate);

        //Return JWT Token with claims: sub,exp and iat
        return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername()).setIssuedAt(createdDate)
                .setExpiration(expirationDate).signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    //Verify if a token can be refreshed
    public Boolean canTokenBeRefreshed(String token) {
        //If token is expired, token can't be refreshed!
        return (!isTokenExpired(token));
    }

    //Refresh JWT Token
    public String refreshToken(String token) {
        final Date createdDate = clock.now();
        final Date expirationDate = calculateExpirationDate(createdDate);

        //Get all claims from token and update issued date and expiration date
        final Claims claims = getAllClaimsFromToken(token);
        claims.setIssuedAt(createdDate);
        claims.setExpiration(expirationDate);

        //Return refreshed token
        return Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    public Boolean validateToken(String token) {
        //Extract email from given token
        final String email = getEmailFromToken(token);
        //Verify if JWT Token is valid
        try {
            Algorithm algorithm = Algorithm.HMAC512(new Base64(true).decodeBase64(secret));
            JWTVerifier verifier = JWT.require(algorithm)
                    .withSubject(email)
                    .build();
            DecodedJWT jwt = verifier.verify(token);
        } catch (JWTVerificationException exception) {
            log.error("Invalid JWT token provided");
            return false;
        }
        return (!isTokenExpired(token));
    }

    private Date calculateExpirationDate(Date createdDate) {
        //Return expiration date in UNIX EPOCH (seconds)
        return new Date(createdDate.getTime() + expirationTime * 1000);
    }

    public String parseJWTTokenFromRequestHeader(HttpServletRequest request) {
        final String requestTokenHeader = request.getHeader(this.tokenHeader);
        String jwtToken = null;
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
        } else {
            log.warn("JWT does not start with bearer string");
        }
        return jwtToken;
    }

    public String getUsernameFromRequestTokenHeader(String jwtToken) {
        String username = null;
        try {
            username = getEmailFromToken(jwtToken);
        } catch (IllegalArgumentException e) {
            log.error("Username can not be extract from JWT", e);
        } catch (ExpiredJwtException e) {
            log.warn("JWT is expired", e);
        } catch (JWTDecodeException e) {
            log.error("Bad jwt token", e);
        }
        return username;
    }
}
