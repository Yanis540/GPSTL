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
}
