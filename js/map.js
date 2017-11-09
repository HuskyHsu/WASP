(function (window, document, undefined) {

    //WMTS設定
    var streets = L.tileLayer('https://mt{s}.google.com/vt/x={x}&y={y}&z={z}&hl=zh-TW', {
            id : 'streets',
            subdomains : "012",
            attribution : 'Map data: &copy; Google'
        });

    var satellite = L.tileLayer('https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            id : 'topography',
            subdomains : "012",
            attribution : 'Map data: &copy; Google'
        });

    //群組
    var baseMaps = {
        "Google地圖" : streets,
        "Google衛星影像" : satellite
    };

    var geoData = {
        PotentialDanger : {},
        SankuaicuoRiverWeir :   {},
        AutoSite :  {},
        River : {},
        Factory : {},
        Resin : {},
        TaichungGrid : {
            "type": "FeatureCollection",
            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
            "features": [
            { "type": "Feature", "properties": { "name": "三給", "id": 1, "pid": 1 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67533526803595, 24.091991001641496 ], [ 120.67523083173171, 24.091944620503856 ], [ 120.67511510501619, 24.091887932423912 ], [ 120.67495139405277, 24.091813207189318 ], [ 120.67485542555696, 24.091766825987303 ] ] } },
            { "type": "Feature", "properties": { "name": "三給", "id": 2, "pid": 2 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67485471990632, 24.091766825987293 ], [ 120.67475875141054, 24.091725598238078 ], [ 120.67472346887529, 24.091712714563723 ], [ 120.67464443599641, 24.091661179853375 ], [ 120.67454987880201, 24.091603203279444 ], [ 120.67446802332032, 24.091551668525042 ], [ 120.67440874866115, 24.091513017445642 ], [ 120.67434241749491, 24.091491115162142 ] ] } },
            { "type": "Feature", "properties": { "name": "三給", "id": 3, "pid": 3 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67434100619352, 24.091491115162142 ], [ 120.67420410995688, 24.09143442688158 ], [ 120.67410814146108, 24.091394487396119 ], [ 120.6740658024188, 24.09137902694679 ] ] } },
            { "type": "Feature", "properties": { "name": "三給", "id": 5, "pid": 4 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67406368546669, 24.091380315317636 ], [ 120.67396207176526, 24.091323626988043 ], [ 120.67390703101033, 24.091259208401247 ], [ 120.67371227141591, 24.091134236250529 ], [ 120.673501987506, 24.091059510576393 ], [ 120.67347940668347, 24.09104662683508 ] ] } },
            { "type": "Feature", "properties": { "name": "三給", "id": 5, "pid": 5 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67347799538204, 24.091047915209273 ], [ 120.67341448681867, 24.091011840727042 ], [ 120.67321549332003, 24.090825026281578 ], [ 120.67317315427776, 24.090786374983001 ], [ 120.67305883886367, 24.090680728040731 ], [ 120.67299391899886, 24.090615020752207 ] ] } },
            { "type": "Feature", "properties": { "name": "三給", "id": 6, "pid": 6 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67299039074533, 24.090619530077014 ], [ 120.67285208320729, 24.090485538643868 ], [ 120.67280692156218, 24.090439156961299 ], [ 120.67266579142132, 24.090310318866059 ], [ 120.67247808833392, 24.090039758444437 ], [ 120.6723284903846, 24.089834905173579 ] ] } },
            { "type": "Feature", "properties": { "name": "三給", "id": 7, "pid": 7 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67232707908319, 24.089836193560114 ], [ 120.67226639312261, 24.089752448418889 ], [ 120.67226921572544, 24.08967643355102 ], [ 120.67228615134235, 24.089640358682693 ], [ 120.67231296606911, 24.089560478580982 ], [ 120.67235107120716, 24.089461272578877 ], [ 120.67240187805787, 24.089320837977063 ], [ 120.67241881367475, 24.089280897832847 ] ] } },
            { "type": "Feature", "properties": { "name": "三給", "id": 8, "pid": 8 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67241881367475, 24.089280897832847 ], [ 120.67245268490856, 24.089179759024873 ], [ 120.67249079004658, 24.089056717437487 ], [ 120.67249996350574, 24.089027084367377 ], [ 120.67245550751137, 24.088956866847809 ], [ 120.67239976110571, 24.088873121131957 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 1, "pid": 9 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67777609016248, 24.092861085399846 ], [ 120.6776403168796, 24.092747468733052 ], [ 120.67752232343142, 24.09269730030266 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 2, "pid": 10 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67752232343142, 24.09269730030266 ], [ 120.6774916128079, 24.09268106933569 ], [ 120.67724916051709, 24.092623523163478 ], [ 120.6771392488119, 24.092620572077028 ], [ 120.67690366600263, 24.092521710641634 ], [ 120.67676021506391, 24.092431702402752 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 3, "pid": 11 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67675617419246, 24.09243096463004 ], [ 120.67666080962475, 24.092368991707144 ], [ 120.67658969028611, 24.092295214378908 ], [ 120.67648624397536, 24.092194877144351 ], [ 120.67647573770941, 24.092181597210349 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 4, "pid": 12 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67647412136078, 24.092181597210363 ], [ 120.6763868385361, 24.092094539831209 ], [ 120.67623975081301, 24.091723438644806 ], [ 120.67609912848431, 24.09154563431785 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 5, "pid": 13 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67609912848428, 24.091547847649185 ], [ 120.67591486474325, 24.09136487862467 ], [ 120.67569665768148, 24.091158300379778 ], [ 120.67556573344446, 24.091026975465219 ], [ 120.67524569642056, 24.090727436111568 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 6, "pid": 14 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67524408007196, 24.090728911676592 ], [ 120.67509699234886, 24.090584306222453 ], [ 120.67487393624128, 24.090382153426294 ], [ 120.67472523216958, 24.090258205568759 ], [ 120.67456683000624, 24.090125404159775 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 7, "pid": 15 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67456602183192, 24.090123190801798 ], [ 120.67448843709889, 24.090058265617309 ], [ 120.67432518588971, 24.089922512852535 ], [ 120.67419749434988, 24.089816271458051 ], [ 120.67403101044353, 24.089674616128402 ], [ 120.67395827475626, 24.089617068606003 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 8, "pid": 16 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67395665840763, 24.089619281972723 ], [ 120.67392271508692, 24.089591245991404 ], [ 120.67378047640962, 24.089458443891235 ], [ 120.67361399250326, 24.089359580016193 ], [ 120.67357681648532, 24.089330068396912 ], [ 120.67345559033993, 24.089229728840564 ], [ 120.67332304975427, 24.088947892313495 ], [ 120.6730337233539, 24.08891690501353 ], [ 120.67298684924434, 24.088698518115621 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 9, "pid": 17 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67298516349399, 24.088698498378232 ], [ 120.67272320994606, 24.088752440001134 ], [ 120.67254299378337, 24.088808179654265 ], [ 120.67240019955612, 24.08887380856963 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 10, "pid": 18 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67240299087513, 24.088875166039351 ], [ 120.67231182952739, 24.088779029759646 ], [ 120.6721122176108, 24.088766115925541 ], [ 120.67195189937858, 24.088756071831448 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 11, "pid": 19 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67195189937858, 24.088757506702066 ], [ 120.67159668447191, 24.088770420537049 ], [ 120.67121474985989, 24.088585322111342 ], [ 120.67118881602818, 24.088567386203103 ], [ 120.67108272308039, 24.088560929275594 ], [ 120.67070550371044, 24.08839591879433 ], [ 120.67061119886802, 24.088388744420911 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 12, "pid": 20 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.67061434236278, 24.088390179295498 ], [ 120.67045559587795, 24.088375830547317 ], [ 120.67027484492986, 24.088449009146274 ], [ 120.6701176701924, 24.088502099476205 ], [ 120.66990862779157, 24.088566668766781 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 13, "pid": 21 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66990469842312, 24.088567386203163 ], [ 120.66976166941203, 24.088610432378562 ], [ 120.66960292292718, 24.088657783154783 ], [ 120.66953533779007, 24.088677871357611 ], [ 120.66947718313722, 24.08871661288271 ], [ 120.66940488275797, 24.088739570817996 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 14, "pid": 22 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66940173926322, 24.088741005688803 ], [ 120.66929957568388, 24.088732396463648 ], [ 120.66919741210452, 24.088720917495888 ], [ 120.66911725298841, 24.088706568784726 ], [ 120.6689805109668, 24.088676436486065 ], [ 120.66880447526086, 24.08862191135621 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 15, "pid": 24 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66879976001871, 24.088623346228342 ], [ 120.66874946410272, 24.088590344165162 ], [ 120.66868973770246, 24.088507121533311 ], [ 120.66862215256535, 24.088428203470411 ], [ 120.668557710923, 24.088320587851797 ], [ 120.66857185664938, 24.088283281082916 ], [ 120.668582858881, 24.088245974303167 ], [ 120.66862372431272, 24.088197188497887 ], [ 120.6687431771132, 24.088072354146878 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 16, "pid": 25 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66874160536585, 24.088072354146878 ], [ 120.66881547749247, 24.087996305574595 ], [ 120.66888463437694, 24.087915952317104 ], [ 120.66892549980869, 24.087848512937118 ], [ 120.66894278902981, 24.08781120603081 ], [ 120.66896950873519, 24.087750941005371 ], [ 120.66901194591429, 24.087699285246739 ], [ 120.66905595484079, 24.087651934116355 ], [ 120.6690748158093, 24.087628975986245 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 17, "pid": 26 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66907324406189, 24.087633280635945 ], [ 120.66917697938864, 24.08751848992754 ], [ 120.66925871025212, 24.087409438659304 ], [ 120.66939073703159, 24.087274559330769 ], [ 120.66954162477955, 24.087116721638402 ], [ 120.6696139251588, 24.087013409589058 ], [ 120.66970194301177, 24.086780957173549 ], [ 120.66979310435948, 24.086585811610302 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": 18, "pid": 27 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66978996086476, 24.086587246505232 ], [ 120.66985754600188, 24.086448061622054 ], [ 120.66991255715999, 24.086333269852094 ], [ 120.66992670288636, 24.086300267199203 ], [ 120.66994242036012, 24.086264394740766 ], [ 120.66994713560223, 24.086228522272279 ], [ 120.66995499433912, 24.086165386703392 ], [ 120.66997385530762, 24.086069248391009 ], [ 120.66998328579186, 24.086024766460874 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 1, "pid": 28 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66970671983663, 24.089174146940653 ], [ 120.66940730670544, 24.088811875974677 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 2, "pid": 28 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.6694030089093, 24.088741252634588 ], [ 120.66940587410674, 24.088807952456811 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 3, "pid": 29 }, "geometry": { "type": "LineString", "coordinates": [ ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 4, "pid": 30 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66875305678042, 24.088678149339465 ], [ 120.66847513262992, 24.088666378773205 ], [ 120.66831181637657, 24.088607525925685 ], [ 120.66825594502673, 24.088568290679 ], [ 120.66814563492578, 24.08854736520917 ], [ 120.66781327202419, 24.088434890750388 ], [ 120.66741214438433, 24.088374729952832 ], [ 120.66733621665252, 24.088498975047134 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 5, "pid": 31 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66873407484739, 24.088704960069673 ], [ 120.6687519823313, 24.088677822379296 ] ] } },
            { "type": "Feature", "properties": { "name": "二給", "id": null, "pid": "" }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66880104883721, 24.088624854822474 ], [ 120.6687516241816, 24.088677168458968 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 6, "pid": 32 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66733636628403, 24.088499677904917 ], [ 120.66723593474248, 24.088460720649337 ], [ 120.66707834888398, 24.088477722605319 ], [ 120.66686918947175, 24.088438487318871 ], [ 120.66672306440297, 24.088438487318871 ], [ 120.66666719305313, 24.088494724559034 ], [ 120.66663567588144, 24.088531344144002 ], [ 120.66661418690072, 24.088564040193177 ], [ 120.6663147737696, 24.088527420617549 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 7, "pid": 33 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66630904337471, 24.088530036301876 ], [ 120.66624314383387, 24.088523497090968 ], [ 120.66602538882941, 24.088448950063107 ], [ 120.66592653951815, 24.088433255946438 ], [ 120.66569732372396, 24.088387481428565 ], [ 120.66566437395355, 24.088384865741336 ], [ 120.66535063483524, 24.088361324553862 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 8, "pid": 34 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66534633703913, 24.08836328631963 ], [ 120.66517585779219, 24.08836982553871 ], [ 120.66487930985845, 24.088394674568157 ], [ 120.66474607817807, 24.088412984376252 ], [ 120.66463576807712, 24.088335821595869 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 9, "pid": 35 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66463290287965, 24.088343668660404 ], [ 120.66441801307261, 24.088239041093782 ], [ 120.66427761839864, 24.088137029134074 ], [ 120.66408565017102, 24.087930389274575 ], [ 120.66377620884886, 24.087634815225513 ], [ 120.66347822831638, 24.087446484502426 ], [ 120.66341805917041, 24.087485720092563 ], [ 120.66327766449645, 24.08765574084433 ], [ 120.66304844870227, 24.087838839863213 ], [ 120.6629481667923, 24.087906848003616 ], [ 120.6628736716592, 24.087854534052664 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 10, "pid": 36 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66286794126435, 24.087854534052664 ], [ 120.66281636771066, 24.08780745147855 ], [ 120.66266451224701, 24.087878075333229 ], [ 120.66254703915247, 24.087880691030801 ], [ 120.66238945329395, 24.087535418489473 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 11, "pid": 37 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66238945329395, 24.087532802784839 ], [ 120.66189090894159, 24.087595579681011 ], [ 120.66133219544322, 24.087679282161393 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 12, "pid": 38 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66133506064062, 24.087679282161393 ], [ 120.66091960701364, 24.087718517680258 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 13, "pid": 39 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.66091101142139, 24.087718517680258 ], [ 120.66078494273457, 24.087726364782593 ], [ 120.66063881766578, 24.087744674686167 ], [ 120.6605070185841, 24.087765600287046 ], [ 120.6602863983822, 24.087799604381178 ], [ 120.66015746449796, 24.087823145671841 ], [ 120.65995690067805, 24.087844071259909 ], [ 120.65985661876807, 24.087851918354559 ], [ 120.65961594218416, 24.087893769517869 ], [ 120.65936667000798, 24.087935620667515 ], [ 120.65928930967745, 24.087953930541193 ], [ 120.65908015026523, 24.088006244451563 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": 14, "pid": 40 }, "geometry": { "type": "LineString", "coordinates": [ [ 120.65907441987036, 24.088008860146527 ], [ 120.658951216381, 24.088032401398742 ], [ 120.65860166229486, 24.088100409436425 ], [ 120.65825210820871, 24.088016707231084 ] ] } },
            { "type": "Feature", "properties": { "name": "四給", "id": null, "pid": "" }, "geometry": { "type": "LineString", "coordinates": [ ] } }
            ]
            },
        ChanghuaGrid : {
            "type": "FeatureCollection",
            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
            "features": [
            { "type": "Feature", "properties": {"pid": 1}, "geometry": { "type": "LineString", "coordinates": [ [ 120.48777035698276, 24.082695732878967 ], [ 120.48771549832573, 24.082906083910672 ] ] } },
            { "type": "Feature", "properties": {"pid": 2}, "geometry": { "type": "LineString", "coordinates": [ [ 120.4877118410819, 24.082914431166685 ], [ 120.48766795415629, 24.083078037275399 ], [ 120.48760212376787, 24.083303412695425 ] ] } },
            { "type": "Feature", "properties": {"pid": 3}, "geometry": { "type": "LineString", "coordinates": [ [ 120.48759663790214, 24.083316768263444 ], [ 120.48747594885671, 24.083704079130424 ], [ 120.48732234461706, 24.084188216068469 ], [ 120.48717971210881, 24.084648979180184 ], [ 120.48704805133195, 24.085073013333954 ], [ 120.48691639055515, 24.085510401424386 ] ] } },
            { "type": "Feature", "properties": {"pid": 4}, "geometry": { "type": "LineString", "coordinates": [ [ 120.48691273331137, 24.085517079093592 ], [ 120.48678472977832, 24.085927755080917 ] ] } },
            { "type": "Feature", "properties": {"pid": 5}, "geometry": { "type": "LineString", "coordinates": [ [ 120.48678472977834, 24.085931093904694 ], [ 120.48664575451389, 24.086365140254554 ] ] } },
            { "type": "Feature", "properties": {"pid": 6}, "geometry": { "type": "LineString", "coordinates": [ [ 120.48664209727008, 24.086371817879225 ], [ 120.48651409373704, 24.086799185134495 ] ] } },
            { "type": "Feature", "properties": {"pid": 7}, "geometry": { "type": "LineString", "coordinates": [ [ 120.48650677924947, 24.086805862736565 ], [ 120.48641900539825, 24.087092999295859 ], [ 120.48620688525774, 24.087774111352086 ], [ 120.48602676601296, 24.088357143721755 ] ] } },
            { "type": "Feature", "properties": {"pid": 8}, "geometry": { "type": "LineString", "coordinates": [ [ 120.48602585168956, 24.088358395770705 ], [ 120.48596367854496, 24.088562059999102 ], [ 120.48593259197263, 24.088665561368188 ] ] } },
            { "type": "Feature", "properties": {"pid": 9}, "geometry": { "type": "LineString", "coordinates": [ [ 120.48592939188435, 24.088675160281269 ], [ 120.48589830531203, 24.088723572179649 ], [ 120.48585076114263, 24.088785339057928 ], [ 120.48577395902279, 24.088872146512212 ], [ 120.48561121167363, 24.08898232511952 ], [ 120.48550515160338, 24.089062454956252 ], [ 120.48539360566744, 24.089147592852875 ], [ 120.48533326114475, 24.089192665834062 ] ] } },
            { "type": "Feature", "properties": {"pid": 10}, "geometry": { "type": "LineString", "coordinates": [ [ 120.48532777527905, 24.089197673942124 ], [ 120.48511382651665, 24.089352925194376 ], [ 120.48487793429146, 24.089529878005248 ], [ 120.4847225014299, 24.089641725410598 ], [ 120.48439883535353, 24.089885452254272 ], [ 120.48433117634319, 24.089935533055161 ], [ 120.48420134418826, 24.090020670371747 ], [ 120.48414282828743, 24.090042372031625 ], [ 120.48404408270477, 24.090034025239792 ], [ 120.48371858800648, 24.089963912166962 ], [ 120.48330257652415, 24.089878774812693 ] ] } },
            { "type": "Feature", "properties": {"pid": 11}, "geometry": { "type": "LineString", "coordinates": [ [ 120.48328977617079, 24.089879609492883 ], [ 120.4821121436668, 24.089639221365264 ], [ 120.48116857476607, 24.089458929973617 ], [ 120.4807297055099, 24.089358767979761 ], [ 120.48064376028049, 24.089343743673918 ] ] } },
            { "type": "Feature", "properties": {"pid": 12}, "geometry": { "type": "LineString", "coordinates": [ [ 120.48064193165871, 24.089347082408736 ], [ 120.48026889279099, 24.089265283381536 ], [ 120.47997265604309, 24.089208524842196 ], [ 120.47940029738821, 24.089091668946786 ], [ 120.47928326558657, 24.089064959012873 ], [ 120.47924303590474, 24.089061620270737 ] ] } },
            { "type": "Feature", "properties": {"pid": 13}, "geometry": { "type": "LineString", "coordinates": [ [ 120.47921743519817, 24.089054942786209 ], [ 120.47881513838001, 24.08896813545574 ], [ 120.47863959067755, 24.088928070514147 ], [ 120.47835432566109, 24.088928070514147 ], [ 120.47812026205779, 24.088934748005286 ], [ 120.4778423115289, 24.08894810298651 ] ] } },
            { "type": "Feature", "properties": {"pid": 14}, "geometry": { "type": "LineString", "coordinates": [ [ 120.47783133979748, 24.088951441731602 ], [ 120.47729372495868, 24.088978151689183 ], [ 120.47731932566529, 24.089959738768574 ], [ 120.47731566842145, 24.090470561723123 ], [ 120.47731932566529, 24.090964689179494 ], [ 120.47732481153101, 24.091338622204209 ] ] } },
            { "type": "Feature", "properties": {"pid": 15}, "geometry": { "type": "LineString", "coordinates": [ [ 120.47731566842154, 24.091361992982041 ], [ 120.47733029739673, 24.092223370104854 ] ] } },
            { "type": "Feature", "properties": {"pid": 16}, "geometry": { "type": "LineString", "coordinates": [ [ 120.47732298290913, 24.092243402062071 ], [ 120.47734492637194, 24.093291736785691 ], [ 120.47734492637194, 24.093699049237195 ], [ 120.47735224085953, 24.094513670255608 ], [ 120.47735224085953, 24.09499442777053 ] ] } },
            { "type": "Feature", "properties": {"pid": 17}, "geometry": { "type": "LineString", "coordinates": [ [ 120.47735224085956, 24.094999435651349 ], [ 120.47735955534719, 24.095802363419601 ] ] } },
            { "type": "Feature", "properties": {"pid": 18}, "geometry": { "type": "LineString", "coordinates": [ [ 120.47735772672524, 24.095807371269316 ], [ 120.47737235570047, 24.096368249197507 ], [ 120.47737967018804, 24.096725473740772 ], [ 120.47738332743187, 24.096862353909263 ] ] } },
            { "type": "Feature", "properties": {"pid": 19}, "geometry": { "type": "LineString", "coordinates": [ [ 120.47737601294426, 24.096885723679531 ], [ 120.47739795640706, 24.098000790619455 ], [ 120.47733212601867, 24.098141007930877 ], [ 120.47613255005183, 24.09897563160872 ], [ 120.47508630179718, 24.099693592941222 ] ] } },
            { "type": "Feature", "properties": {"pid": 20}, "geometry": { "type": "LineString", "coordinates": [ [ 120.47508033615257, 24.099697182430752 ], [ 120.4747896991082, 24.099896979155481 ] ] } },
            { "type": "Feature", "properties": {"pid": 21}, "geometry": { "type": "LineString", "coordinates": [ [ 120.47477534666159, 24.099910080569149 ], [ 120.47397878587333, 24.100453788055212 ], [ 120.47371326561057, 24.100637206927487 ], [ 120.47329704465817, 24.100931986707604 ], [ 120.47222061116051, 24.101678759114218 ] ] } },
            { "type": "Feature", "properties": {"pid": 22}, "geometry": { "type": "LineString", "coordinates": [ [ 120.47220984682552, 24.10169186034565 ], [ 120.47120517556107, 24.102379673113465 ], [ 120.47037990987955, 24.102982325073853 ] ] } },
            { "type": "Feature", "properties": {"pid": 23}, "geometry": { "type": "LineString", "coordinates": [ [ 120.47035838120961, 24.102995426171933 ], [ 120.46951876308147, 24.103578423679625 ], [ 120.4690738372358, 24.103598075234768 ], [ 120.46841362469058, 24.103657029882111 ], [ 120.46816963309776, 24.103676681425199 ] ] } }
            ]
        }
            
    };


        

    //工廠Icon
    var FactoryIcon = getIcon('css/images/Factory.png');
    //自動測站Icon
    var AutoSiteIcon = getIcon('css/images/AutoSite.png');
    //河水堰Icon
    var WeirIcon = getIcon('css/images/weir.png');
    //樹酯包擺放Icon
    var ResinIcon = getIcon('css/images/Resin2.png');

    //面
    // var PotentialDanger = L.geoJson(geoData.PotentialDanger, {
    //     style: {
    //         "color": "#ff7800",
    //         "weight": 1,
    //         "opacity": 0.4
    //     }
    // });


    // 線
    var TaichungGrid = L.geoJson(geoData.TaichungGrid, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup("網格編號：" + feature.properties.pid.toString());
            layer.pid = feature.properties.pid;
        },
        style: function (feature) {
            return {weight: 7};
        }
    })

    var ChanghuaGrid = L.geoJson(geoData.ChanghuaGrid, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup("網格編號：" + feature.properties.pid.toString());
            layer.pid = feature.properties.pid;
        },
        style: function (feature) {
            return {weight: 7};
        }
    })


    //點
    // var SankuaicuoRiver = setGeoJson(geoData.SankuaicuoRiverWeir, WeirIcon);
    // var AutoSite = setGeoJson(geoData.AutoSite, AutoSiteIcon);
    // var Factory = setGeoJson(geoData.Factory, FactoryIcon);
    // var Resin = setGeoJson(geoData.Resin, ResinIcon);

    var overlayMaps = {
        // "隱患處": PotentialDanger,
        // "溪流": River,

        // "三塊厝支線河水堰": SankuaicuoRiver,
        // "自動測站": AutoSite,
        // "廠商": Factory,
        // "樹酯包擺放": Resin
        "台中詹厝園圳":TaichungGrid,
        "彰化新圳":ChanghuaGrid,
    };

    var map = L.map('map', {
        layers : [streets, TaichungGrid, ChanghuaGrid]
    }).fitBounds([
            [24.07, 120.63],
            [24.1, 120.7]
        ]);

    map.fitBounds(TaichungGrid.getBounds().pad(0.2));

    // var SKCGroup = new L.LayerGroup();
    // var SankuaicuoGridPoint = [];
    // SankuaicuoGridPoint.forEach(function (item, index) {

    //     var circle = L.circle([item[1], item[0]], {
    //             color : 'black',
    //             weight : 2,
    //             fillOpacity : 0,
    //             radius : 50
    //         }); //.bindPopup((index + 1).toString())

    //     circle._index = index;

    //     circle.on("click", function (event) {

    //         SKCGroup.eachLayer(function(circle) {
    //             circle.setStyle({
    //                 color: 'black'
    //             });
    //         });

    //         this.setStyle({ color: 'red' });
    //         vm.site = circle._index;
    //         window.chart.draw(vm.site);

    //         var dx = (data[window.chart.focusIndex][vm.site][vm.type] / data.max[vm.type] * 100) * 3;
    //         d3.select("#colorBar rect").attr("transform", "translate(" + (dx + 23.5) + ", 8)");

    //     });

    //     circle.addTo(SKCGroup);
    // })

    // SKCGroup.addTo(map);

    L.control.layers(baseMaps, overlayMaps).addTo(map);


    //綁定至window
    window.mapObj = new Vue({
        data: {
            map: map,
            TaichungGrid: TaichungGrid,
            ChanghuaGrid: ChanghuaGrid
        }
    })


    //取得Icon
    function getIcon(path) {
        return L.icon({
            iconUrl: path,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -10]
        })
    };

    //設定GeoJson物件
    function setGeoJson(data, icon) {
        return L.geoJson(data, {
            pointToLayer: seticon(icon),
            onEachFeature: onEachFeature
        });
    };

    //設定Icon物件
    function seticon(icon) {
        return function(feature, latlng) {
            return L.marker(latlng, {
                icon: icon
            });
        }
    };

    //綁定POP事件
    function onEachFeature(feature, layer) {
        layer.bindPopup(feature.properties.Name);
        return
    };


})(window, document);