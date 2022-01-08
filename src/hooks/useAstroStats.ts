import axios from "axios";
import { useEffect, useState } from "react";
import { LatitudeLongitude } from "../data/LatitudeLongitude";

export const useAstroStats = <T>(url: string, location: LatitudeLongitude) => {
  const [value, setValue] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    axios.get<T>(url, {
      cancelToken: source.token,
      params: {
        lon: location.longitude,
        lat: location.latitude,
      },
    }).then((response) => {
      setLoading(false);
      setError(undefined);
      setValue(response.data);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
      setValue(undefined);
      setError("Could not load data");
    });

    return source.cancel;
  }, [location.latitude, location.longitude, url]);

  return { value, error, loading };
};

interface AstroStatsValue<T> {
  value?: T | undefined,
  success: boolean,
  error?: string | undefined
}

export const useAstroStatsValue = <T>(url: string, location: LatitudeLongitude): AstroStatsValue<T> => {
  const { value, loading, error } = useAstroStats<T>(url, location);

  if (error) return { value: undefined, success: false, error };
  if (loading) return { value: undefined, success: false, error: "Loading..." };
  if (!value) return { value: undefined, success: false, error: "No data found" };
  return { value, success: true, error: undefined };
};
