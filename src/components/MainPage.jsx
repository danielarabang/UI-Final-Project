import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

//Styles and images
import 'mapbox-gl/dist/mapbox-gl.css';
import logo from '../assets/LogoSilver.png';
import '../styles/MainPage.css';

//WQP data used
import algalBloomData from '../data/algalBloom_data.json';
// import tssData from '../data/tss_data.json';
// import doData from '../data/do_data.json';
// import phosphateData from '../data/phosphate_data.json';
// import nitrateData from '../data/nitrate_data.json';

function MainPage() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [parameters, setParameters] = useState({
    tss: false,
    nitrate: false,
    phosphate: false,
    dissolvedOxygen: false,
    algalBloom: false,
  });

  const [coveragePercentage, setCoveragePercentage] = useState(0);

  const handleHeaderClick = () => {
    navigate('/home'); //Back to home page
  };

  // Function to calculate total algal bloom coverage
  const calculateCoverage = (data) => {
    const totalPoints = data.length;
    const bloomCount = data.filter((item) => item.value === 1).length;
    const coverage = (bloomCount / totalPoints) * 100;
    return coverage.toFixed(2); //Rounded to two decimal places
  };

  //Updates coverage whenever naclick yung checkbox
  useEffect(() => {
    if (parameters.algalBloom) {
      const coverage = calculateCoverage(algalBloomData);
      setCoveragePercentage(coverage);  // Update coverage percentage
    }
  }, [parameters.algalBloom]); // Recalculate when the algalBloom parameter changes

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

  useEffect(() => {
    if (!mapContainerRef.current) return;
  
    mapboxgl.accessToken = "pk.eyJ1Ijoic29saWNpemluZyIsImEiOiJjbTNkeGtuMzQwODI2MmpxeW1kazVlOW9wIn0.zp69tDjjpE_vYvyjxKnuNA";
  
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [121.23, 14.2],
      zoom: 10,
      pitch: 40,
      bearing: 10,
      maxBounds: [ // bounding box ng laguna laguna
        [120.8, 14.05], // Southwest corner (increased south side)
        [122.0, 14.7],  // Northeast corner (reduced right side)
      ],
    });
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    mapRef.current.on("load", () => {
      //3D TERRAIN PLS WAG TANGGALIN
      mapRef.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
        maxzoom: 15,
      });
      //Ito pang set ng initial terrain
      mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: 2.0 });
      
      // Hillshading layer (Shaders)
      mapRef.current.addSource('dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
      });

      mapRef.current.addLayer({
        id: 'hillshading',
        source: 'dem',
        type: 'hillshade',
      });

      //Wala, sky background lang to
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
      
          const marker = new mapboxgl.Marker({ color: "#800000" })
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
  
// Memoizing the `addParameterLayer` function using `useCallback`
const addParameterLayer = useCallback((name, data, color, property) => {
  if (!mapRef.current) return; // Make sure mapRef is initialized
  
  if (mapRef.current.getLayer(name)) return; // Avoid adding a layer if it already exists

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

  // Color gradients for each parameter
  const colorGradients = {
    phosphate: [
      "interpolate", ["linear"], ["heatmap-density"],
      0, `${color}33`, // Low density
      0.5, `${color}80`, // Medium density
      1, `${color}ff`, // High density
    ],
    nitrate: [
      "interpolate", ["linear"], ["heatmap-density"],
      0, `${color}33`, 
      0.5, `${color}80`,
      1, `${color}ff`,
    ],
    dissolvedOxygen: [
      "interpolate", ["linear"], ["heatmap-density"],
      0, `${color}33`, 
      0.5, `${color}80`,
      1, `${color}ff`,
    ],
    tss: [
      "interpolate", ["linear"], ["heatmap-density"],
      0, `${color}33`, 
      0.5, `${color}80`,
      1, `${color}ff`,
    ],
    algalBloom: [
      "interpolate", ["linear"], ["heatmap-density"],
      0, `${color}33`, 
      0.5, `${color}80`,
      1, `${color}ff`,
    ],
  };

  mapRef.current.addLayer({
    id: name,
    type: "heatmap",
    source: name,
    paint: {
      "heatmap-intensity": {
        stops: [
          [0, 0],
          [10, 1.5],
        ],
      },
      "heatmap-color": colorGradients[property] || [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0, "rgba(0, 0, 255, 0)",
        0.2, "rgb(65, 105, 225)",
        0.5, "rgb(0, 255, 0)",
        0.8, "rgb(255, 255, 0)",
        1, "rgb(255, 0, 0)",
      ],
      "heatmap-weight": [
        "interpolate",
        ["linear"],
        ["get", property],
        0, 0,
        1, 1, 
      ],
      "heatmap-radius": {
        stops: [
          [0, 2],
          [1, 10],
        ],
      },
      "heatmap-opacity": {
        stops: [
          [0, 1],
          [10, 0.5],
        ],
      },
    },
  });

  addHoverEffect(name, property); // Add hover effect for data points
}, []);

  
  useEffect(() => {
    // Dynamically toggle layers based on parameter state
    // if (parameters.phosphate) {
    //   if (!mapRef.current.getLayer("phosphate")) {
    //     addParameterLayer("phosphate", phosphateData, "#1f78b4", "phosphate");
    //   }
    // } else if (mapRef.current.getLayer("phosphate")) {
    //   mapRef.current.removeLayer("phosphate");
    //   mapRef.current.removeSource("phosphate");
    // }

    // if (parameters.nitrate) {
    //   if (!mapRef.current.getLayer("nitrate")) {
    //     addParameterLayer("nitrate", nitrateData, "#33a02c", "nitrate");
    //   }
    // } else if (mapRef.current.getLayer("nitrate")) {
    //   mapRef.current.removeLayer("nitrate");
    //   mapRef.current.removeSource("nitrate");
    // }

    // if (parameters.dissolvedOxygen) {
    //   if (!mapRef.current.getLayer("dissolvedOxygen")) {
    //     addParameterLayer("dissolvedOxygen", dissolvedOxygenData, "#e31a1c", "do");
    //   }
    // } else if (mapRef.current.getLayer("dissolvedOxygen")) {
    //   mapRef.current.removeLayer("dissolvedOxygen");
    //   mapRef.current.removeSource("dissolvedOxygen");
    // }

    // if (parameters.tss) {
    //   if (!mapRef.current.getLayer("tss")) {
    //     addParameterLayer("tss", tssData, "#ff7f00", "tss");
    //   }
    // } else if (mapRef.current.getLayer("tss")) {
    //   mapRef.current.removeLayer("tss");
    //   mapRef.current.removeSource("tss");
    // }

    if (parameters.algalBloom) {
      if (!mapRef.current.getLayer("algalBloom")) {
        addParameterLayer("algalBloom", algalBloomData, "#ff0000", "value");
      }
    } else if (mapRef.current.getLayer("algalBloom")) {
      mapRef.current.removeLayer("algalBloom");
      mapRef.current.removeSource("algalBloom");
    }
  }, [stations,parameters, addParameterLayer]);

  const handleParameterChange = (e) => {
    const { name, checked } = e.target;
    setParameters((prev) => {
      const newParameters = { ...prev, [name]: checked };
      return newParameters;
    });
  };

  return (
    <div className="main-page">
      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header"onClick={handleHeaderClick}>
            <img src={logo} alt="Logo" className="sidebar-logo" />
            <div className="sidebar-title">ALGSAT</div>
          </div>
          <div className="parameter-list">
            <label>
              <input
                type="checkbox"
                name="phosphate"
                checked={parameters.phosphate}
                onChange={handleParameterChange}
              /> Phosphate
            </label>
            <label>
              <input
                type="checkbox"
                name="nitrate"
                checked={parameters.nitrate}
                onChange={handleParameterChange}
              /> Nitrate
            </label>
            <label>
              <input
                type="checkbox"
                name="dissolvedOxygen"
                checked={parameters.dissolvedOxygen}
                onChange={handleParameterChange}
              /> Dissolved Oxygen
            </label>
            <label>
              <input
                type="checkbox"
                name="tss"
                checked={parameters.tss}
                onChange={handleParameterChange}
              /> TSS
            </label>
            <label>
              <input
                type="checkbox"
                name="algalBloom"
                checked={parameters.algalBloom}
                onChange={handleParameterChange}
              /> Algal Bloom
            </label>
          </div>
          {parameters.algalBloom && (
            <div>
              <h4>Algal Bloom Coverage: {coveragePercentage}%</h4>
            </div>
          )}
        </div>
  
        {/* Map Container */}
        <div className="map-container">
          <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
        </div>
      </div>
    </div>
  );
  
}

export default MainPage;