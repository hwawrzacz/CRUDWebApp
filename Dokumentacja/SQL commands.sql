-- add users to database
INSERT INTO public.users(
	login, "firstName", "lastName", "password", "isActive")
	VALUES 	
	('hubwaw', 'Hubert', 	'Wawrzocz', 	'qwertyuiop',	 true),
	('zanmie', 'Zaneta', 	'Mielczuch', 	'poiuytrewq',	 true),
	('szylip', 'Szymon',	'Lipioc', 		'zaq12wsx',	     true),
	('adacze', 'Adam', 		'Czerwonski', 	'xsw21qaz',	     true),
	('jakkar', 'Jakub', 	'Karmonski', 	'ZAQ12WSX',	     true),
	('tomkam', 'Tomasz', 	'Kamonski', 	'XSW21QAZ',	     true);


-- add a new user 
INSERT INTO public.users(
	login, "firstName", "lastName", "password", "isActive")
	VALUES 	
	(@login, @firstName, @lastName, @password, true);
	
	
-- check if user can be logged in
SELECT login
FROM public.users
WHERE login = @login and password = @password;


-- deactivate user's account
UPDATE public.users
SET isActive = false
WHERE login = @login;


-- activate user's account
UPDATE public.users
SET isActive = true
WHERE login = @login;


-- check if selected user has admin permission
SELECT login
FROM public.admins
WHERE login = @login;




INSERT INTO public.products(
	name, protein, carbs, fat, kcal)
	VALUES 
	('mleko 3,2%', 10, 10, 30, 150),
	('mleko 2%', 10, 10, 20, 130),
	('mleko 1,5%', 10, 10, 10, 110),
	('mąka pszenna', 2, 60, 20, 170),
	
	('chleb żytni', 12, 23, 11, 240),
	('chleb pszenny', 10, 21, 19, 280),
	('ananas', 1, 24, 43, 150),
	('pierś z kurczaka', 20, 20, 20, 210),
	('pierś z indyka', 20, 20, 10, 190),
	('nóżki indycze', 25, 20, 5, 179),
	('schab', 15, 30, 12, 240),
	
	('pomidor', 2, 12, 1, 18),
	('ogórek', 2, 32, 3, 20),
	('papryka', 4, 43, 2, 30),
	('ziemniak', 1, 42, 2, 77),
	('bakłażan', 9, 63, 3, 43),
	('marchew', 5, 34, 6, 12),
	('kukurydza', 9, 56, 5, 54),
	('groszek', 7, 54, 4, 34),
	('fasola', 6, 43, 3, 23),
	('bób', 5, 30, 2, 67),
	('soczewica', 7, 3, 4, 65),
	('seler', 5, 30, 3, 54),
	('brokuł', 9 30, 3, 21),
	('kalafior', 7, 34, 2, 32),
	('sałata', 5, 43, 2, 23),
	
	('czosnek', 5, 17, 2, 21),
	('szczypiorek', 5, 34, 2, 22),
	('natka piertuszki', 5, 22, 2, 13),
	('cebula', 5, 23, 1, 23),
	('oregano', 5, 11, 2, 13),
	('curry', 5, 21, 2, 18),
	('przyprawa do ziemniaków', 5, 34, 2, 16),
	('pieprz', 3, 12, 2, 13),
	
	('majonez', 20, 43, 2, 654),
	('keczup', 5, 43, 2, 123),
	('musztarda francuska', 5, 43, 2, 66),
	('musztarda stołowa', 5, 43, 2, 70),
	('chrzan tarty', 5, 43, 2, 106),
	('imbir', 4, 43, 6, 77);
	
	
INSERT INTO public.products(
	name, protein, carbs, fat, kcal)
	VALUES 
	('woda', 0, 0, 0, 0),	
	('burak', 1, 35, 5, 60),	
	('mięso mielone', 10, 30, 9, 230),	
	('olej', 0, 12, 87, 886),	
	('bazylia', 2, 32, 2, 30),		
	('kminek', 1, 43, 1, 12),	
	('sól', 1, 2, 1, 0),	
	
	('proszek do pieczenia', 1, 32, 0, 23),	
	('cukier', 1, 45, 0, 340),	
	('jajko', 10, 76, 5, 150),	
	('smietana', 12, 68, 9, 195),	
	('bułka tarta', 3, 78, 1, 380),
	('masło', 3, 7, 82, 780),
	('chleb tostowy', 3, 82, 7, 350),
	('szynka', 15, 50, 9, 350);
	
	
	
INSERT INTO public.recipes(
	recipeid, name, description, type)
	VALUES 
	(1, 'Kotlet mielony z burakami', 'Mięso przyprawic, usmażyć itd...', 'Obiad'),
	(2, 'Naleśniki', 'Składniki zmiksowac i usmazyć', 'Obiad'),
	(3, 'Kotlet schabowy burakami', 'Mięso uklepać, opanierować i usmażyć','Obiad'),
	(4, 'Tosty z szynką', 'Składniki ułożyć, rozpoczać obrobkę termiczna przy użyciu tostera', 'Śniadanie');
	
	
	
INSERT INTO public."productLists"(
	recipeid, productname, amount, unit)
	VALUES 
	(1, 'mięso mielone', 500, 'g'),	
	(1, 'ziemniak', 500, 'g'),	
	(1, 'burak', 300, 'g'),	
	(1, 'olej', 50, 'łyżka stołowa'),	
	(1, 'ocet', 10, 'łyżka stołowa'),	
	(1, 'sól', 5, 'łyżeczka'),	
	(1, 'pieprz', 5, 'łyżeczka'),	
	(1, 'oregano', 10, 'szczypta'),	
	(1, 'bazylia', 5, 'szczypta'),	
	(1, 'kminek', 5, 'szczypta');
	
	
INSERT INTO public."productLists"(
	recipeid, productname, amount, unit)
	VALUES 
	(2, 'mleko 3,2%', 500, 'szklanka'),	
	(2, 'woda', 500, 'szklanka'),	
	(2, 'mąka pszenna', 500, 'g'),	
	(2, 'jajko', 100, 'g'),	
	(2, 'cukier', 50, 'łyżka stołowa'),	
	(2, 'proszek do pieczenia', 5, 'łyżeczka'),	
	(2, 'sól', 5, 'łyżeczka');
	
	

INSERT INTO public."productLists"(
	recipeid, productname, amount, unit)
	VALUES 
	(3, 'schab', 500, 'g'),	
	(3, 'jajko', 100, 'g'),	
	(3, 'mąka pszenna', 100, 'g'),	
	(3, 'bułka tarta', 100, 'g'),	
	(3, 'ogórek', 300, 'g'),	
	(3, 'śmietana', 100, 'g'),	
	(3, 'olej', 50, 'łyżka stołowa'),	
	(3, 'ziemniak', 500, 'g'),	
	(3, 'sól', 5, 'łyżeczka'),	
	(3, 'pieprz', 5, 'łyżeczka');
	
	
	
INSERT INTO public."productLists"(
	recipeid, productname, amount, unit)
	VALUES 
	(4, 'chleb tostowy', 500, 'g'),	
	(4, 'szynka', 100, 'g'),	
	(4, 'ser', 100, 'g'),	
	(4, 'cebula', 30, 'g'),	
	(4, 'masło', 20, 'g');
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	