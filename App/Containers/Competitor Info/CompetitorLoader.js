import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

const CompetitorLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={500}
    viewBox="0 0 400 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="50" y="224" rx="0" ry="0" width="0" height="1" /> 
    <Rect x="29" y="-34" rx="47" ry="47" width="301" height="138" /> 
    <Rect x="37" y="168" rx="16" ry="16" width="293" height="124" /> 
    <Rect x="37" y="457" rx="16" ry="16" width="293" height="124" /> 
    <Rect x="38" y="310" rx="16" ry="16" width="293" height="124" /> 
    <Rect x="35" y="118" rx="0" ry="0" width="292" height="34" />
  </ContentLoader>
)

export default CompetitorLoader