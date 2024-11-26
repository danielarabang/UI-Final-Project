import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import logo from "../assets/LogoSilver.png";
import "../styles/MainPage.css";

function MainPage() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [parameters, setParameters] = useState({
    tss: false,
    chlorophyll: false,
    turbidity: false,
    phytoplankton: false,
  });
  const [exaggeration, setExaggeration] = useState(1.5); // default exaggeration value

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

  const turbidityData = useMemo(() => [
    { longitude: 121.174044303934, latitude: 14.4170143281305, turbidity: 10 },
    { longitude: 121.336441311657, latitude: 14.2719829588474, turbidity: 15 },
    { longitude: 121.280191611938, latitude: 14.3857986672338, turbidity: 500 },
  ], []);

  const phosphateData = [
    { longitude: 121.174044303934, latitude: 14.4170143281305, chlorophyll: 10 },
    { longitude: 121.336441311657, latitude: 14.2719829588474, chlorophyll: 15 },
    { longitude: 121.280191611938, latitude: 14.3857986672338, chlorophyll: 50 },
  ];

  const chlorophyllData = [
  { longitude: 121.174044303934, latitude: 14.4170143281305, chlorophyll: 10 },
  { longitude: 121.336441311657, latitude: 14.2719829588474, chlorophyll: 15 },
  { longitude: 121.280191611938, latitude: 14.3857986672338, chlorophyll: 50 },
];

  const tssData = [
    { longitude: 121.174044303934, latitude: 14.4170143281305, tss: 8 },
    { longitude: 121.336441311657, latitude: 14.2719829588474, tss: 12 },
    { longitude: 121.280191611938, latitude: 14.3857986672338, tss: 150 },
  ];
  
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = "pk.eyJ1Ijoic29saWNpemluZyIsImEiOiJjbTNkeGtuMzQwODI2MmpxeW1kazVlOW9wIn0.zp69tDjjpE_vYvyjxKnuNA";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [121.23, 14.2],
      zoom: 10,
      pitch: 60,
      bearing: 30,
      maxBounds: [
        [121.0, 14.05], // Southwest corner
        [121.5, 14.5], // Northeast corner
      ],
    });

    mapRef.current.on("load", () => {
      // Add the terrain source
      mapRef.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
        maxzoom: 15,
      });

      // Ensure the terrain is added after the source is loaded
      if (mapRef.current.isSourceLoaded("mapbox-dem")) {
        mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration });
      } else {
        mapRef.current.on("sourcedata", function (e) {
          if (e.isSourceLoaded && e.sourceId === "mapbox-dem") {
            mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration });
          }
        });
      }

      // Add a sky layer for 3D effects
      mapRef.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });

      // Dynamically add or remove layers based on parameters
      const addLayer = (layerId, data, color) => {
        mapRef.current.addSource(layerId, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: data.map((point) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [point.longitude, point.latitude],
              },
              properties: point,
            })),
          },
        });

        mapRef.current.addLayer({
          id: layerId,
          type: "heatmap",
          source: layerId,
          maxzoom: 15,
          paint: {
            "heatmap-weight": ["interpolate", ["linear"], ["get", Object.keys(data[0])[2]], 0, 0, 50, 1],
            "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 5, 1, 10, 3],
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, color[0],
              0.1, color[1],
              0.3, color[2],
              0.5, color[3],
              0.7, color[4],
            ],
            "heatmap-radius": 20,
            "heatmap-opacity": 0.5,
          },
        });
      };

      // Example of adding turbidity layer if enabled
      if (parameters.turbidity) {
        addLayer("turbidity-data", turbidityData, ["rgba(0,0,255,0)", "rgb(0,0,255)", "rgb(0,255,0)", "rgb(255,255,0)", "rgb(255,0,0)"]);
      }

      // Add markers for stations
      stations.forEach((station) => {
        const { latitude, longitude, label } = station;

        if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
          new mapboxgl.Marker({ color: "#FF0000" })
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(label))
            .addTo(mapRef.current);
        }
      });
    });

    return () => mapRef.current.remove();
  }, [stations, parameters, turbidityData]); // No exaggeration dependency here

  const handleExaggerationChange = (e) => {
    const newExaggeration = parseFloat(e.target.value);
    setExaggeration(newExaggeration);

    // Update terrain exaggeration without reloading the map
    if (mapRef.current && mapRef.current.isSourceLoaded("mapbox-dem")) {
      mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: newExaggeration });
    } else {
      mapRef.current.on("sourcedata", function (e) {
        if (e.isSourceLoaded && e.sourceId === "mapbox-dem") {
          mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: newExaggeration });
        }
      });
    }
  };

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
              <input type="checkbox" name="DO" checked={parameters.DO} onChange={handleParameterChange} />
              Dissolved Oxygen
            </label>
            <label>
              <input type="checkbox" name="tss" checked={parameters.tss} onChange={handleParameterChange} />
              TSS
            </label>
          </div>
          <label>
            Exaggeration:
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={exaggeration}
              onChange={handleExaggerationChange}
            />
            <span>{exaggeration.toFixed(1)}</span>
          </label>
        </aside>
        <div className="map-container" style={{ flex: 1, height: "100vh" }}>
          <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }}></div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
