package com.ddjordjevic.security.controllers;

import com.ddjordjevic.security.dtos.article.ArticleDTO;
import com.ddjordjevic.security.mappers.article.ArticleMapper;
import com.ddjordjevic.security.models.article.Article;
import com.ddjordjevic.security.models.article.ArticlePagination;
import com.ddjordjevic.security.services.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

//@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("articles")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
public class ArticleController {

    private final ArticleService articleService;

    @PostMapping
    public ResponseEntity<ArticleDTO> createArticle(@RequestBody ArticleDTO articleDTO) {
        try {
            Article article = articleService.addArticle(ArticleMapper.toEntity(articleDTO));
            return new ResponseEntity<>(ArticleMapper.toDTO(article), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('UPDATE_PRIVILEGE') and hasRole('ADMIN')")
    public ResponseEntity<ArticleDTO> updateArticle(@PathVariable("id") Long id, @RequestBody ArticleDTO articleDTO) {
        try {
            Article article = articleService.updateArticle(id, ArticleMapper.toEntity(articleDTO));
            if (article == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(ArticleMapper.toDTO(article), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DELETE_PRIVILEGE') and hasRole('ADMIN')")
    public ResponseEntity<ArticleDTO> deleteArticle(@PathVariable("id") Long id) {
        try {
            Article article = articleService.deleteArticle(id);
            if (article == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/category/{category}")
    public List<ArticleDTO> getArticlesByCategory(@PathVariable("category") String category) {
        return this.articleService.getArticlesByCategory(category)
                .stream()
                .map(ArticleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/keyword/{keyword}")
    public List<ArticleDTO> getArticlesByKeyword(@PathVariable("keyword") String keyword) {
        return this.articleService.getArticlesByKeyword(keyword)
                .stream()
                .map(ArticleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping()
    public ResponseEntity<ArticlePagination> getArticles(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        try {
            Page<Article> pageArticles = this.articleService.getArticles(keyword, category, page, size);
            List<ArticleDTO> articles = pageArticles
                    .getContent()
                    .stream()
                    .map(ArticleMapper::toDTO)
                    .collect(Collectors.toList());

            if(articles.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            ArticlePagination articlePagination = new ArticlePagination(
                    articles,
                    pageArticles.getNumber(),
                    pageArticles.getTotalElements(),
                    pageArticles.getTotalPages()
            );
            return new ResponseEntity<>(articlePagination, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDTO> getArticleById(@PathVariable("id") Long id) {
        Article article = this.articleService.getArticleById(id);
        if (article == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ArticleMapper.toDTO(article), HttpStatus.OK);
    }

    @GetMapping("/all")
    public List<ArticleDTO> getArticles() {
        return this.articleService.getArticles()
                .stream()
                .map(ArticleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/seller/{sellerId}")
    public List<ArticleDTO> getSellerArticles(@PathVariable("sellerId") Long sellerId) {
        return this.articleService.getSellerArticles(sellerId)
                .stream()
                .map(ArticleMapper::toDTO)
                .collect(Collectors.toList());
    }
}

