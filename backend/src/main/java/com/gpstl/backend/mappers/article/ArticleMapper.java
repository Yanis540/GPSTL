package com.gpstl.backend.mappers.article;

import com.gpstl.backend.dtos.article.ArticleDTO;
import com.gpstl.backend.models.article.Article;
import org.modelmapper.ModelMapper;

public class ArticleMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static ArticleDTO toDTO(Article article) {
        ArticleDTO articleDTO = modelMapper.map(article, ArticleDTO.class);
        articleDTO.setCategories(ArticleCategoryMapper.toDTOList(article.getCategories()));
        articleDTO.setKeywords(ArticleKeywordMapper.toDTOList(article.getKeywords()));
        return articleDTO;
    }

    public static Article toEntity(ArticleDTO articleDTO) {
        Article article = modelMapper.map(articleDTO, Article.class);
        article.setCategories(ArticleCategoryMapper.toEntityList(articleDTO.getCategories()));
        article.setKeywords(ArticleKeywordMapper.toEntityList(articleDTO.getKeywords()));
        return article;
    }
}

