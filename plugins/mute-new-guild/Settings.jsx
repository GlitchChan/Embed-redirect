import { SSwitch, setDefaults, dependPersist } from "cumcord-tools";

setDefaults({
  muted: true,
  suppressEveryone: false,
  suppressRoles: false,
  mobilePush: true,
});

export default dependPersist(() => (
  <>
    <SSwitch k={"muted"}>Mute New Guild</SSwitch>
    <SSwitch k={"suppressEveryone"}>Suppress @everyone Pings</SSwitch>
    <SSwitch k={"suppressRoles"}>Suppress Role Mentions</SSwitch>
    <SSwitch k={"mobilePush"}>Mobile Push Notifications</SSwitch>
  </>
));
