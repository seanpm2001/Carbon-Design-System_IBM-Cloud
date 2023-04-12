import React from "react";
import SolutionTile from "./SolutionTile";
import { SkeletonText, SkeletonIcon } from "@carbon/react";

const SolutionTileSkeleton = (props) => {

  return (
    <SolutionTile disabled className='pal--solution-tile--skeleton' {...props}>
      <SolutionTile.header><SkeletonText style={{height:'1.2rem', width: '50%'}}/></SolutionTile.header>
      <SolutionTile.description><SkeletonText style={{height:'1rem', width: '100%'}}/></SolutionTile.description>
      <SolutionTile.icon><SkeletonIcon style={{height:'2rem', width:'2rem'}}/></SolutionTile.icon>
      
    </SolutionTile>
  )
}

export default SolutionTileSkeleton;