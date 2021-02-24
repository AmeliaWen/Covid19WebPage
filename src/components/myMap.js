import React from 'react';
import 'ol/ol.css';
import Maps from 'ol/Map';
import Vector from 'ol/layer/Vector';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VecS from 'ol/source/Vector';
import View from 'ol/View';
import Feature from 'ol/Feature';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Polygon from 'ol/geom/Polygon';
import Fill from 'ol/style/Fill';
import  Select  from 'ol/interaction/Select';
import {connect} from 'dva';
import {getCenter} from 'ol/extent';
//import {getExtent} from'ol/geom/Geometry';

//import intersectsCoordinate from
import {intersectsCoordinate} from'ol/geom/Geometry';

import Image from 'ol/layer/Image';
import ImageCanvas from 'ol/source/ImageCanvas';
import {containsCoordinate} from 'ol/extent';
//import 'text/javascript';
//import GradCircle from
//import {getLayer} from 'ol/'
//import styles from '../pages/map.css';
import Overlay from 'ol/Overlay';
//import Con from 'ol/control';
import {defaults} from 'ol/control';
import { click, pointerMove, altKeyOnly, doubleClick } from 'ol/events/condition';
//import Pro from  'ol/proj';
import {addLayer} from 'ol/Map';
import { fromLonLat } from 'ol/proj';
import {transformExtent} from 'ol/proj';
import {transform} from 'ol/proj';
import {setStyle} from 'ol/Feature';
import axios from 'axios';
import * as ol from 'ol';
import 'ol/ol.css';
import {unByKey} from 'ol/Observable';
import {easeOut} from 'ol/easing';
import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Stroke, Style} from 'ol/style';
import {getVectorContext} from 'ol/render';
import styles from './myMap.less'
import { Button } from 'antd';

function styleFunction(feature, isSelect) {

    let _name="",
      _color="#FFBBFF";
    if(isSelect==true)
    {
      _name=feature.get("NAME");
      _color= 'rgba(255, 255, 255, 1)';
    }
    _name=this.map.getView().getZoom()>4?_name:"";
    feature.setStyle(
      new Style({
        fill: new Fill({ //矢量图层填充颜色，以及透明度
          color:_color
        })
      })
    )

}

@connect(({  maps}) => ({
  maps
}))
//let map= null;
class index extends React.Component {
constructor(props) {
  super(props);
  this.map = null;
  this.pos = 0;
  this.overlay = null;
  this.content = null;
  this.data=null;
}

newlayer= null;
  //map=null;
  //let arr = new Array();
  addProvince(geo =[]){
      if (geo.length == 0) {
        return false;
      }
      let features = [];
      //geo.forEach(g => {
      for (let j =0;j<geo.features.length;j++){
        let lineData = geo.features[j];
        let routeFeature = "";
        console.log(lineData);
        if (lineData.geometry.type == "MultiPolygon") {
          let geometry = new MultiPolygon(lineData.geometry.coordinates);
          geometry = geometry.transform('EPSG:4326','EPSG:3857');
          routeFeature = new Feature({
            geometry: geometry,
          });
          routeFeature.setStyle(new Style({
            stroke: new Stroke({
              width: 2,
              color: 'rgba(122, 197, 205, 1)'
            }),
            fill: new Fill({
              color: 'rgba(42,55,86,0.3)'
            })

          }));
        } else if (lineData.geometry.type == "Polygon") {
          routeFeature = new Feature({
            geometry: new Polygon(lineData.geometry.coordinates),
            style: new Style({
              stroke: new Stroke({
                width: 5,
                color: (255,255,255,0)
              }),
              fill: new Fill({
                color: 'rgba(42,55,86,0.3)'
              })
            }),

          });
        }

        features.push(routeFeature);

      }
      console.log(features)
      let routeLayer = new Vector({
        source: new VecS({
          features: features
        })
      });
      return routeLayer;
  }

  //let dict=new Array();
  addArea(geo=[], dict){

    if (geo.length == 0) {
      return false;
    }
    let features = [];
    //geo.forEach(g => {
    for (let j =0;j<geo.features.length;j++){
      let lineData = geo.features[j];
      let id= lineData.properties.name;
      let num = lineData.properties.adcode;
      //console.log(num);
      dict.set(lineData.geometry, num);
      //dict['lineData.geometry']= num;
      let routeFeature = "";
      console.log(lineData);
      if (lineData.geometry.type == "MultiPolygon") {
        /*for (let m=0;m<lineData.geometry.coordinates.length;m++) {
          for (let k = 0; k < lineData.geometry.coordinates[m].length; k++) {
            for (let i = 0; i < lineData.geometry.coordinates[m][k].length; i++) {
              lineData.geometry.coordinates[m][k][i][0] += 20;
              //lineData.geometry.coordinates[0][0][i][1]+=10;
            }
          }
        }

         */


        let geometry = new MultiPolygon(lineData.geometry.coordinates);

        geometry = geometry.transform('EPSG:4326','EPSG:3857');
        routeFeature = new Feature({
          geometry: geometry,
          id: num
        });
        routeFeature.setStyle(new Style({
          stroke: new Stroke({
            width: 2,
            color: 'rgba(122, 197, 205, 1)'
          }),
          fill: new Fill({
            color: 'rgba(42,55,86,0.3)'
          })

        }));
        routeFeature.setId(id);
      } else if (lineData.geometry.type == "Polygon") {

        /*for  (let i=0; i< lineData.geometry.coordinates[0][0].length;i++){
          lineData.geometry.coordinates[0][0][i][0]+=20;
          //lineData.geometry.coordinates[0][0][i][1]+=10;
        }

         */
        routeFeature = new Feature({
          geometry: new Polygon(lineData.geometry.coordinates),
          style: new Style({
            stroke: new Stroke({
              width: 5,
              color: (255,255,255,0)
            }),
            fill: new Fill({
              color: 'rgba(42,55,86,0.3)'
            })
          }),
          id: num

        });
        routeFeature.setId(num);
      }

      features.push(routeFeature);

    }

    //});
    //  geo.forEach(g => {


    // });
    // 设置图层
    console.log(features)
    let routeLayer = new Vector({
      source: new VecS({
        features: features
      })
    });
    // 添加图层

    let raster = new TileLayer({
      source: new OSM()
    });
    //routeLayer.addFeature(features);

    let map = new Maps({
    // 设置挂载点为map
      target: 'map',
    // 设置图层
       layers: [
         routeLayer
       ],
    // 设置地图的可视区域，center为中心点，zoom为缩放的层级
      view: new View({
        center: fromLonLat([118.09, 39.37]),
        // extent: transformExtent([76,10,190,90], 'EPSG:4326', 'EPSG:3857'),
        //center: transform([126.5,45.6],'EPSG:4326','EPSG:3857'),
        zoom: 3
      }),
      controls: defaults({
        zoom: false,
        rotate: false,
        attribution: false
      })
    });
    //map.addLayer(routeLayer);

    //this.map.setResolution(170);
    console.log(routeLayer);
    let highlightStyle = new Style({
      fill: new Fill({
        color: 'rgba(0,0,0,1)'
      }),
      stroke: new Stroke({
        color: '#3399CC',
        width: 3
      })
    });
    let sel = new Select({
      // condition:click
    })
    /*
    map.on('pointermove', function(e){
      //console.log(e);
      //if(getLayer(e, map)!=null){
      //if (e.getLayer() == routeLayer) {

        if (sel !== null) {
          e.selected.setStyle(
            new Style({
              stroke: new Stroke({
                width: 2,
                color: 'rgba(122, 197, 205, 1)'
              }),
              fill: new Fill({
                color: 'rgba(42,55,86,0.3)'
              })
            })
          );
          sel = null;
        }
        map.forEachFeatureAtPixel(e.pixel, function(f) {
          //if(getLayer(e, map)!=null) {
            sel = f;
            f.setStyle(highlightStyle);
            return true;
          //}

          //}
        })
     // }
    })

     */
    //console.log(select);
    //function addRandomFeature() {
      //let x = Math.random() * 360 - 180;
      //let y = Math.random() * 180 - 90;
    let dotLayer = new Vector({
      source: new VecS({
        //features: features
      })
    });
      let geom = new Point(fromLonLat([116.28, 39.54]));
      let feature = new Feature(geom);
      dotLayer.getSource().addFeature(feature);
    let geom2 = new Point(fromLonLat([117.10, 39.10]));
    let feature2 = new Feature(geom2);
    dotLayer.getSource().addFeature(feature2);
    let geom3 = new Point(fromLonLat([114.26, 38.03]));
    let feature3 = new Feature(geom3);
    dotLayer.getSource().addFeature(feature3);
    let geom4 = new Point(fromLonLat([115.28, 38.53]));
    let feature4 = new Feature(geom4);
    dotLayer.getSource().addFeature(feature4);
    let geom5 = new Point(fromLonLat([118.09, 39.37]));
    let feature5 = new Feature(geom5);
    dotLayer.getSource().addFeature(feature5);
    //}
    let feas = new Array();
    feas.push(feature);
    feas.push(feature2);
    feas.push(feature3);
    feas.push(feature4);
    feas.push(feature5);

    console.log(feas);
    let duration = 3000;
    function flash() {
      let start = new Date().getTime();
      let listenerKey = dotLayer.on('postrender', animate);
      function animate(event) {
        for (let i=0;i<feas.length;i++){
          let vectorContext = getVectorContext(event);
          let frameState = event.frameState;
          let flashGeom = feas[i].getGeometry().clone();
          let elapsed = frameState.time - start;
          let elapsedRatio = elapsed / duration;
          // radius will be 5 at start and 30 at end.
          let radius = easeOut(elapsedRatio) * 25 + 5;
          let opacity = easeOut(1 - elapsedRatio);

          let style = new Style({
            image: new CircleStyle({
              radius: radius,
              stroke: new Stroke({
                color: 'rgba(255, 0, 0, ' + opacity + ')',
                width: 0.25 + opacity
              })
            })
          });

          vectorContext.setStyle(style);
          vectorContext.drawGeometry(flashGeom);
          if (elapsed > duration) {
            unByKey(listenerKey);
            return;
          }
          // tell OpenLayers to continue postrender animation
          map.render();
        }


      }

    }


    //window.setInterval(
     //routeLayer.getSource().on('addfeature', function(e) {
     //   flash(e.feature);
     // })
       //,  1000
    //)

    //addRandomFeature();
    //window.setInterval(flash, 1000);
   // window.setInterval(addRandomFeature, 1000);
    //map.addLayer(dotLayer);
    let data = [{
      lon: 111.47,
      lat: 31.51
    },{
      lon: 115.62,
      lat: 40.32
    }];
    for(let i = 0;i<data.length;i++) {
      let d = data[i];
      console.log(data);
      let coord = fromLonLat([d.lon, d.lat]);
      //let element=document.getElementById('map');
      //console.log(element);
     // element.cl
      let element = document.createElement('div');
      element.className="animate-overlay";
      let overlay = new ol.Overlay({
        element: element,
      })
      console.log(overlay);
      map.addOverlay(overlay);
      console.log(coord);
      overlay.setPosition(coord);
    }
    return map;
  }
  addProvince(geo =[]){
    if (geo.length == 0) {
      return false;
    }
    let features = [];
    //geo.forEach(g => {
    for (let j =0;j<geo.features.length;j++){
      let lineData = geo.features[j];
      let id = lineData.properties.name;
      let num = lineData.properties.adcode;
      //console.log(num);
      //dict[num]= lineData.geometry;
      let routeFeature = "";
      //console.log(lineData);
      if (lineData.geometry.type == "MultiPolygon") {
        let geometry = new MultiPolygon(lineData.geometry.coordinates);
        geometry = geometry.transform('EPSG:4326','EPSG:3857');
        routeFeature = new Feature({
          geometry: geometry,
          id: num
        });
        routeFeature.setStyle(new Style({
          stroke: new Stroke({
            width: 2,
            color: 'rgba(122, 197, 205, 1)'
          }),
          fill: new Fill({
            color: 'rgba(42,55,86,0.3)'
          })

        }));
        routeFeature.setId(id);
      } else if (lineData.geometry.type == "Polygon") {
        routeFeature = new Feature({
          geometry: new Polygon(lineData.geometry.coordinates),
          style: new Style({
            stroke: new Stroke({
              width: 5,
              color: (255,255,255,0)
            }),
            fill: new Fill({
              color: 'rgba(42,55,86,0.3)'
            })
          }),
          id: num

        });
        routeFeature.setId(id);
      }

      features.push(routeFeature);

    }
    console.log(features)
    let routeLayer = new Vector({
      source: new VecS({
        features: features
      })
    });
    return routeLayer;
  }
  componentDidMount() {
    let flag = false;
    let props = this.props;
    let dict = new Map();
    this.data = new Map();
    fetch('http://api.tianapi.com/txapi/ncovcity/index?key=476b288d2521eecf4c30a13831d6e4c6', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      key: '476b288d2521eecf4c30a13831d6e4c6'
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        for (let i = 0; i < data.newslist.length; i++) {
          this.data.set(data.newslist[i].provinceName, data.newslist[i].confirmedCount);
          if(data.newslist[i].provinceName=="黑龙江省"){
            //console.log(data.newslist[i].cities);
            for(let j=0;j<data.newslist[i].cities.length;j++){
              this.data.set(data.newslist[i].cities[j].cityName, data.newslist[i].cities[j].confirmedCount);
            }
            //this.data.set(data.newslist[i].)
          }
        }

        console.log(this.data);
      //})
    //let map=null;
    fetch('/all.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      }
    )
      .then(response => response.json())
      .then((data) => {
        //console.log(data)
        this.map = this.addArea(data, dict);
        let container = document.getElementById('overlay');
        let content = document.getElementById('popup-content');
        let closer = document.getElementById('popup-closer');
        this.overlay = new Overlay({
          element: container,
          autoPan: true,
          autoPanAnimation: {
            duration: 250
          }
        });
        closer.onclick = function() {
          this.overlay.setPosition(undefined);
          closer.blur();
          return false;
        };
        this.map.addOverlay(this.overlay);
        //console.log();
        flag = true;
        //console.log(rl);
        let seled = new Select({
          condition: click
        })
        seled.on('select', function(e) {
          //debugger;
          //window.alert("aaa");
          if(e.selected[0]!=null) {
            if(this.data.has(e.selected[0].getId())){
              console.log(e.selected[0].getId());
            }
          if(! this.data.has(e.selected[0].getId())){
            content.innerHTML = '<code>' + e.selected[0].getId() + '</code>';
          }else{
            content.innerHTML = '<code>' + e.selected[0].getId() + ": " + this.data.get(e.selected[0].getId()) + '</code>';
          }
            console.log(this.data.get(e.selected[0].getId()));
            console.log(e.selected[0].getId());
            //console.log(e.selected[0].getGeometry().getExtent());
            //console.log(getCenter(e.selected[0].getGeometry().getExtent()));
            // console.log(e.selected[0].getGeometry().getExtent().getCenter());
            //debugger;
            this.overlay.setPosition(getCenter(e.selected[0].getGeometry().getExtent()));
            //overlay.setPosition(fromLonLat([118.09, 39.37]));
            this.overlay.setVisible(true);
          }
        }.bind(this))
        //this.overlay=
        this.map.addInteraction(seled);
        let sel = new Select({
          condition: doubleClick
        })
        sel.on('select', function(e) {
          //debugger;
          console.log(e.selected);
          let feature = e.selected[0];
          if (feature != null) {
            //console.log(dict);
            console.log(feature)
            console.log(feature.getId());
            if (feature.getId() == "黑龙江省") {
              //if(feature.getId()=="230000"){
              fetch('/heilongjiang.json', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                },
              })
                .then(response => response.json())
                .then((data) => {
                  this.pos = 1;
                  console.log(data);
                  let { dispatch } = props;
                  dispatch({
                    type: 'maps/save',
                    payload: {
                      data: 13000,
                      code: 20000
                    },
                  });
                  let layer = this.addProvince(data);
                  console.log(this.map.getLayers());
                  for (let i = 0; i < 2; i++) {
                    // debugger;
                    this.map.removeLayer(this.map.getLayers().getArray()[0]);
                    console.log(this.map.getLayers().getArray()[i]);
                  }
                  for (let i = 0; i < this.map.getOverlays().getArray().length + 1; i++) {
                    this.map.removeOverlay(this.map.getOverlays().getArray()[0]);
                    console.log(this.map.getOverlays().getArray()[i]);

                  }
                  this.map.addOverlay(this.overlay);
                  //document.getElementById()
                  // map.removeLayer(map.getLayers()[0]);
                  this.map.addLayer(layer);
                  this.map.getView().setCenter(fromLonLat([127.42, 45.04]));
                  this.map.getView().adjustResolution(0.4);
                  //map.getView().fitExtent(transformExtent([76,18,140,56], 'EPSG:4326', 'EPSG:3857'), map.getSize());
                  console.log(this.map.getView());
                  console.log(this.map.getLayers());
                })
            } else if (feature.getId() == "哈尔滨") {
              fetch('/harbin.json', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                },
              })
                .then(response => response.json())
                .then((data) => {
                  this.pos = 2;
                  let { dispatch } = props;
                  dispatch({
                    type: 'maps/save',
                    payload: {
                      code: 17000,
                    },
                  });
                  console.log(data);
                  //let { dispatch } = props;
                  dispatch({
                    type: 'maps/save',
                    payload: {
                      data: 23010,
                    },
                  });
                  let layer = this.addProvince(data);
                  console.log(this.map.getLayers());
                  for (let i = 0; i < 2; i++) {
                    // debugger;
                    this.map.removeLayer(this.map.getLayers().getArray()[0]);
                    console.log(this.map.getLayers().getArray()[i]);
                  }
                  for (let i = 0; i < this.map.getOverlays().getArray().length + 1; i++) {
                    this.map.removeOverlay(this.map.getOverlays().getArray()[0]);
                    console.log(this.map.getOverlays().getArray()[i]);

                  }
                  //document.getElementById()
                  // map.removeLayer(map.getLayers()[0]);
                  this.map.addOverlay(this.overlay);
                  this.map.addLayer(layer);
                  this.map.getView().adjustResolution(0.4);
                  console.log(this.map.getLayers());
                })
            }
          }
        }.bind(this))
        this.map.addInteraction(sel);
        console.log('success');


      })
  })
      .catch(e => {
        console.log(e)
      })
    //if(flag==true){

    //map.addInteraction(sel);


  }



  componentDidUpdate(prevProps, prevState){
    let check=0;
    let {maps:{code}} = this.props;
    if(prevProps.maps.code == code){
      //this.refreshData([2, 8, 3, 4, 10, 7, 7, 4],this.chart);
    }

    if((code == 13000&&prevProps.maps.code != code)){
      check=1;
      this.pos= 1;
      fetch('/heilongjiang.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      })
        .then(response => response.json())
        .then((data) => {
          let { dispatch } = this.props;
          dispatch({
            type: 'maps/save',
            payload: {
              data: 13000,
            },
          });
          console.log(data);
          let layer = this.addProvince(data);
          console.log(this.map.getLayers());
          for (let i =0;i<2;i++){
            // debugger;
            this.map.removeLayer(this.map.getLayers().getArray()[0]);
            console.log(this.map.getLayers().getArray()[i]);
          }
          for (let i =0;i<this.map.getOverlays().getArray().length+1;i++){
            this.map.removeOverlay(this.map.getOverlays().getArray()[0]);
            console.log(this.map.getOverlays().getArray()[i]);

          }
          //document.getElementById()
          // map.removeLayer(map.getLayers()[0]);
          this.map.addLayer(layer);
          this.map.addOverlay(this.overlay);
          this.map.getView().setCenter(fromLonLat([127.42, 45.04]));
          this.map.getView().adjustResolution(1.4);
          //map.getView().fitExtent(transformExtent([76,18,140,56], 'EPSG:4326', 'EPSG:3857'), map.getSize());
          console.log(this.map.getView());
          console.log(this.map.getLayers());
        })
      check++;
      //code=1000;
    }
  }
  test(){
    if(this.pos==2){
      let { dispatch } = this.props;
      dispatch({
        type: 'maps/save',
        payload: {
          code: 13000,
        },
      });
    }else if(this.pos==1){
      window.location.reload();
    }

  }
  render() {
    return (
      // 地图的挂载点，可以设置大小，控制地图的大小
      //<body className={styles.bkg}>
      <div className={styles.map}>
        <div id="map"  className={styles.mymap} >
          <div id="overlay" className={styles.olPopup}>
            <a href="#" id="popup-closer" className={styles.olPopupCloser}></a>
            <div id="popup-content"></div>
          </div>
        </div>


        <Button type="primary" ghost className={styles.button} onClick={this.test.bind(this)}>返回</Button>
      </div>











    );
  }
}
export default index;
