package com.gpstl.backend.models.article;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String picture;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double price;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name="article_categories",
            joinColumns=@JoinColumn(name="article_id"),
            inverseJoinColumns = @JoinColumn(name = "article_category_id")
    )
    private List<ArticleCategory> categories = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name="article_keywords",
            joinColumns=@JoinColumn(name="article_id "),
            inverseJoinColumns = @JoinColumn(name = "article_keyword_id")
    )
    private List<ArticleKeyword> keywords = new ArrayList<>();

    @Column()
    private Long sellerId;

}

