package com.magcalas.personalities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Personality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Renamed 'artist' to 'name' to be more general

    @Lob
    private String description;

    private String imageUrl; // Renamed 'url' to 'imageUrl' for clarity

    private String imageAltText; // Renamed 'alt' to 'imageAltText' for clarity

    // Default constructor
    public Personality() {
    }

    public Personality(String name, String description, String imageUrl, String imageAltText) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.imageAltText = imageAltText;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageAltText() {
        return imageAltText;
    }

    public void setImageAltText(String imageAltText) {
        this.imageAltText = imageAltText;
    }
}