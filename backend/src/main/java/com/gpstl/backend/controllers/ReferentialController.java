package com.gpstl.backend.controllers;

import com.gpstl.backend.repositories.ReferentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("referential")
@RequiredArgsConstructor
public class ReferentialController {

    private final ReferentialRepository referentialRepository;

}
