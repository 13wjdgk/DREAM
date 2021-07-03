var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        //center: new kakao.maps.LatLng(37.498004414546934, 127.02770621963765), // 지도의 중심좌표(서울역)
        center: new kakao.maps.LatLng(35.15386803378726, 128.10165993751255), // 지도의 중심좌표(진주) 
        level: 7 // 지도의 확대 레벨 
    }; 

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 카페 마커가 표시될 좌표 배열입니다
var cafePositions = [ 
    {content: '<div>카카오</div>', latlng: new kakao.maps.LatLng(35.15258952858998, 128.10595046718052)},
    {content: '<div>편의점</div>',latlng: new kakao.maps.LatLng(35.15600240603645, 128.10773178267726)}
];

// 식당 마커가 표시될 좌표 배열입니다.
var restaurantPositions = [
    {content: '<div>제주어멍해장국진주하대점</div>', latlng: new kakao.maps.LatLng(35.19284276351207, 128.11890733533602)},
    {content: '<div>바르원앤콩기와</div>', latlng: new kakao.maps.LatLng(35.151044571028805, 128.10511336889562)},
    {content: '<div>김쉐프의족가진주점</div>', latlng: new kakao.maps.LatLng(35.16110809599691, 128.10580566205135)},
    {content: '<div>하동돈가스</div>', latlng: new kakao.maps.LatLng(35.15339077457376, 128.10778285410518)},
    {content: '<div>홍콩반점 진주경상대점</div>', latlng: new kakao.maps.LatLng(35.15302153195407, 128.1059403773905)},
    {content: '<div>피자마루 과기대점</div>', latlng: new kakao.maps.LatLng(35.17928676443894, 128.09577665411726)},
    {content: '<div>중앙집</div>', latlng: new kakao.maps.LatLng(35.19238561483052, 128.08601952343753)},
    {content: '<div>명륜진사갈비 진주신안점</div>', latlng: new kakao.maps.LatLng(35.18154248480586, 128.0656486774038)},
    {content: '<div>진돈</div>', latlng: new kakao.maps.LatLng(35.17246678999478, 128.06083724671365)},
    {content: '<div>우리집</div>', latlng: new kakao.maps.LatLng(35.21993146105499, 128.1421537123474)}   
];

// 기타 마커가 표시될 좌표 배열입니다
var othersPositions = [
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
    