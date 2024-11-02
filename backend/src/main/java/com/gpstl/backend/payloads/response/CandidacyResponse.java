package com.gpstl.backend.payloads.response;

import com.gpstl.backend.models.candidacy.CandidacyStatus;
import java.util.Date;

public class CandidacyResponse {
    private Long id;
    private Date dateOfCandidacy;
    private Date dateOfResponse;
    private CandidacyStatus status;
    private String firstName;
    private String lastName;
    private String photo;

    public CandidacyResponse(Long id, Date dateOfCandidacy, Date dateOfResponse, CandidacyStatus status, String firstName, String lastName, String photo) {
        this.id = id;
        this.dateOfCandidacy = dateOfCandidacy;
        this.dateOfResponse = dateOfResponse;
        this.status = status;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
    }

    public Long getId(){return this.id;}
    public void setId(Long id){this.id = id;}
    public Date getDateOfCandidacy(){return this.dateOfCandidacy;}
    public void setDateOfCandidacy(Date dateOfCandidacy){this.dateOfCandidacy = dateOfCandidacy;}
    public Date getDateOfResponse(){return this.dateOfResponse;}
    public void setDateOfResponse(Date dateOfResponse){this.dateOfResponse = dateOfResponse;}
    public CandidacyStatus getStatus(){return this.status;}
    public void setStatus(CandidacyStatus status){this.status = status;}
    public String getFirstName(){return this.firstName;}
    public void setFirstName(String firstName){this.firstName = firstName;}
    public String getLastName(){return this.lastName;}
    public void setLastName(String lastName){this.lastName = lastName;}
    public String getPhoto(){return this.photo;}
    public void setPhoto(String photo){this.photo = photo;}
}
