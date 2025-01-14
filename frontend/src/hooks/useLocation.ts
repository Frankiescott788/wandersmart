import { useState, useEffect } from 'react';

export interface Location {
    latitude: number ;
    longitude: number ;
    error: string | null;
}

const useLocation = () => {
    const [location, setLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
        error: null,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation((prevState) => ({
                ...prevState,
                error: 'Geolocation is not supported by your browser',
            }));
            return;
        }

        const success = (position: GeolocationPosition) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
        };

        const error = () => {
            setLocation((prevState) => ({
                ...prevState,
                error: 'Unable to retrieve your location',
            }));
        };

        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    return location;
};

export default useLocation;