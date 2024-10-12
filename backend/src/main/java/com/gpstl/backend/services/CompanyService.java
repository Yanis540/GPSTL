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
        return companyRepository.findAll();
    }

    public Optional<Company> getCompanyById(Long id) {
        return companyRepository.findById(id);
    }

    public Company createCompany(Company companyToCreate) {
        Company existingCompany = companyRepository.findByName(companyToCreate.getName());
        if (existingCompany != null) {
            throw new IllegalArgumentException("Company already exists");
        }
        Company company = new Company();
        company.setName(companyToCreate.getName());
        company.setSiret(companyToCreate.getSiret());
        company.setRecruiters(companyToCreate.getRecruiters());
        return companyRepository.save(company);
    }

    // Je pense qu'une company peut simplement update les Recruiters qui lui sont associés
    public Company updateCompany(Long id, Company companyToUpdate) {
        Company existingCompany = companyRepository.findById(id).orElseThrow();
        existingCompany.setName(companyToUpdate.getName());
        existingCompany.setSiret(companyToUpdate.getSiret());
        existingCompany.setRecruiters(companyToUpdate.getRecruiters());
        return companyRepository.save(existingCompany);
    }

    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }
}
