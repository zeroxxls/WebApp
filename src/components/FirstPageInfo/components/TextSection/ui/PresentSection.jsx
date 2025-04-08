import { PresentVideo } from "./PresentVideo"
export const PresentSection =()=>{
    return(
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                  <div className="lg:w-1/2 w-full">
                    <PresentVideo />
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <p className="text-gray-300 text-lg leading-relaxed">
                    Our platform isn't just for 2D art — here, you can also showcase your 3D creations! 
                    Join a vibrant community of artists, designers, and creators who bring their ideas to life in three dimensions. 
                    Whether it's models, animations, or full scenes, this is the place to share your work and get inspired.
                    </p>
                  </div>
                </div>
    )
}