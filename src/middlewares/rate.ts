import { Middleware } from '../types';

type Params = {
  /** Имя оцениваемого продукта. Если не представлен `regexp`, то одновременно и триггер */
  name: string;
  /** Регулярное выражение для триггера на продукт */
  regexp?: RegExp;
  /** Минимальное значение `Math.random()` для получения оценки *топ* */
  highRateThreshold?: number;
};

/** Оценивает продукт по шкале *топ/говно*. */
export const rate: Middleware<Params> =
  ({ name, regexp, highRateThreshold }) =>
  (ctx, next) => {
    if (
      (regexp && ctx.text?.match(regexp)) ||
      ctx.text?.toLowerCase().includes(name)
    )
      return ctx.reply(
        `${name} ${
          Math.random() > (highRateThreshold || 0.75) ? 'топ' : 'говно'
        }`
      );

    next();
  };
