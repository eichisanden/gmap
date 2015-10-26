'use strict';

/* global google */
/* exported initMap */

var initMap = function () {
  var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 35.7873716, lng: 139.6092485},
      scrollwheel: false,
      zoom: 16
    }),
    markers = [],
    infoWindow = new google.maps.InfoWindow();

  var detailShow = function (data) {
    var info = data.row,
      latLng = new google.maps.LatLng(info.location.coordinate.latitude, info.location.coordinate.longitude);
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
    var position = new google.maps.LatLng(info.location.coordinate.latitude, info.location.coordinate.longitude),
      marker = new google.maps.Marker({
        position: position,
        map: map
      });
    google.maps.event.addListener(marker, 'click', function () {
      getDetailInfo(id);
    });
    marker[id] = marker;
    console.table(info);
    $('div#shops').append('<p><a href="' + info.url +'" target="_blank">' + info.name + '</a><img src="' + info.rating_img_url + '"></p><p>' + info.snippet_text + '</p>');
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
      url: '/shops',
      dataType: 'json',
      data: {
        neLat: northEast.lat(),
        neLng: northEast.lng(),
        swLat: southWest.lat(),
        swLng: southWest.lng()
      },
      type: 'GET'
    }).done(showShopsInRange);
  };

  google.maps.event.addListener(map, 'idle', getShopsInRange);
};
