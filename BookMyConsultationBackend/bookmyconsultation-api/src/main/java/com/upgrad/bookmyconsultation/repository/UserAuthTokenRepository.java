package com.upgrad.bookmyconsultation.repository;

import com.upgrad.bookmyconsultation.entity.UserAuthToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;

@Repository
public interface UserAuthTokenRepository extends CrudRepository<UserAuthToken, String> {

	UserAuthToken findByUserEmailIdAndLogoutAtIsNullAndExpiresAtIsAfter(@NotNull String userId, ZonedDateTime currentTime);

	UserAuthToken findByAccessToken(String token);

}
