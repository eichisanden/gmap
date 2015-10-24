'use strict';

var initMap = function () {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.687509, lng: 139.703345},
    scrollwheel: false,
    zoom: 20
  }),
    markers = [],
    infoWindow = new google.maps.InfoWindow();

  var detailShow = function (data) {
    var info = data.row,
        latLng = new google.maps.LatLng(info.lat, info.lng);
    infoWindow.setContent(info.name);
    infoWindow.setPosition(latLng);
    infoWindow.open(map);
  };

  var getDetailInfo = function (id) {
    $.ajax({
      url: '/shops/' + id,
      dataType: 'json',
      data: {},
      type: 'GET'
    }).done(detailShow);
  };

  var placeMarker = function (id, info) {
    var position = new google.maps.LatLng(info.lat, info.lng),
        marker = new google.maps.Marker({
          position: position,
          map: map
        });
    google.maps.event.addListener(marker, 'click', function () {
      getDetailInfo(id);
    })
    marker[id] = marker;
  };

  var showShopsInRange = function (data) {
    var id, i, newLen, shops = [], newStore = [];

    shops = data.rows;
    newLen = shops.length;

    for (i = 0; i < newLen; i++) {
      id = shops[i].id;
      newStore[id] = 1;
    }

    for (id in markers) {
      if (!newStore[id]) {
        markers[id].setMap(null);
        delete markers[id];
      }
    }

    for (i = 0; i < newLen; i++) {
      id = shops[i].id;
      if (!markers[id]) {
        placeMarker(id, shops[i]);
      }
    }
  };

  var getShopsInRange = function () {
    var northEast = map.getBounds().getNorthEast(),
        southWest = map.getBounds().getSouthWest();
    $.ajax({
      url: "/shops",
      dataType: "json",
      data: {
        neLat: northEast.lat(),
        neLng: northEast.lng(),
        swLat: southWest.lat(),
        swLng: southWest.lng()
      },
      type: "GET"
    }).done(showShopsInRange);
  };

  google.maps.event.addListener(map, 'idle', getShopsInRange);
}
