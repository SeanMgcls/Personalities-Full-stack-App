package com.magcalas.personalities;

import com.magcalas.personalities.Personality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalityRepository extends JpaRepository<Personality, Long> {
    // ... your code ...
}