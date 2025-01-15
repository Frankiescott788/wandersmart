import { ReactElement, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


interface MapComponentProps {
  center: [number, number];
  currentuser: { username?: string };
  className?: string;
}

const MapComponent = ({
    center,
    currentuser,
    className,
}: MapComponentProps): ReactElement => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainer.current || mapRef.current) return;

        mapRef.current = L.map(mapContainer.current).setView(center, 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);

        L.marker(center)
            .addTo(mapRef.current)
            .bindPopup(currentuser?.username || "User")
            .openPopup();

        L.control
            .zoom({
                position: "topright",
            })
            .addTo(mapRef.current);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [center, currentuser]);

    return <div ref={mapContainer} className={`w-full h-[30rem] ${className}`} />;
};

export default MapComponent;
