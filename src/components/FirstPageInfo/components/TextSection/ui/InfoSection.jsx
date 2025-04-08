import { InfoVideo } from "./InfoVideo"
export const InfoSection =()=>{
    return(
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
                  <div className="lg:w-1/2 w-full">
                    <InfoVideo />
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Create anything you can imagine on our platform. Share your work, 
                      connect with other creators, and grow together with our community!
                    </p>
                  </div>
                </div>
    )
}