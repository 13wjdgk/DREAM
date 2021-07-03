var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(35.15386803378726, 128.10165993751255), // 지도의 중심좌표(진주) 
        level: 7 // 지도의 확대 레벨 
    }; 

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 편의점 마커가 표시될 좌표 배열입니다
var storePositions = [
    {content: '<div>GS25가좌중앙점</div>', latlng: new kakao.maps.LatLng(35.15600240603645, 128.10773178267726)},
    {content: '<div>>GS25경상대정문점</div>',latlng: new kakao.maps.LatLng(35.15258952858998, 128.10595046718052)},
    {content: '<div>GS25경상대학사점</div>',latlng: new kakao.maps.LatLng(35.15676683031992, 128.1018390546308)},
    {content: '<div>GS25경상의대점</div>',latlng: new kakao.maps.LatLng(35.17761525866964, 128.0934559334509)},
    {content: '<div>GS25과기대학사점</div>',latlng: new kakao.maps.LatLng(35.17892980761595, 128.09495783473628)},
    {content: '<div>GS25국제대기숙사점</div>',latlng: new kakao.maps.LatLng(35.19729768803995, 128.08052868252577)},
    {content: '<div>GS25금산번영점</div>',latlng: new kakao.maps.LatLng(35.2179268165712, 128.14608832182137)},
    {content: '<div>GS25기숙사후문점</div>',latlng: new kakao.maps.LatLng(35.158404142645104, 128.10051711785798)},
    {content: '<div>GS25봉곡사랑점</div>',latlng: new kakao.maps.LatLng(35.19416682149059, 128.07116715244538)},
    {content: '<div>GS25봉곡햇살점</div>',latlng: new kakao.maps.LatLng(35.19581139142863, 128.07994740064038)},
    {content: '<div>GS25봉곡행복점</div>',latlng: new kakao.maps.LatLng(35.19424362142424, 128.07364086850248)},
    {content: '<div>GS25상대한보점</div>',latlng: new kakao.maps.LatLng(35.18194437880328, 128.11483769430774)},
    {content: '<div>GS25상대현대점</div>',latlng: new kakao.maps.LatLng(35.18464714313412, 128.11308945713222)},
    {content: '<div>GS25상평공단점</div>',latlng: new kakao.maps.LatLng(35.170988059317814, 128.11306815351298)},
    {content: '<div>GS25신안들말점</div>',latlng: new kakao.maps.LatLng(35.185104092887315, 128.07376144974916)},
    {content: '<div>GS25신안주공점</div>',latlng: new kakao.maps.LatLng(35.17758805082067, 128.06731752952732)},
    {content: '<div>GS25진주IC점</div>',latlng: new kakao.maps.LatLng(35.176626137091745, 128.11742376969414)},
    {content: '<div>GS25진주MBC점</div>',latlng: new kakao.maps.LatLng(35.16316243510096, 128.10710247944195)},
    {content: '<div>GS25진주개양점</div>',latlng: new kakao.maps.LatLng(35.15963352343042, 128.10659431181463)},
    {content: '<div>GS25진주경상대점</div>',latlng: new kakao.maps.LatLng(35.15775547650414, 128.1052161250116)}
];

// 마트 마커가 표시될 좌표 배열입니다
var martPositions = [ 
    {content: '<div>OK마트 상평점</div>', latlng: new kakao.maps.LatLng(35.17431070028735, 128.10457116869875)},
    {content: '<div>OK수퍼마켓하대점</div>',latlng: new kakao.maps.LatLng(35.19005996161425, 128.11936159939393)},
    {content: '<div>OK할인마트</div>',latlng: new kakao.maps.LatLng(35.16998540911988, 128.05217846028842)},
    {content: '<div>삼전마트</div>',latlng: new kakao.maps.LatLng(35.19984877313252, 128.08452854212396)},
    {content: '<div>필마트</div>',latlng: new kakao.maps.LatLng(35.1956611014077, 128.0704217595862)},
    {content: '<div>가람마트</div>',latlng: new kakao.maps.LatLng(35.17479028874534, 128.09259142236684)},
    {content: '<div>휴마트</div>',latlng: new kakao.maps.LatLng(5.16301871067075, 128.10830152977118)},
    {content: '<div>나들가게굿모닝마트 상평점</div>',latlng: new kakao.maps.LatLng(35.16995870583871, 128.1112284517441)},
    {content: '<div>진주금곡농협</div>',latlng: new kakao.maps.LatLng(35.092048203052094, 128.18739090918933)},
    {content: '<div>세진하나마트</div>',latlng: new kakao.maps.LatLng(35.19567722588272, 128.11525629787207)}
];

// 식당 마커가 표시될 좌표 배열입니다
var restaurantPositions = [
    {content: '<div>땡초김밥하대점</div>', latlng: new kakao.maps.LatLng(35.192950862397694, 128.11952431721062)},
    {content: '<div>달곰김밥호탄점</div>',latlng: new kakao.maps.LatLng(35.16364544927669, 128.1113583241999)},   
    {content: '<div김가네김밥></div>',latlng: new kakao.maps.LatLng(35.16674084622508, 128.16367025410486)},   
    {content: '<div>국수이야기</div>',latlng: new kakao.maps.LatLng(35.18669862315974, 128.1247855877916)},   
    {content: '<div>땡초김밥하대점</div>',latlng: new kakao.maps.LatLng(35.192950862397694, 128.11952431721062)},   
    {content: '<div>만우정</div>',latlng: new kakao.maps.LatLng(35.1127514791243, 128.0934505906454)},   
    {content: '<div>바비큐 보스치킨</div>',latlng: new kakao.maps.LatLng(35.16867126611186, 128.05262614273337)},   
    {content: '<div>삼양콩짜장</div>',latlng: new kakao.maps.LatLng(35.16171536298522, 128.1119313512831)},   
    {content: '<div>용우동</div>',latlng: new kakao.maps.LatLng(35.16378008843582, 128.10737510779262)},   
    {content: '<div>정아네 김밥</div>',latlng: new kakao.maps.LatLng(35.16876841910115, 128.16256243739738)},   
];

// 기타 마커가 표시될 좌표 배열입니다
var othersPositions = [
    {content: '<div>뚜레쥬르호탄점</div>', latlng: new kakao.maps.LatLng(35.16385931088394, 128.1106672777484)},
    {content: '<div>메카커피진주평거점</div>',latlng: new kakao.maps.LatLng(35.17330395514549, 128.06133042685173)},              
    {content: '<div>그남자네꽈배기의곡점</div>',latlng: new kakao.maps.LatLng(35.19845819475191, 128.08218083297322)},              
    {content: '<div>식자재도매유통</div>',latlng: new kakao.maps.LatLng(35.19753044044749, 128.0843574981629)},              
    {content: '<div>우리축산</div>',latlng: new kakao.maps.LatLng(35.18459886799705, 128.08603749005132)},              
    {content: '<div>일신외식산업</div>',latlng: new kakao.maps.LatLng(35.21506818345418, 128.10234630369763)},              
    {content: '<div>정이네정육점</div>',latlng: new kakao.maps.LatLng(35.17155466949604, 128.13135409270495)},              
    {content: '<div>중부농협로컬푸드직매장</div>',latlng: new kakao.maps.LatLng(35.209744044142944, 128.1028144712484)},              
    {content: '<div>진주금산파리바게뜨</div>',latlng: new kakao.maps.LatLng(35.21741754221632, 128.14610128860784)},              
    {content: '<div>메차쿠차호탄점</div>',latlng: new kakao.maps.LatLng(35.163113627828416, 128.1139194147749)},              
];  

var markerImageSrc = 'https://devtalk.kakao.com/uploads/default/original/2X/f/fa6989c66efd4d981cf946ea501d94f068f4b43f.png';  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
    martMarkers = [], // 마트 마커 객체를 가지고 있을 배열입니다
    storeMarkers = [], // 편의점 마커 객체를 가지고 있을 배열입니다
    restaurantMarkers = [], // 식당 마커 객체를 가지고 있을 배열입니다
    othersMarkers = []; // 기타 마커 객체를 가지고 있을 배열입니다.


createStoreMarkers(); // 편의점 마커를 생성하고 편의점 마커 배열에 추가합니다    
createMartMarkers(); // 마트 마커를 생성하고 마트 마커 배열에 추가합니다
createRestaurantMarkers(); // 식당 마커를 생성하고 식당 마커 배열에 추가합니다
createOthersMarkers(); // 기타 마커를 생성하고 기타 마커 배열에 추가합니다  

changeMarker('store'); // 지도에 편의점 마커가 보이도록 설정합니다    


// 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
function createMarkerImage(src, size, options) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;            
}

// 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
function createMarker(position, image) {
    var marker = new kakao.maps.Marker({
        position: position,
        image: image
    });
    
    return marker;  
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}

// -----------------------------------------------------------  
// 편의점 마커를 생성하고 편의점 마커 배열에 추가하는 함수입니다
function createStoreMarkers() {
    for (var i = 0; i < storePositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(22, 35),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(10, 180),    
                spriteSize: new kakao.maps.Size(72, 320) 
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(storePositions[i].latlng, markerImage),  
            infowindow = new kakao.maps.InfoWindow({content: storePositions[i].content });// 인포윈도우에 표시할 내용   

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

        // 생성된 마커를 편의점 마커 배열에 추가합니다
        storeMarkers.push(marker);    
    }        
}


// 편의점 마커들의 지도 표시 여부를 설정하는 함수입니다
function setStoreMarkers(map) {        
    for (var i = 0; i < storeMarkers.length; i++) {  
        storeMarkers[i].setMap(map);
    }        
}

// -----------------------------------------------------------   
// 마트 마커를 생성하고 마트 마커 배열에 추가하는 함수입니다
function createMartMarkers() {
    
    for (var i = 0; i < martPositions.length; i++) {  
        
        var imageSize = new kakao.maps.Size(22, 30),
            imageOptions = {  
                spriteOrigin: new kakao.maps.Point(10, 36),    
                spriteSize: new kakao.maps.Size(72, 320)  
            };     
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(martPositions[i].latlng, markerImage),
            infowindow = new kakao.maps.InfoWindow({content: martPositions[i].content });// 인포윈도우에 표시할 내용   
            
        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        
        // 생성된 마커를 마트 마커 배열에 추가합니다
        martMarkers.push(marker);
    }     
}

// 마트 마커들의 지도 표시 여부를 설정하는 함수입니다
function setMartMarkers(map) {        
    for (var i = 0; i < martMarkers.length; i++) {  
        martMarkers[i].setMap(map);
    }        
}

// -----------------------------------------------------------   
// 식당 마커를 생성하고 식당 마커 배열에 추가하는 함수입니다
function createRestaurantMarkers() {
    for (var i = 0; i < restaurantPositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(22, 32),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(10, 108),    
                spriteSize: new kakao.maps.Size(72, 320)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(restaurantPositions[i].latlng, markerImage),
            infowindow = new kakao.maps.InfoWindow({content: restaurantPositions[i].content });// 인포윈도우에 표시할 내용     

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

        // 생성된 마커를 식당 마커 배열에 추가합니다
        restaurantMarkers.push(marker);        
    }                
}

// 식당 마커들의 지도 표시 여부를 설정하는 함수입니다
function setRestaurantMarkers(map) {        
    for (var i = 0; i < restaurantMarkers.length; i++) {  
        restaurantMarkers[i].setMap(map);
    }        
}

// -----------------------------------------------------------   
// 기타 마커를 생성하고 식당 마커 배열에 추가하는 함수입니다
function createOthersMarkers() {
    for (var i = 0; i < othersPositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(22, 28),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(10, 0),    
                spriteSize: new kakao.maps.Size(72, 320)  
            };      
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(othersPositions[i].latlng, markerImage),
            infowindow = new kakao.maps.InfoWindow({content: othersPositions[i].content });// 인포윈도우에 표시할 내용   
            
        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

        // 생성된 마커를 기타 마커 배열에 추가합니다
        othersMarkers.push(marker);        
    }                
}

// 기타 마커들의 지도 표시 여부를 설정하는 함수입니다
function setOthersMarkers(map) {        
    for (var i = 0; i < othersMarkers.length; i++) {  
        othersMarkers[i].setMap(map);
    }        
}

// -----------------------------------------------------------   
// 카테고리를 클릭했을 때 type에 따라 카테고리의 스타일과 지도에 표시되는 마커를 변경합니다
function changeMarker(type){

    var storeMenu = document.getElementById('storeMenu');
    var martMenu = document.getElementById('martMenu');
    var restaurantMenu = document.getElementById('restaurantMenu');
    var othersMenu = document.getElementById('othersMenu');
    // -----------------------------------------------------------   
    // 편의점 카테고리가 클릭됐을 때
    if (type === 'store') {
    
        // 편의점 카테고리를 선택된 스타일로 변경하고
        storeMenu.className = 'menu_selected';
        
        // 마트와 식당 카테고리는 선택되지 않은 스타일로 바꿉니다
        martMenu.className = '';
        restaurantMenu.className = '';
        othersMenu.className ='';
        
        // 편의점 마커들만 지도에 표시하도록 설정합니다
        setStoreMarkers(map);
        setMartMarkers(null);
        setRestaurantMarkers(null);
        setOthersMarkers(null);
    // -----------------------------------------------------------       
    } else if (type === 'mart') { // 마트 카테고리가 클릭됐을 때
    
        // 마트 카테고리를 선택된 스타일로 변경하고
        storeMenu.className = '';
        martMenu.className = 'menu_selected';
        restaurantMenu.className = '';
        othersMenu.className ='';
        
        // 마트 마커들만 지도에 표시하도록 설정합니다
        setStoreMarkers(null);
        setMartMarkers(map);
        setRestaurantMarkers(null);
        setOthersMarkers(null);
    // -----------------------------------------------------------       
    } else if (type === 'restaurant') { // 식당 카테고리가 클릭됐을 때
     
        // 식당 카테고리를 선택된 스타일로 변경하고
        storeMenu.className = '';
        martMenu.className = '';
        restaurantMenu.className = 'menu_selected';
        othersMenu.className ='';
        
        // 식당 마커들만 지도에 표시하도록 설정합니다
        setStoreMarkers(null);
        setMartMarkers(null);
        setRestaurantMarkers(map);
        setOthersMarkers(null); 
    // -----------------------------------------------------------   
    } else if (type === 'others') { // 기타 카테고리가 클릭됐을 때
     
        // 기타 카테고리를 선택된 스타일로 변경하고
        storeMenu.className = '';
        martMenu.className = '';
        restaurantMenu.className = '';
        othersMenu.className ='menu_selected';
        
        // 기타 마커들만 지도에 표시하도록 설정합니다
        setStoreMarkers(null);
        setMartMarkers(null);
        setRestaurantMarkers(null);
        setOthersMarkers(map);   
    }   
} 
    