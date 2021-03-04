import * as React from "react";
import { useState, useEffect, useRef } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import { Editor, DrawRectangleMode } from "react-map-gl-draw";
import { heatmapLayer } from "./map-style";
import getCoordinates from "./API";
import LoadingIcon from "./LoadingIcon";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });
  const editorEl = useRef(null);
  const [data, setData] = useState();
  const [boundingBox, setBoundingBox] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEntries = async () => {
      if (boundingBox) {
        const coordinates = await getCoordinates(boundingBox, setLoading);
        setData(coordinates[0].jsonb_build_object);
      }
    };
    getEntries();
  }, [boundingBox]);

  const updateFeature = (feature) => {
    editorEl.current.deleteFeatures(0);
    setBoundingBox(feature);
  };

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json"
        onViewportChange={setViewport}
      >
        <Editor
          clickRadius={12}
          mode={new DrawRectangleMode()}
          onUpdate={(feature) => updateFeature(feature)}
          ref={editorEl}
        />
        {loading && <LoadingIcon />}
        {data && (
          <Source type="geojson" data={data}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </MapGL>
    </>
  );
}

export default App;
