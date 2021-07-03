var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        //center: new kakao.maps.LatLng(37.498004414546934, 127.02770621963765), // 지도의 중심좌표(서울역)
        center: new kakao.maps.LatLng(35.15386803378726, 128.10165993751255), // 지도의 중심좌표(진주) 
        level: 7 // 지도의 확대 레벨 
    }; 

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 카페 마커가 표시될 좌표 배열입니다
var cafePositions = [ 
    {content: '<div>샐러든</div>', latlng: new kakao.maps.LatLng(35.18269988915387, 128.09121289510216)},
    {content: '<div>카페달달</div>', latlng: new kakao.maps.LatLng(35.154918294976554, 128.10823138154797)},
    {content: '<div>빵사부 식빵공방</div>', latlng: new kakao.maps.LatLng(35.17178578726035, 128.0604621698047)},
    {content: '<div>카페미아토</div>', latlng: new kakao.maps.LatLng(35.1856420615009, 128.15709761177294)},
];

// 식당 마커가 표시될 좌표 배열입니다
var restaurantPositions = [
    {content: '<div>땡초김밥하대점</div>', latlng: new kakao.maps.LatLng(35.192950862397694, 128.11952431721062)},
    {content: '<div>김쉐프의 족가 진주점</div>', latlng: new kakao.maps.LatLng(35.16019618031902, 128.10579698105707)},
    {content: '<div>바르원 앤 콩기와</div>', latlng: new kakao.maps.LatLng(35.151199453740844, 128.10520748093705)},
    {content: '<div>홍콩반점 경상대점</div>', latlng: new kakao.maps.LatLng(35.15231848428394, 128.105904846464)},
    {content: '<div>하동돈가스</div>', latlng: new kakao.maps.LatLng(35.1527703242942, 128.10752656093777)},
    {content: '<div>명륜진사갈비 신안점ㄴ</div>', latlng: new kakao.maps.LatLng(35.180803277123836, 128.0656123161934)},
    {content: '<div>진돈</div>', latlng: new kakao.maps.LatLng(35.171437376563766, 128.0608842069717)},
    {content: '<div>중앙집</div>', latlng: new kakao.maps.LatLng(35.19170992272867, 128.0858634635384)},
    {content: '<div>피자마루과기대점</div>', latlng: new kakao.maps.LatLng(35.17879762719946, 128.09553375798626)},
    {content: '<div>우리집</div>', latlng: new kakao.maps.LatLng(35.21524824224248, 128.1407910179339)},
];

// 기타 마커가 표시될 좌표 배열입니다
var othersPositions = [
    {content: '<div>피아노하우스 진주지사</div>', latlng: new kakao.maps.LatLng(35.193360069682164, 128.0714340691342)},
    {content: '<div>리하벨헤어</div>', latlng: new kakao.maps.LatLng(35.19185777242459, 128.12224041501963)},
    {content: '<div>동네미장</div>', latlng: new kakao.maps.LatLng(35.181390939790404, 128.1148546791592)},
    {content: '<div>퀸즈</div>', latlng: new kakao.maps.LatLng(35.17477997935662, 128.10101065414284)},
    {content: '<div>과일가게</div>', latlng: new kakao.maps.LatLng(35.199244058880474, 128.11385897201646)},
];  

var markerImageSrc = 'https://devtalk.kakao.com/uploads/default/original/2X/f/fa6989c66efd4d981cf946ea501d94f068f4b43f.png';  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
    cafeMarkers = [], // 카페 마커 객체를 가지고 있을 배열입니다
    restaurantMarkers = [], // 식당 마커 객체를 가지고 있을 배열입니다
    othersMarkers = []; // 기타 마커 객체를 가지고 있을 배열입니다.


createCafeMarkers(); // 카페 마커를 생성하고 마트 마커 배열에 추가합니다
createRestaurantMarkers(); // 식당 마커를 생성하고 식당 마커 배열에 추가합니다
createOthersMarkers(); // 기타 마커를 생성하고 기타 마커 배열에 추가합니다  

changeMarker('restaurant'); // 지도에 편의점 마커가 보이도록 설정합니다    


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
// 카페 마커를 생성하고 마트 마커 배열에 추가하는 함수입니다
function createCafeMarkers() {
    
    for (var i = 0; i < cafePositions.length; i++) {  
        
        var imageSize = new kakao.maps.Size(22, 30),
            imageOptions = {  
                spriteOrigin: new kakao.maps.Point(10, 144),    
                spriteSize: new kakao.maps.Size(72,320)  
            };     
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(cafePositions[i].latlng, markerImage),
            infowindow = new kakao.maps.InfoWindow({content: cafePositions[i].content });// 인포윈도우에 표시할 내용   
            
        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        
        // 생성된 마커를 마트 마커 배열에 추가합니다
        cafeMarkers.push(marker);
    }     
}

// 카페 마커들의 지도 표시 여부를 설정하는 함수입니다
function setCafeMarkers(map) {        
    for (var i = 0; i < cafeMarkers.length; i++) {  
        cafeMarkers[i].setMap(map);
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

    var cafeMenu = document.getElementById('cafeMenu');
    var restaurantMenu = document.getElementById('restaurantMenu');
    var othersMenu = document.getElementById('othersMenu');
    // -----------------------------------------------------------   
    // 편의점 카테고리가 클릭됐을 때
    if (type === 'cafe') {
    
        // 편의점 카테고리를 선택된 스타일로 변경하고
        cafeMenu.className = 'menu_selected';
        
        // 마트와 식당 카테고리는 선택되지 않은 스타일로 바꿉니다
        restaurantMenu.className = '';
        othersMenu.className ='';
        
        // 편의점 마커들만 지도에 표시하도록 설정합니다
        setCafeMarkers(map);
        setRestaurantMarkers(null);
        setOthersMarkers(null);
    // -----------------------------------------------------------       
    } else if (type === 'restaurant') { // 식당 카테고리가 클릭됐을 때
     
        // 식당 카테고리를 선택된 스타일로 변경하고
        cafeMenu.className = '';
        restaurantMenu.className = 'menu_selected';
        othersMenu.className ='';
        
        // 식당 마커들만 지도에 표시하도록 설정합니다
        setCafeMarkers(null);
        setRestaurantMarkers(map);
        setOthersMarkers(null); 
    // -----------------------------------------------------------   
    } else if (type === 'others') { // 기타 카테고리가 클릭됐을 때
     
        // 기타 카테고리를 선택된 스타일로 변경하고
        cafeMenu.className = '';
        restaurantMenu.className = '';
        othersMenu.className ='menu_selected';
        
        // 기타 마커들만 지도에 표시하도록 설정합니다
        setCafeMarkers(null);
        setRestaurantMarkers(null);
        setOthersMarkers(map);   
    }   
} 
    