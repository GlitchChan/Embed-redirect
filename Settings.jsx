import { setDefaults, dependPersist, SSwitch, SSelect } from "cumcord-tools";

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