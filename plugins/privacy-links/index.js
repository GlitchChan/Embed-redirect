import sent_message_converter from "./patches/sent_message_converter";
import message_converter from "./patches/message_converter";

const patches = [...sent_message_converter, ...message_converter];

export const onUnload = () => _.forEach(patches, p => p());

export {default as settings} from './Settings';
