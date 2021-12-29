import { LatitudeLongitude } from "../data/LatitudeLongitude";

export const formatDegree = (degree: number) => {
	const deg = Math.trunc(degree);
	const remaining = Math.abs(degree - deg);
	const min = Math.trunc(remaining * 60)
	const sec = remaining * 60 - min;

	return `${deg}° ${min}' ${(sec * 60).toFixed(2)}"`
}

export const latlonToDms = (latlon: LatitudeLongitude) => {
	return `${formatDegree(latlon.latitude)} ${latlon.latitude < 0 ? "S" : "N"} ${formatDegree(latlon.longitude)} ${latlon.longitude < 0 ? "W" : "E"}`
}