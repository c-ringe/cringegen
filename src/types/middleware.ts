import { Middleware as IOMiddleware } from 'middleware-io';

import { MessageContext } from './message';

export type Middleware<T> = (config: T) => IOMiddleware<MessageContext>;
