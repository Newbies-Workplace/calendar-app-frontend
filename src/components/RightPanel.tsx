import React from "react"


  interface RightPanelProps {
title:string


  }

  export const RightPanel:React.FC<RightPanelProps> =({title})=>{
    return (<div>{title}</div>)
    }
  