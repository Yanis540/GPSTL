package com.gpstl.backend.controllers;

import com.gpstl.backend.dtos.CompanyDto;
import com.gpstl.backend.mappers.CompanyMapper;
import com.gpstl.backend.models.Company;
import com.gpstl.backend.repositories.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyRepository companyRepository;

    @GetMapping
    public ResponseEntity<List<CompanyDto>> getCompanies() {
        List<CompanyDto> companies = companyRepository
                .findAll()
                .stream()
                .map(CompanyMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(companies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDto> getCompanyById(@PathVariable Long id) {
        Optional<Company> company = companyRepository.findById(id);
        return company.map(c -> ResponseEntity.ok(CompanyMapper.toDto(c)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
    public ResponseEntity<CompanyDto> createCompany(@RequestBody Company companyToCreate) {
        try {
            Company company = companyRepository.save(companyToCreate);
            return new ResponseEntity<>(CompanyMapper.toDto(company), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CompanyDto> updateCompany(@PathVariable("id") Long id, @RequestBody Company companyToUpdate) {
        try {
            if (companyRepository.existsById(id)) {
                Company updatedCompany = companyRepository.save(companyToUpdate);
                return ResponseEntity.ok(CompanyMapper.toDto(updatedCompany));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        try {
            if (companyRepository.existsById(id)) {
                companyRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
}
