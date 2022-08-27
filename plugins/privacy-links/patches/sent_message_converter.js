import {persist} from "@cumcord/pluginData";
import {before} from "@cumcord/patcher";
import {findByProps} from "@cumcord/modules/webpack";

const MessageModule = findByProps("sendMessage");
const Settings = persist.ghost


export default [
    before("sendMessage", MessageModule, args => {
        const message = args[1]
        if(message.content.search('https://twitter.com') !== -1 && Settings.enableTwit && Settings.twitFixChangeSentLinks) {
            message.content = message.content.replace(/\?.\S*/g, () => '');
            message.content = message.content.replace(/https:\/\/twitter\.com/g, () => Settings.twitFixInstance);
        } else if(message.content.search(/https:\/\/youtube|youtu.be/g) !== -1 && Settings.enableInvidious && Settings.invidiousChangeSentLinks){
            message.content = message.content.replace(/https:\/\/youtube|https:\/\/youtu.be/g, () => Settings.invidiousInstance);
        }
    })
]
