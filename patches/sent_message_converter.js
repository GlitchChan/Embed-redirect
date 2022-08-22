import {persist} from "@cumcord/pluginData";
import {before} from "@cumcord/patcher";
import {findByProps} from "@cumcord/modules/webpack";

const MessageModule = findByProps("sendMessage");
const Settings = persist.ghost


export default [
    before("sendMessage", MessageModule, args => {
        if (args[1].content.search('https://twitter.com') !== -1 && Settings.enableTwit && Settings.changeSentMessages) {
            args[1].content = args[1].content.replace(/\?.\S*/g, () => ''); // Remove Tracking
            args[1].content.replace(/https:\/\/twitter\.com/g, () => Settings.fxOrVx);
        } else if (args[1].content.search('https://youtube.com' || 'https://youtu.be') !== -1 && Settings.enableInvidious && Settings.changeSentMessages) {
            args[1].content.replace(/https:\/\/youtube|youtu.be/g, () => Settings.invidiousInstance);
        }
    })
]
