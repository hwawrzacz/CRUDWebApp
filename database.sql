PGDMP     %    3                w           recipes    11.4    11.3     +           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            ,           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            -           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            .           1262    16393    recipes    DATABASE     �   CREATE DATABASE recipes WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Polish_Poland.1250' LC_CTYPE = 'Polish_Poland.1250';
    DROP DATABASE recipes;
             postgres    false            f           1247    16707    mealtype    TYPE     h   CREATE TYPE public.mealtype AS ENUM (
    'Śniadanie',
    'Obiad',
    'Kolacja',
    'Przekąska'
);
    DROP TYPE public.mealtype;
       public       postgres    false            _           1247    16646    unit    TYPE     �   CREATE TYPE public.unit AS ENUM (
    'l',
    'g',
    'szklanka',
    'łyżka stołowa',
    'łyżeczka',
    'szczypta'
);
    DROP TYPE public.unit;
       public       postgres    false            �            1259    25018    admins    TABLE     J   CREATE TABLE public.admins (
    login character varying(255) NOT NULL
);
    DROP TABLE public.admins;
       public         postgres    false            �            1259    16554    hibernate_sequence    SEQUENCE     {   CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.hibernate_sequence;
       public       postgres    false            �            1259    16604    ingredients    TABLE     �   CREATE TABLE public.ingredients (
    recipeid integer NOT NULL,
    productname character varying NOT NULL,
    amount double precision NOT NULL,
    unit character varying DEFAULT 'g'::character varying NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public.ingredients;
       public         postgres    false            �            1259    25028    ingredients_id_seq    SEQUENCE     �   ALTER TABLE public.ingredients ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.ingredients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public       postgres    false    200            �            1259    16427    products    TABLE     �   CREATE TABLE public.products (
    productname character varying NOT NULL,
    protein double precision NOT NULL,
    carbs double precision NOT NULL,
    fat double precision NOT NULL,
    kcal integer NOT NULL
);
    DROP TABLE public.products;
       public         postgres    false            �            1259    16419    recipes    TABLE     �   CREATE TABLE public.recipes (
    name character varying NOT NULL,
    description character varying,
    recipeid integer NOT NULL,
    additiondate date DEFAULT now() NOT NULL,
    type character varying DEFAULT 'Obiad'::character varying NOT NULL
);
    DROP TABLE public.recipes;
       public         postgres    false            �            1259    16532    users    TABLE       CREATE TABLE public.users (
    login character varying NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    isactive boolean DEFAULT true NOT NULL,
    password character varying NOT NULL,
    isadmin boolean
);
    DROP TABLE public.users;
       public         postgres    false            '          0    25018    admins 
   TABLE DATA               '   COPY public.admins (login) FROM stdin;
    public       postgres    false    201   ^       &          0    16604    ingredients 
   TABLE DATA               N   COPY public.ingredients (recipeid, productname, amount, unit, id) FROM stdin;
    public       postgres    false    200   {       #          0    16427    products 
   TABLE DATA               J   COPY public.products (productname, protein, carbs, fat, kcal) FROM stdin;
    public       postgres    false    197   }       "          0    16419    recipes 
   TABLE DATA               R   COPY public.recipes (name, description, recipeid, additiondate, type) FROM stdin;
    public       postgres    false    196   �"       $          0    16532    users 
   TABLE DATA               X   COPY public.users (login, firstname, lastname, isactive, password, isadmin) FROM stdin;
    public       postgres    false    198   1%       /           0    0    hibernate_sequence    SEQUENCE SET     B   SELECT pg_catalog.setval('public.hibernate_sequence', 140, true);
            public       postgres    false    199            0           0    0    ingredients_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.ingredients_id_seq', 32, true);
            public       postgres    false    202            �
           2606    25022    admins admins_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (login);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public         postgres    false    201            �
           2606    25037    ingredients ingredients_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_pkey;
       public         postgres    false    200            �
           2606    16679    products products_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (productname);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public         postgres    false    197            �
           2606    16603    recipes recipes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (recipeid);
 >   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_pkey;
       public         postgres    false    196            �
           2606    16700    users users_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (login);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         postgres    false    198            �
           2606    16687    ingredients productname_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT productname_fkey FOREIGN KEY (productname) REFERENCES public.products(productname);
 F   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT productname_fkey;
       public       postgres    false    197    200    2720            �
           2606    16612    ingredients recipeid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT recipeid_fkey FOREIGN KEY (recipeid) REFERENCES public.recipes(recipeid);
 C   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT recipeid_fkey;
       public       postgres    false    200    196    2718            '      x������ � �      &   �  x�eS�n�0<��ಷ�
ې�wًC��1`d�#�!�>F��5�׎��T��f���xf�I�R�K�יa$E���4ɉ��FB�yF�r�R^�J�D-��0��H(���͙�V�2�\/?`2)Y7J�;���_�S�;<<{X���2@��Q��#
�*��i��/[y����_/��RbY�A�Z5R/�H�+�M��_Q;��U��跞�Z���d�l�wq�&��� �^+8�3�58�ӫI!��Q��n��,9�Q�0�{��gE��C!��S�|l�z�ܾ>,^O�p�3:mM������ߤ+F���7���k�̏q�ċ��;��"��J�K������u�ƶ��X���@im&ae���Sr�7�CtZ�fpJ�+{}���V[%���}ڟ�	��DUȒo�Ď!O�_�%߷�"K��"���aQd�dO�G��\���o�{U�;>�)nl�g��	�fy�B�ϱk��ED�%�$I� �       #   @  x�MTM��8^ۧ`3���`�]fSw71`ƀ,[�C<�cdۻt�5_�$jŊD��W_U�Y��+�K������>�_���)U�����Je���:����P'�U�[��=qKhvrıO�P��y{)9�)���z�rm�5�Y��B��$��j��D�#��۳"c
���]�u�h<8ˑ��yr�k�rom?����#�(KY�����qF�3ײ��|��u.RH������
E������%>�D��&�<r�iY߮��ugr�hmm�	S��v6&��������4Q�)騣���\�''B�3�-v�D���0`,Qrڛ}���3��@���'1/��Z�2FB!����cf� &\�i�S=L�6��ߕRZ)9��	���>*�C��x������tc�M;����lG!w��f
gJ��2�W����N�����,��a�!�~�^!S#۾n�AÓ_��Dz�d��H��
��߿'����P�cY�r��w�""�RT����k�`^��[��\��3ݮ���!�x��1:`P����(��s��/tq�k(�y��5(�9r����c{� KD0���@�,F�)�� [Upg�(�o���b2<���?��4R��	�a	
�z�Ʋ�S�،�D,G�����ITq��Q�g�L�n~ǂ�=�����<�W��5ǭ(�ݿ�yh#�t�'`z�"�zU΁�����8����q@Ps:�MK�)xA���7�p��ױ��;�aI)���8w�`b?C�l�s�'A�,��ț�;�ש%0�B�I快ŋ4�q� ~��{��������~�      "   T  x�mSAn�0<S��s���"͹=�h�
��$B�)r�� }C�g�[�u)�v��"������hM����-�"���F��W5=���c�pP�Bop�4N�@�:�sQ�ղ�<[^��U��ξa+w��J|׻{��+D�tOV�f�� b����>���h��}	v�4_���Q��P���x錪�ř1W?��
�P:��3+���Xv�7������B\�7&�k̮U�]s'��(>)�=�H.[d�~=�&�JIU���������籴&nl\D+J��r�:%5:6 �9>T3d��%����5����0��i��i��3k�n�	�ԉHr�M���E����z���"x؆a�6����e���ө�]y��8,�XQxB�$��0=hˏJ�#�[{Sof�3(Ϥ�*\��b`MO�ц�<�Q���L�y���K8p��f�sq�z�kM-V���������y���C�ne�)jԡe��u����@��b7�Uݵ��F|�5o��I���e>a�)i}������xMr�Pl����9�&l����΃f<�H�W���ڏg�B�~��u���Y��`˅,      $   �   x�U�=��0��z|��lNm,[���h&��q��G&Ss+j��H��i����ǎ4T=:�&��5����3\��� {���n5W8WG����&yg9��Fb�����Nu��:3"���~�¯�CG������K
���"-�������`&�;6��T%> �{L��烰�!,2��i�jÕ[n���`	�E�;�/!��GXR     