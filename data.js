// 創建 flashcardNameMap ---------------------------------;
var mydata = `
[flashcard]	[顯示名稱]
flashcard1	希望
flashcard2	蝴蝶
flashcard3	苦瓜
`;


var textData = `
[class]	[front]	[back]	[audio]	[pinyin]
00百句	你好	你好	k009.mp3	henˋ hooˆ
00百句	先生𠢕早	老師早	k010.mp3	sienˇ senˇ ngauˋ zooˆ
00百句	大家好	大家好	k011.mp3	tai gaˇ hooˆ
00百句	人客好	客人好	k012.mp3	nginˋ kaˊ hooˆ
00百句	歹勢	不好意思	k013.mp3	painnˆ sheˆ
00百句	失禮	對不起	k014.mp3	shidˊ liˆ
00百句	無要緊	沒關係	k015.mp3	moˋ rhioˆ ginˆ
00百句	勞力	謝謝	k016.mp3	looˆ ladˋ
00百句	毋使細義	不必客氣	k021.mp3	m suˆ seˆ ngi
00百句	先生再見	老師再見	k022.mp3	sienˇ senˇ zaiˆ gienˆ
00百句	正來尞	再見	k023.mp3	zhangˆ loiˋ leeu
00百句	你喊作麼个名	你叫什麼名字	k027.mp3	henˋ hemˆ zooˊ bbooˆ gaiˆ miangˋ
00百句	𠊎喊作李東興	我叫做李東興	k028.mp3	ngaiˋ hemˆ zooˊ liˆ dungˇ hinˇ
00百句	你幾多歲	你幾歲	k036.mp3	henˋ giˆ dooˇ seˆ
00百句	𠊎[七歲]	我[七歲]	k037.mp3	ngaiˋ cidˊ seˆ 
00百句	你讀幾多年	你讀幾年級	k049.mp3	henˋ tu giˆ dooˇ nenˋ
00百句	𠊎讀[一年]	我讀[一年級]	k050.mp3	ngaiˋ tu rhidˊ nenˋ 
00百句	佢係哪儕	他是誰	k064.mp3	guiˋ he ni saˋ
00百句	佢係[學校長]	他是[校長]	k065.mp3	guiˋ he hoo hau zhongˆ 
00百句	這係哪儕个	這是誰的	k073.mp3	liaˊ he ni saˋ gaiˆ
00百句	這係[𠊎个]	這是[我的]	k074.mp3	liaˊ he ngaiˋ gaiˆ 
00百句	你有筆無	你有筆嗎	k080.mp3	henˋ rhiuˇ bidˊ moˋ
00百句	𠊎[有]	我[有]	k081.mp3	ngaiˋ rhiuˇ 
00百句	今日拜幾	今天星期幾	k093.mp3	ginˇ ngidˊ baiˆ guiˆ
00百句	今日[拜一]	今天[星期一]	k094.mp3	ginˇ ngidˊ baiˆ rhidˊ 
00百句	這滿幾多點	現在幾點	k103.mp3	liˊ manˆ giˆ dooˇ demˆ
00百句	這滿[九點半]	現在[九點半]	k104.mp3	liˊ manˆ giuˆ demˆ banˆ 
00百句	請[較緊个]	請[快一點]	k110.mp3	ciangˆ kaˆ ginˆ e 
00百句	你仰子來學校	你怎麼來學校的	k120.mp3	henˋ ngiong zuˆ loiˋ hoo hau
00百句	𠊎[坐車]來學校	我[坐車]來學校	k121.mp3	ngaiˋ cooˇ chaˇ loiˋ hoo hau
00百句	你蹛在哪位	你住在哪裡	k131.mp3	henˋ daiˆ da ni bbi
00百句	𠊎蹛在[崙背]	我住在[崙背]	k132.mp3	ngaiˋ daiˆ da lun bueˆ 
00百句	先生在哪位	老師在哪裡	k137.mp3	sienˇ senˇ da ni bbi
00百句	先生在[遐]	老師在[那裡]	k138.mp3	sienˇ senˇ da gaˊ 
00百句	你討去哪位	你要去哪裡	k146.mp3	henˋ tooˆ kuiˆ ni bbi
00百句	𠊎討去[便所]	我要去[側所]	k147.mp3	ngaiˋ tooˆ kuiˆ pen suˆ 
00百句	請到外頭排列	請到外面排隊	k157.mp3	ciangˆ dooˆ nguai teuˋ peˋ liedˋ
00百句	向前䀴齊	向前看齊	k158.mp3	hiongˆ cienˋ ngiangˆ ceˋ
00百句	向前䀴	向前看	k159.mp3	hiongˆ cienˋ ngiangˆ
00百句	齊步行	齊步走	k160.mp3	ceˋ pu hangˋ
00百句	擋恬	停止	k161.mp3	dongˆ diamˇ
00百句	起立	起立	k162.mp3	kiˆ libˋ
00百句	立正	立正	k163.mp3	libˋ zhangˆ
00百句	行禮	敬禮	k164.mp3	hangˋ liˆ
00百句	請坐	請坐	k165.mp3	ciangˆ cooˇ
00百句	請擎手	請舉手	k166.mp3	ciangˆ kiaˋ shiuˆ
00百句	請放落	請放下	k167.mp3	ciangˆ biongˆ loo
00百句	請跍落	請蹲下	k168.mp3	ciangˆ guˋ loo
00百句	請企起來	請站起來	k169.mp3	ciangˆ kiˇ kiˆ loiˋ
00百句	請[過來]	請[過來]	k170.mp3	ciangˆ gooˆ loiˋ 
00百句	請等下	請等一下	k172.mp3	ciangˆ denˆ ha
00百句	你會講客事無	你會說客語嗎	k180.mp3	henˋ bbue gongˆ kaˊ su moˋ
00百句	𠊎[會]講客事	我[會]說客語	k181.mp3	ngaiˋ bbue gongˆ kaˊ su
00百句	這个客事仰子講	這個的客語怎麼說	k186.mp3	liaˊ e kaˊ su ngiong zuˆ gongˆ
00百句	這係麼个意思	這是什麼意思	k187.mp3	liaˊ he bbooˆ gaiˆ rhiˆ suˆ
00百句	你講麼个	你說什麼	k188.mp3	henˋ gongˆ bbooˆ gaiˆ
00百句	請擱講一遍	請再說一次	k189.mp3	ciangˆ gooˊ gongˆ rhidˊ bienˆ
00百句	請較[大聲]	請[大聲]一點	k192.mp3	ciangˆ kaˆ tai shangˇ 
00百句	你討做麼个	你要做什麼	k199.mp3	henˋ tooˆ zooˆ bbooˆ gaiˆ
00百句	𠊎討[寫字]	我要[寫字]	k200.mp3	ngaiˋ tooˆ siaˆ cu 
00百句	你討賞麼个	你要玩什麼	k208.mp3	henˋ tooˆ songˆ bbooˆ gaiˆ
00百句	𠊎討賞[球]	我要玩[球]	k209.mp3	ngaiˋ tooˆ songˆ kiuˋ 
00百句	剪刀、石頭、布	剪刀、石頭、布	k214.mp3	zienˆ dooˇ sha teuˋ buˆ
00百句	𠊎[贏]	我[贏]	k218.mp3	ngaiˋ rhiangˋ 
00百句	四加二係幾多	四加二是多少	k241.mp3	siˆ gaˇ ngi he giˆ dooˇ
00百句	四加二係六	四加二是六	k242.mp3	siˆ gaˇ ngi he liuˊ
00百句	哪個較大	哪個[比較大]	k225.mp3	ni gaiˆ kaˆ tai
00百句	這個[較大]	這個[比較大]	k226.mp3	liˊ gaiˆ kaˆ tai 
00百句	這有幾多個人	這裡有幾個人	k236.mp3	liaˊ rhiuˇ giˆ dooˇ gaiˆ nginˋ
00百句	這有[兩個]人	這裡有[兩個]人	k237.mp3	liaˊ rhiuˇ liongˆ gaiˆ nginˋ
00百句	這係麼个色	這是什麼色	k251.mp3	liaˊ he bbooˆ gaiˆ sedˊ
00百句	這係[紅色]	這是[紅色]	k252.mp3	liaˊ he fungˋ sedˊ 
00百句	這敢係[白色]	這是[白色]嗎	k255.mp3	liaˊ gamˆ he pa sedˊ 
00百句	[毋係]	[不是]	k058.mp3	mˇ he 
00百句	你知無	你知道嗎	k260.mp3	henˋ diˇ moˋ
00百句	𠊎[知]	我[知道]	k261.mp3	ngaiˋ diˇ 
00百句	你會無	你會嗎	k177.mp3	henˋ bbue moˋ
00百句	𠊎[會]	我[會]	k178.mp3	ngaiˋ bbue 
00百句	你寫好吂	你寫好沒	k280.mp3	henˋ siaˆ hooˆ mangˇ
00百句	[好啊]	[好了]	k278.mp3	hooˆ aˆ 
00百句	好無	好嗎	k004.mp3	hooˆ moˋ
00百句	[好]	[好]	k002.mp3	hooˆ 
00百句	你討愛無	你要嗎	k268.mp3	henˋ tooˆ oiˆ moˋ
00百句	𠊎[討愛]	我[要]	k272.mp3	ngai tooˆ oiˆ 
00百句	你討去無	你要去嗎	k271.mp3	henˋ tooˆ kuiˆ moˋ
00百句	𠊎[討]	我[要]	k272.mp3	ngaiˋ tooˆ 
00百句	有影抑無影	真的還是假的	k283.mp3	rhiuˇ rhiangˆ iaˆ moˋ rhiangˆ
00百句	[有影]	[真的]	k281.mp3	rhiuˇ rhiangˆ 
00百句	你食飽吂	你吃飽沒	k284.mp3	henˋ shiedˋ bauˆ mangˇ
00百句	𠊎[猶吂食]	我[還沒吃]	k286.mp3	ngaiˋ iaˋ mangˇ shiedˋ 
00百句	你仰子啊	你怎麼了	k292.mp3	henˋ ngiong zuˆ aˆ
00百句	𠊎[屎肚疾]	我[肚子痛]	k293.mp3	ngaiˋ shiˆ duˆ cidˋ 
00百句	你會熱無	你會熱嗎	k299.mp3	henˋ bbue ngiedˋ moˋ
00百句	𠊎[會熱]	我[會熱]	k300.mp3	ngaiˋ bbue ngiedˋ 
00百句	你感覺仰子	你覺得怎樣	k307.mp3	henˋ gamˆ gooˊ ngiong zuˆ
00百句	𠊎感擱[真歡喜]	我覺得[很高興]	k308.mp3	ngaiˋ gamˆ gooˊ zhinˇ fanˇ hiˆ 
00百句	這[真靚]	這[真美]	k311.mp3	liaˊ zhinˇ ziangˇ 
00百句	擱[試䀴望]	再[試看看]	k317.mp3	gooˊ chiˆ ngiangˆ mong 
00百句	加油	加油	k319.mp3	gaˇ rhiuˋ
00百句	你[真會]	你[真會]	k322.mp3	henˋ zhinˇ bbue 
01問好	你	你	k001.mp3	henˋ
01問好	好	好	k002.mp3	hooˆ
01問好	無好	不好	k003.mp3	moˋ hooˆ
01問好	好無	好嗎	k004.mp3	hooˆ moˋ
01問好	先生	老師	k005.mp3	sienˇ senˇ
01問好	𠢕早	早安	k006.mp3	ngauˋ zooˆ
01問好	大家	大家	k007.mp3	tai gaˇ
01問好	人客	客人	k008.mp3	nginˋ kaˊ
01問好	你好	你好	k009.mp3	henˋ hooˆ
01問好	先生𠢕早	老師早安	k010.mp3	sienˇ senˇ ngauˋ zooˆ
01問好	大家好	大家好	k011.mp3	tai gaˇ hooˆ
01問好	人客好	客人好	k012.mp3	nginˋ kaˊ hooˆ
02禮貌	歹勢	不好意思	k013.mp3	painnˆ sheˆ
02禮貌	失禮	對不起	k014.mp3	shidˊ liˆ
02禮貌	無要緊	沒關係	k015.mp3	moˋ rhioˆ ginˆ
02禮貌	勞力	謝謝	k016.mp3	looˆ ladˋ
02禮貌	毋使	不必	k017.mp3	m suˆ
02禮貌	細義	客氣	k018.mp3	seˆ ngi
02禮貌	來	來	k019.mp3	loiˋ
02禮貌	尞	玩	k020.mp3	leeu
02禮貌	毋使細義	不必客氣	k021.mp3	m suˆ seˆ ngi
02禮貌	先生再見	老師再見	k022.mp3	sienˇ senˇ zaiˆ gienˆ
02禮貌	正來尞	再見；再來玩	k023.mp3	zhangˆ loiˋ leeu
03姓名	喊	叫	k024.mp3	heemˆ
03姓名	麼个	什麼	k025.mp3	bbooˊ gaiˆ
03姓名	名	名字	k026.mp3	miangˋ
03姓名	你喊作麼个名	你叫什麼名字	k027.mp3	henˋ heemˆ zooˊ bbooˊ gaiˆ miangˋ
03姓名	𠊎喊作李東興	我叫做李東興	k028.mp3	ngaiˋ heemˆ zooˊ liˆ dungˇ hinˇ
04年紀	幾多	多少	k029.mp3	giˆ dooˇ
04年紀	七歲	七歲	k030.mp3	cidˊ seˆ
04年紀	八歲	八歲	k031.mp3	beedˊ seˆ
04年紀	九歲	九歲	k032.mp3	giuˆ seˆ
04年紀	十歲	十歲	k033.mp3	shibˋ seˆ
04年紀	十一歲	十一歲	k034.mp3	shibˋ rhidˊ seˆ
04年紀	十二歲	十二歲	k035.mp3	shibˋ ngi seˆ
04年紀	你幾多歲	你幾歲	k036.mp3	henˋ giˆ dooˇ seˆ
04年紀	𠊎七歲	我七歲	k037.mp3	ngaiˋ cidˊ seˆ
04年紀	𠊎八歲	我八歲	k038.mp3	ngaiˋ beedˊ seˆ
04年紀	𠊎九歲	我九歲	k039.mp3	ngaiˋ giuˆ seˆ
04年紀	𠊎十歲	我十歲	k040.mp3	ngaiˋ shibˋ seˆ
04年紀	𠊎十一歲	我十一歲	k041.mp3	ngaiˋ shibˋ rhidˊ seˆ
04年紀	𠊎十二歲	我十二歲	k042.mp3	ngaiˋ shibˋ ngi seˆ
05年級	一年	一年級	k043.mp3	rhidˊ neenˋ
05年級	二年	二年級	k044.mp3	ngi neenˋ
05年級	三年	三年級	k045.mp3	samˇ neenˋ
05年級	四年	四年級	k046.mp3	siˆ neenˋ
05年級	五年	五年級	k047.mp3	mˆ neenˋ
05年級	六年	六年級	k048.mp3	liuˊ neenˋ
05年級	你讀幾多年	你讀幾年級	k049.mp3	henˋ tu giˆ dooˇ neenˋ
05年級	𠊎讀一年	我讀一年級	k050.mp3	ngaiˋ tu rhidˊ neenˋ
05年級	𠊎讀二年	我讀二年級	k051.mp3	ngaiˋ tu ngi neenˋ
05年級	𠊎讀三年	我讀三年級	k052.mp3	ngaiˋ tu samˇ neenˋ
05年級	𠊎讀四年	我讀四年級	k053.mp3	ngaiˋ tu siˆ neenˋ
05年級	𠊎讀五年	我讀五年級	k054.mp3	ngaiˋ tu mˆ neenˋ
05年級	𠊎讀六年	我讀六年級	k055.mp3	ngaiˋ tu liuˊ neenˋ
06身份	佢	他	k056.mp3	guiˋ
06身份	係	是	k057.mp3	he
06身份	毋係	不是	k058.mp3	mˇ he
06身份	哪儕	誰	k059.mp3	ni saˋ
06身份	學校長	校長	k060.mp3	hoo hau zhongˆ
06身份	主任	主任	k061.mp3	zhiˆ rhim
06身份	護士阿姨	護士阿姨	k062.mp3	fu su aˇ rhiˋ
06身份	灶下阿姨	廚房阿姨	k063.mp3	zooˆ haˇ aˇ rhiˋ
06身份	佢係哪儕	他是誰	k064.mp3	guiˋ he ni saˋ
06身份	佢係學校長	他是校長	k065.mp3	guiˋ he hoo hau zhongˆ
06身份	佢係主任	他是主任	k066.mp3	guiˋ he zhiˆ rhim
06身份	佢係護士阿姨	他是護士阿姨	k067.mp3	guiˋ he fu su aˇ rhiˋ
06身份	佢係灶下阿姨	他是廚房阿姨	k068.mp3	guiˋ he zooˆ haˇ aˇ rhiˋ
07擁有	這	這	k069.mp3	liaˊ
07擁有	𠊎个	我的	k070.mp3	ngaiˋ gaiˆ
07擁有	佢个	他的	k071.mp3	guiˋ gaiˆ
07擁有	你个	你的	k072.mp3	henˋ gaiˆ
07擁有	這係哪儕个	這是誰的	k073.mp3	liaˊ he ni saˋ gaiˆ
07擁有	這係𠊎个	這是我的	k074.mp3	liaˊ he ngaiˋ gaiˆ
07擁有	這係佢个	這是他的	k075.mp3	liaˊ he guiˋ gaiˆ
07擁有	這係你个	這是你的	k076.mp3	liaˊ he henˋ gaiˆ
07擁有	有	有	k077.mp3	rhiuˇ
07擁有	無	沒有	k078.mp3	moˋ
07擁有	筆	筆	k079.mp3	bidˊ
07擁有	你有筆無	你有筆嗎	k080.mp3	henˋ rhiuˇ bidˊ moˋ
07擁有	𠊎有	我有	k081.mp3	ngaiˋ rhiuˇ
07擁有	𠊎無	我沒有	k082.mp3	ngaiˋ moˋ
08星期	今日	今天	k083.mp3	ginˇ ngidˊ
08星期	昨日	昨天	k084.mp3	caˇ ngidˊ
08星期	韶日	明天	k085.mp3	shioˋ ngidˊ
08星期	拜一	星期一	k086.mp3	baiˆ rhidˊ
08星期	拜二	星期二	k087.mp3	baiˆ ngi
08星期	拜三	星期三	k088.mp3	baiˆ samˇ
08星期	拜四	星期四	k089.mp3	baiˆ siˆ
08星期	拜五	星期五	k090.mp3	baiˆ mˆ
08星期	拜六	星期六	k091.mp3	baiˆ liuˊ
08星期	禮拜	星期日	k092.mp3	leˆ baiˆ
08星期	今日拜幾	今天星期幾	k093.mp3	ginˇ ngidˊ baiˆ guiˆ
08星期	今日拜一	今天星期一	k094.mp3	ginˇ ngidˊ baiˆ rhidˊ
08星期	今日拜二	今天星期二	k095.mp3	ginˇ ngidˊ baiˆ ngi
08星期	今日拜三	今天星期三	k096.mp3	ginˇ ngidˊ baiˆ samˇ
08星期	今日拜四	今天星期四	k097.mp3	ginˇ ngidˊ baiˆ siˆ
08星期	今日拜五	今天星期五	k098.mp3	ginˇ ngidˊ baiˆ mˆ
09時間	這滿	現在	k099.mp3	liˊ manˆ
09時間	幾多點	幾點	k100.mp3	giˆdooˇ deemˆ
09時間	九點半	九點半	k101.mp3	giuˆ demˆ banˆ
09時間	十點半	十點半	k102.mp3	shibˋ demˆ banˆ
09時間	這滿幾多點	現在幾點	k103.mp3	liˊ manˆ giˆdooˇ deemˆ
09時間	這滿九點半	現在九點半	k104.mp3	liˊ manˆ giuˆ demˆ banˆ
09時間	這滿十點半	現在十點半	k105.mp3	liˊ manˆ shibˋ demˆ banˆ
09時間	請	請	k106.mp3	ciangˆ
09時間	慢	慢	k107.mp3	meen
09時間	緊	快	k108.mp3	ginˆ
09時間	較慢个	慢一點	k109.mp3	kaˆ meen e
09時間	請較緊个	請快一點	k110.mp3	ciangˆ kaˆ ginˆ e
09時間	請較慢个	請慢一點	k111.mp3	ciangˆ kaˆ meen e
10交通	仰子	怎樣	k112.mp3	ngiong zuˆ
10交通	學校	學校	k113.mp3	hoo hau
10交通	行	走	k114.mp3	hangˋ
10交通	騎	騎	k115.mp3	kiˋ
10交通	鐵馬	腳踏車	k116.mp3	teedˊ maˇ
10交通	坐車	坐車	k117.mp3	cooˇ chaˇ
10交通	用行个	用走的	k118.mp3	rhung hangˋ e
10交通	騎鐵馬	騎腳踏車	k119.mp3	kiˋ teedˊ maˇ
10交通	你仰子來學校个	你怎樣來學校的	k120.mp3	henˋ ngiong zuˆ loiˋ hoo hau e
10交通	𠊎坐車來學校	我坐車來學校	k121.mp3	ngaiˋ cooˇ chaˇ loiˋ hoo hau
10交通	𠊎用行个來學校	我用走的來學校	k122.mp3	ngaiˋ rhung hangˋ e loiˋ hoo hau
10交通	𠊎騎鐵馬來學校	我騎腳踏車來學校	k123.mp3	ngaiˋ kiˋ teedˊ maˇ loiˋ hoo hau
11住處	蹛	住	k124.mp3	daiˆ
11住處	在	在	k125.mp3	da
11住處	哪位	哪裡	k126.mp3	ni bbi
11住處	崙背	崙背	k127.mp3	lun bueˆ
11住處	港尾	港尾	k128.mp3	gongˆ muiˇ
11住處	羅屋莊	羅厝	k129.mp3	looˋuˊongˇ
11住處	二崙子	二崙	k130.mp3	ngi lun zuˆ
11住處	你蹛在哪位	你住在哪裡	k131.mp3	henˋ daiˆ da ni bbi
11住處	𠊎蹛在崙背	我住在崙背	k132.mp3	ngaiˋ daiˆ da lun bueˆ
11住處	𠊎蹛在港尾	我住在港尾	k133.mp3	ngaiˋ daiˆ da gongˆ muiˇ
11住處	𠊎蹛在羅屋莊	我住在羅屋莊	k134.mp3	ngaiˋ daiˆ da looˋuˊongˇ
11住處	𠊎蹛在二崙子	我住在二崙	k135.mp3	ngaiˋ daiˆ da ngi lun zuˆ
12去向	遐	那；那裡	k136.mp3	gaˊ
12去向	先生在哪位	老師在哪裡	k137.mp3	sienˇ senˇ da ni bbi
12去向	先生在遐	老師在那裡	k138.mp3	sienˇ senˇ da gaˊ
12去向	先生在這	老師在這裡	k139.mp3	sienˇ senˇ da liaˊ
12去向	討	要；想要	k140.mp3	tooˆ
12去向	便所	廁所	k141.mp3	pen suˆ
12去向	學校坪	操場	k142.mp3	hoo hau piangˋ
12去向	圖書館	圖書館	k143.mp3	tuˋ shiˇ guanˆ
12去向	辦公室	辦公室	k144.mp3	peen gungˇ shidˊ
12去向	健康中心	健康中心	k145.mp3	kien kongˇ zhungˇ simˇ
12去向	你討去哪位	你要去哪裡	k146.mp3	henˋ tooˆ kuiˆ ni bbi
12去向	𠊎討去便所	我要去側所	k147.mp3	ngaiˋ tooˆ kuiˆ pen suˆ
12去向	𠊎討去學校坪	我要去操場	k148.mp3	ngaiˋ tooˆ kuiˆ hoo hau piangˋ
12去向	𠊎討去圖書館	我要去圖書館	k149.mp3	ngaiˋ tooˆ kuiˆ tuˋ shiˇ guanˆ
13排隊	外頭	外面	k150.mp3	nguai teuˋ
13排隊	排列	排隊	k151.mp3	peˋ liedˋ
13排隊	頭前	前面	k152.mp3	teuˋ cienˋ
13排隊	後背	後面	k153.mp3	heu bueˆ
13排隊	䀴	看	k154.mp3	ngiangˆ
13排隊	䀴齊	看齊	k155.mp3	ngiangˆ ceˋ
13排隊	恬	靜止；安靜	k156.mp3	diamˇ
13排隊	請到外頭排列	請到外面排隊	k157.mp3	ciangˆ dooˆ nguai teuˋ peˋ liedˋ
13排隊	向前䀴齊	向前看齊	k158.mp3	hiongˆ cienˋ ngiangˆ ceˋ
13排隊	向前䀴	向前看	k159.mp3	hiongˆ cienˋ ngiangˆ
13排隊	齊步行	齊步走	k160.mp3	ceˋ pu hangˋ
13排隊	擋恬	停止	k161.mp3	dongˆ diamˇ
14動作	起立	起立	k162.mp3	kiˆ libˋ
14動作	立正	立正	k163.mp3	libˋ zhangˆ
14動作	行禮	敬禮	k164.mp3	hangˋ liˆ
14動作	請坐	請坐	k165.mp3	ciangˆ cooˇ
14動作	請擎手	請舉手	k166.mp3	ciangˆ kiaˋ shiuˆ
14動作	請放落	請放下	k167.mp3	ciangˆ biongˆ loo
14動作	請跍落	請蹲下	k168.mp3	ciangˆ guˋ loo
14動作	請企起來	請站起來	k169.mp3	ciangˆ kiˇ kiˆ loiˋ
14動作	請過來	請過來	k170.mp3	ciangˆ gooˆ loiˋ
14動作	請過去	請過去	k171.mp3	ciangˆ gooˆ kuiˆ
14動作	請等下	請等一下	k172.mp3	ciangˆ denˆ ha
15學習	會	會；能夠	k173.mp3	bbue
15學習	毋會	不會	k174.mp3	mˇ bboi
15學習	講	說	k175.mp3	gongˆ
15學習	客事	客語	k176.mp3	kaˊ su
15學習	你會無	你會嗎	k177.mp3	henˋ bbue moˋ
15學習	𠊎會	我會	k178.mp3	ngaiˋ bbue
15學習	𠊎毋會	我不會	k179.mp3	ngaiˋ mˇ bboi
15學習	你會講客事無	你會說客語嗎	k180.mp3	henˋ bbue gongˆ kaˊ su moˋ
15學習	𠊎會講客事	我會說客語	k181.mp3	ngaiˋ bbue gongˆ kaˊ su
15學習	𠊎毋會講客事	我不會說客語	k182.mp3	ngaiˋ mˇ bboi gongˆ kaˊ su
15學習	意思	意思	k183.mp3	rhiˆ suˆ
15學習	擱	再	k184.mp3	gooˊ
15學習	一遍	一遍	k185.mp3	rhidˊ bienˆ
15學習	這个客事仰子講	這個的客語怎麼說	k186.mp3	liaˊ e kaˊ su ngiong zuˆ gongˆ
15學習	這係麼个意思	這是什麼意思	k187.mp3	liaˊ he bbooˊ gaiˆ rhiˆ suˆ
15學習	你講麼个	你說什麼	k188.mp3	henˋ gongˆ bbooˊ gaiˆ
15學習	請擱講一遍	請再說一次	k189.mp3	ciangˆ gooˊ gongˆ rhidˊ bienˆ
15學習	細聲	小聲	k190.mp3	seˆ shangˇ
15學習	大聲	大聲	k191.mp3	tai shangˇ
15學習	請較大聲	請大聲一點	k192.mp3	ciangˆ kaˆ tai shangˇ
15學習	請較細聲	請小聲一點	k193.mp3	ciangˆ kaˆ seˆ shangˇ
16活動	做	做	k194.mp3	zooˆ
16活動	寫字	寫字	k195.mp3	siaˆ cu
16活動	畫圖	畫圖	k196.mp3	fa tuˋ
16活動	䀴書	看書	k197.mp3	ngiangˆ shiˇ
16活動	打電話	打電話	k198.mp3	daˆ teen bba
16活動	你討做麼个	你要做什麼	k199.mp3	henˋ tooˆ zooˆ bbooˊ gaiˆ
16活動	𠊎討寫字	我要寫字	k200.mp3	ngaiˋ tooˆ siaˆ cu
16活動	𠊎討畫圖	我要畫圖	k201.mp3	ngaiˋ tooˆ fa tuˋ
16活動	𠊎討䀴書	我要看書	k202.mp3	ngaiˋ tooˆ ngiangˆ shiˇ
16活動	𠊎討打電話	我要打電話	k203.mp3	ngaiˋ tooˆ daˆ teen bba
16活動	賞	玩(東西)	k204.mp3	songˆ
16活動	球	球	k205.mp3	kiuˋ
16活動	走相捎	賽跑	k206.mp3	zeuˆ siongˇ sauˇ
16活動	大風吹	大風吹	k207.mp3	tai fungˇ cheˇ
16活動	你討賞麼个	你要玩什麼	k208.mp3	henˋ tooˆ songˆ bbooˊ gaiˆ
16活動	𠊎討賞球	我要玩球	k209.mp3	ngaiˋ tooˆ songˆ kiuˋ
16活動	𠊎討賞走相捎	我要玩賽跑	k210.mp3	ngaiˋ tooˆ songˆ zeuˆ siongˇ sauˇ
16活動	𠊎討賞大風吹	我要玩大風吹	k211.mp3	ngaiˋ tooˆ songˆ tai fungˇ cheˇ
17比較	贏	贏	k212.mp3	rhiangˋ
17比較	輸	輸	k213.mp3	shiˇ
17比較	剪刀	剪刀	k214.mp3	zienˆ dooˇ
17比較	石頭	石頭	k215.mp3	sha teuˋ
17比較	布	布	k216.mp3	buˆ
17比較	紙	紙	k217.mp3	zhiˆ
17比較	𠊎贏	我贏	k218.mp3	ngaiˋ rhiangˋ
17比較	𠊎輸	我輸	k219.mp3	ngaiˋ shiˇ
17比較	哪個	哪一個	k220.mp3	ni gaiˆ
17比較	大	大	k221.mp3	tai
17比較	細	細	k222.mp3	seˆ
17比較	較大	比較大	k223.mp3	kaˆ tai
17比較	較細	比較小	k224.mp3	kaˆ seˆ
17比較	哪個較大	哪個比較大	k225.mp3	ni gaiˆ kaˆ tai
17比較	這個較大	這個比較大	k226.mp3	liˊ gaiˆ kaˆ tai
17比較	這個較細	這個比較小	k227.mp3	liˊ gaiˆ kaˆ seˆ
18算數	人	人	k228.mp3	nginˋ
18算數	一個	一個	k229.mp3	rhidˊ gaiˆ
18算數	兩個	兩個	k230.mp3	liongˆ gaiˆ
18算數	三個	三個	k231.mp3	samˇ gaiˆ
18算數	四個	四個	k232.mp3	siˆ gaiˆ
18算數	五個	五個	k233.mp3	mˆ gaiˆ
18算數	加	加	k234.mp3	gaˇ
18算數	減	減	k235.mp3	giamˆ
18算數	這有幾多個人	這裡有幾個人	k236.mp3	liaˊ rhiuˇ giˆ dooˇ gaiˆ nginˋ
18算數	這有兩個人	這裡有兩個人	k237.mp3	liaˊ rhiuˇ liongˆ gaiˆ nginˋ
18算數	這有三個人	這裡有三個人	k238.mp3	liaˊ rhiuˇ samˇ gaiˆ nginˋ
18算數	這有四個人	這裡有四個人	k239.mp3	liaˊ rhiuˇ siˆ gaiˆ nginˋ
18算數	這有五個人	這裡有五個人	k240.mp3	liaˊ rhiuˇ mˆ gaiˆ nginˋ
18算數	四加二係幾多	四加二是多少	k241.mp3	siˆ gaˇ ngi he giˆ dooˇ
18算數	四加二係六	四加二是六	k242.mp3	siˆ gaˇ ngi he liuˊ
19顏色	白色	白色	k243.mp3	pa sedˊ
19顏色	烏色	黑色	k244.mp3	bbuˇ sedˊ
19顏色	紅色	紅色	k245.mp3	fungˋ sedˊ
19顏色	黃色	黃色	k246.mp3	bbongˋ sedˊ
19顏色	青色	藍色	k247.mp3	ciangˇ sedˊ
19顏色	綠豆色	綠色	k248.mp3	liu teu sedˊ
19顏色	柑子色	橘色	k249.mp3	gamˇ zuˆ sedˊ
19顏色	敢係	是…嗎	k250.mp3	gamˆ he
19顏色	這係麼个色	這是什麼色	k251.mp3	liaˊ he bbooˆ gaiˆ sedˊ
19顏色	這係紅色	這是紅色	k252.mp3	liaˊ he fungˋ sedˊ
19顏色	這係柑子色	這是橘色	k253.mp3	liaˊ he gamˇ zuˆ sedˊ
19顏色	這係黃色	這是黃色	k254.mp3	liaˊ he bbongˋ sedˊ
19顏色	這敢係白色	這是白色嗎	k255.mp3	liaˊ gamˆ he pa sedˊ
19顏色	這敢係青色	這是藍色嗎	k256.mp3	liaˊ gamˆ he ciangˇ sedˊ
19顏色	這敢係烏色	這是黑色嗎	k257.mp3	liaˊ gamˆ he bbuˇ sedˊ
20認知	知	知道	k258.mp3	diˇ
20認知	毋知	不知道	k259.mp3	mˇ diˇ
20認知	你知無	你知道嗎	k260.mp3	henˋ diˇ moˋ
20認知	𠊎知	我知道	k261.mp3	ngaiˋ diˇ
20認知	𠊎毋知	我不知道	k262.mp3	ngaiˋ mˇ diˇ
20認知	愛	愛；要；必須	k263.mp3	oiˆ
20認知	無愛	不想要	k264.mp3	moˋ oiˆ
20認知	討愛	想要	k265.mp3	tooˆ oiˆ
20認知	去	去	k266.mp3	kuiˆ
20認知	毋莫	不要	k267.mp3	m maiˆ
20認知	你討愛無	你想要嗎	k268.mp3	henˋ tooˆ oiˆ moˋ
20認知	𠊎討愛	我想要	k269.mp3	ngaiˋ tooˆ oiˆ
20認知	𠊎無愛	我不想要	k270.mp3	ngaiˋ moˋ oiˆ
20認知	你討去無	你要去嗎	k271.mp3	henˋ tooˆ kuiˆ moˋ
20認知	𠊎討	我要	k272.mp3	ngaiˋ tooˆ
20認知	𠊎毋莫	我不要	k273.mp3	ngaiˋ m maiˆ
21關心	寫	寫	k274.mp3	siaˆ
21關心	抑	或	k275.mp3	iaˆ
21關心	食	吃	k276.mp3	shiedˋ
21關心	飽	飽	k277.mp3	bauˆ
21關心	好啊	好了	k278.mp3	hooˆ aˆ
21關心	猶吂	還沒	k279.mp3	iaˋ mangˇ
21關心	你寫好吂	你寫好沒	k280.mp3	henˋ siaˆ hooˆ mangˇ
21關心	有影	真的	k281.mp3	rhiuˇ rhiangˆ
21關心	無影	假的	k282.mp3	moˋ rhiangˆ
21關心	有影抑無影	真的還是假的	k283.mp3	rhiuˇ rhiangˆ iaˆ moˋ rhiangˆ
21關心	你食飽吂	你吃飽沒	k284.mp3	henˋ shiedˋ bauˆ mangˇ
21關心	食飽啊	吃飽了	k285.mp3	shiedˋ bauˆ aˆ
21關心	𠊎猶吂食	我還沒吃	k286.mp3	ngaiˋ iaˋ mangˇ shiedˋ
21關心	𠊎食飽啊	我吃飽了	k287.mp3	ngaiˋ shiedˋ bauˆ aˆ
22健康	屎肚疾	肚子痛	k288.mp3	shiˆ duˆ cidˋ
22健康	手疾	手痛	k289.mp3	shiuˆ cidˋ
22健康	腳疾	腳痛	k290.mp3	gioˊ cidˋ
22健康	牙疾	牙痛	k291.mp3	ngaˋ cidˋ
22健康	你仰子啊	你怎麼了	k292.mp3	henˋ ngiong zuˆ aˆ
22健康	𠊎屎肚疾	我肚子痛	k293.mp3	ngaiˋ shiˆ duˆ cidˋ
22健康	𠊎手疾	我手痛	k294.mp3	ngaiˋ shiuˆ cidˋ
22健康	𠊎腳疾	我腳痛	k295.mp3	ngaiˋ gioˊ cidˋ
22健康	𠊎牙疾	我牙痛	k296.mp3	ngaiˋ ngaˋ cidˋ
22健康	熱	熱	k297.mp3	ngiedˋ
22健康	寒	冷	k298.mp3	honˋ
22健康	你會熱無	你會熱嗎	k299.mp3	henˋ bbue ngiedˋ moˋ
22健康	𠊎會熱	我會熱	k300.mp3	ngaiˋ bbue ngiedˋ
22健康	𠊎毋會熱	我不會熱	k301.mp3	ngaiˋ mˇ bboi ngiedˋ
23感覺	感覺	感覺	k302.mp3	gamˆ gooˊ
23感覺	歡喜	高興	k303.mp3	fanˇ hiˆ
23感覺	無歡喜	不高興	k304.mp3	moˋ fanˇ hiˆ
23感覺	真	很；真	k305.mp3	zhinˇ
23感覺	靚	美；漂亮	k306.mp3	ziangˇ
23感覺	你感覺仰子	你覺得怎樣	k307.mp3	henˋ gamˆ gooˊ ngiong zuˆ
23感覺	𠊎感覺真歡喜	我覺得很高興	k308.mp3	ngaiˋ gamˆ gooˊ zhinˇ fanˇ hiˆ
23感覺	𠊎感覺無歡喜	我覺得不高興	k309.mp3	ngaiˋ gamˆ gooˊ moˋ fanˇ hiˆ
23感覺	真好䀴	真好看	k310.mp3	zhinˇ hooˆ ngiangˆ
23感覺	這真靚	這真美	k311.mp3	liaˊ zhinˇ ziangˇ
23感覺	這真好䀴	這真好看	k312.mp3	liaˊ zhinˇ hooˆ ngiangˆ
24鼓勵	試	試；嘗試	k313.mp3	chiˆ
24鼓勵	一擺	一次	k314.mp3	rhidˊ baiˆ
24鼓勵	試一擺	試一次	k315.mp3	chiˆ rhidˊ baiˆ
24鼓勵	䀴望	看看	k316.mp3	ngiangˆ mong
24鼓勵	擱試䀴望	再試看看	k317.mp3	gooˊ chiˆ ngiangˆ mong
24鼓勵	擱試一擺	再試一次	k318.mp3	gooˊ chiˆ rhidˊ baiˆ
24鼓勵	加油	加油	k319.mp3	gaˇ rhiuˋ
24鼓勵	真𠢕	很行	k320.mp3	zhinˇ ngauˋ
24鼓勵	真厲害	很厲害	k321.mp3	zhinˇ li hoi
24鼓勵	你真會	你真會	k322.mp3	henˋ zhinˇ bbue
24鼓勵	你真𠢕	你很行	k323.mp3	henˋ zhinˇ ngauˋ
24鼓勵	你真厲害	你很厲害	k324.mp3	henˋ zhinˇ li hoi 
`;
