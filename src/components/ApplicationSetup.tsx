import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import App from "./App";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { SettingsContext } from "../contexts/SettingsContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { useLocalStorageValue } from "@mantine/hooks";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "";

export const ApplicationSetup = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({ key: "astroweather-color-scheme", defaultValue: "dark" });

  const [backgroundHue, setBackgroundHue] = useLocalStorageValue<number>({ key: "astroweather-background-hue", defaultValue: 233 });

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
          {isMounted && <div aria-label="Particles floating in the background" style={{ zIndex: 5, opacity: 0.15 }} >
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
          </div>}
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SettingsContext.Provider>
  );
};
