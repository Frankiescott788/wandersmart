import { ReactElement, useEffect, useRef } from "react";
import { Button, Card, CardBody, Image, Input } from "@nextui-org/react";
import CPT from "@/assets/images/cape-town-4620987.jpg";
import { Location } from "iconsax-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainer.current).setView(center, zoom);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Add a marker
    L.marker(center).addTo(mapRef.current).bindPopup("Cape Town").openPopup();

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

  return (
    <section className={"lg:py-4 px-1 lg:pe-5"}>
      <div>
        <div>
          <p className={"text-3xl text-default-500"}>Good Morning, Frankie</p>
          <p className={"text-default-400"}>
            Welcome back and explore the world
          </p>
        </div>
      </div>
      <div>
        <div className="lg:flex justify-between py-3 lg:py-5">
          <p className={"text-2xl pt-1"}>Discover Places🌈</p>
          <div>
            <Input className="lg:w-[25rem]" placeholder="Search..." />
          </div>
        </div>
        <div className={"grid grid-cols-12 gap-5"}>
          <Card className={"col-span-12 lg:col-span-3"} shadow={"sm"}>
            <Image src={CPT} className={"w-full h-full"} />
            <CardBody>
              <p className={"text-2xl"}>Cape Town Bay</p>
              <div>
                <div className={"flex"}>
                  <Location size="20" color="#19afff" />
                  <p className={"text-sm pt-[1px] text-customBlue"}>
                    Cape Town, SA
                  </p>
                </div>
              </div>
              <p className={"text-sm line-clamp-2 text-default-400"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue
                congue in sadipscing nostrud. Vero excepteur laoreet cupiditat.
                Deserunt consectetur deserunt nisi ullamcorper. Tempor possim
                cillum. Sed imperdiet odio.
              </p>
              <div className={"flex justify-center py-2"}>
                <Button className={"w-full bg-customBlue text-white py-5"}>
                  {" "}
                  View{" "}
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card className={"col-span-3"} shadow={"sm"}>
            <Image src={CPT} className={"w-full h-full"} />
            <CardBody>
              <p className={"text-2xl"}>Cape Town Bay</p>
              <div>
                <div className={"flex"}>
                  <Location size="20" color="#19afff" />
                  <p className={"text-sm pt-[1px] text-customBlue"}>
                    Cape Town, SA
                  </p>
                </div>
              </div>
              <p className={"text-sm line-clamp-2 text-default-400"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue
                congue in sadipscing nostrud. Vero excepteur laoreet cupiditat.
                Deserunt consectetur deserunt nisi ullamcorper. Tempor possim
                cillum. Sed imperdiet odio.
              </p>
              <div className={"flex justify-center py-2"}>
                <Button className={"w-full bg-customBlue text-white py-5"}>
                  {" "}
                  View{" "}
                </Button>
              </div>
            </CardBody>
          </Card>
          <Card className={"col-span-3"} shadow={"sm"}>
            <Image src={CPT} className={"w-full h-full"} />
            <CardBody>
              <p className={"text-2xl"}>Cape Town Bay</p>
              <div>
                <div className={"flex"}>
                  <Location size="20" color="#19afff" />
                  <p className={"text-sm pt-[1px] text-customBlue"}>
                    Cape Town, SA
                  </p>
                </div>
              </div>
              <p className={"text-sm line-clamp-2 text-default-400"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue
                congue in sadipscing nostrud. Vero excepteur laoreet cupiditat.
                Deserunt consectetur deserunt nisi ullamcorper. Tempor possim
                cillum. Sed imperdiet odio.
              </p>
              <div className={"flex justify-center py-2"}>
                <Button className={"w-full bg-customBlue text-white py-5"}>
                  {" "}
                  View{" "}
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card className={"col-span-3"} shadow={"sm"}>
            <Image src={CPT} className={"w-full h-full"} />
            <CardBody>
              <p className={"text-2xl"}>Cape Town Bay</p>
              <div>
                <div className={"flex"}>
                  <Location size="20" color="#19afff" />
                  <p className={"text-sm pt-[1px] text-customBlue"}>
                    Cape Town, SA
                  </p>
                </div>
              </div>
              <p className={"text-sm line-clamp-2 text-default-400"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue
                congue in sadipscing nostrud. Vero excepteur laoreet cupiditat.
                Deserunt consectetur deserunt nisi ullamcorper. Tempor possim
                cillum. Sed imperdiet odio.
              </p>
              <div className={"flex justify-center py-2"}>
                <Button className={"w-full bg-customBlue text-white py-5"}>
                  {" "}
                  View{" "}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className={"grid grid-cols-12 py-4 gap-5"}>
          <div className={"col-span-12 lg:col-span-8"}>
            <p className="text-2xl py-3">Your Location</p>
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
              <Card className="" shadow="none">
                <div className="flex ">
                  <div className="p-2">
                    <Image src={CPT} className="h-[5rem] object-cover" />
                  </div>
                  <div className="pt-2">
                    <p className="text-xl">Port Elizabeth</p>
                    <div className={"flex"}>
                      <Location size="20" color="#19afff" />
                      <p className={"text-sm pt-[1px] text-customBlue"}>
                        Cape Town, SA
                      </p>
                    </div>
                    <p className="text-gray-400">Safari</p>
                  </div>
                </div>
              </Card>
              <Card className="" shadow="none">
                <div className="flex ">
                  <div className="p-2">
                    <Image src={CPT} className="h-[5rem] object-cover" />
                  </div>
                  <div className="pt-2">
                    <p className="text-xl">Port Elizabeth</p>
                    <div className={"flex"}>
                      <Location size="20" color="#19afff" />
                      <p className={"text-sm pt-[1px] text-customBlue"}>
                        Cape Town, SA
                      </p>
                    </div>
                    <p className="text-gray-400">Safari</p>
                  </div>
                </div>
              </Card>
              <Card className="" shadow="none">
                <div className="flex ">
                  <div className="p-2">
                    <Image src={CPT} className="h-[5rem] object-cover" />
                  </div>
                  <div className="pt-2">
                    <p className="text-xl">Port Elizabeth</p>
                    <div className={"flex"}>
                      <Location size="20" color="#19afff" />
                      <p className={"text-sm pt-[1px] text-customBlue"}>
                        Cape Town, SA
                      </p>
                    </div>
                    <p className="text-gray-400">Safari</p>
                  </div>
                </div>
              </Card>
              <Card className="" shadow="none">
                <div className="flex ">
                  <div className="p-2">
                    <Image src={CPT} className="h-[5rem] object-cover" />
                  </div>
                  <div className="pt-2">
                    <p className="text-xl">Port Elizabeth</p>
                    <div className={"flex"}>
                      <Location size="20" color="#19afff" />
                      <p className={"text-sm pt-[1px] text-customBlue"}>
                        Cape Town, SA
                      </p>
                    </div>
                    <p className="text-gray-400">Safari</p>
                  </div>
                </div>
              </Card>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
