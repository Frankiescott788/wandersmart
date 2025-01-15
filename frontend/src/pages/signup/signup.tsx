import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Checkbox,
  Image,
  Input,
} from "@nextui-org/react";
import { ReactElement, useContext, useState } from "react";
import Logo from "@/assets/images/Logo.png";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthResErrors, User } from "@/types/types";
import { AuthContext } from "@/context/Authprovider";

export default function Signup(): ReactElement {

  const { signUp } = useAuth();
  const { setCurrentUser, setIsAuthenticated } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState<User>({
    username : "",
    email : "",
    password : ""
  })

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (res) => {
      localStorage.setItem("authtoken", res.data.token);
      setCurrentUser(res.data);
      setIsAuthenticated(true);
      navigate("/");
    },
    onError: (err : AuthResErrors) => {
      if (err.message.toLowerCase().includes("network error")) {
        toast.error("Please check your internet connection");
        return;
      };
      setFieldErrors(prevState => ({
        ...prevState,
        ...err.response.data.err
      }))
      console.log(err.response.data)
    },
  });

  function MutateSignup() {
    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    mutation.mutate({ username, email, password });
  }

  return (
    <main className="">
      <Toaster position="top-center" />
      <section>
        <div className="absolute lg:p-3 lg:ms-[6rem] mt-5">
          <Image src={Logo} className="h-[3rem] object-cover" />
          <div className="ps-3 py-3">
            <Breadcrumbs>
              <BreadcrumbItem><span className="text-default-400 font-semibold" > Home</span></BreadcrumbItem>
              <BreadcrumbItem><span className="text-customBlue font-semibold">Sign in</span></BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-6">
            <div className="px-2 lg:px-0 lg:w-[35rem] lg:ms-[7rem] mt-[9rem] lg:mt-[10rem]">
              <div>
                <div className="pb-2 lg:py-4">
                  <p className="text-3xl">Get Started Now</p>
                  <p className="text-default-400">
                    Get tailored activities and destinations based on the
                    weather!
                  </p>
                </div>
                <div>
                  <Input 
                    size="lg" 
                    label="Username" 
                    value={username}
                    isInvalid={fieldErrors.username ? true : false}
                    errorMessage={fieldErrors.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="py-4">
                  <Input 
                    size="lg" 
                    label="Email" 
                    value={email}
                    isInvalid={fieldErrors.email ? true : false}
                    onChange={(e) => setEmail(e.target.value)}
                    errorMessage={fieldErrors.email}                  
                  />
                </div>
                <div>
                  <Input 
                    size="lg" 
                    label="Password" 
                    value={password}
                    isInvalid={fieldErrors.password ? true : false}
                    errorMessage={fieldErrors.password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex pt-2 px-2">
                  <Checkbox />
                  <p className="text-sm mt-1 text-default-400">I've read <span className="text-customBlue">terms and conditions</span></p>
                </div>
                <div className="flex justify-center py-4">
                  <Button 
                    className="bg-customBlue w-full py-[30px] text-white"
                    onPress={MutateSignup}
                    isLoading={mutation.isPending}
                    
                  >
                    Sign up
                  </Button>
                </div>
                <p className="text-default-400 text-center">Already have an account? <Link to={"/signin"} className="text-customBlue font-semibold">Sign in</Link></p>
              </div>
            </div>
          </div>
          <div className="col-span-6 signup-page h-[95dvh] mt-4 mx-5 rounded-xl hidden lg:block">
            <div className="flex justify-center items-center h-full">
              <p className="text-white text-4xl text-center">Plan your perfect adventure with personalized weather insights. Sign up now to explore destinations and activities tailored just for you!" </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
