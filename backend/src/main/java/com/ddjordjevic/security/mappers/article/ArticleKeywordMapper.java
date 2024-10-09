package com.ddjordjevic.security.mappers.article;

import com.ddjordjevic.security.dtos.article.ArticleKeywordDTO;
import com.ddjordjevic.security.models.article.ArticleKeyword;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class ArticleKeywordMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static ArticleKeywordDTO toDTO(ArticleKeyword articleKeyword) {
        return modelMapper.map(articleKeyword, ArticleKeywordDTO.class);
    }

    public static ArticleKeyword toEntity(ArticleKeywordDTO articleKeywordDTO) {
        return modelMapper.map(articleKeywordDTO, ArticleKeyword.class);
    }

    public static List<ArticleKeywordDTO> toDTOList(List<ArticleKeyword> articleKeywords) {
        return articleKeywords.stream()
                .map(ArticleKeywordMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<ArticleKeyword> toEntityList(List<ArticleKeywordDTO> articleKeywordDTOs) {
        return articleKeywordDTOs.stream()
                .map(ArticleKeywordMapper::toEntity)
                .collect(Collectors.toList());
    }
}

