import { Middleware } from '../types';

type Params = {
  /** Режим фильтра
   *
   * `dm` - принимать сообщения только из лички
   *
   * `chat` - принимать сообщения только из бесед
   *
   * `all` - принимать сообщения везде */
  accept: 'dm' | 'chat' | 'all';
};

/** Фильтр сообщений */
export const messagesFilter: Middleware<Params> =
  ({ accept }) =>
  (ctx, next) =>
    ctx.is(['message']) &&
    !ctx.isFromGroup &&
    (accept === 'all' ||
      (accept === 'chat' && ctx.isChat) ||
      (accept === 'dm' && ctx.isDM)) &&
    next();
