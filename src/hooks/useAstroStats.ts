import axios from "axios"
import { useEffect, useState } from "react";
import { LatitudeLongitude } from "../data/LatitudeLongitude";

export const useAstroStats = <T>(url: string, location: LatitudeLongitude) => {
	const [value, setValue] = useState<T | undefined>(undefined);
	const [error, setError] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true)
		axios.get<T>(url, {
			params: {
				lon: location.longitude,
				lat: location.latitude
			}
		}).then(response => {
			setLoading(false)
			setError(undefined)
			setValue(response.data)
		}).catch(error => {
			console.log(error)
			setLoading(false)
			setValue(undefined);
			setError("Could not load data")
		})
	}, [location.latitude, location.longitude, url])

	return { value, error, loading };
}

export const useParseAstroStats = <T>(url: string, location: LatitudeLongitude, parse: (data: T) => any) => {
	const { value, loading, error } = useAstroStats<T>(url, location);

	if (error) return { value: error, success: false };
	if (loading) return { value: "Loading...", success: false };
	if (!value) return { value: "No data found", success: false };
	return { value: parse(value), success: true };
}