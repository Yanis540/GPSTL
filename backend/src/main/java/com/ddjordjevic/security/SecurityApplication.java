package com.ddjordjevic.security;

import com.ddjordjevic.security.models.article.Article;
import com.ddjordjevic.security.models.article.ArticleCategory;
import com.ddjordjevic.security.models.article.ArticleKeyword;
import com.ddjordjevic.security.payloads.request.RegisterRequest;
import com.ddjordjevic.security.services.ArticleService;
import com.ddjordjevic.security.services.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.modelmapper.ModelMapper;

import java.util.List;

import static com.ddjordjevic.security.models.user.Role.ADMIN;
import static com.ddjordjevic.security.models.user.Role.USER;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@Slf4j
public class SecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurityApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService authService,
			ArticleService articleService
	) {
		return args -> {
			var admin = RegisterRequest.builder()
					.firstname("Darko")
					.lastname("Djordjevic")
					.email("darko.djordjevic99@outlook.com")
					.password("azerty")
					.role(ADMIN)
					.build();
            log.info("Admin token: {}", authService.register(admin).getAccessToken());

			var user = RegisterRequest.builder()
					.firstname("Darko")
					.lastname("Djordjevic")
					.email("darko.djordjevic99@gmail.com")
					.password("azerty")
					.role(USER)
					.build();
            log.info("User token: {}", authService.register(user).getAccessToken());

			var article = Article.builder()
					.picture("https://media.direct.playstation.com/is/image/psdglobal/dualsense-charging-station-with-ps5-dualsense-controllers-FR?$FourColumn_Large$")
					.title("PS5 DualSense")
					.description("Rechargez simultanément deux manettes sans fil DualSense™ ou DualSense Edge™ sans avoir à les connecter à votre console PlayStation®5.")
					.price(22.99)
					.categories(List.of(ArticleCategory
									.builder()
									.name("Accessoires")
									.build()
							)
					)
					.keywords(List.of(ArticleKeyword
									.builder()
									.name("dualsense")
									.build(),
							ArticleKeyword
									.builder()
									.name("dualsense")
									.build()
							)
					)
					.build();
            log.info("Article added: {}", articleService.addArticle(article).getId());

			article = Article.builder()
					.picture("https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-model-unselect-gallery-2-202303_GEO_EMEA?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1676930655577")
					.title("iPhone 14")
					.description("iPhone 14 jaune 8go RAM 64 go de stockage")
					.price(1299.99)
					.categories(List.of(ArticleCategory
									.builder()
									.name("SmartPhone")
									.build()
							)
					)
					.keywords(List.of(ArticleKeyword
									.builder()
									.name("tel")
									.build(),
							ArticleKeyword
									.builder()
									.name("apple")
									.build()
							)
					)
					.build();
            log.info("Article added: {}", articleService.addArticle(article).getId());

		};
	}

}
