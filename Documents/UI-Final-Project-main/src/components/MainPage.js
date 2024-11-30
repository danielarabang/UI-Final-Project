import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import logo from '../assets/LogoSilver.png';
import '../styles/MainPage.css';

function MainPage() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [parameters, setParameters] = useState({
    tss: false,
    nitrate: false,
    phosphate: false,
    dissolvedOxygen: false,
  });

  // Water station coordinates
  const stations = useMemo(() => [
    { id: "1", longitude: 121.174044303934, latitude: 14.4170143281305, label: "Station 1" },
    { id: "2", longitude: 121.336441311657, latitude: 14.2719829588474, label: "Station 2" },
    { id: "3", longitude: 121.280191611938, latitude: 14.3857986672338, label: "Station 3" },
    { id: "4", longitude: 121.138937613763, latitude: 14.4883257902075, label: "Station 4" },
    { id: "5", longitude: 121.238218191067, latitude: 14.2383151722609, label: "Station 5" },
    { id: "6", longitude: 121.118335016667, latitude: 14.5115683801749, label: "Station 6" },
    { id: "7", longitude: 121.094389843182, latitude: 14.3702764359331, label: "Station 7" },
    { id: "8", longitude: 121.13377260203, latitude: 14.3253846091818, label: "Station 8" },
    { id: "9", longitude: 121.269697927342, latitude: 14.2912739731556, label: "Station 9" },
    { id: "10", longitude: 121.384511963434, latitude: 14.3123547745184, label: "Station 10" },
    { id: "11", longitude: 121.096000143057, latitude: 14.4121682301603, label: "Station 11" },
    { id: "12", longitude: 121.222973759663, latitude: 14.4222049481406, label: "Station 12" },
    { id: "13", longitude: 121.28667809836, latitude: 14.3424716427714, label: "Station 13" },
    { id: "14", longitude: 121.27118783988, latitude: 14.2551321939837, label: "Station 14" },
    { id: "15", longitude: 121.414493346243, latitude: 14.3250210743066, label: "Station 15" },
  ], []);

  // Sample parameter data
  const dissolvedOxygenData = [
    { longitude: 121.174235189845, latitude: 14.4177452982257, do: 10 },
    { longitude: 121.299125647083, latitude: 14.2995728198274, do: 8 },
    { longitude: 121.280914665387, latitude: 14.3689176073243, do: 12 },
    { longitude: 121.268340543729, latitude: 14.3702994725925, do: 25 },
    { longitude: 121.200134124465, latitude: 14.4260394210249, do: 15 },
    { longitude: 121.149292147762, latitude: 14.2719083025534, do: 5 },
    { longitude: 121.322456998742, latitude: 14.3249385028628, do: 18 },
    { longitude: 121.248357964673, latitude: 14.3143859683662, do: 22 },
    { longitude: 121.133927369337, latitude: 14.3270536418081, do: 30 },
    { longitude: 121.261973519646, latitude: 14.3739734810159, do: 20 },
  ];
  
  const phosphateData = [
    { longitude: 121.154315948924, latitude: 14.3332252578954, phosphate: 15 },
    { longitude: 121.291223607494, latitude: 14.3687262547821, phosphate: 30 },
    { longitude: 121.206433794064, latitude: 14.2782125750724, phosphate: 25 },
    { longitude: 121.168529876512, latitude: 14.3142494738717, phosphate: 50 },
    { longitude: 121.118515832243, latitude: 14.3402185392319, phosphate: 10 },
    { longitude: 121.236345402708, latitude: 14.2917685523585, phosphate: 60 },
    { longitude: 121.138295945621, latitude: 14.4162311341131, phosphate: 12 },
    { longitude: 121.317428033728, latitude: 14.2877543582062, phosphate: 40 },
    { longitude: 121.265022259945, latitude: 14.3495668748792, phosphate: 20 },
    { longitude: 121.321650445073, latitude: 14.3578454725983, phosphate: 8 },
  ];

  const nitrateData = [
    { longitude: 121.174024768455, latitude: 14.3982765174027, nitrate: 45 },
    { longitude: 121.237332343669, latitude: 14.2891196112031, nitrate: 60 },
    { longitude: 121.259762974592, latitude: 14.3318535982725, nitrate: 20 },
    { longitude: 121.321046987922, latitude: 14.2786714376118, nitrate: 35 },
    { longitude: 121.118187329188, latitude: 14.4457882077035, nitrate: 25 },
    { longitude: 121.206459735732, latitude: 14.2978675562114, nitrate: 50 },
    { longitude: 121.289416832142, latitude: 14.3672564858389, nitrate: 40 },
    { longitude: 121.212302213407, latitude: 14.3756591335528, nitrate: 70 },
    { longitude: 121.268293636876, latitude: 14.4170238784562, nitrate: 30 },
    { longitude: 121.141781405673, latitude: 14.2637482075535, nitrate: 55 },
  ];
  
  const tssData = [
    { longitude: 121.174044303934, latitude: 14.4170143281305, tss: 8 },
    { longitude: 121.336441311657, latitude: 14.2719829588474, tss: 12 },
    { longitude: 121.280191611938, latitude: 14.3857986672338, tss: 150 },
    { longitude: 121.118319855378, latitude: 14.4472748430985, tss: 20 },
    { longitude: 121.220883598793, latitude: 14.3994793443072, tss: 35 },
    { longitude: 121.310106831849, latitude: 14.2968271953753, tss: 25 },
    { longitude: 121.259680131212, latitude: 14.3662395451428, tss: 100 },
    { longitude: 121.244073453746, latitude: 14.4212719719743, tss: 75 },
    { longitude: 121.317753236785, latitude: 14.3771958289063, tss: 50 },
    { longitude: 121.187684452561, latitude: 14.2889810124269, tss: 65 },
  ];
  

  useEffect(() => {
    if (!mapContainerRef.current) return;
  
    mapboxgl.accessToken = "pk.eyJ1Ijoic29saWNpemluZyIsImEiOiJjbTNkeGtuMzQwODI2MmpxeW1kazVlOW9wIn0.zp69tDjjpE_vYvyjxKnuNA";
  
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [121.23, 14.2],
      zoom: 10,
      pitch: 40,
      bearing: 10,
      maxBounds: [ //Bounding box ng Laguna Lake
        [121.0, 14.05], // Southwest corner
        [121.5, 14.5], // Northeast corner
      ],
    });
  
    mapRef.current.on("load", () => {
      //3D TERRAIN PLS WAG TANGGALIN
      mapRef.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
        maxzoom: 15,
      });
  
      mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      
      //Wala, background lang to
      mapRef.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });
  
      //Water Stations Markers
      stations.forEach((station) => {
        const { latitude, longitude, label } = station;
        if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
          const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setText(label);
      
          const marker = new mapboxgl.Marker({ color: "#FF0000" })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);
          //Hover pop-up marker
          marker.getElement().addEventListener("mouseenter", () => popup.setLngLat([longitude, latitude]).addTo(mapRef.current));
          marker.getElement().addEventListener("mouseleave", () => popup.remove());
        }
      });
      
            
    });
  
    return () => mapRef.current.remove();
  }, [stations]);
  
  const addHoverEffect = (layerName, property) => {
    if (!mapRef.current) return;
  
    // Show a popup with the value when hovering over a point
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });
  
    mapRef.current.on("mousemove", layerName, (e) => {
      const features = e.features;
      if (features.length) {
        const coordinates = features[0].geometry.coordinates.slice();
        const value = features[0].properties[property];
  
        // Adjust coordinates if the user zooms or pans
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
  
        popup
          .setLngLat(coordinates)
          .setHTML(`<strong>${property}:</strong> ${value}`)
          .addTo(mapRef.current);
      }
    });
  
    //Removes pop-up once the mouse pointerleaves
    mapRef.current.on("mouseleave", layerName, () => {
      popup.remove();
    });
  };
  
  const addParameterLayer = (name, data, color, property) => {
    if (mapRef.current.getLayer(name)) return; // Avoid duplicating layers
  
    mapRef.current.addSource(name, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: data.map((item) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item.longitude, item.latitude],
          },
          properties: {
            [property]: item[property],
          },
        })),
      },
    });
  
    mapRef.current.addLayer({
      id: name,
      type: "heatmap",
      source: name,
      paint: {
        // Adjust the intensity of the heatmap
        "heatmap-intensity": {
          stops: [
            [0, 0],
            [10, 1.5],
          ],
        },
        // Color of the heatmap based on the data value
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "rgba(0, 0, 255, 0)", // Low density
          0.2, "rgb(65, 105, 225)", // Medium density
          0.5, "rgb(0, 255, 0)", // Higher density
          0.8, "rgb(255, 255, 0)", // Very high density
          1, "rgb(255, 0, 0)" // Maximum density
        ],
        // Set the weight of each data point based on the property
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["get", property],
          0, 0,
          100, 1,
        ],
        // Adjust the size of the heatmap radius
        "heatmap-radius": {
          stops: [
            [0, 2],
            [10, 15],
          ],
        },
        // Reduce the intensity as you zoom out
        "heatmap-opacity": {
          stops: [
            [0, 1],
            [10, 0.5],
          ],
        },
      },
    });
  
    addHoverEffect(name, property); // Keep the hover effect for data points
  };
  
  
  useEffect(() => {
    // Toggle layers dynamically based on parameter state
    if (parameters.phosphate) {
      addParameterLayer("phosphate", phosphateData, "#1f78b4", "phosphate");
    } else if (mapRef.current.getLayer("phosphate")) {
      mapRef.current.removeLayer("phosphate");
      mapRef.current.removeSource("phosphate");
    }
  
    if (parameters.nitrate) {
      addParameterLayer("nitrate", nitrateData, "#33a02c", "nitrate");
    } else if (mapRef.current.getLayer("nitrate")) {
      mapRef.current.removeLayer("nitrate");
      mapRef.current.removeSource("nitrate");
    }
  
    if (parameters.dissolvedOxygen) {
      addParameterLayer("dissolvedOxygen", dissolvedOxygenData, "#e31a1c", "do");
    } else if (mapRef.current.getLayer("dissolvedOxygen")) {
      mapRef.current.removeLayer("dissolvedOxygen");
      mapRef.current.removeSource("dissolvedOxygen");
    }
  
    if (parameters.tss) {
      addParameterLayer("tss", tssData, "#ff7f00", "tss");
    } else if (mapRef.current.getLayer("tss")) {
      mapRef.current.removeLayer("tss");
      mapRef.current.removeSource("tss");
    }
  }, [parameters]);
  

  const handleParameterChange = (e) => {
    const { name, checked } = e.target;
    setParameters((prev) => {
      const newParameters = { ...prev, [name]: checked };
      if (!checked && mapRef.current.getLayer(name)) {
        mapRef.current.removeLayer(name);
        mapRef.current.removeSource(name);
      }
      return newParameters;
    });
  };

  return (
    <div className="main-page">
      <div className="main-content">
        <aside className="sidebar">
          <div className="sidebar-header" onClick={() => navigate("/home")}>
            <img src={logo} className="sidebar-logo" alt="ALGSAT logo" />
            <h1 className="sidebar-title">~ALGSAT</h1>
          </div>
          <h2>Parameters</h2>
          <div className="parameter-list">
            <label>
              <input type="checkbox" name="phosphate" checked={parameters.phosphate} onChange={handleParameterChange} />
              Phosphate
            </label>
            <label>
              <input type="checkbox" name="nitrate" checked={parameters.nitrate} onChange={handleParameterChange} />
              Nitrate
            </label>
            <label>
              <input type="checkbox" name="dissolvedOxygen" checked={parameters.dissolvedOxygen} onChange={handleParameterChange} />
              Dissolved Oxygen
            </label>
            <label>
              <input type="checkbox" name="tss" checked={parameters.tss} onChange={handleParameterChange} />
              TSS
            </label>
          </div>
        </aside>
        <div className="map-container" style={{ flex: 1, height: "100vh" }}>
          <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }}></div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
