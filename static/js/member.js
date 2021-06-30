var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(37.498004414546934, 127.02770621963765), // 지도의 중심좌표
        //center: new kakao.maps.LatLng(35.15386803378726, 128.10165993751255), // 지도의 중심좌표 
        level: 4 // 지도의 확대 레벨 
    }; 

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 편의점 마커가 표시될 좌표 배열입니다
var storePositions = [
    new kakao.maps.LatLng(37.497535461505684, 127.02948149502778),
    new kakao.maps.LatLng(37.49671536281186, 127.03020491448352),
    new kakao.maps.LatLng(37.496201943633714, 127.02959405469642),
    new kakao.maps.LatLng(37.49640072567703, 127.02726459882308),
    new kakao.maps.LatLng(37.49640098874988, 127.02609983175294),
    new kakao.maps.LatLng(37.49932849491523, 127.02935780247945),
    new kakao.maps.LatLng(37.49996818951873, 127.02943721562295)
];

// 마트 마커가 표시될 좌표 배열입니다
var martPositions = [ 
    new kakao.maps.LatLng(37.499590490909185, 127.0263723554437),
    new kakao.maps.LatLng(37.499427948430814, 127.02794423197847),
    new kakao.maps.LatLng(37.498553760499505, 127.02882598822454),
    new kakao.maps.LatLng(37.497625593121384, 127.02935713582038),
    new kakao.maps.LatLng(37.49646391248451, 127.02675574250912),
    new kakao.maps.LatLng(37.49629291770947, 127.02587362608637),
    new kakao.maps.LatLng(37.49754540521486, 127.02546694890695)                
];

// 식당 마커가 표시될 좌표 배열입니다
var restaurantPositions = [
    new kakao.maps.LatLng(37.49966168796031, 127.03007039430118),
    new kakao.maps.LatLng(37.499463762912974, 127.0288828824399),
    new kakao.maps.LatLng(37.49896834100913, 127.02833986892401),
    new kakao.maps.LatLng(37.49893267508434, 127.02673400572665),
    new kakao.maps.LatLng(37.49872543597439, 127.02676785815386),
    new kakao.maps.LatLng(37.49813096097184, 127.02591949495914),
    new kakao.maps.LatLng(37.497680616783086, 127.02518427952202)                       
];

// 기타 마커가 표시될 좌표 배열입니다
var othersPositions = [
    new kakao.maps.LatLng(37.49966168796031, 127.03007039430118),
    new kakao.maps.LatLng(37.499463762912974, 127.0288828824399),
    new kakao.maps.LatLng(37.49896834100913, 127.02833986892401),
    new kakao.maps.LatLng(37.49893267508434, 127.02673400572665),
    new kakao.maps.LatLng(37.49872543597439, 127.02676785815386),
    new kakao.maps.LatLng(37.49813096097184, 127.02591949495914),
    new kakao.maps.LatLng(37.497680616783086, 127.02518427952202)                       
];  

// 마커이미지의 주소입니다. 스프라이트 이미지 입니다
var storeImageSrc = 'https://image.flaticon.com/icons/png/512/3225/3225183.png';
    storeMarkers = []; // 편의점 마커 객체를 가지고 있을 배열입니다

var martImageSrc ='https://image.flaticon.com/icons/png/512/891/891462.png';
    martMarkers = []; // 마트 마커 객체를 가지고 있을 배열입니다

var restaurantImageSrc ='https://image.flaticon.com/icons/png/512/3170/3170733.png';
    restaurantMarkers = []; // 식당 마커 객체를 가지고 있을 배열입니다 

var othersImageSrc ='https://image.flaticon.com/icons/png/512/787/787535.png';
    othersMarkers = []; // 기타 마커 객체를 가지고 있을 배열입니다


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

// -----------------------------------------------------------   
// 편의점 마커를 생성하고 편의점 마커 배열에 추가하는 함수입니다
function createStoreMarkers() {
    for (var i = 0; i < storePositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(10, 0),    
                spriteSize: new kakao.maps.Size(36, 98),  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(storeImageSrc, imageSize, imageOptions),    
            marker = createMarker(storePositions[i], markerImage);  

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
        
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {  
                spriteOrigin: new kakao.maps.Point(10, 36),    
                spriteSize: new kakao.maps.Size(36, 98)  
            };     
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(martImageSrc, imageSize, imageOptions),    
            marker = createMarker(martPositions[i], markerImage);  
        
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
        
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(10, 72),    
                spriteSize: new kakao.maps.Size(36, 98)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(restaurantImageSrc, imageSize, imageOptions),    
            marker = createMarker(restaurantPositions[i], markerImage);  

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
        
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(10, 108),    
                spriteSize: new kakao.maps.Size(36, 98)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(othersImageSrc, imageSize, imageOptions),    
            marker = createMarker(othersPositions[i], markerImage);  

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
        othersMenu.clssName ='';
        
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
        othersMenu.clssName ='';
        
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
        othersMenu.clssName ='';
        
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
        othersMenu.clssName ='menu_selected';
        
        // 기타 마커들만 지도에 표시하도록 설정합니다
        setStoreMarkers(null);
        setMartMarkers(null);
        setRestaurantMarkers(null);
        setOthersMarkers(map);   
    }   
} 
    