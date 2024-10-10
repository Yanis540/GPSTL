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
               (ARRAY [('GRADE'::character varying)::text, ('SKILL'::character varying)::text, ('FIELD'::character varying)::text]))
);

create table if not exists _user
(
    monthly_current_candidacy integer,
    birth_date                timestamp(6),
    company_id                bigint,
    field_id                  bigint,
    id                        bigint       not null,
    user_type                 varchar(31)  not null,
    email                     varchar(255) not null,
    first_name                varchar(255),
    last_name                 varchar(255),
    password                  varchar(255) not null,
    role                      varchar(255) not null,
    school_name               varchar(255) not null,
    photo                     oid,
    primary key (id),
    unique (email),
    constraint fk1xakqmeoi9pwmbl279fajjks7
        foreign key (company_id) references company,
    constraint fk7rpbyfbp5vxcoxa78s6957s14
        foreign key (field_id) references referential,
    constraint _user_role_check
        check ((role)::text = ANY
               (ARRAY [('ADMIN'::character varying)::text, ('STUDENT'::character varying)::text, ('RECRUITER'::character varying)::text]))
);

create table if not exists ass_user_grade
(
    grade_id bigint not null,
    user_id  bigint not null,
    constraint fk75q731l5ammui6eqk86j6a5jk
        foreign key (grade_id) references referential,
    constraint fkptnr61vcsvkshd6ttwfwg14et
        foreign key (user_id) references _user
);

create table if not exists ass_user_skill
(
    skill_id bigint not null,
    user_id  bigint not null,
    constraint fksvd1vax0xa01q03my63364wmo
        foreign key (skill_id) references referential,
    constraint fka81u8he4ips24twiy82flc5ou
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
               (ARRAY [('NONE'::character varying)::text, ('PENDING'::character varying)::text, ('ACCEPTED'::character varying)::text, ('REFUSED'::character varying)::text]))
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

