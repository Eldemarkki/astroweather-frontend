import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import App from "./App";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { SettingsContext } from "../contexts/SettingsContext";
import { useLocalStorage } from "@mantine/hooks";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY || "";
axios.defaults.baseURL = "/api";

export const ApplicationSetup = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({ key: "astroweather-color-scheme", defaultValue: "dark" });

  const [backgroundHue, setBackgroundHue] = useLocalStorage<number>({ key: "astroweather-background-hue", defaultValue: 233 });

  return (
    <SettingsContext.Provider value={{ backgroundHue, setBackgroundHue }}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={newValue => setColorScheme(newValue || (colorScheme === "dark" ? "light" : "dark"))}>
        <MantineProvider
          withGlobalStyles
          theme={{
            colorScheme,
            other: {
              backgroundHue: backgroundHue
            }
          }}>
          <div aria-label="Particles floating in the background" style={{ zIndex: 5, opacity: 0.15, position: "absolute" }} >
            <Particles id="tsparticles"
              init={loadFull}
              options={{
                fpsLimit: 60,
                particles: {
                  move: {
                    enable: true,
                    speed: 0.3,
                  },
                  number: {
                    value: 30,
                  },
                  size: {
                    value: {
                      min: 3,
                      max: 6
                    }
                  }
                }
              }} />
          </div>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SettingsContext.Provider>
  );
};
