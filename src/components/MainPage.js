import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import logo from "../assets/LogoSilver.png";
import "../styles/MainPage.css";

function MainPage({ fetchAlgalData }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [algalData, setAlgalData] = useState(null); 
  const [parameters, setParameters] = useState({
    tss: false,
    chlorophyll: false,
    turbidity: false,
    phytoplankton: false,
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

  // Sample data for turbidity
  const turbidityData = useMemo(() => [
    { longitude: 121.174044303934, latitude: 14.4170143281305, turbidity: 10 },
    { longitude: 121.336441311657, latitude: 14.2719829588474, turbidity: 15 },
    { longitude: 121.280191611938, latitude: 14.3857986672338, turbidity: 500 },
  ], []);

  const handleStationClick = useCallback((station) => {
    // Simulate fetching new algal bloom data for the clicked station
    const newAlgalData = fetchAlgalData(station.id);
    setAlgalData(newAlgalData);
  }, [fetchAlgalData]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = 'pk.eyJ1Ijoic29saWNpemluZyIsImEiOiJjbTNkeGtuMzQwODI2MmpxeW1kazVlOW9wIn0.zp69tDjjpE_vYvyjxKnuNA';

    // Bounding box of Laguna Lake
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [121.23, 14.2], 
      zoom: 10,
      pitch: 45,
      maxBounds: [
        [121.0, 14.05], // Southwest corner (longitude, latitude)
        [121.5, 14.5] // Northeast corner (longitude, latitude)
      ], 
    });

    mapRef.current.on("load", () => {
      // Add turbidity heatmap layer
      if (parameters.turbidity) {
        mapRef.current.addSource("turbidity-data", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: turbidityData.map((point) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [point.longitude, point.latitude],
              },
              properties: {
                turbidity: point.turbidity,
              },
            })),
          },
        });

        mapRef.current.addLayer({
          id: "turbidity-heatmap",
          type: "heatmap",
          source: "turbidity-data",
          maxzoom: 15,
          paint: {
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "turbidity"],
              0, 0,
              50, 1,
            ],
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              5, 1,
              10, 3,
            ],
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(0,0,255,0)",
              0.1, "rgb(0,0,255)",
              0.3, "rgb(0,255,0)",
              0.5, "rgb(255,255,0)",
              0.7, "rgb(255,0,0)",
            ],
            "heatmap-radius": 20,
            "heatmap-opacity": 0.8,
          },
        });
      }

      // Markers for each water station
      stations.forEach((station) => {
        const { latitude, longitude, label } = station;

        if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
          const marker = new mapboxgl.Marker({
            color: "#FF0000", 
            draggable: false,
          })
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(label)) 
            .addTo(mapRef.current);

          marker.getElement().addEventListener("click", () => handleStationClick(station));
        }
      });
    });

    return () => mapRef.current.remove();
  }, [handleStationClick, stations, turbidityData, parameters]);

  const handleSidebarHeaderClick = () => {
    navigate("/home");
  };

  const handleParameterChange = (e) => {
    const { name, checked } = e.target;
    setParameters((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="main-page">
      <div className="main-content">
        <aside className="sidebar">
          <div className="sidebar-header" onClick={handleSidebarHeaderClick}>
            <img src={logo} className="sidebar-logo" alt="ALGSAT logo" />
            <h1 className="sidebar-title">~ALGSAT</h1>
          </div>
          <h2>Parameters</h2>
          <div className="parameter-list">
            <label>
              <input type="checkbox" name="tss" onChange={handleParameterChange} /> Total Suspended Solids
            </label>
            <label>
              <input type="checkbox" name="chlorophyll" onChange={handleParameterChange} /> Chlorophyll a Levels
            </label>
            <label>
              <input type="checkbox" name="turbidity" onChange={handleParameterChange} /> Turbidity Levels
            </label>
            <label>
              <input type="checkbox" name="phytoplankton" onChange={handleParameterChange} /> Phytoplankton Index
            </label>
          </div>
          <div className="algal-bloom-box">
            <h3>Algal Bloom Coverage</h3>
            <p>{algalData ? `${algalData.coverage} km²` : "Select a station or parameter"}</p>
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
