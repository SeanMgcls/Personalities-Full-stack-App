package com.magcalas.personalities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Replace with your React app's origin
@RequestMapping("/magcalas/personalities") // Updated the request mapping
public class PersonalityController {

    @Autowired
    private PersonalityRepository personalityRepository;

    @GetMapping
    public ResponseEntity<List<Personality>> getAllPersonalities() { // Updated method name
        List<Personality> personalities = personalityRepository.findAll();
        return new ResponseEntity<>(personalities, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Personality> getPersonalityById(@PathVariable Long id) { // Updated method name
        Optional<Personality> personality = personalityRepository.findById(id);
        return personality.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Personality> createPersonality(@RequestBody Personality personality) { // Updated method name
        Personality savedPersonality = personalityRepository.save(personality);
        return new ResponseEntity<>(savedPersonality, HttpStatus.CREATED);
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Personality>> createBulkPersonalities(@RequestBody List<Personality> personalities) {
        List<Personality> savedPersonalities = personalityRepository.saveAll(personalities);
        return new ResponseEntity<>(savedPersonalities, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Personality> updatePersonality(@PathVariable Long id, @RequestBody Personality updatedPersonality) { // Updated method name
        Optional<Personality> existingPersonality = personalityRepository.findById(id);
        if (existingPersonality.isPresent()) {
            updatedPersonality.setId(id);
            Personality savedPersonality = personalityRepository.save(updatedPersonality);
            return new ResponseEntity<>(savedPersonality, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletePersonality(@PathVariable Long id) { // Updated method name
        if (personalityRepository.existsById(id)) {
            personalityRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}