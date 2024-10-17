import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const companies = [
    {
      name : "Google", 
      img :{
        url : "https://img.icons8.com/?size=512&id=17949&format=png"
      }
    }, 
    {
      name : "Facebook", 
      img :{
        url : "https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
      }
    }, 
    {
      name : "Tesla", 
      img :{
        url : "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png"
      }
    }, 
  ]
  return (
    <div className="flex-1 flex flex-col h-full items-center">
      <MaxWidthWrapper className="h-[calc(100vh-4rem)]  flex flex-col items-center ">
        {/* Hero Section */}
        <section className="flex-1 w-full py-20 flex flex-col items-center justify-center gap-y-4 md:gap-y-6 ">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-foreground ">
            Find Your Ideal <span className="text-primary">Internship / Apprenticeship</span> Today
          </h1>
          <p className="text-gray-700 dark:text-gray-400 text-center  ">
            Explore curated opportunities and insights from the finance industry.
          </p>
          <Button className="px-6 py-3 ">
            Get Started
          </Button>
        </section>

        {/* Cards Section */}
        <section className="flex-[0.75] flex flex-col items-center justify-center gap-y-8 md:gap-y-8  ">
          
          <div className="flex flex-row items-center justify-center gap-x-4 md:gap-x-10">
            {companies.map((company,i)=><div className="relative h-16 w-16 " key={i}>
                <Image src={company.img.url} fill  className="h-full w-full" alt={company.name}/> 
              </div>
            )}
          </div>
        </section>

      </MaxWidthWrapper>
    </div>
  );
}
