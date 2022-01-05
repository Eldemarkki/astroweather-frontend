import { MantineProvider } from "@mantine/core";
import App from "./App";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "";

export const ApplicationSetup = () => {
  // TODO: Allow the user to change between light/dark modes
  return (
    <MantineProvider theme={{
      colorScheme: "dark",
      other: {
        backgroundHue: 233
      }
    }}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </MantineProvider>
  );
};
