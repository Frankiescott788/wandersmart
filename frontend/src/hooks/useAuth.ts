import { User } from "@/types/types";
import axios from "axios";

export default function useAuth() {
  const signUp = async (data: User) => {
    const res = await axios.post("https://wandersmart-9ajk.onrender.com/api/signup", data, { withCredentials : true });
    return res
  };

  const signIn = async (data : User) => {
    const res = await axios.post("https://wandersmart-9ajk.onrender.com/api/signin", data, { withCredentials : true });
    return res
  }

  return { signUp, signIn }

}
