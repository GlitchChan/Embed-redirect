import {findByProps} from '@cumcord/modules/webpack';
import {persist} from "@cumcord/pluginData";
import {after} from "@cumcord/patcher";

const Settings = persist.ghost
const Message = findByProps("MessageAccessories")


export default [
    after('default', Message, (args, res) => {
        const message = res.props.message

        if (message.content.search(/https:\/\/(.+)?youtube|https:\/\/youtu\.be/g) !== -1 && Settings.invidiousChangeExistingMessages && Settings.enableInvidious) {
            message.content = message.content.replace(/https:\/\/(.+)?youtube\.com|https:\/\/youtu\.be/g, () => Settings.invidiousInstance)
        }

        if (message.embeds.length >= 1){
            message.embeds.forEach(embed => {
                if (embed.video && (embed.video.originalURL ? embed.video.originalURL : embed.video.url).includes("youtube") && Settings.invidiousChangeExistingMessages && Settings.enableInvidious) {
                    if (embed.proivder.url) embed.provider.url = Settings.invidiousInstance
                    if (embed.author.url) embed.author.url = embed.author.url.replace("https://www.youtube.com", Settings.invidiousInstance)
                    if (embed.url) embed.url = embed.url.replace("https://www.youtube.com", Settings.invidiousInstance)
                    if (embed.provider.name) embed.provider.name = "YouTube ➡️ Invidious"
                    if (embed.video.url) embed.video.url = embed.video.url.replace("https://www.youtube.com", Settings.invidiousInstance)
                }
            })
        }
    }),
]