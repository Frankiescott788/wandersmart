import { Location } from "iconsax-react";
import MapComponentPlace from "./placemap";
import {
  Button,
  Card,
  CardBody,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Logo from "@/assets/images/Logo.png";
import useWeather from "@/hooks/useWeather";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import AI from "@/assets/images/ai(1).png";
import useChatbot from "@/hooks/chatbot";

export default function Place() {
  const {
    daily,
    loading,
    hourly,
    fetchWeather,
    weather,
    coordinates,
  } = useWeather();

  const { id } = useParams();
  const {  isOpen, onOpen } = useDisclosure();

  const [isDisplayed, setIsPlayed] = useState(false);

  useEffect(() => {
    fetchWeather(id as string);
  }, []);

  const data = {
    city: id,
   
        temp : weather?.temperature,
        description : weather?.description

  };

  const { StartChat } = useChatbot("Hey", data);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="px-2 lg:px-[5rem]">
      <main>
        <div>
          <div className="flex justify-between py-5">
            <div>
              <Image src={Logo} className="h-10 lg:h-[4rem] object-cover " />
            </div>
            <div className="flex gap-4">
              <div className="py-4">
                <Button
                  className="bg-gradient-to-r from-customBlue to-green-500 text-white "
                  size="lg"
                  onPress={() => {
                    StartChat();
                    setIsPlayed(true);
                    onOpen();
                  }}
                >
                  <div>
                    <Image src={AI} className="h-[2rem] object-cover" />
                  </div>
                  Get Activities
                </Button>
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
          </div>

          <div className="lg:flex justify-between">
            <div className="flex ps-3">
              <Location size={35} color="black" className="mt-1" />
              <p className="text-4xl ">{id}</p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-5">
            <div
              className={`border-5 rounded-lg border-gray-200 col-span-12 lg:col-span-6 ${
                isDisplayed ? "opacity-0" : ""
              }  `}
            >
              <MapComponentPlace
                center={[
                  coordinates?.lat as number,
                  coordinates?.lon as number,
                ]}
                cityname={id as string}
              />
            </div>
            <div className="px-10 lg:px-0 col-span-12 lg:col-span-6">
              <p className="text-3xl pb-2 text-center lg:text-start">Weather</p>
              <p className="px-2 pt-[1rem] text-lg text-center lg:text-start">
                Hourly
              </p>
              <div className="grid grid-cols-12 gap-5">
                {!loading &&
                  hourly.slice(0, 4).map((hour, i) => (
                    <Card
                      className="col-span-12 lg:col-span-3 border-5 border-gray-100"
                      shadow="none"
                      key={i}
                    >
                      <CardBody className="text-center">
                        <p className="text-default-400">
                          {new Intl.DateTimeFormat("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                          }).format(new Date(hour.time))}
                        </p>
                        <p className="text-5xl">{hour.emoji}</p>
                        <p className="text-5xl">{hour.temperature}</p>
                      </CardBody>
                    </Card>
                  ))}
              </div>
              <p className="px-2 pt-[3rem] text-lg text-center lg:text-start">
                Daily
              </p>
              <div className="grid grid-cols-12 gap-5">
                {!loading &&
                  daily.slice(0, 4).map((hour, i) => (
                    <Card
                      className="col-span-12 lg:col-span-3 border-5 border-gray-100"
                      shadow="none"
                      key={i}
                    >
                      <CardBody className="text-center">
                        <p className="text-default-400">
                          {new Intl.DateTimeFormat("en-US", {
                            weekday: "long",
                          }).format(new Date(hour.date))}
                        </p>
                        <p className="text-5xl">{hour.emoji}</p>
                        <p className="text-5xl">{hour.maxTemperature}</p>
                      </CardBody>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Modal isOpen={isOpen} size="5xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                <p className="text-4xl">LuminaAI</p>
              </ModalHeader>
              <ModalBody></ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
