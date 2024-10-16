create table if not exists company
(
    id    bigint       not null,
    name  varchar(255) not null,
    siret varchar(255) not null,
    primary key (id),
    unique (name),
    unique (siret)
    );

create table if not exists referential
(
    id    bigint       not null,
    type  varchar(255) not null,
    value varchar(255) not null,
    primary key (id),
    constraint referential_type_check
    check ((type)::text = ANY
((ARRAY ['GRADE'::character varying, 'SKILL'::character varying, 'FIELD'::character varying])::text[]))
    );

create table if not exists _user
(
    monthly_current_candidacy integer,
    birth_date                timestamp(6) not null,
    company_id                bigint,
    field_id                  bigint,
    grade_id                  bigint,
    id                        bigint       not null,
    user_type                 varchar(31)  not null,
    description               varchar(255),
    email                     varchar(255),
    first_name                varchar(255),
    last_name                 varchar(255),
    password                  varchar(255) not null,
    role                      varchar(255) not null,
    school_name               varchar(255),
    photo                     varchar(255),
    primary key (id),
    unique (email),
    constraint fk1xakqmeoi9pwmbl279fajjks7
    foreign key (company_id) references company,
    constraint fk7rpbyfbp5vxcoxa78s6957s14
    foreign key (field_id) references referential,
    constraint fkhdpyb4v3bd3fkx24bdk6o0mu
    foreign key (grade_id) references referential,
    constraint _user_role_check
    check ((role)::text = ANY
((ARRAY ['ADMIN'::character varying, 'STUDENT'::character varying, 'RECRUITER'::character varying])::text[]))
    );

create table if not exists ass_user_skill
(
    skill_id bigint not null,
    user_id  bigint not null,
    constraint fk5od0g6d681bo9t0spftuiufs6
    foreign key (skill_id) references referential,
    constraint fkiwg79skekvofq8q2ce4ppp3y6
    foreign key (user_id) references _user
    );

create table if not exists offer
(
    salary           double precision not null,
    id               bigint           not null,
    publication_date timestamp(6)     not null,
    recruiter_id     bigint,
    description      varchar(255)     not null,
    name             varchar(255)     not null,
    rhythm           varchar(255)     not null,
    primary key (id),
    constraint fk8ki8sw1pqe3ybamjulkxvvlfn
    foreign key (recruiter_id) references _user
    );

create table if not exists candidacy
(
    date_of_candidacy timestamp(6) not null,
    date_of_response  timestamp(6),
    id                bigint       not null,
    offer_id          bigint,
    student_id        bigint,
    status            varchar(255) not null,
    primary key (id),
    constraint fkhko3xn63npkhftf38hbbropu6
    foreign key (offer_id) references offer,
    constraint fkp2exg60tdsa91hxvmjrbro41g
    foreign key (student_id) references _user,
    constraint candidacy_status_check
    check ((status)::text = ANY
((ARRAY ['NONE'::character varying, 'PENDING'::character varying, 'ACCEPTED'::character varying, 'REFUSED'::character varying])::text[]))
    );

create table if not exists refresh_token
(
    id          integer                     not null,
    revoked     boolean                     not null,
    expiry_date timestamp(6) with time zone not null,
                                 user_id     bigint,
                                 token       varchar(255),
    primary key (id),
    unique (token),
    constraint fkbws85up72jgwebb6ttkjiytg3
    foreign key (user_id) references _user
    );

create table if not exists student_ignored_offers
(
    offer_id   bigint not null,
    student_id bigint not null,
    constraint fkjh1uxuceqgthmbysy4hmk5kkk
    foreign key (offer_id) references offer,
    constraint fkka4e4sje2cynvgvd1mlgyo524
    foreign key (student_id) references _user
    );

