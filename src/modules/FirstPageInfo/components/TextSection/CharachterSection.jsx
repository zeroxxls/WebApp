import { CharacterVideo } from "../../ui/CharachterVideo";
export const CharachterSection =()=>{
    return(
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-24">
          <div className="lg:w-1/2 w-full">
            <CharacterVideo />
          </div>
          <div className="lg:w-1/2 w-full">
            <p className="text-gray-300 text-lg leading-relaxed">
            Discover a world of unique and stunning creations on our platform. From breathtaking 3D models to beautifully crafted 2D art — there's always something new to explore.
            Get inspired, support other artists, and find your next favorite piece right here.
            </p>
          </div>
        </div>
    )
}