package com.ddjordjevic.security.repositories;

import com.ddjordjevic.security.models.token.RefreshToken;
import com.ddjordjevic.security.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {

    @Query(value = """
      select t from RefreshToken t inner join User u\s
      on t.user.id = u.id\s
      where u.id = :id and t.revoked = false\s
      """)
    List<RefreshToken> findAllValidTokenByUser(Long id);
    Optional<RefreshToken> findByToken(String token);
    void deleteAllByRevoked(boolean revoked);
}
