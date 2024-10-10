create table if not exists _user
(
    monthly_current_candidacy integer,
    company_id                bigint,
    id                        bigint      not null,
    user_type                 varchar(31) not null,
    email                     varchar(255),
    field                     varchar(255),
    firstname                 varchar(255),
    lastname                  varchar(255),
    password                  varchar(255),
    role                      varchar(255),
    school_name               varchar(255),
    photo                     oid
);

alter table _user
    add primary key (id);

alter table _user
    add unique (email);

alter table _user
    add constraint _user_role_check
        check ((role)::text = ANY ((ARRAY ['ADMIN'::character varying, 'USER'::character varying])::text[]));

create table if not exists candidacy
(
    status   smallint,
    id       bigint not null,
    offer_id bigint,
    user_id  bigint
);

alter table candidacy
    add primary key (id);

alter table candidacy
    add constraint fknbhvhxciab31fgciy1w7n1k1s
        foreign key (user_id) references _user;

alter table candidacy
    add constraint candidacy_status_check
        check ((status >= 0) AND (status <= 3));

create table if not exists company
(
    id    bigint not null,
    name  varchar(255),
    siret varchar(255)
);

alter table company
    add primary key (id);

alter table _user
    add constraint fk1xakqmeoi9pwmbl279fajjks7
        foreign key (company_id) references company;

alter table company
    add unique (name);

alter table company
    add unique (siret);

create table if not exists offer
(
    salary           double precision,
    id               bigint not null,
    publication_date timestamp(6),
    description      varchar(255),
    name             varchar(255),
    rhythm           varchar(255)
);

alter table offer
    add primary key (id);

alter table candidacy
    add constraint fkhko3xn63npkhftf38hbbropu6
        foreign key (offer_id) references offer;

create table if not exists refresh_token
(
    id          integer                     not null,
    revoked     boolean                     not null,
    expiry_date timestamp(6) with time zone not null,
    user_id     bigint,
    token       varchar(255)
);

alter table refresh_token
    add primary key (id);

alter table refresh_token
    add unique (token);

alter table refresh_token
    add constraint fkbws85up72jgwebb6ttkjiytg3
        foreign key (user_id) references _user;


