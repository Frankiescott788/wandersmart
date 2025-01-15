import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import CPT from "@/assets/images/cape-town-4620987.jpg";
import { Location } from "iconsax-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Destination } from "@/types/types";
import useLocation from "@/hooks/useLocation";
import { AuthContext } from "@/context/Authprovider";
import { motion } from "framer-motion";
import AI from "@/assets/images/Cute_Cartoon_Character-removebg-preview.png";
import useWeather, { HourlyData } from "@/hooks/useWeather";
import { useNavigate } from "react-router-dom";

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export default function Overview({
  center = [-24.8743, 30.7667], // Cape Town coordinates (note: Leaflet uses [lat, lng])
  zoom = 12,
}: LeafletMapProps): ReactElement {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  const currentLocation = useLocation();

  const { currentuser } = useContext(AuthContext);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainer.current).setView(
      [currentLocation.latitude, currentLocation.longitude],
      zoom
    );

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Add a marker
    L.marker(center)
      .addTo(mapRef.current)
      .bindPopup(currentuser?.username as string)
      .openPopup();

    // Add zoom controls
    L.control
      .zoom({
        position: "topright",
      })
      .addTo(mapRef.current);

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom]);

  const { weather, hourly, loading, fetchWeather, getCurrentWeather } = useWeather();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentWeather(currentLocation.latitude as number, currentLocation.longitude as number);
  }, []);

  const { onClose, onOpen, onOpenChange, isOpen } = useDisclosure();

  const getPlaces = async () => {
    const res = await axios.get("http://localhost:8080/api/places", {
      withCredentials: true,
    });
    return res;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: getPlaces,
  });

  const places: Destination[] = data?.data;

  const [search, setSearch] = useState("");

  function handleSearch() {
    navigate("/place/" + search.toLowerCase());
  }

  return (
    <section className={"lg:py-4 px-1 lg:pe-5"}>
      <div className="lg:flex justify-between">
        <div className="lg:pt-3">
          <p className={"text-3xl text-default-500"}>
            Good Morning, {currentuser?.username}
          </p>
          <p className={"text-default-400"}>
            Welcome back and explore the world
          </p>
        </div>
        <div className="flex lg:border border-dashed border-gray-200 lg:p-3 my-3 lg:my-0 rounded-xl">
          <img
            src={`https://openweathermap.org/img/wn/${weather?.icon}.png`}
            className="h-[3rem] object-cover"
          />
          <div>
            <p>{weather?.description}</p>
            <p>{weather?.temperature}</p>
          </div>
        </div>
      </div>
      <div>
        <Input
          className="lg:w-[25rem]"
          placeholder="Search..."
          size="lg"
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
          }}
        />
      </div>
      <div>
        <div className="lg:flex justify-between pb-5 pt-2 lg:py-5 px-2 lg:px-0">
          <p className={"text-2xl py-3 lg:pt-2"}>Discover Places🌈</p>
          
        </div>

        <div className={"grid grid-cols-12 gap-5"}>
          {!isLoading &&
            places.slice(0, 4).map((place, i) => (
              <motion.div
                className="col-span-12 lg:col-span-3"
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className={""} shadow={"sm"}>
                  <Image
                    src={place.image}
                    className={"w-full h-[12rem] object-cover"}
                  />
                  <CardBody>
                    <p className={"text-2xl truncate w-full"}>{place.name}</p>
                    <div>
                      <div className={"flex py-1"}>
                        <Location size="20" color="#19afff" />
                        <p
                          className={
                            "text-sm pt-[1px] text-customBlue w-full truncate"
                          }
                        >
                          {place.address}
                        </p>
                      </div>
                    </div>
                    <p className={"text-sm line-clamp-2 text-default-400"}>
                      {place.description}
                    </p>
                    <div className={"flex justify-center py-2"}>
                      <Button
                        className={
                          "w-full bg-customBlue text-white py-5 shadow-custom"
                        }
                        onPress={() => {
                          onOpen();
                        }}
                      >
                        {" "}
                        View{" "}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
        </div>
        <div className={"grid grid-cols-12 py-4 gap-5"}>
          <div className={"col-span-12 lg:col-span-8"}>
            <div>
              <p className="text-2xl py-3">Your Location</p>
            </div>
            <Card>
              <div
                ref={mapContainer}
                className={"w-full h-[425px] rounded-lg border-5 border-white"}
              />
            </Card>
          </div>
          <div className="col-span-12 lg:col-span-4 pt-5">
            <p className="pb-3">Suggestions</p>

            <Card
              className="flex flex-col gap-2  bg-gray-50 py-2 px-2 rounded-xl "
              shadow="md"
            >
              {!isLoading &&
                places.slice(5, 9).map((place, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ delay: i * 0.5 }}
                  >
                    <Card className="" shadow="none">
                      <div className="flex ">
                        <div className="p-2">
                          <Image
                            src={place.image}
                            className="w-full h-[5rem] object-cover"
                          />
                        </div>
                        <div className="pt-2">
                          <p className="text-xl line-clamp-1">{place.name}</p>
                          <div className={"flex"}>
                            <Location size="20" color="#19afff" />
                            <p
                              className={
                                "text-sm pt-[1px] text-customBlue line-clamp-1"
                              }
                            >
                              {place.address}
                            </p>
                          </div>
                          <p className="text-gray-400 line-clamp-1">
                            {place.category}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
            </Card>
          </div>
        </div>
        <Modal size="full" isOpen={isOpen}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <p>Modal</p>
                </ModalHeader>
                <ModalBody>
                  <div className="flex">
                  {!isLoading && hourly?.length > 0 ? (
                    hourly.slice(0, 10).map((hour: HourlyData, i: number) => (
                      <Card key={i} className="p-4">
                        <p>{new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(new Date(hour.time))}</p>
                        <p>{hour.emoji}</p>
                      </Card>
                    ))
                  ) : (
                    <p>No data available</p>
                  )}
                  </div>
                  
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
}
