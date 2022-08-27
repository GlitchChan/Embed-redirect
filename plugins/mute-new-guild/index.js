import {findByProps} from "@cumcord/modules/webpack";
import {persist} from "@cumcord/pluginData";
import {after} from "@cumcord/patcher";

const acceptedInvite = findByProps("acceptInvite");
const updateGuildNotificationSettings = findByProps("updateGuildNotificationSettings")["updateGuildNotificationSettings"]
const Settings = persist.ghost

const unpatch = after("acceptInvite", acceptedInvite, (args, res) => {
    res.then(invite => {
        const guildId = invite.guild.id
        updateGuildNotificationSettings(guildId, {"muted": Settings.muted, "suppress_everyone": Settings.suppressEveryone, "suppress_roles": Settings.suppressRoles, "mobile_push": Settings.mobilePush})
    })
})
export const onUnload = () => unpatch()
export {default as settings} from './Settings';
