import { Button, Chip, Image } from "@nextui-org/react";
import Logo from "@/assets/images/Logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <motion.header
        className="fixed top-0 right-0 left-0 px-2 lg:px-[5rem] py-5"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex justify-between">
          <div>
            <Image src={Logo} className="mt-1 lg:mt-0 h-[2rem] lg:h-[3rem] object-cover" />
          </div>

          <nav className="lg:flex gap-10 hidden">
            <ul className="flex gap-10 mt-3 text-white">
              <li>Home</li>
              <li>Services</li>
              <li>About</li>
            </ul>
            <div>
              <Button
                className="bg-customBlue text-white px-[5rem] py-[25px] shadow-custom"
                onPress={() => navigate("/signin")}
              >
                Sign in
              </Button>
            </div>
            
          </nav>
          <Button
              className="bg-customBlue text-white px-[2rem] py-[20px] shadow-custom lg:hidden"
              onPress={() => navigate("/signin")}
              size="sm"
            >
              Sign in
            </Button>
        </div>
      </motion.header>
      <main className=" w-full h-screen lg:px-[5rem] pt-[20dvh] lg:pt-[30dvh] hero-sc">
        <div className="">
          <div className="">
            <div className="col-span-6">
              <div className="py-3 flex justify-center">
                <Chip size="lg" className="bg-blue-200 py-3">
                  Explore the world 🌍
                </Chip>
              </div>
              <div className="text-center">
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl lg:text-5xl font-semibold text-white"
                >
                  It's a Big World Out there go explore
                </motion.p>
                <motion.p
                  initial={{ y: 220, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 * 0.2 }}
                  className="py-4 lg:px-[8rem] text-white"
                >
                  Embark on unforgettable adventures, explore breathtaking
                  landscapes, uncover hidden gems in every corner of the world,
                  and create cherished memories that will stay with you for a
                  lifetime.
                </motion.p>
              </div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 * 0.5 }}
                className="flex justify-center"
              >
                <Button
                  className="text-white bg-customBlue px-[5rem] shadow-custom"
                  size="lg"
                  onPress={() => navigate("/signin")}
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
