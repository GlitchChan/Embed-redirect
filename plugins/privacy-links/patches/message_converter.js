import {findByProps} from '@cumcord/modules/webpack';
import {persist} from "@cumcord/pluginData";
import {after} from "@cumcord/patcher";

const Settings = persist.ghost
const Message = findByProps("MessageAccessories")
const YouTubeReg = /https:\/\/(.+)?youtube|https:\/\/youtu\.be/g


export default [
    after('default', Message, (args, res) => {
        const message = res.props.message

        if (message.content.search(YouTubeReg) !== -1 && Settings.invidiousChangeExistingMessages && Settings.enableInvidious) {
            message.content = message.content.replace(YouTubeReg, () => Settings.invidiousInstance)
        }

        if (message.embeds.length >= 1){
            message.embeds.forEach(embed => {
                if (embed.video && (embed.video.originalURL ? embed.video.originalURL : embed.video.url).includes("youtube") && Settings.invidiousChangeExistingMessages && Settings.enableInvidious) {
                    try{
                        embed.provider.url = Settings.invidiousInstance
                        embed.provider.name = "YouTube ➡️ Invidious"
                        embed.url = embed.url.replace(YouTubeReg, Settings.invidiousInstance)
                        embed.video.url = embed.video.url.replace(YouTubeReg, Settings.invidiousInstance)
                        embed.title.url = embed.title.url.replace(YouTubeReg, Settings.invidiousInstance)
                        embed.author.url = embed.author.url.replace(YouTubeReg, Settings.invidiousInstance)
                    } catch (e) {}
                }
            })
        }
    }),
]