function RootRoute() {
    return (
        <div>
            <h1>바로가기</h1>
            <NavigationItem href="telemetry" text="Telemtry [측정정보]"/>
            <NavigationItem href="prompt" text="Prompt [원격통신]"/>
        </div>
    )
}

interface NavigationItemProp
{
    href : string
    text : string    
}
function NavigationItem({href, text} : NavigationItemProp) {
    return <a href={href}><h1>{text}</h1></a>
}

export default RootRoute