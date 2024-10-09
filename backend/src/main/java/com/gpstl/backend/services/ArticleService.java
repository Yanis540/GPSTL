package com.gpstl.backend.services;

import com.gpstl.backend.models.article.Article;
import com.gpstl.backend.repositories.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public Article addArticle(Article article) {
        article.setId(null);
        return articleRepository.save(article);
    }

    public Article updateArticle(Long id, Article articleUpdated) {
        Optional<Article> articleExist = this.articleRepository.findById(id);
        if (articleExist.isEmpty()) {
            return null;
        }
        Article article = articleExist.get();
        article.setPicture(articleUpdated.getPicture());
        article.setTitle(articleUpdated.getTitle());
        article.setDescription(articleUpdated.getDescription());
        article.setPrice(articleUpdated.getPrice());
        article.setCategories(articleUpdated.getCategories());
        article.setKeywords(articleUpdated.getKeywords());
        return articleRepository.save(article);
    }

    public Article deleteArticle(Long id) {
        Optional<Article> articleExist = this.articleRepository.findById(id);
        if (articleExist.isEmpty()) {
            return null;
        }
        articleRepository.deleteById(id);
        return articleExist.get();
    }

    public List<Article> getArticlesByCategory(String category) {
        return this.articleRepository.findByCategory(category);
    }

    public List<Article> getArticlesByKeyword(String keyword) {
        return this.articleRepository.findByKeyword(keyword);
    }

    public List<Article> getArticles() {
        return this.articleRepository.findByOrderByIdDesc();
    }

    public Article getArticleById(Long id) {
        Optional<Article> articleExists = this.articleRepository.findById(id);
        return articleExists.orElse(null);
    }

    public List<Article> getSellerArticles(Long sellerId) {
        return this.articleRepository.findBySeller(sellerId);
    }

    public Page<Article> getArticles(String keyword, String category, int page, int size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("id").descending());
        if (keyword == null && category == null) {
            return this.articleRepository.findAll(paging);
        } else if (keyword != null && category == null) {
            return this.articleRepository.findByKeyword(keyword, paging);
        } else if (keyword == null) {
            return this.articleRepository.findByCategory(category, paging);
        }
        return this.articleRepository.findByKeywordAndCategory(keyword, category, paging);
    }
}

