package com.gpstl.backend.controllers;

import com.gpstl.backend.models.Company;
import com.gpstl.backend.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies() {
        // Implement logic to retrieve all companies
        return ResponseEntity.ok(new ArrayList<>());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        // Implement logic to retrieve a company by id
        return ResponseEntity.ok(new Company());
    }

    @PostMapping
    public ResponseEntity<Company> createCompany(@RequestBody Company company) {
        // Implement logic to create a new company
        return ResponseEntity.ok(new Company());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id, @RequestBody Company company) {
        // Implement logic to update a company
        return ResponseEntity.ok(new Company());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        // Implement logic to delete a company
        return ResponseEntity.noContent().build();
    }
    
}
