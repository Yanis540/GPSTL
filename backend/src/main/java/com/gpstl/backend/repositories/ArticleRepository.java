package com.gpstl.backend.repositories;

import com.gpstl.backend.models.article.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article,Long> {

    @Query(value = "SELECT a FROM Article a JOIN a.categories c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :category, '%')) ORDER BY a.id DESC")
    List<Article> findByCategory(String category);

    @Query(value = "SELECT a FROM Article a JOIN a.keywords k WHERE LOWER(k.name) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY a.id DESC")
    List<Article> findByKeyword(String keyword);

    @Query(value = "SELECT a FROM Article a WHERE a.sellerId=:sellerId ORDER BY a.id DESC")
    List<Article> findBySeller(Long sellerId);

    List<Article> findByOrderByIdDesc();

    @Query(value = "SELECT a FROM Article a JOIN a.keywords k WHERE LOWER(k.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Article> findByKeyword(String keyword, Pageable pageable);

    @Query(value = "SELECT a FROM Article a JOIN a.categories c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :category, '%'))")
    Page<Article> findByCategory(String category, Pageable pageable);

    @Query(value = "SELECT a FROM Article a JOIN a.keywords k JOIN a.categories c WHERE LOWER(k.name) LIKE LOWER(CONCAT('%', :keyword, '%')) AND LOWER(c.name) LIKE LOWER(CONCAT('%', :category, '%'))")
    Page<Article> findByKeywordAndCategory(String keyword, String category, Pageable pageable);

}

