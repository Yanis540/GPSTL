package com.ddjordjevic.security.models.article;

import com.ddjordjevic.security.dtos.article.ArticleDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ArticlePagination {
    private List<ArticleDTO> articles;
    private int currentPage;
    private long totalItems;
    private int totalPages;
}

