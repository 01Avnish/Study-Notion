import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"
import { color } from "framer-motion";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimelineSection from "../components/core/HomePage/TimelineSection"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ExploreMore from "../components/core/HomePage/ExploreMore"


export default function Home() {
  return (
    <div>
      {/* Section1 */}
       <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">

        <Link to={"/signup"}>
          <div className='group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 
             drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none'>
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
             transition-all duration-200  group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>

        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
            Build Tomorrow With the Skills of Today :
             <HighlightText text={"Learn to Code"}/>
        </div>

        <div className="  mt-5 w-[90%] text-center text-lg font-bold text-richblack-300">
            No matter where you are, you can start your coding journey with us. Explore fun projects, test your knowledge with quizzes,
             and get support from instructors who are here to help all when it works best for you.
        </div>
        <div className="flex flex-row gap-7 mt-8">
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>

            <CTAButton  active={false} linkto={"/signup"}>
                Book a Demo
            </CTAButton>
        </div>

        {/* video section */}

        <div className="my-12 w-full">
           <div className="mx-auto max-w-[800px] rounded-lg overflow-hidden shadow-[10px_-5px_50px_-5px] shadow-blue-200">
              <video
                className="w-full h-auto rounded-lg shadow-[20px_20px_rgba(255,255,255)]"
                muted
                loop
                autoPlay
              >
                <source src={Banner} type="video/mp4" />
             </video>
            </div>
        </div>

        {/* code section 1*/}

        <div>
            <CodeBlocks 
                   position={"lg:flex-row"}
                   heading={
                    <div className="text-4xl font-semibold">
                      Elevate Your
                     <HighlightText text={"Coding Skills "} />With Flexible Online Learning
                    </div>
                    }
                    subheading={
                     "Taught by experts who live and breathe code, our courses bring real-world experience and industry-relevant skills straight to your screen , so you can learn what truly matters."
                    }
                    ctabtn1={{
                    btnText: "Try it Yourself",
                    link: "/signup",
                    active: true,
                    }}
                    ctabtn2={{
                    btnText: "Learn More",
                    link: "/signup",
                    active: false,
                    }}
                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                    codeColor={"text-yellow-25"}
            />
        </div>

        {/* code section 2 */}

        <div>
            <CodeBlocks 
                   position={"lg:flex-row-reverse"}
                   heading={
                    <div className="text-4xl font-semibold">
                      Kickstart your
                     <HighlightText text={"coding "} /> in no time
                    </div>
                    }
                    subheading={
                     "Don’t just watch—start doing! From your very first lesson, you’ll be writing real code in a hands-on, beginner-friendly environment.."
                    }
                    ctabtn1={{
                    btnText: "Start Learning",
                    link: "/signup",
                    active: true,
                    }}
                    ctabtn2={{
                    btnText: "Learn More",
                    link: "/signup",
                    active: false,
                    }}
                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                    codeColor={"text-gray-100"}
            />
        </div>

        <ExploreMore/>
      </div>

      {/* section2 */}

      <div className="bg-pure-greys-5 text-richblack-700" >

         <div className="homepage_bg h-[320px]">
           <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
           <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
               <CTAButton active={true} linkto={"/signup"}>
               <div className="flex items-center gap-3">
                 Explore Full Catalog
                 <FaArrowRight/>
               </div>
               </CTAButton>
               <CTAButton active={false} linkto={"signup"}>
                   Learn More
               </CTAButton>
            </div>
           </div>
         </div>

         <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
                <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                      <div className="text-4xl font-semibold lg:w-[50%] ">
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"}/>
                      </div>
                      <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                          <div className="text-[16px]">
                            The modern StudyNotion dictates its own terms. Today, to
                            be a competitive specialist requires more than professional
                            skills.
                          </div>
                          <CTAButton active={true} linkto={"/signup"}>
                             <div className="">Learn More</div>
                          </CTAButton>
                      </div>
                </div>

                {/* Timeline Section - Section 2 */}
              <TimelineSection />

                {/* Learning Language Section - Section 3 */}
              <LearningLanguageSection />
         </div>
      </div>

      {/* section3 */}
      <div className="relative mx-auto my-20 flex max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />
        </div>

      {/* footer */}
    </div>
  );
}
