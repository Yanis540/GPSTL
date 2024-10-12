package com.gpstl.backend.services;

import com.gpstl.backend.models.Company;
import com.gpstl.backend.repositories.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    public List<Company> getAllCompany() {
        return List.of();
    }

    public Optional<Company> getCompanyById(Long id) {
        return Optional.empty();
    }

    public Company createCompany(Company companyToCreate) {
        return companyToCreate;
    }

    public Company updateCompany(Long id, Company companyToUpdate) {
        return companyToUpdate;
    }

    public Company deleteCompany(Long id) {
        return null;
    }
}
