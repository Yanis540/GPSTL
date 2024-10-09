package com.ddjordjevic.security.mappers.article;

import com.ddjordjevic.security.dtos.article.ArticleCategoryDTO;
import com.ddjordjevic.security.models.article.ArticleCategory;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class ArticleCategoryMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static ArticleCategoryDTO toDTO(ArticleCategory articleCategory) {
        return modelMapper.map(articleCategory, ArticleCategoryDTO.class);
    }

    public static ArticleCategory toEntity(ArticleCategoryDTO articleCategoryDTO) {
        return modelMapper.map(articleCategoryDTO, ArticleCategory.class);
    }

    public static List<ArticleCategoryDTO> toDTOList(List<ArticleCategory> articleCategories) {
        return articleCategories.stream()
                .map(ArticleCategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<ArticleCategory> toEntityList(List<ArticleCategoryDTO> articleCategoryDTOs) {
        return articleCategoryDTOs.stream()
                .map(ArticleCategoryMapper::toEntity)
                .collect(Collectors.toList());
    }
}

