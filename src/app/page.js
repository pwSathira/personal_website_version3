import Image from "next/image";
import 'animate.css';
import Layout from './layout';
import { Button } from "@/components/ui/button"
import {ChevronDown} from "lucide-react";

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center h-screen">
          <Image className={"animate__animated animate__backInDown"} src={"/sw-logo-2024-trans.png"} alt={"LOGO"} width={150} height={150}></Image>
          <div className="text-center mt-5">
              <h2 className="text-4xl tracking-wider mb-2">SATHIRA WILLIAMS</h2>
              <h3 className="text-xl font-light">SOFTWARE ENGINEER, FULLSTACK DEVELOPER</h3>
          </div>
          <div className="mt-10" >
              <Button size="icon" className="hvr-icon-bounce">
                  <ChevronDown className="h-4 w-4"/>
              </Button>
          </div>
      </div>
  );
}

