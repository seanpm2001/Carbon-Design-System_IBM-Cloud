import React from "react";
import SolutionTile from "./SolutionTile";
import { SkeletonText, SkeletonIcon } from "@carbon/react";

const SolutionTileSkeleton = () => {


  const skeletonDetailItem = <SkeletonText style={{height:'.5rem', width: '20%'}}/>

  return (
    <SolutionTile disabled className='pal--solution-tile--skeleton'>
      <SolutionTile.header><SkeletonText style={{height:'1.2rem', width: '50%'}}/></SolutionTile.header>
      <SolutionTile.description><SkeletonText style={{height:'1rem', width: '100%'}}/></SolutionTile.description>
      <SolutionTile.icon><SkeletonIcon/></SolutionTile.icon>
      
    </SolutionTile>
  )
}

export default SolutionTileSkeleton;