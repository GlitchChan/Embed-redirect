import {setDefaults, dependPersist, SSwitch, SSelect} from "cumcord-tools";

setDefaults({
    "enableInvidious": true,
    "invidiousInstance": "https://yewtu.be",
    "invidiousChangeSentLinks": false,
    // "invidiousChangeExistingVideos": true, // This shit is hard
    "enableTwit": true,
    "twitFixInstance": "https://fxtwitter.com",
    // "twitFixChangeSentLinks": true, // WIP
})

const instances = fetch("https://api.invidious.io/instances.json")
    .then(res =>  res.json())
    .then(json => json.forEach(k => {
        if (!k[0].endsWith(".onion")){
            instance_list.push({value: `https://${k[0]}`, label: k[0]})
        }}))
let instance_list = []

export default dependPersist(() => (
    <>
        {/*Invidious Options*/}
        <SSwitch k={"enableInvidious"}>Enable Invidious Redirects</SSwitch>
        <SSwitch k={"invidiousChangeSentLinks"} depends={"enableInvidious"}>Change Sent Links</SSwitch>
        {/*<SSwitch k={"invidiousChangeExistingVideos"} depends={"enableInvidious"}>Change YouTube Embeds</SSwitch>*/}
        <SSelect k={"invidiousInstance"} depends={"enableInvidious"} options={instance_list}>Invidious Instance</SSelect>

        {/*Twitter Options*/}
        <SSwitch k={"enableTwit"}>Enable Twitter Redirects</SSwitch>
        <SSwitch k={"twitFixChangeSentLinks"} depends={"enableTwit"}>Change Sent Links</SSwitch>
        <SSelect k={"twitFixInstance"}  depends={"enableTwit"} options={[
            {value: "https://fxtwitter.com", label: "FxTwitter"},
            {value: "https://vxtwitter.com", label: "VxTwitter"}
        ]}>
            Which TwitFix instance should be used
        </SSelect>
    </>
))