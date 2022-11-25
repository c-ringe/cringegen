import {
  ContextDefaultState,
  IMessageContextSendOptions,
  MessageContext as IncomingMessageContext
} from 'vk-io';

export type MessageContext = IncomingMessageContext<ContextDefaultState>;

export type Message = string | IMessageContextSendOptions;
export type DynamicMessage = (ctx: MessageContext) => Message;
