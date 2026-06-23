import Banner from "@/components/Bannar";
import BannerContent from "@/components/BannerContent";
import LawyerCard from "@/components/LawyerCard";

import Image from "next/image";

export default function Home() {
  return (
    <div>
   <Banner/>
   <BannerContent/>
   <LawyerCard/>
    </div>
  );
}
