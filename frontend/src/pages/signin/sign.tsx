import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Image,
  Input,
} from "@nextui-org/react";
import { ReactElement, useContext, useState } from "react";
import Logo from "@/assets/images/Logo.png";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "@/context/Authprovider";

export default function Signin(): ReactElement {
  const { signIn } = useAuth();

  const { setCurrentUser, setIsAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      setCurrentUser(res.data);
      setIsAuthenticated(true);
      navigate("/");
    },
    onError: (err : any) => {
      if (err.message.toLowerCase().includes("network error")) {
        toast.error("Please check your internet connection");
        return;
      }
      if(err.response.data.err.includes("Email not found")) {
        setFieldErrors(prevState => ({
            ...prevState,
            email : "Email address not found. Please check the email entered or sign up for a new account."
        }));
      }
      if(err.response.data.err.includes("Wrong password")) {
        setFieldErrors(prevState => ({
            ...prevState,
            password : "Incorrect password"
        }));
      }
      
      console.log(err.response.data);
    },
  });

  function MutateSignup() {
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    mutation.mutate({ email, password });
  }
  return (
    <main className="">
      <Toaster position="top-center" />
      <section>
        <div className="absolute lg:p-3 lg:ms-[6rem] mt-5">
          <Image src={Logo} className="h-[3rem] object-cover" />
          <div className="ps-3 py-3">
            <Breadcrumbs>
              <BreadcrumbItem>
                <span
                  className="text-default-400 font-semibold"
                  onClick={() => console.log(fieldErrors)}
                >
                  {" "}
                  Home
                </span>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <span className="text-customBlue font-semibold">Sign in</span>
              </BreadcrumbItem>
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
                
                <div className="pb-4">
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
                
                <div className="flex justify-center py-4">
                  <Button
                    className="bg-customBlue w-full py-[30px] text-white"
                    onPress={MutateSignup}
                    isLoading={mutation.isPending}
                  >
                    Sign in
                  </Button>
                </div>
                <p className="text-default-400 text-center">
                  Don't have an account?{" "}
                  <Link
                    to={"/signup"}
                    className="text-customBlue font-semibold"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-6 signup-page h-[95dvh] mt-4 mx-5 rounded-xl hidden lg:block">
            <div className="flex justify-center items-center h-full">
              <p className="text-white text-4xl text-center">
                Plan your perfect adventure with personalized weather insights.
                Sign up now to explore destinations and activities tailored just
                for you!"{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
