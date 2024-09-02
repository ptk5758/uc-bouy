import React from "react"
import "../../css/layout.css"
import { Battery, Status } from "./components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTemperatureThreeQuarters, faWind, faWater } from "@fortawesome/free-solid-svg-icons"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
export default function() {
    return (
        <div className="telemetry">
            <Screen/>
            <Matrix/>
        </div>
    )
}

function Matrix() {
    return (
        <div className="matrix">
            <span className="absolute">
                <p>통싱 상태 이상</p>
            </span>
            <div className="item-1">부표 2064</div>
            <div className="item-2">Y : -83.3283</div>
            <div className="item-3">X : 167.0694</div>
            <div className="item-4">
                <p>울산과학대학교 나르샤</p>
            </div>
            <div className="item-5">2024.06.24</div>
            <div className="item-6"><Battery/></div>
            <div className="item-7"><Status/></div>
            <div className="item-8">22 : 46</div>
        </div>
    )
}

function Screen() {
    return (
        <div className="screen">
            <span className="absolute">
                <a className="prompt-button" href="/prompt">
                    <p>PROMPT</p>
                </a>
            </span>
            <div className="information">
                <Icon icon={faTemperatureThreeQuarters} text="21.3" key={1}/>
                <Icon icon={faWater} text="21.3" key={2}/>
                <Icon icon={faWind} text="21.3" key={3}/>
            </div>
        </div>
    )
}

interface InformationIconProp
{
    text : string;
    icon : IconProp;
}

function Icon({icon, text} : InformationIconProp) {
    return (
        <span className="icon">
            <FontAwesomeIcon size="8x" icon={icon}/>
            <p>{ text }</p>
        </span>
    )
}