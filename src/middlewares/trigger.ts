import { DynamicMessage, Message, Middleware } from '../types';

type Params = {
  /** Имя триггера. Если не представлен `regexp`, то одновременно и триггер */
  name: string;
  /** Регулярное выражение для триггера на сообщение */
  regexp?: RegExp;
  /** Сообщение для ответа */
  message: Message | DynamicMessage;
};

/** Создает триггер на содержимое в тексте сообщения и отвечает на него. */
export const trigger: Middleware<Params> =
  ({ name, regexp, message }) =>
  (ctx, next) => {
    if (
      (regexp && ctx.text?.match(regexp)) ||
      ctx.text?.toLowerCase().includes(name)
    )
      return ctx.reply(typeof message === 'function' ? message(ctx) : message);

    next();
  };
