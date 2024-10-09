package com.ddjordjevic.security.dtos.article;

import lombok.Data;

import java.util.List;

@Data
public class ArticleDTO {
    private Long id;
    private String picture;
    private String title;
    private String description;
    private double price;
    private List<ArticleCategoryDTO> categories;
    private List<ArticleKeywordDTO> keywords;
    private Long sellerId;
}

