PGDMP         (                y           fantasy_stock_app    13.2    13.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    32768    fantasy_stock_app    DATABASE     u   CREATE DATABASE fantasy_stock_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
 !   DROP DATABASE fantasy_stock_app;
                postgres    false            �            1259    34908    stock    TABLE     q  CREATE TABLE public.stock (
    id integer NOT NULL,
    company_name character varying(255) NOT NULL,
    stock_symbol character varying(255) NOT NULL,
    stock_cost double precision NOT NULL,
    user_estimated_shares double precision NOT NULL,
    user_estimated_cost double precision NOT NULL,
    user_id integer,
    date timestamp without time zone NOT NULL
);
    DROP TABLE public.stock;
       public         heap    postgres    false            �            1259    34906    stock_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.stock_id_seq;
       public          postgres    false    203            �           0    0    stock_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.stock_id_seq OWNED BY public.stock.id;
          public          postgres    false    202            �            1259    34924    transactions    TABLE       CREATE TABLE public.transactions (
    id integer NOT NULL,
    company_name character varying(255) NOT NULL,
    user_estimated_cost double precision NOT NULL,
    user_holdings double precision NOT NULL,
    user_id integer NOT NULL,
    date timestamp without time zone NOT NULL
);
     DROP TABLE public.transactions;
       public         heap    postgres    false            �            1259    34922    transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public          postgres    false    205            �           0    0    transactions_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;
          public          postgres    false    204            �            1259    34895    users    TABLE     F  CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(80) NOT NULL,
    last_name character varying(80) NOT NULL,
    email character varying(255) NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(80) NOT NULL,
    user_holdings double precision NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    34893    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    201            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            1           2604    34911    stock id    DEFAULT     d   ALTER TABLE ONLY public.stock ALTER COLUMN id SET DEFAULT nextval('public.stock_id_seq'::regclass);
 7   ALTER TABLE public.stock ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            2           2604    34927    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            0           2604    34898    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            �          0    34908    stock 
   TABLE DATA           �   COPY public.stock (id, company_name, stock_symbol, stock_cost, user_estimated_shares, user_estimated_cost, user_id, date) FROM stdin;
    public          postgres    false    203   +        �          0    34924    transactions 
   TABLE DATA           k   COPY public.transactions (id, company_name, user_estimated_cost, user_holdings, user_id, date) FROM stdin;
    public          postgres    false    205   �        �          0    34895    users 
   TABLE DATA           d   COPY public.users (id, first_name, last_name, email, username, password, user_holdings) FROM stdin;
    public          postgres    false    201   �!       �           0    0    stock_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.stock_id_seq', 6, true);
          public          postgres    false    202            �           0    0    transactions_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.transactions_id_seq', 7, true);
          public          postgres    false    204            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          postgres    false    200            8           2606    34916    stock stock_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.stock DROP CONSTRAINT stock_pkey;
       public            postgres    false    203            :           2606    34929    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    205            4           2606    34903    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            6           2606    34905    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    201            ;           2606    34917    stock stock_user_id_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 B   ALTER TABLE ONLY public.stock DROP CONSTRAINT stock_user_id_fkey;
       public          postgres    false    201    203    2868            <           2606    34930 &   transactions transactions_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_user_id_fkey;
       public          postgres    false    2868    201    205            �   �   x��λ
�@����S�r8���n���B0��H� ����S�R��mN�;�~�I�2�Jau`�I����r��LLG��ěK�̚�䖌������r�;�Z�A
�+�P��Y�
M�g�}b���xC���}i�$����t���G@      �   �   x�}ο
�0��9�y�����5ي �;����b}h��(��>_~�e�Fy�p?�_�#S�ڐz�"X$J�v�q����P�0gew��>Ϗ��Ɵ�~]}���j��R�6E�+[�q	Y�X!U�� )�!�H�����
t�L��*�DJ$bp �ˍW�      �   �   x���O�0 ����M��"50�)t�t�'m��Z�><�x��;�,����@B�L|�v�1
ѯ��nA=n��yڮ�Jmj���A9Wc���x���²��$���S��[s��3pu��Bey��A�(q�	IOV7���%%�)K���6a��oF��s���i�;D/     