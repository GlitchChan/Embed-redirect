import * as webpackModules from '@cumcord/modules/webpack';
import {persist} from "@cumcord/pluginData";
import {after} from "@cumcord/patcher";

const Message = webpackModules.find((m) => m.type && m.type.displayName === 'MessageContent');
const Settings = persist.ghost
const YouTubeRegex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export default [
    after('type', Message, () =>{
        const embed = document.getElementsByTagName('iframe');
        for (let i = 0; i < embed.length; i++) {
            const element = embed[i];
            const embedLink = element.getAttribute('src');
            if (embedLink.search('https://youtube.com' || 'https://youtu.be') !== -1 && Settings.enableInvidious && Settings.changeExistingMessages){
                element.setAttribute('src', (`${Settings.invidiousInstance}/watch?=${embedLink.match(YouTubeRegex)}`))
            }
        }
    })
]