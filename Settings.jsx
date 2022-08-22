import { setDefaults, dependPersist, SSwitch, SSelect } from "cumcord-tools";

let invidiousInstances = fetch("https://api.invidious.io/instances.json").then(data => data.json())

setDefaults({
    "enableInvidious": true,
    "invidiousInstance": "https://yewtu.be",
    "enableTwit": true,
    "fxOrVx": "https://fxtwitter.com",
    "changeSentMessages": true,
    "changeExistingMessages": true,
})

export default dependPersist(() => (
    <>
        <SSelect k="changeExistingMessages">Change links existing embeds</SSelect>
        <SSwitch k="changeSentMessages">Change links of sent messages</SSwitch>
        <SSwitch k="enableInvidious">Enable Invidious redirects</SSwitch>
        <SSelect
            k="invidiousInstance"
            depends="enableInvidious"
            options={[
                invidiousInstances.map(s => {
                    return {value: `https://${s[0]}`, label: s[0]}
                })
            ]}
        >
            Invidious Instance
        </SSelect>
        <SSwitch k="enableTwit">Enable Twitter redirects</SSwitch>
        <SSelect
            k="fxOrVx"
            depends="enableTwit"
            options={[
                {value: "https://fxtwitter.com", label: "FxTwitter"},
                {value: "https://vxtwitter.com", label: "VxTwitter"}
            ]}
        ></SSelect>
    </>
));